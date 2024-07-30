import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import CustomerDashboard from './screens/CustomerDashboard';
import BasicWashScreen from './screens/BasicWashScreen';
import AverageWashScreen from './screens/AverageWashScreen';
import FullWashScreen from './screens/FullWashScreen';
import AdminLogin from './screens/AdminLogin'; 
import AdminDashboard from './screens/AdminDashboard';
import BWInsertCoin from './screens/BWInsertCoin';
import AWInsertCoin from './screens/AWInsertCoin';
import FWInsertCoin from './screens/FWInsertCoin';
import SalesInventory from './screens/SaleInventory';
import UserLogsScreen from './screens/UserLogsScreen';


import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

const Stack = createStackNavigator();

const loadFonts = () => {
  return Font.loadAsync({
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
  });
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = React.useState(false);

  React.useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="CustomerDashboard" component={CustomerDashboard} options={{ headerShown: false }} />
          <Stack.Screen name="BasicWash" component={BasicWashScreen} options={{ headerShown: false }} />
          <Stack.Screen name="AverageWash" component={AverageWashScreen} options={{ headerShown: false }} />
          <Stack.Screen name="BWInsertCoin" component={BWInsertCoin} options={{ headerShown: false }} />
          <Stack.Screen name="AWInsertCoin" component={AWInsertCoin} options={{ headerShown: false }} />
          <Stack.Screen name="FWInsertCoin" component={FWInsertCoin} options={{ headerShown: false }} />
          <Stack.Screen name="FullWash" component={FullWashScreen} options={{ headerShown: false }} />
          <Stack.Screen name="AdminLogin" component={AdminLogin} options={{ headerShown: false }} />
          <Stack.Screen name="AdminDashboard" component={AdminDashboard} options={{ headerShown: false }} />
          <Stack.Screen name="SaleInventory" component={SalesInventory} options={{ headerShown: false }} />
          <Stack.Screen name="UserLogsScreen" component={UserLogsScreen} options={{ headerShown: false }} />
     
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
