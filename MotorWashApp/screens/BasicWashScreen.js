import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Modal, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const BasicWashScreen = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [coinInserted, setCoinInserted] = useState(false);
  const [showInsertCoinMessage, setShowInsertCoinMessage] = useState(false);

  useEffect(() => {
    const fetchTotalAmount = async () => {
      try {
        const response = await fetch('http://192.168.1.22/');
        if (response.ok) {
          const data = await response.json();
          setTotalAmount(data.totalAmount);
          setCoinInserted(data.totalAmount > 0); // Assume coin inserted if totalAmount > 0
          setIsConnected(true);
          setShowInsertCoinMessage(true); // Show insert coin message when connected
        } else {
          setIsConnected(false);
          setShowInsertCoinMessage(false); // Hide insert coin message if not connected
        }
      } catch (error) {
        console.error("Connection error:", error);
        setIsConnected(false);
        setShowInsertCoinMessage(false); // Hide insert coin message on error
      }
    };

    const interval = setInterval(fetchTotalAmount, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleInsertCoin = async () => {
    try {
      const response = await fetch('http://192.168.1.22/coinInserted', { method: 'POST' });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Failed to insert coin:", error);
    }
  };

  const handleProceed = () => {
    setIsModalVisible(false);
    navigation.navigate('BWInsertCoin');
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const requiredAmount = 5;
  const isProceedEnabled = totalAmount >= requiredAmount;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Basic Wash</Text>
      </View>

      <View style={styles.imageContainer}>
        <Image source={require('../assets/insertcoinicon.jpeg')} style={styles.image} />
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.content}>
          <Text style={styles.instruction}>Click the button and insert 5 pesos coin</Text>
          <TouchableOpacity onPress={() => { setIsModalVisible(true); handleInsertCoin(); }} style={styles.button}>
            <Text style={styles.buttonText}>Insert Coin</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <Ionicons name="information-circle-outline" size={80} color="#4169e1" style={styles.infoIcon} />
            <Text style={styles.modalText}>Insert 5 pesos coin to proceed with basic wash</Text>
            {!isConnected && (
              <Text style={styles.modalText}>Connecting to the machine...</Text>
            )}
            {isConnected && (
              <Text style={styles.confirmationText}>Connected to the machine!</Text>
            )}
            {coinInserted && (
              <Text style={styles.confirmationText}>Coin Inserted!</Text>
            )}
            {showInsertCoinMessage && (
              <Text style={styles.confirmationText}>You may now insert your coin</Text>
            )}
            <TouchableOpacity
              onPress={handleProceed}
              style={[styles.modalButton, isProceedEnabled ? styles.enabledButton : styles.disabledButton]}
              disabled={!isProceedEnabled}
            >
              <Text style={styles.buttonText}>Proceed</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  imageContainer: {
    alignItems: 'center',
    marginTop: 120,
  },
  image: {
    width: 140,
    height: 140,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 100,
  },
  content: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  instruction: {
    fontSize: 15,
    color: '#333',
    marginBottom: 140,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: '#4169e1',
    paddingVertical: 10,
    width: width * 0.5,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 80
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: width * 0.9,
    padding: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 20,
    color: '#4169e1',
  },
  infoIcon: {
    position: 'absolute',
    top: 30,
    left: '50%',
    marginLeft: 13,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 80,
  },
  confirmationText: {
    fontSize: 18,
    color: 'green',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  enabledButton: {
    backgroundColor: '#4169e1',
  },
  disabledButton: {
    backgroundColor: 'grey',
  },
});

export default BasicWashScreen;
