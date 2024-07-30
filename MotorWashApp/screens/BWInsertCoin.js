import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, BackHandler, Modal } from 'react-native';
import axios from 'axios';

const BWInsertCoin = ({ navigation }) => {
  const [timeLeft, setTimeLeft] = useState(120);
  const [isRunning, setIsRunning] = useState(true);
  const [showDoneButton, setShowDoneButton] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            setShowDoneButton(true);
            turnOffRelays();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  useEffect(() => {
    const backAction = () => {
      if (isRunning) {
        setModalVisible(true);
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

    return () => backHandler.remove();
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
        WashType: 'Basic Wash',
        Amount: 5,
        WashTime: '2 minutes',
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

  const turnOffRelays = async () => {
    try {
      await axios.post('http://192.168.1.2/turnOffRelays'); // Adjust the IP address accordingly
    } catch (error) {
      console.error('Failed to turn off relays:', error);
    }
  };

  const handleConfirmCancel = () => {
    setModalVisible(false);
    navigation.goBack();
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.backButton}>
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

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Are you sure you want to cancel the motor wash?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButtonNo} onPress={handleCancel}>
                <Text style={styles.modalButtonTextNo}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButtonYes} onPress={handleConfirmCancel}>
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
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 30,
  },
  instruction: {
    fontSize: 16,
    color: '#4169e1',
    marginBottom: 10,
  },
  timer: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#4169e1',
  },
  doneButton: {
    marginTop: 20,
    backgroundColor: '#4169e1',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4169e1',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButtonNo: {
    backgroundColor: '#4169e1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  modalButtonYes: {
    backgroundColor: '#ff0000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  modalButtonTextNo: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalButtonTextYes: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BWInsertCoin;
