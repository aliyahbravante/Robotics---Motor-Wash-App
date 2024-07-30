import React from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { View, Text, StyleSheet } from 'react-native';

const CustomDrawer = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Community Development</Text>
        <Text style={styles.headerText}>and Services Management</Text>
      </View>
      <DrawerItem
        label="Dashboard"
        onPress={() => props.navigation.navigate('Dashboard')}
      />
      <DrawerItem
        label="Sale & Inventory"
        onPress={() => props.navigation.navigate('SaleInventory')}
      />
      <DrawerItem
        label="User Logs"
        onPress={() => props.navigation.navigate('UserLogs')}
      />
      <DrawerItem
        label="Logout"
        onPress={() => {
          // Implement your logout functionality here
          props.navigation.navigate('Login');
        }}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: '#710808',
  },
  headerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomDrawer;
