import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Header = ({ navigation }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <MaterialIcons
          name={"arrow-back-ios"}
          size={24}
          color={"white"}
          style={styles.ArrowIcon}
        />
      </TouchableOpacity>

      <Image
        source={require('../Assets/Vertical.png')}
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    header: {
        height: 120,
        backgroundColor: '#173A70',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,

    },
    ArrowIcon: {
        marginHorizontal: 20
    },
    logo: {
        width: 120,
        height: 60,
        marginHorizontal: 70
    },
});

export default Header;