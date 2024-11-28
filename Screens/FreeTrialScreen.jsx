import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import HTMLView from 'react-native-htmlview';




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
      // console.log(data)
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

      <ScrollView>

       {/* RYA Day Skipper Theory Course */}

       <View style={{ alignItems: 'center', marginBottom: 40, marginTop: 40 }}>
          <View style={{ width: '90%', height: 720, backgroundColor: 'white', borderRadius: 10, elevation: 10, position: 'relative' }}>

            {/* Image and Price */}
            <View>
              {courses
                .filter(course => course.id === 1)
                .map(item => (
                  <View key={item.id}>
                    <Image
                      source={
                        item.imageFulUrl && item.imageFulUrl !== 'null'
                          ? { uri: item.imageFulUrl }
                          : require('../Assets/DaySkipper.jpg') // Fallback image
                      }
                      onError={() => {
                        console.log('Image URL failed to load, showing default image.');
                        setImageSource(require('../Assets/DaySkipper.jpg')); // Ensure fallback if URL fails
                      }}
                      style={{
                        width: '100%',
                        height: 200,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                      }}
                    />
                    <View
                      style={{
                        position: 'absolute',
                        top: 10,
                        left: 10,
                        width: 100,
                        height: 50,
                        backgroundColor: 'white',
                        borderRadius: 15,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          color: '#00008B',
                          fontWeight: '500',
                        }}
                      >
                        £{item.price} only
                      </Text>
                    </View>
                  </View>
                ))}
            </View>

            {/* Name */}
            <View style={{ marginTop: 25, marginHorizontal: 30 }}>
              {courses
                .filter(course => course.id === 1)
                .map((item) => (
                  <Text style={{ fontSize: 16, color: '#00008B', fontWeight: '500', marginBottom: 10 }} key={item.id}>
                    {item.name}
                  </Text>
                ))}
            </View>

            {/* Description */}
            <View style={{ marginTop: 15, marginHorizontal: 30 }}>
              {courses
                .filter(course => course.id === 1)
                .map((item) => (
                  <HTMLView
                    key={item.id}
                    value={item.description}
                    stylesheet={{ p: { fontSize: 15, color: 'black', fontWeight: '400' } }}
                  />
                ))}
            </View>

            {/* View More and Buy Now at the Bottom */}
            <View style={{ position: 'absolute', bottom: 20, left: 30, right: 30, justifyContent: 'space-between' }}>
              <Text style={{ color: 'purple', fontSize: 14, marginBottom: 20 }}>View more details</Text>

              <TouchableOpacity onPress={()=> navigation.navigate('RyaDaySkipperCoursePlayer')}>
                <View style={{ width: '100%', height: 60, backgroundColor: '#FE8E91', borderRadius: 15, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ color: 'white', fontWeight: '500', fontSize: 19 }}>TRY IT FOR FREE</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

      
        </ScrollView>
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