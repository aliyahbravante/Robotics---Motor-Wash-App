import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const AdminLogin = ({ navigation }) => {
  // Set default username and password
  const [username, setUsername] = useState('user');
  const [password, setPassword] = useState('pass');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Clear username and password when the screen is focused
      setUsername('user');
      setPassword('pass');
    });
    return unsubscribe;
  }, [navigation]);

  const handleLogin = () => {
    // Check for default username and password
    if (username === 'user' && password === 'pass') {
      Alert.alert('Login Successful');
      navigation.navigate('AdminDashboard');
    } else {
      Alert.alert('Login Failed', 'Invalid credentials');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>
      <Text style={styles.subtitle}>Welcome Back Admin!</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Log In" onPress={handleLogin} color="#4A90E2" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#4A90E2'
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 32,
    color: '#4A90E2'
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 20
  }
});

export default AdminLogin;
