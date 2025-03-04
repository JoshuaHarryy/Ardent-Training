import { Image, StyleSheet, Text, View, TouchableOpacity, ScrollView, ActivityIndicator, Modal, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import HTMLView from 'react-native-htmlview';
import Entypo from 'react-native-vector-icons/Entypo';
import { useDispatch, useSelector } from 'react-redux';
import { checkToken } from '../Redux/authSlice';
import { FlatList } from 'react-native-gesture-handler';

export default function CourseCard({ courses }) {
    const handleBuyNow = () => {
        Alert.alert(`Buying course: ${courses.name}`);
    };

    return (
        <View>
            <View style={styles.card}>
                {/* Image and Price */}
                <View>
                    <Image
                        source={
                            courses.imageFulUrl && courses.imageFulUrl !== 'null'
                                ? { uri: courses.imageFulUrl }
                                : require('../Assets/DaySkipper.jpg') // Fallback image
                        }
                        style={styles.image}
                        resizeMode='cover'
                    />
                    <View style={styles.priceContainer}>
                        <Text style={styles.priceText}>£{courses.price} only</Text>
                    </View>

                    <Image
                    source={require('../Assets/rya-new-3-banner.png')}
                    style={styles.image1}
                    />
                
                </View>

                {/* Name */}

                <Text style={styles.title}>{courses.name}</Text>

                {/* Description */}
                <View style={styles.discriptionContent}>
                    <HTMLView
                        value={courses.description}
                        stylesheet={styles.html}
                    />
                </View>

                {/* View More and Buy Now */}
                    <TouchableOpacity>
                        <Text style={styles.viewMore}>View more details</Text>
                    </TouchableOpacity>

                <View style={styles.actions}>
                    <TouchableOpacity onPress={handleBuyNow}>
                        <View style={styles.buyNowButton}>
                            <Text style={styles.buyNowText}>BUY NOW</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        elevation: 10,
        borderRadius: 10,
        margin: 20,
        marginTop: 10,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 200,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    image1:{
        position: 'absolute',
        top: 10,
        right: 10,
        height: 50,
        width: 100,
        backgroundColor: "white",
        borderRadius: 10
    },

    priceContainer: {
        position: 'absolute',
        top: 10,
        left: 10,
        width: 100,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    priceText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#00008B'
    },
    title: {
        fontSize: 16, color: '#00008B', fontWeight: '500', marginBottom: 20, marginTop: 40, marginHorizontal: 20
    },
    discriptionContent: {
        alignItems: 'center',
        marginTop: 15,
        marginHorizontal: 30
    },
    html: {
        p: { fontSize: 15, color: 'black', fontWeight: '400' }
    },
    viewMore: {
        color: 'purple',
        fontSize: 14,
        marginBottom: 10,
        marginTop: 40,
        marginHorizontal: 20
    },
    actions:{
        marginHorizontal: 10,
        marginBottom: 10
    },
    buyNowButton:{
        width: '100%', 
        height: 60, 
        backgroundColor: '#FE8E91', 
        borderRadius: 15, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    buyNowText:{
        color: 'white', fontWeight: '500', fontSize: 19
    },
})