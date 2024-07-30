import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Modal, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AWInsertCoin = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [coinInserted, setCoinInserted] = useState(false);

  const handleInsertCoin = () => {
    setCoinInserted(true);
  };

  const handleProceed = () => {
    setIsModalVisible(false);
    navigation.navigate('AverageWash');
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Average Wash</Text>
      </View>
      
      <View style={styles.imageContainer}>
        <Image source={require('../assets/insertcoinicon.jpeg')} style={styles.image} />
      </View>
      
      <View style={styles.contentContainer}>
        <View style={styles.content}>
          <Text style={styles.instruction}>Click the button and insert 20 pesos coin</Text>
          <TouchableOpacity onPress={() => setIsModalVisible(true)} style={styles.button}>
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
            <Text style={styles.modalText}>Insert 20 pesos coin to proceed with average wash</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={handleCloseModal}
                style={styles.modalButtonNo}
              >
                <Text style={styles.modalButtonTextNo}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleProceed}
                style={[styles.modalButtonYes, !coinInserted && styles.disabledButton]}
                disabled={!coinInserted}
              >
                <Text style={styles.modalButtonTextYes}>Yes</Text>
              </TouchableOpacity>
            </View>
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
    padding: 20,
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
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 30,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  modalButtons: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between', // Distribute space between buttons
  },
  modalButtonNo: {
    padding: 10,
    marginLeft: 50,
    backgroundColor: 'gray', // Gray color for "No" button
    borderRadius: 5,
    paddingHorizontal: 20,
  },
  modalButtonYes: {
    padding: 10,
    marginRight:50,
    backgroundColor: '#4169e1',
    borderRadius: 5,
    paddingHorizontal: 20,
  },
  modalButtonTextNo: {
    color: '#fff',
    fontSize: 16,
  },
  modalButtonTextYes: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AWInsertCoin;
