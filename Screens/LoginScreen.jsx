import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react';
import CheckBox from '@react-native-community/checkbox';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { checkToken, loginUser } from '../Redux/authSlice';

export default function LoginScreen({ navigation }) {

  const [isChecked1, setChecked1] = useState(false);
  const [isChecked2, setChecked2] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.auth);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }
    dispatch(loginUser({ email, password }))
      .then(() => {
        console.log("success")
        // If login is successful, set the success message
        setSuccessMessage('Login successful!');
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      })
      .catch((error) => {
        // Handle error if needed
        console.error(error);
      });
    };
  

  const togglePasswordVisibility = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <View style={styles.Background}>

{successMessage ? (
        <View style={styles.successMessage}>
          <Text style={styles.successText}>{successMessage}</Text>
        </View>
      ) : null}

      <View style={styles.Txtcover}>
        <Text style={styles.WelcomeTxt}>Welcome Back!</Text>
      </View>

      <View>
        <Text style={styles.EmailTxt}>Email</Text>
      </View>

      <View style={styles.MainEmailContainer}>
        <View style={styles.EmailContainer}>
          <TextInput  style={styles.Textinput}  value={email}
              onChangeText={setEmail}
              placeholder='Email' placeholderTextColor="white" ></TextInput>
        </View>
      </View>
      <View>
        <Text style={styles.PasswordTxt}>Password</Text>
      </View>

      <View style={styles.MainEmailContainer}>
        <View style={styles.EmailContainer}>
          <TextInput  style={styles.Textinput} value={password}
              onChangeText={setPassword}
               placeholder='Password'  placeholderTextColor="white"  secureTextEntry={secureTextEntry}>
          </TextInput>
          <TouchableOpacity onPress={togglePasswordVisibility}>
              <Feather
                name={secureTextEntry ? 'eye-off' : 'eye'}
                size={24}
                color="gray"
                style={styles.inputIcon2}
              />
            </TouchableOpacity>
        </View>
      </View>



      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30 }}>
        <CheckBox
          style={{ marginHorizontal: 15 }}
          value={isChecked1}
          onValueChange={setChecked1}
          tintColors={{ true: '#007AFF', false: '#8e8e93' }}
        />
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Remember me</Text>

        <Text style={{ marginHorizontal: 120, color: 'white', textDecorationLine: 'underline' }}>Forgot Password?</Text>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <CheckBox
          style={{ marginHorizontal: 15 }}
          value={isChecked2}
          onValueChange={setChecked2}
          tintColors={{ true: '#007AFF', false: '#8e8e93' }}
        />
        <Text style={{ color: 'white', marginTop: 6, fontWeight: 'bold' }}>Agree Term and condition</Text>
      </View>

      {loading ? (
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <ActivityIndicator size="large" color="orange" />
        </View>
      ) : (
        <TouchableOpacity onPress={handleLogin} disabled={loading}>
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <View
              style={{
                width: '90%',
                height: 45,
                borderWidth: 2,
                borderColor: 'orange',
                borderRadius: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ color: 'white', fontWeight: '500', fontSize: 17 }}>Sign In</Text>
            </View>
          </View>
        </TouchableOpacity>
      )}

      <View style={styles.container}>
        <View style={styles.line} />
        <Text style={styles.text}>or sign in with</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <Image
            source={require('../Assets/Google2.webp')}
            style={styles.logo}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Image
            source={require('../Assets/apple3.png')}
            style={styles.logo}
          />
        </TouchableOpacity>
      </View>

<TouchableOpacity onPress={() => navigation.navigate('Signup')}>
      <View style={{ alignItems: 'center', marginTop: 30 }}>
        <Text style={{ fontSize: 15, color: 'white', textDecorationLine: 'underline' }}>Create a new account</Text>
      </View>
      </TouchableOpacity>

<TouchableOpacity onPress={() => navigation.navigate('HomeDrawer2')}>
      <View style={{alignItems: 'center', marginTop: 20}}>
        <View style={{ width: '35%', height: 45, backgroundColor: '#666CAD', borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 15, color: "white", fontWeight: '500' }}> Guest User</Text>
        </View>
      </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  Background: {
    flex: 1,
    backgroundColor: '#1C3879',
  },
  Txtcover: {
    alignItems: 'center',
    marginTop: 20,
  },
  WelcomeTxt: {
    fontSize: 20,
    fontWeight: '500',
    color: 'white'
  },
  EmailTxt: { fontSize: 16, color: 'white', marginHorizontal: 20, marginTop: 80 },

  MainEmailContainer: { alignItems: 'center', marginTop: 10, },

  EmailContainer: {
    width: '90%',
    height: 45,
    backgroundColor: '#666CAD',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  PasswordTxt: { fontSize: 16, color: 'white', marginHorizontal: 20, marginTop: 15 },
  CheckBoxContainer: {},
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  line: {
    width: '20%',
    height: 1,
    backgroundColor: 'grey',
    marginHorizontal: 10,
  },
  text: {
    fontSize: 18,
    color: 'grey',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  iconButton: {
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 10,
    marginHorizontal: 5,
  },
  logo: {
    width: 30,
    height: 30,
  },
  inputIcon2:{ color: "white",
    marginRight: 20,
  marginTop: 10},
  Textinput: {
    flex: 1,
    fontSize: 16,
    color: 'white',
    marginHorizontal: 10
  },
   successMessage: {
    backgroundColor: 'green',
    padding: 10,
    alignItems: 'center',
    position: 'absolute', // Position at the top
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1, // Make sure it's above other components
  },
  successText: {
    color: 'white',
    fontWeight: 'bold',
  },
})