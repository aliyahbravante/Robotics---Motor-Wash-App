import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, TextInput, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { DataTable } from 'react-native-paper';

const SaleInventory = ({ navigation }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const navigateTo = (screen) => {
    setShowMenu(false);
    navigation.navigate(screen);
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const response = await fetch('http://192.168.1.8:3001/logs');
      const data = await response.json();
      setLogs(data);
      calculateTotalAmount(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching logs:', error);
      setLoading(false);
    }
  };

  const calculateTotalAmount = (logs) => {
    const total = logs.reduce((sum, log) => sum + parseFloat(log.Amount), 0);
    setTotalAmount(total);
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
      <TouchableOpacity onPress={() =>  navigateTo('AdminLogin')}>
        <Text style={styles.menuItem}>Logout</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Navigation Bar */}
      <View style={styles.navigationBar}>
        <TouchableOpacity onPress={toggleMenu}>
          <MaterialIcons name="menu" size={24} color="#fff" style={styles.menuButton} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Sale & Inventory</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Overall Sales Section */}
        <View style={styles.overallSalesContainer}>
          <Text style={styles.overallSalesText}>Overall Sales</Text>
          <Text style={styles.overallSalesAmount}>₱ {totalAmount.toFixed(2)}</Text>
        </View>

        {/* Search and Refresh Section */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
          />
          <TouchableOpacity style={styles.refreshButton} onPress={fetchLogs}>
            <Text style={styles.refreshButtonText}>Refresh</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#4A90E2" />
        ) : (
          <View style={styles.tableContainer}>
            <ScrollView horizontal>
              <DataTable>
                <DataTable.Header style={styles.tableHeader}>
                  <DataTable.Title style={[styles.columnHeader, { width: 100 }]}>ID</DataTable.Title>
                  <DataTable.Title style={[styles.columnHeader, { width: 150 }]}>Wash Type</DataTable.Title>
                  <DataTable.Title style={[styles.columnHeader, { width: 100 }]}>Amount</DataTable.Title>
                  <DataTable.Title style={[styles.columnHeader, { width: 150 }]}>Wash Time</DataTable.Title>
                  <DataTable.Title style={[styles.columnHeader, { width: 150 }]}>Date</DataTable.Title>
                </DataTable.Header>

                {logs.map((log, index) => (
                  <DataTable.Row key={index} style={styles.row}>
                    <DataTable.Cell style={[styles.columnRow, { width: 100 }]}>{log.SaleID}</DataTable.Cell>
                    <DataTable.Cell style={[styles.columnRow, { width: 150 }]}>{log.WashType}</DataTable.Cell>
                    <DataTable.Cell style={[styles.columnRow, { width: 100 }]}>{log.Amount}</DataTable.Cell>
                    <DataTable.Cell style={[styles.columnRow, { width: 150 }]}>{log.WashTime}</DataTable.Cell>
                    <DataTable.Cell style={[styles.columnRow, { width: 150 }]}>{log.Date}</DataTable.Cell>
                  </DataTable.Row>
                ))}
              </DataTable>
            </ScrollView>
          </View>
        )}
      </ScrollView>

      {/* Sidebar */}
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
    right: 10
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 15
  },
  overallSalesContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  overallSalesText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 10
  },
  overallSalesAmount: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  refreshButton: {
    marginLeft: 10,
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  refreshButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  tableContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  tableHeader: {
    backgroundColor: '#f5f5f5',
  },
  columnHeader: {
    justifyContent: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  columnRow: {
    justifyContent: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    textAlign: 'center',
  },
  row: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  menu: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 0.5 * Dimensions.get('window').width, // 50% of screen width
    height: '100%',
    backgroundColor: '#4A90E2',
    paddingTop: 100,
    paddingLeft: 20,
    zIndex: 1, // Ensures the menu appears on top
  },
  closeButton: {
    position: 'absolute',
    top: 30,
    right: 10,
  },
  menuItem: {
    paddingVertical: 10,
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  activeMenuItem: {
    marginBottom: 10,
  }
});

export default SaleInventory;