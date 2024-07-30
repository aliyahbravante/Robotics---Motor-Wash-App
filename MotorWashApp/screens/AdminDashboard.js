import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const AdminDashboard = ({ navigation }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [logs, setLogs] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [washCounts, setWashCounts] = useState({ basic: 0, average: 0, full: 0 });
  const [totalCustomer, setTotalCustomer] = useState(0);
  const [statusLevels, setStatusLevels] = useState({ water: 'UNKNOWN', soap: 'UNKNOWN' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
    fetchStatusLevels();
    const interval = setInterval(fetchStatusLevels, 10000);

    return () => clearInterval(interval);
  }, []);

  const fetchLogs = async () => {
    try {
      const response = await fetch('http://192.168.1.6:3001/logs');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setLogs(data);
      calculateTotals(data);
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  const fetchStatusLevels = async () => {
    try {
      const response = await fetch('http://192.168.1.6:3001/sensor-status'); // Update to your server IP
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      if (data && data.water !== undefined && data.soap !== undefined) {
        setStatusLevels({ water: data.water, soap: data.soap });
      } else {
        console.error('Unexpected data structure:', data);
        setStatusLevels({ water: 'ERROR', soap: 'ERROR' });
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching status levels:', error);
      setStatusLevels({ water: 'ERROR', soap: 'ERROR' });
      setLoading(false);
    }
  };

  const calculateTotals = (logs) => {
    let total = 0;
    let basicCount = 0;
    let averageCount = 0;
    let fullCount = 0;

    logs.forEach(log => {
      if (log.Amount) {
        total += parseFloat(log.Amount);
      }
      if (log.WashType === 'Basic Wash') basicCount++;
      if (log.WashType === 'Average Wash') averageCount++;
      if (log.WashType === 'Full Wash') fullCount++;
    });

    setTotalAmount(total);
    setWashCounts({ basic: basicCount, average: averageCount, full: fullCount });
    setTotalCustomer(basicCount + averageCount + fullCount);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const navigateTo = (screen) => {
    setShowMenu(false);
    navigation.navigate(screen);
  };

  const Menu = () => (
    <View style={styles.menu}>
      <TouchableOpacity onPress={toggleMenu} style={styles.closeButton}>
        <MaterialIcons name="close" size={24} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateTo('AdminDashboard')}>
        <Text style={[styles.menuItem, styles.activeMenuItem]}>Dashboard</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateTo('SaleInventory')}>
        <Text style={styles.menuItem}>Sale & Inventory</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateTo('UserLogsScreen')}>
        <Text style={styles.menuItem}>User Logs</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateTo('AdminLogin')}>
        <Text style={styles.menuItem}>Logout</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.navigationBar}>
        <TouchableOpacity onPress={toggleMenu}>
          <MaterialIcons name="menu" size={24} color="#fff" style={styles.menuButton} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Dashboard</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Total Sales</Text>
          <View style={styles.setTotalAmountContainer}>
            <Text style={styles.setTotalAmount}>₱ {totalAmount}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Total Motor Wash</Text>
          <View style={styles.setTotalCustomerContainer}>
            <Text style={styles.setTotalCustomer}>{totalCustomer}</Text>
          </View>
          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendIcon, { backgroundColor: '#00b0ff' }]} />
              <Text style={styles.legendText}>Basic Wash</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendIcon, { backgroundColor: '#304ffe' }]} />
              <Text style={styles.legendText}>Average Wash</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendIcon, { backgroundColor: '#1a237e' }]} />
              <Text style={styles.legendText}>Full Wash</Text>
            </View>
          </View>
          <View style={styles.washContainer}>
            <View style={[styles.washItem, styles.washItemBorder]}>
              <MaterialIcons name="wash" size={24} color="#00b0ff" />
              <Text style={[styles.washLabel, { color: '#00b0ff' }]}>Basic Wash</Text>
              <Text style={[styles.washValue, { color: '#00b0ff' }]}>{washCounts.basic}</Text>
            </View>
            <View style={[styles.washItem, styles.washItemBorder]}>
              <MaterialIcons name="wash" size={24} color="#304ffe" />
              <Text style={[styles.washLabel, { color: '#304ffe' }]}>Average Wash</Text>
              <Text style={[styles.washValue, { color: '#304ffe' }]}>{washCounts.average}</Text>
            </View>
            <View style={styles.washItem}>
              <MaterialIcons name="wash" size={24} color="#1a237e" />
              <Text style={[styles.washLabel, { color: '#1a237e' }]}>Full Wash</Text>
              <Text style={[styles.washValue, { color: '#1a237e' }]}>{washCounts.full}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sensor Status</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#00b0ff" />
          ) : (
            <View style={styles.statusContainer}>
              <View style={styles.statusItem}>
                <Text style={styles.statusLabel}>Water Level:</Text>
                <Text style={styles.statusValue}>{statusLevels.water}</Text>
              </View>
              <View style={styles.statusItem}>
                <Text style={styles.statusLabel}>Soap Level:</Text>
                <Text style={styles.statusValue}>{statusLevels.soap}</Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
      {showMenu && <Menu />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  navigationBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4A90E2',
    paddingVertical: 20,
    paddingHorizontal: 15,
    elevation: 2,
    width: '100%',
  },
  menuButton: {
    marginRight: 10,
    top: 10
  },
  headerText: {
    flex: 1,
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    right: 12
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
  },
  section: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  setTotalAmountContainer: {
    backgroundColor: '#ffff',
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  setTotalAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
  },
  setTotalCustomerContainer: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  setTotalCustomer: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendIcon: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    marginRight: 5,
  },
  legendText: {
    fontSize: 14,
    color: '#333',
  },
  washContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  washItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 15,
  },
  washItemBorder: {
    borderRightWidth: 1,
    borderRightColor: '#ddd',
  },
  washLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  washValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statusSection: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    elevation: 2,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusValueContainer: {
    backgroundColor: '#eee',
    borderRadius: 5,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  menu: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingTop: 50,
    paddingHorizontal: 20,
    zIndex: 10,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  menuItem: {
    fontSize: 18,
    color: '#fff',
    marginVertical: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  activeMenuItem: {
    fontWeight: 'bold',
  },
});

export default AdminDashboard;
