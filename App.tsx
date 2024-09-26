import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './Screens/LoginScreen';  // Make sure to adjust the path to your actual LoginScreen
import Signupscreen from './Screens/Signupscreen';
import SplashScreen from './Screens/SplashScreen';

import { Provider } from 'react-redux';
import store from './Redux/Store';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
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
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
};

export default App;
