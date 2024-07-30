import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import axios from 'axios';

const AverageWashScreen = ({ navigation }) => {
  const [timeLeft, setTimeLeft] = useState(420);
  const [isRunning, setIsRunning] = useState(true);
  const [showDoneButton, setShowDoneButton] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            setShowDoneButton(true);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleDone = async () => {
  try {
    const now = new Date();
    const formattedDate = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;

    const response = await axios.post('http://192.168.1.8:3001/add-log', {
      WashType: 'Average Wash',
      Amount: 20,
      WashTime: '7 minutes',
      Date: formattedDate
    });

    if (response.status === 200) {
      alert('Data added successfully!');
      navigation.goBack();
    }
  } catch (error) {
    console.error(error);
    alert('Failed to add data!');
  }
};

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Basic Wash</Text>
      </View>
      <View style={styles.content}>
        <Image source={require('../assets/basicwash.jpeg')} style={styles.image} />
        <Text style={styles.instruction}>
          The wash process is running. Time remaining:
        </Text>
        <Text style={styles.timer}>{formatTime(timeLeft)}</Text>
        {showDoneButton && (
          <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#4169e1',
    width: '100%',
    padding: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 15,
    left: 20,
  },
  backButtonText: {
    fontSize: 50,
    color: '#fff',
    fontFamily: 'Poppins-Regular',
  },
  headerTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
    flex: 1,
    textAlign: 'center',
    marginTop: 20,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  instruction: {
    fontSize: 13,
    color: '#4169e1',
    textAlign: 'center',
    marginTop: 1,
    marginBottom: 20,
  },
  timer: {
    fontSize: 65,
    color: '#4169e1',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
    fontWeight: 'condensedBold'
  },
  boldText: {
    fontWeight: 'bold',
  },
  doneButton: {
    backgroundColor: '#4169e1',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginTop: 50,
  },
  doneButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AverageWashScreen;
