import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { useState } from 'react';
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../Redux/authSlice';
import { Formik } from 'formik';

export default function Signupscreen({ navigation }) {
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [isloading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const togglePasswordVisibility = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const toggleDrawer = () => {
        setDrawerOpen(!isDrawerOpen);
    };

    const handleRegister = async (values) => {
        const userData = {
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email,
            password: values.password,
            phone_number: values.phone_number,
            timezone: values.timezone || '',
            where_did_you_hear_about_us: values.where_did_you_hear_about_us || '',
        };

        setLoading(true);

        dispatch(registerUser({ userData }))
            .then(response => {
                console.log('Registration response:', response);
                Alert.alert("Registration Successful");
                navigation.navigate('Login');
                setLoading(false);
            })
            .catch(error => {
                console.error('Detailed Registration Error:', error);
                Alert.alert('Registration failed', `Error: ${JSON.stringify(error)}`);
                setLoading(false);

            });
    };

    return (
<Formik
      initialValues={{
        first_name: '',
        last_name: '',
        phone_number: '',
        email: '',
        password: '',
        timezone: 'UTC'
      }}
      validateOnMount={true}
      onSubmit={handleRegister}

    >
      {({ values, errors, touched, handleChange, handleSubmit, handleBlur, isSubmitting }) => (


        <ScrollView style={{ flex: 1, backgroundColor: '#1C3879' }}>
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <MaterialIcons name={"arrow-back-ios"} size={24} color={"white"} style={styles.ArrowIcon} />
                </TouchableOpacity>
                <View style={{ marginHorizontal: 50 }}>
                    <Text style={{ fontSize: 18, fontWeight: '500', color: 'white' }}>Create a new account</Text>
                </View>
            </View>

            <View style={{ marginTop: 30, marginHorizontal: 20 }}>
                <Text style={{ fontSize: 15, color: 'white' }}>First Name</Text>
            </View>

            <View style={styles.MainFirstNameContainer}>
                <View style={styles.FirstNameContainer}>
                    <TextInput style={styles.Textinput} 
                    value={values.first_name}
                    onChangeText={handleChange('first_name')}
                    placeholder='First Name' 
                    placeholderTextColor="white" ></TextInput>
                </View>
            </View>

            {/* Last Name */}
            <View style={{ marginTop: 15, marginHorizontal: 20 }}>
                <Text style={{ fontSize: 15, color: 'white' }}>Last Name</Text>
            </View>

            <View style={styles.MainFirstNameContainer}>
                <View style={styles.FirstNameContainer}>
                    <TextInput style={styles.Textinput} value={values.last_name}
                        onChangeText={handleChange('last_name')}
                        placeholder='Last Name' placeholderTextColor="white" ></TextInput>
                </View>
            </View>

            {/* Phone Number */}
            <View style={{ marginTop: 15, marginHorizontal: 20 }}>
                <Text style={{ fontSize: 15, color: 'white' }}>Phone Number</Text>
            </View>

            <View style={styles.MainFirstNameContainer}>
                <View style={styles.FirstNameContainer}>
                    <TextInput style={styles.Textinput} value={values.phone_number}
                        onChangeText={handleChange('phone_number')}
                        placeholder='Phone Number' placeholderTextColor="white" ></TextInput>
                </View>
            </View>
            {/* Email */}
            <View style={{ marginTop: 15, marginHorizontal: 20 }}>
                <Text style={{ fontSize: 15, color: 'white' }}>Email</Text>
            </View>

            <View style={styles.MainFirstNameContainer}>
                <View style={styles.FirstNameContainer}>
                    <TextInput style={styles.Textinput} value={values.email}
                        onChangeText={handleChange('email')}
                        placeholder='Email' placeholderTextColor="white" ></TextInput>
                </View>
            </View>

            {/* Password */}

            <View style={{ marginTop: 15, marginHorizontal: 20 }}>
                <Text style={{ fontSize: 15, color: 'white' }}>Password</Text>
            </View>

            <View style={styles.MainFirstNameContainer}>
                <View style={styles.FirstNameContainer}>
                    <TextInput style={styles.Textinput} value={values.password}
                        onChangeText={handleChange('password')}
                        placeholder='Password' placeholderTextColor="white" secureTextEntry={secureTextEntry}>
                    </TextInput>
                    <TouchableOpacity onPress={togglePasswordVisibility}>
                        <Feather
                            name={secureTextEntry ? 'eye-off' : 'eye'}
                            size={20}
                            color="gray"
                            style={styles.inputIcon2}
                        />
                    </TouchableOpacity>
                </View>
            </View>


            {/* Confirm Password */}

            <View style={{ marginTop: 15, marginHorizontal: 20 }}>
                <Text style={{ fontSize: 15, color: 'white' }}> ConfirmPassword</Text>
            </View>

            <View style={styles.MainFirstNameContainer}>
                <View style={styles.FirstNameContainer}>
                    <TextInput style={styles.Textinput} placeholder='Confirm Password' placeholderTextColor="white" secureTextEntry={secureTextEntry}>
                    </TextInput>
                    <TouchableOpacity onPress={togglePasswordVisibility}>
                        <Feather
                            name={secureTextEntry ? 'eye-off' : 'eye'}
                            size={20}
                            color="gray"
                            style={styles.inputIcon2}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            {/* Where did you hear about us*/}

            <View style={{ marginTop: 15, marginHorizontal: 20 }}>
                <Text style={{ fontSize: 15, color: 'white' }}> Where did you hear about us?</Text>
            </View>

            <View style={styles.MainFirstNameContainer}>
                <View style={styles.FirstNameContainer}>
                    <Text style={{ color: 'white', marginTop: 10, marginHorizontal: 10 }}> Select an option</Text>
                    <TouchableOpacity onPress={toggleDrawer}>
                        <MaterialIcons name={isDrawerOpen ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={20} style={styles.inputIcon2} />
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity onPress={() => handleRegister(values)}>
                <View style={{ alignItems: 'center', marginTop: 20 }}>
                    <View style={{ width: '90%', height: 45, borderWidth: 2, borderColor: 'orange', borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontWeight: '500', fontSize: 17 }}>Sign In</Text>
                    </View>
                </View>
            </TouchableOpacity>

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
            <View style={{
                alignItems: 'center', marginTop: 20, marginBottom: 40
            }}>
                <Text style={{ fontSize: 15, textDecorationLine: 'underline', color: 'white', }}> I already have an account</Text>
            </View>
        </ScrollView>
         )}
    </Formik>
    )
}

const styles = StyleSheet.create({
    ArrowIcon: { marginHorizontal: 20 },
    MainFirstNameContainer: { alignItems: 'center', marginTop: 5, },
    FirstNameContainer: {
        width: '90%',
        height: 40,
        backgroundColor: '#666CAD',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    Textinput: {
        flex: 1,
        fontSize: 13,
        color: 'white',
        marginHorizontal: 10
    },
    inputIcon2: {
        color: "white",
        marginRight: 20,
        marginTop: 10
    },
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
        marginTop: 1,
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

})