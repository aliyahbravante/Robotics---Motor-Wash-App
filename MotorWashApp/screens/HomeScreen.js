import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topContent}>
        <Text style={styles.title}>Motor Wash</Text>
        <Image 
          source={require('../assets/getstarted.jpeg')} 
          style={styles.image} 
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('CustomerDashboard')}
        >
          <Text style={styles.buttonText}>Customer</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('AdminLogin')}  // Correctly navigate to AdminLogin
        >
          <Text style={styles.buttonText}>Admin</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between', // Space between content and buttons
    alignItems: 'center',
    padding: 20,
  },
  topContent: {
    flex: 1, // Take available space above the buttons
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 45,
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    color: '#4169e1',
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginTop: 50,
    marginBottom: 40,
  },
  buttonContainer: {
    marginBottom: 20, // Space from the bottom
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#4169e1',
    paddingVertical: 15,
    width: 200,  // Set a fixed width for both buttons
    borderRadius: 20,
    marginBottom: 20, // Reduced margin for clarity
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
