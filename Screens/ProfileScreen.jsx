import { StyleSheet, Text, View, TouchableOpacity, TextInput, ActivityIndicator, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { fetchStudentProfile } from '../Redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen({navigation}) {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [updating, setUpdating] = useState(false);
    const { loading, error, profile } = useSelector((state) => state.auth);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(fetchStudentProfile());
    }, [dispatch]);


    useEffect(() => {
        if (profile) {
            console.log('User Profile:', profile)
            setName(profile.data.student_detail?.first_name || '');
            setLastName(profile.data.student_detail?.last_name || '');
            setPhone(profile.data.student_detail?.phone_number || '');
        }
    }, [profile]);


    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="orange" />
            </View>
        );
    }


    if (error) {
        return <Text>Error: {error}</Text>;
    };

    const handleSave = async () => {
        const token = await AsyncStorage.getItem('token'); 
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        setUpdating(true); 

        try {
            const response = await fetch('https://staging.ardent-training.com/api/student-update', {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, 
                    'api-key': 'eyJpdiI6ImpDdHdQL0NHYzVNQmwwYmE0NFMxbnc9PSIsInZhbHVlIjoiRmZPN2poWjg4OHJkR2xjOGg5SDgwSmg5M0lXMUhXeFhzbUJZZ05hT21MMmd1TUlpUlhEMWo1ekJXU1dTMThnT0szYTlMSlQva3BoODc3cDJhS2sxZE5KMDhyR1U0VlhoSUp1Z3pVSEwydk9KZHpYbWg5SjNjUjdoVFZFem51UFlRK28yemRVZ2NxWVYvVEJTSHZNWEJROXM4NnFubFVaU09UNDZYWSs4REpvYVdjdldaWVFYYlpPZFlpOWc0Z2cvSHA0YXlQMWVJMWlSeEFWakU2TzVyTXljM0xsMmVtMm5lLzMwWlZEbUlCZER3REZMWko0dTNPZGFSak5LRkdFNCIsIm1hYyI6IjIxYzNkNTM3MjVhOGVkN2Q5YjFjMDU2ZjYwM2QzM2MxMzVkYWIzODEwYmEyZDg1ODJiZjViMzUzZmU5NDBmYmIiLCJ0YWciOiIifQ=='
                },
                body: JSON.stringify({
                    first_name: name,
                    last_name: lastName,
                    phone_number: phone,
                    timezone: timezone,
                }),
            });

            const result = await response.json();
            console.log('API Response:', result);
            if (response.ok) {
                Alert.alert('Success', 'Profile updated successfully!');
            } else {
                Alert.alert('Error', `Failed to update profile: ${result.message}`);
            }
        } catch (error) {
            console.error('Update error:', error);
            Alert.alert('Error', 'An error occurred while updating');
        }finally {
            // Stop loading
            setUpdating(false); 
        }
    };



    return (
        <View style={{ flex: 1, backgroundColor: '#1C3879' }}>
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                <TouchableOpacity onPress={() => navigation.navigate('MyProfile')}>
                    <MaterialIcons name={"arrow-back-ios"} size={24} color={"white"} style={styles.ArrowIcon} />
                </TouchableOpacity>

                <View style={{ marginHorizontal: 80 }}>
                    <Text style={{ fontSize: 18, fontWeight: '500', color: 'white' }}>Update Profile</Text>
                </View>
            </View>


            <View style={{ marginTop: 30, marginHorizontal: 20 }}>
                <Text style={{ fontSize: 15, color: 'white' }}>First Name</Text>
            </View>

            <View style={styles.MainFirstNameContainer}>
                <View style={styles.FirstNameContainer}>
                    <TextInput style={styles.Textinput}
                        value={name}
                        onChangeText={setName}
                        placeholder='First Name'
                        placeholderTextColor="white" ></TextInput>
                </View>
            </View>

            <View style={{ marginTop: 20, marginHorizontal: 20 }}>
                <Text style={{ fontSize: 15, color: 'white' }}>Last Name</Text>
            </View>

            <View style={styles.MainFirstNameContainer}>
                <View style={styles.FirstNameContainer}>
                    <TextInput style={styles.Textinput}
                        value={lastName}
                        onChangeText={setLastName}
                        placeholder='last Name'
                        placeholderTextColor="white" ></TextInput>
                </View>
            </View>

            <View style={{ marginTop: 20, marginHorizontal: 20 }}>
                <Text style={{ fontSize: 15, color: 'white' }}>Phone Number</Text>
            </View>

            <View style={styles.MainFirstNameContainer}>
                <View style={styles.FirstNameContainer}>
                    <TextInput style={styles.Textinput}
                        value={phone}
                        onChangeText={setPhone}
                        placeholder='Phone Number'
                        placeholderTextColor="white" ></TextInput>
                </View>
            </View>

            <TouchableOpacity onPress={ handleSave}>
                <View style={{ alignItems: 'center', marginTop: 40 }}>
                    <View style={{ width: '90%', height: 45, borderWidth: 2, borderColor: 'orange', borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}>
                    {updating ? (
                            <ActivityIndicator size="small" color="white" /> // Show loading indicator
                        ) : (
                            <Text style={{ color: 'white', fontWeight: '500', fontSize: 17 }}>Update</Text>
                        )}
                    </View>
                </View>
            </TouchableOpacity>




        </View>
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
})