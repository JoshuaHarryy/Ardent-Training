import 'react-native-gesture-handler';
import 'react-native-reanimated';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from './Screens/LoginScreen';
import Signupscreen from './Screens/Signupscreen';
import SplashScreen from './Screens/SplashScreen';
import HomeScreen from './Screens/HomeScreen';
import SettingScreen from './Screens/SettingScreen'; 
import { Provider } from 'react-redux';
import store from './Redux/Store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const HomeDrawer = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} options={{ headerShown: false}} />
      <Drawer.Screen name="Settings" component={SettingScreen} options={{ headerShown: false }} />
    </Drawer.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen
              name="Splash"
              component={SplashScreen}
              options={{ headerShown: false }} 
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }} 
            />
            <Stack.Screen
              name="Signup"
              component={Signupscreen}
              options={{ headerShown: false }}  
            />
            <Stack.Screen
              name="HomeDrawer" 
              component={HomeDrawer}
              options={{ headerShown: false }}  
            />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;
