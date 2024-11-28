import 'react-native-gesture-handler';
import 'react-native-reanimated';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider, useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Added for token management
import store from './Redux/Store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { checkToken } from './Redux/authSlice'; // Import the checkToken action

import LoginScreen from './Screens/LoginScreen';
import Signupscreen from './Screens/Signupscreen';
import SplashScreen from './Screens/SplashScreen';
import HomeScreen from './Screens/HomeScreen';
import SettingScreen from './Screens/SettingScreen';
import BlogsScreen from './Screens/BlogsScreen';
import FreeTrialScreen from './Screens/FreeTrialScreen';
import CoursesScreen from './Screens/CoursesScreen';
import ResourcesScreen from './Screens/ResourcesScreen';
import FQScreen from './Screens/FQScreen';
import AboutUsScreen from './Screens/AboutUsScreen';
import FeedbackScreen from './Screens/FeedbackScreen';
import ProfileScreen from './Screens/ProfileScreen';
import CustomDrawerContent from './CustomDrawerContent';
import AddressScreen from './Screens/AddressScreen';
import InvoicesScreen from './Screens/InvoicesScreen';
import ForumScreen from './Screens/ForumScreen';
import MyprofileScreen from './Screens/MyprofileScreen';
import RyaDaySkipperScreen from './Courses/RyaDaySkipperScreen';
import RyaCoastalSkipperScreen from './Courses/RyaCoastalSkipperScreen';
import RyaFastTrackScreen from './Courses/RyaFastTrackScreen';
import RyapprCourseScreen from './Courses/RyapprCourseScreen';
import RyaMarineSrcScreen from './Courses/RyaMarineSrcScreen';
import RyaYachtmasterScreen from './Courses/RyaYachtmasterScreen';
import PracticalCourseScreen from './Courses/PracticalCourseScreen';
import RyaSkipperPlayerScreen from './CoursePlayer/RyaSkipperPlayerScreen';


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// AppStack for the screens after user logs in
const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeDrawer"
        component={HomeDrawer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Address"
        component={AddressScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MyProfile"
        component={MyprofileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RyaDaySkipper"
        component={RyaDaySkipperScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RyaCoastalSkipper"
        component={RyaCoastalSkipperScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RyaFastTrack"
        component={RyaFastTrackScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Rya PPR Course"
        component={RyapprCourseScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Rya Marine Radio SRC Course"
        component={RyaMarineSrcScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Practical Course"
        component={PracticalCourseScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Rya Yachtmaster Ocean Theory Course"
        component={RyaYachtmasterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RyaDaySkipperCoursePlayer"
        component={RyaSkipperPlayerScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

// AuthStack for the authentication flow
const AuthStack = () => {
  return (
    <Stack.Navigator >
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
        name="HomeDrawer2"
        component={HomeDrawer2}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};




// Drawer navigation for Home
const HomeDrawer = () => {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="My Profile" component={MyprofileScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="Invoices" component={InvoicesScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="Free Trial" component={FreeTrialScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="Courses" component={CoursesScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="Forum" component={ForumScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="BLOG" component={BlogsScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="Resources" component={ResourcesScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="FAQs" component={FQScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="Settings" component={SettingScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="AboutUs" component={AboutUsScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="Feedback" component={FeedbackScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="Logout" component={LoginScreen} options={{ headerShown: false }} />
    </Drawer.Navigator>
  );
};


const HomeDrawer2 = () => {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="Free Trial" component={FreeTrialScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="Courses" component={CoursesScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="BLOG" component={BlogsScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="Resources" component={ResourcesScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="FAQs" component={FQScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="AboutUs" component={AboutUsScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="Feedback" component={FeedbackScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
    </Drawer.Navigator>
  );
};

const MainApp = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  
  useEffect(() => {
    
    dispatch(checkToken());
  }, [dispatch]);

 
useEffect(() => {
  console.log('Token in Redux state after checkToken:', token);  // This should show the token or null/undefined
}, [token]);

  return (
    <NavigationContainer>
      {token ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

const App = () => (
  
  <Provider store={store}>
    <GestureHandlerRootView style={{ flex: 1 }}>
    <MainApp />
    </GestureHandlerRootView>
  </Provider>
);


export default App;
