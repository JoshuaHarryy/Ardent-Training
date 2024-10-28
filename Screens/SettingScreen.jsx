import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { checkToken, logoutUser } from '../Redux/authSlice';

export default function SettingScreen({navigation}) {

  const dispatch = useDispatch();


  const handleLogout = async () => {
    await AsyncStorage.removeItem('token'); 
    dispatch(logoutUser()); 
    dispatch(checkToken())
  };

  return (
    <View>
       <TouchableOpacity style={styles.button}  onPress={() => navigation.navigate('Profile')}>
        <Text style={styles.buttonText}>Profile</Text>
      </TouchableOpacity>


       <TouchableOpacity style={styles.button2}  onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>

       <TouchableOpacity style={styles.button2}  onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#007BFF', 
        padding: 10,             
        borderRadius: 5,         
      },

    button2: {
        backgroundColor: 'orange', 
        padding: 10,             
        borderRadius: 5,         
      },
      buttonText: {
        color: '#FFFFFF',        
        fontSize: 16,            
        fontWeight: 'bold',     
      },
})