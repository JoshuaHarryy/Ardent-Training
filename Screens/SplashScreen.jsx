import { StyleSheet, Text, View, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'

const Splash = ({ navigation }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,  // Animate to opacity: 1 (fully visible)
            duration: 2000,  // Animation duration (2 seconds)
            useNativeDriver: true,  // Use native driver for better performance
          }).start();


        setTimeout(() => {
            navigation.navigate('Login');
        }, 2000);
    }, [fadeAnim]);


    return (
        <View style={{ backgroundColor: '#1C3879', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Animated.Text style={[styles.text, { opacity: fadeAnim }]}>
        Ardent Training!
      </Animated.Text>
        </View>
    );
};

export default Splash;
const styles = StyleSheet.create({
    text: {
        fontSize: 25,
        fontWeight:'bold',
        color: 'white',
    },
})
