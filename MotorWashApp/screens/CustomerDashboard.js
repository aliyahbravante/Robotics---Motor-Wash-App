import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, Alert } from 'react-native';

const CustomerDashboard = ({ navigation }) => {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const response = await fetch('http://192.168.1.2/');
        if (response.ok) {
          const result = await response.json();
          if (result.status === 'connected') {
            setConnected(true);
            Alert.alert('Connection Status', 'ESP8266 is connected.');
          } else {
            setConnected(false);
            Alert.alert('Connection Status', 'ESP8266 is not connected.');
          }
        } else {
          setConnected(false);
          Alert.alert('Connection Status', 'ESP8266 is not connected.');
        }
      } catch (error) {
        setConnected(false);
        Alert.alert('Connection Status', 'ESP8266 is not connected.');
      }
    };

    checkConnection();
  }, []);

  const handleBasicWash = async () => {
    if (!connected) {
      Alert.alert('Error', 'ESP8266 is not connected.');
      return;
    }

    try {
      const response = await fetch('http://192.168.1.2/startWash', {
        method: 'POST',
      });
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          Alert.alert('Success', 'Basic wash started!');
        } else {
          Alert.alert('Error', 'Failed to start basic wash.');
        }
      } else {
        Alert.alert('Error', 'Failed to start basic wash.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while starting the wash.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Motor Wash</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Choose Wash Type Service</Text>
        <View style={styles.serviceContainer}>
          <Image source={require('../assets/basicwash.jpeg')} style={styles.image} />
          <TouchableOpacity onPress={handleBasicWash} style={styles.button}>
            <Text style={styles.buttonText}>Basic Wash</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.serviceContainer}>
          <Image source={require('../assets/averagewash.jpeg')} style={styles.image} />
          <TouchableOpacity onPress={() => navigation.navigate('AWInsertCoin')} style={styles.button}>
            <Text style={styles.buttonText}>Average Wash</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.serviceContainer}>
          <Image source={require('../assets/fullwash.jpeg')} style={styles.image} />
          <TouchableOpacity onPress={() => navigation.navigate('FWInsertCoin')} style={styles.button}>
            <Text style={styles.buttonText}>Full Wash</Text>
          </TouchableOpacity>
        </View>
        {connected ? (
          <Text style={styles.connectedText}>ESP8266 is connected</Text>
        ) : (
          <Text style={styles.disconnectedText}>ESP8266 is not connected</Text>
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
    padding: 1,
  },
  header: {
    backgroundColor: '#4169e1',
    width: '100%',
    padding: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
    flex: 1,
    textAlign: 'center',
    marginTop: 20,
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4169e1',
    marginBottom: 7,
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
  },
  serviceContainer: {
    alignItems: 'center',
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#4169e1',
    paddingVertical: 10,
    width: width * 0.5,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 30,
  },
  connectedText: {
    color: 'green',
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
  disconnectedText: {
    color: 'red',
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomerDashboard;
