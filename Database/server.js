const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios'); // Add axios for fetching data
const app = express();

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'robotics'
});

db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected...');
});

// Existing endpoint to fetch logs
app.get('/logs', (req, res) => {
  let sql = 'SELECT * FROM logs';
  db.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    res.json(results);
  });
});

// Existing endpoint to add a log
app.post('/add-log', (req, res) => {
  const { WashType, Amount, WashTime } = req.body;
  
  // Get the current date and time in the Philippines time zone
  const options = {
    timeZone: 'Asia/Manila',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  };
  
  const formatter = new Intl.DateTimeFormat('en-GB', options);
  const parts = formatter.formatToParts(new Date());
  
  const year = parts.find(p => p.type === 'year').value;
  const month = parts.find(p => p.type === 'month').value;
  const day = parts.find(p => p.type === 'day').value;
  const hour = parts.find(p => p.type === 'hour').value;
  const minute = parts.find(p => p.type === 'minute').value;

  const formattedDateForMySQL = `${year}-${month}-${day} ${hour}:${minute}`;
  
  let sql = 'INSERT INTO logs (WashType, Amount, WashTime, Date) VALUES (?, ?, ?, ?)';
  db.query(sql, [WashType, Amount, WashTime, formattedDateForMySQL], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send('Log added');
  });
});

// New endpoint to fetch sensor status from ESP8266
app.get('/sensor-status', async (req, res) => {
  try {
    const response = await axios.get('http://192.168.1.12/status'); // Replace with your ESP8266 IP address
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error fetching sensor data from ESP8266');
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
