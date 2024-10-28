import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../Redux/authSlice';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Modal } from 'react-native';


const validationSchema = Yup.object().shape({
    first_name: Yup.string()
        .min(3, 'First Name must be at least 3 characters')
        .max(15, 'First Name cannot be longer than 15 characters')
        .required('First Name is required'),
    last_name: Yup.string()
        .min(3, 'Last Name must be at least 3 characters')
        .max(15, 'Last Name cannot be longer than 15 characters')
        .required('Last Name is required'),
    phone_number: Yup.string()
        .matches(/^[0-9]+$/, "Phone number must be digits only")
        .min(10, 'Phone number must be at least 10 digits')
        .max(10, 'Phone number cannot be longer than 15 digits')
        .required('Phone number is required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    confirm_password: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
});


export default function Signupscreen({ navigation }) {
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const isloading = useSelector(state => state.auth.loading)
    const dispatch = useDispatch();
    const [isModalVisible, setModalVisible] = useState(false);


    const togglePasswordVisibility = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const toggleDrawer = () => {
        setDrawerOpen(!isDrawerOpen);
    };

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const handleOptionSelect = (option) => {
        setSelectedOption(option);  // Update state with the selected option
        toggleModal();              // Close the modal after selection
        // Add any other logic you need here
    };

    const handleRegister = async (values) => {
        const userData = {
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email,
            password: values.password,
            phone_number: values.phone_number,
            timezone: values.timezone || '',
            where_did_you_hear_about_us: selectedOption || '',
            follow_up_detail: values.follow_up_detail || '',
        };



        dispatch(registerUser({ userData }))
            .then(response => {
                console.log('Registration response:', response);
                setSuccessMessage(true);
                setTimeout(() => {
                    setSuccessMessage(false);
                    navigation.navigate('Login');
                }, 2000);

            })
            .catch(error => {
                console.error('Detailed Registration Error:', error);
                Alert.alert('Registration failed', `Error: ${JSON.stringify(error)}`);


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
                confirm_password: '',
                timezone: 'UTC',
                follow_up_detail: '',

            }}
            validateOnMount={true}
            validationSchema={validationSchema}
            onSubmit={handleRegister}

        >
            {({ values, errors, touched, handleChange, handleSubmit, handleBlur, isSubmitting }) => (


                <ScrollView style={{ flex: 1, backgroundColor: '#1C3879' }}>

                    {/* Success message */}
                    {successMessage && (
                        <View style={styles.successBanner}>
                            <Text style={styles.successText}>Successful Registration!</Text>
                        </View>
                    )}

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
                        {touched.first_name && errors.first_name && (
                            <Text style={{ color: 'red', fontSize: 12, marginTop: 5, }}>{errors.first_name}</Text>
                        )}
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
                        {touched.last_name && errors.last_name && (
                            <Text style={{ color: 'red', fontSize: 12, marginTop: 5, }}>{errors.last_name}</Text>
                        )}
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
                        {touched.phone_number && errors.phone_number && (
                            <Text style={{ color: 'red', fontSize: 12, marginTop: 5, }}>{errors.phone_number}</Text>
                        )}
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
                        {touched.email && errors.email && (
                            <Text style={{ color: 'red', fontSize: 12, marginTop: 5, }}>{errors.email}</Text>
                        )}
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
                        {touched.password && errors.password && (
                            <Text style={{ color: 'red', fontSize: 12, marginTop: 5, }}>{errors.password}</Text>
                        )}
                    </View>


                    {/* Confirm Password */}

                    <View style={{ marginTop: 15, marginHorizontal: 20 }}>
                        <Text style={{ fontSize: 15, color: 'white' }}> ConfirmPassword</Text>
                    </View>

                    <View style={styles.MainFirstNameContainer}>
                        <View style={styles.FirstNameContainer}>
                            <TextInput style={styles.Textinput}
                                value={values.confirm_password}
                                onChangeText={handleChange('confirm_password')}
                                placeholder='Confirm Password' placeholderTextColor="white" secureTextEntry={secureTextEntry}>
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
                        {touched.confirm_password && errors.confirm_password && (
                            <Text style={{ color: 'red', fontSize: 12, marginTop: 5 }}>{errors.confirm_password}</Text>
                        )}
                    </View>
                    {/* Where did you hear about us*/}

                    <View style={{ marginTop: 15, marginHorizontal: 20 }}>
                        <Text style={{ fontSize: 15, color: 'white' }}> Where did you hear about us?</Text>
                    </View>

                    <View style={styles.MainFirstNameContainer}>
                        <View style={styles.FirstNameContainer}>
                            <Text style={{ color: 'white', marginTop: 10, marginHorizontal: 10 }}>
                                {selectedOption || 'Select an option'}
                            </Text>
                            <TouchableOpacity onPress={toggleModal}>
                                <MaterialIcons name='keyboard-arrow-down' size={20} style={styles.inputIcon2} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Conditionally render another input based on the selected option */}
                    {(selectedOption === "YouTube" || selectedOption === "RYA Instructor" || selectedOption === "RYA Training Centre" || selectedOption === "Yacht Club" || selectedOption === "Magazine") && (

                        <View style={{ marginTop: 15, marginHorizontal: 20 }}>
                            <Text style={{ fontSize: 15, color: 'white' }}> Which {selectedOption.toLowerCase()}?</Text>

                            
                            <View style={styles.MainFirstNameContainer}>
                                <View style={styles.FirstNameContainer}>
                                    <TextInput
                                        style={styles.Textinput}
                                        value={values.follow_up_detail}
                                        onChangeText={handleChange('follow_up_detail')}
                                        placeholder={`Which ${selectedOption.toLowerCase()}?`}
                                        placeholderTextColor="white"
                                    />
                                </View>
                            </View>
                            </View>
                        
                    )}
                    {(selectedOption === "Other") && (

                        <View style={{ marginTop: 15, marginHorizontal: 20 }}>
                            <Text style={{ fontSize: 15, color: 'white' }}> Which {selectedOption.toLowerCase()}?</Text>

                            
                            <View style={styles.MainFirstNameContainer}>
                                <View style={styles.FirstNameContainer}>
                                    <TextInput
                                        style={styles.Textinput}
                                        value={values.follow_up_detail}
                                        onChangeText={handleChange('follow_up_detail')}
                                        placeholder={`Please specify`}
                                        placeholderTextColor="white"
                                    />
                                </View>
                            </View>
                            </View>
                        
                    )}

                    {/* Modal for selecting an option */}
                    <Modal
                        transparent={true}
                        visible={isModalVisible}
                        animationType='fade'
                        onRequestClose={toggleModal}
                    >
                        <View style={styles.modalOverlay}>
                            <View style={styles.modalContainer}>
                                <ScrollView>
                                    {["Google search", "Social Media", "YouTube", "Red Seas", "From A Friend", "RYA Instructor", "RYA Training Centre", "Yacht Club", "Magazine", "Prefer Not To Say", "Other"].map((option, index) => (
                                        <TouchableOpacity key={index} onPress={() => handleOptionSelect(option)} style={styles.optionButton}>
                                            <Text style={styles.optionText}>{option}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>
                        </View>
                    </Modal>


                    {isloading ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color="#FF5733" />
                            <Text style={{ color: 'white', marginTop: 10 }}>Registering...</Text>
                        </View>
                    ) : (
                        <TouchableOpacity onPress={handleSubmit}>
                            <View style={{ alignItems: 'center', marginTop: 20 }}>
                                <View style={{ width: '90%', height: 45, borderWidth: 2, borderColor: 'orange', borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}>
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
                    <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
                    <View style={{
                        alignItems: 'center', marginTop: 20, marginBottom: 40
                    }}>
                        <Text style={{ fontSize: 15, textDecorationLine: 'underline', color: 'white', }}> I already have an account</Text>
                    </View>
                    </TouchableOpacity>
                </ScrollView>
            )}
        </Formik>
    )
}

const styles = StyleSheet.create({
    successBanner: {
        backgroundColor: '#28a745',
        padding: 10,
        alignItems: 'center',
    },
    successText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
    },
    modalCloseText: {
        color: 'blue',
        marginTop: 20,
    },
    optionButton: {
        paddingVertical: 10,
        
    },
    optionText: {
        color: 'black',
        fontSize: 16,
        textAlign: 'left',
    },

})