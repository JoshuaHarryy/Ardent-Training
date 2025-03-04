import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import HTMLView from 'react-native-htmlview';
import FreeTrialCC from '../Components/FreeTrialCC';




export default function FreeTrialScreen({navigation}) {
  const [courses, setCourses] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchCourses = async () => {
    try {
      const response = await fetch('https://staging.ardent-training.com/api/organization-course', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "api-key": "eyJpdiI6ImpDdHdQL0NHYzVNQmwwYmE0NFMxbnc9PSIsInZhbHVlIjoiRmZPN2poWjg4OHJkR2xjOGg5SDgwSmg5M0lXMUhXeFhzbUJZZ05hT21MMmd1TUlpUlhEMWo1ekJXU1dTMThnT0szYTlMSlQva3BoODc3cDJhS2sxZE5KMDhyR1U0VlhoSUp1Z3pVSEwydk9KZHpYbWg5SjNjUjdoVFZFem51UFlRK28yemRVZ2NxWVYvVEJTSHZNWEJROXM4NnFubFVaU09UNDZYWSs4REpvYVdjdldaWVFYYlpPZFlpOWc0Z2cvSHA0YXlQMWVJMWlSeEFWakU2TzVyTXljM0xsMmVtMm5lLzMwWlZEbUlCZER3REZMWko0dTNPZGFSak5LRkdFNCIsIm1hYyI6IjIxYzNkNTM3MjVhOGVkN2Q5YjFjMDU2ZjYwM2QzM2MxMzVkYWIzODEwYmEyZDg1ODJiZjViMzUzZmU5NDBmYmIiLCJ0YWciOiIifQ=="
        },
      });

      const data = await response.json();
      // console.log("FreeTrialData", data)
      setCourses(data.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchCourses();
}, []);

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
      
      <View style={{marginTop: 10, alignItems: 'center',marginHorizontal: 40}}>
        <Text style={{fontSize: 20, fontWeight: '900', color: 'white'}}>Get A Free Trial For Any Of Our RYA</Text>
        <Text style={{fontSize: 20, fontWeight: '900', color: 'white'}}>Skipper Courses</Text>
      </View>

    

      <FlatList
      data={courses.filter(item=> item.itHasFreeLessons)}
      keyExtractor={(item)=> item.id.toString()}
      renderItem={({item})=> <FreeTrialCC courses={item}/>}
      />
      
       
    </View>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5E71EA',
  },
  header: {
    height: 120,
    backgroundColor: '#173A70',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  logo: {
    width: 90,
    height: 40,
  },
})