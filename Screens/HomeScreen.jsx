import { Image, StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';


export default function HomeScreen({navigation}) {
    return (
        <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Icon name="menu" size={30} color="white" />
       </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: '500', color: 'white', flex: 1, textAlign: 'center' }}>Classroom</Text>
          <Image
            source={require('../Assets/Vertical.png')}
            style={styles.logo}
          />
        </View>
        
      
        
      </View>
    );
  };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ADD8E6', 
      },
      header: {
        height: 120,
        backgroundColor: '#00008B', 
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
      mainContent: {
        flex: 1,
      },
})