import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import { fetchStudentProfile } from '../Redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';


export default function MyprofileScreen({navigation}) {
    const [name, setName] = useState('');
    const [Email, setEmail] = useState('');
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
            setName(profile.data.name || '');
            setEmail(profile.data.email || '');
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

    return (
        <View>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Icon name="menu" size={30} color="white" />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, fontWeight: '500', color: 'white', flex: 1, textAlign: 'center' }}>Profile</Text>
                <Image
                    source={require('../Assets/Vertical.png')}
                    style={styles.logo}
                />
            </View>
            <View style={styles.boldLine} />


            <View style={{ height: '100%', width: '100%', backgroundColor: '#003366' }}>
                <TouchableOpacity onPress={()=> navigation.navigate("Profile")}>
                    <View style={{ marginTop: 20, alignItems: 'flex-end', marginRight: 20 }}>
                        <Feather name="edit" size={25} color="white" />
                    </View>
                </TouchableOpacity>

                <View style={{ marginTop: 70, alignItems: 'center' }}>
                    <View style={{ height: 120, width: 120, borderRadius: 60, backgroundColor: 'white' }}>
                    </View>
                </View>

                <View style={{ marginTop: 50 }}>
                    <View style={{ height: 270, width: '100%', backgroundColor: 'white' }}>
                        <View style={{marginHorizontal: 20, marginTop: 20}}>
                        <Text style={{fontSize: 15, fontWeight: 'bold', color: 'black'}}>Name</Text>
                        <TextInput
                                style={{fontSize: 13, fontWeight: '400',  padding: 0, margin: 0,  color: '#000'}}
                                value={name}
                                editable={false} 
                                placeholderTextColor="#000" 
                            />
                        <View style={{ borderBottomColor: '#ccc', borderBottomWidth: 1, width: '100%', marginTop: 5 }} />
                        </View>

                        <View style={{marginHorizontal: 20, marginTop: 10}}>
                        <Text style={{fontSize: 15, fontWeight: 'bold', color: 'black'}}>Email</Text>
                        <TextInput
                                style={{fontSize: 13, fontWeight: '400',  padding: 0, margin: 0, color: '#000'}}
                                value={Email}
                                editable={false} 
                                placeholderTextColor="#000" 
                            />
                        <View style={{ borderBottomColor: '#ccc', borderBottomWidth: 1, width: '100%', marginTop: 5 }} />
                        </View>


                        <View style={{marginHorizontal: 20, marginTop: 10}}>
                        <Text style={{fontSize: 15, fontWeight: 'bold', color: 'black'}}>Phone Number</Text>
                        <TextInput
                                style={{fontSize: 13, fontWeight: '400',  padding: 0, margin: 0,  color: '#000'}}
                                value={phone}
                                editable={false} 
                                placeholderTextColor="#000" 
                            />
                        <View style={{ borderBottomColor: '#ccc', borderBottomWidth: 1, width: '100%', marginTop: 5 }} />
                        </View>

                        <View  style={{flexDirection: 'row', marginTop: 10, justifyContent: 'space-between',marginRight: 20, marginLeft: 20}}>
                            <Text style={{fontSize: 25, color:  '#003366'}}>Address Details</Text>
                            <TouchableOpacity onPress={()=> navigation.navigate("Address")}>
                            <Entypo name={"plus"} size={28} color={'#003366'} style={styles.ArrowIcon} />
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 120,
        backgroundColor: '#003366',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,

    },
    headerText: {
        fontSize: 20,
        fontWeight: '500',
        color: 'white',
        marginLeft: 10,
        flex: 1,
    },
    logo: {
        width: 90,
        height: 40,
    },
    boldLine: {
        borderBottomWidth: 1,
        borderBottomColor: 'white',
    },
})