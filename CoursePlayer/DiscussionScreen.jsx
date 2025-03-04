import { Image, ScrollView, StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import HTMLView from 'react-native-htmlview';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { WebView } from 'react-native-webview';
import * as Progress from 'react-native-progress';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import CheckBox from '@react-native-community/checkbox';
import Tick from '../Components/Tick';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';


export default function DiscussionScreen({ route, navigation }) {
  const [discussionData, setDiscussionData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { lessonId } = route.params || {};


  const fetchLessonDiscussion = async () => {
    setLoading(true)
    const token = await AsyncStorage.getItem('token');
    const Api = `https://staging.ardent-training.com/api/lesson-discussion/${lessonId}`;
    console.log('API URL:', Api);
    try {
      const response = await fetch(Api, {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json",
          "api-key": "eyJpdiI6ImpDdHdQL0NHYzVNQmwwYmE0NFMxbnc9PSIsInZhbHVlIjoiRmZPN2poWjg4OHJkR2xjOGg5SDgwSmg5M0lXMUhXeFhzbUJZZ05hT21MMmd1TUlpUlhEMWo1ekJXU1dTMThnT0szYTlMSlQva3BoODc3cDJhS2sxZE5KMDhyR1U0VlhoSUp1Z3pVSEwydk9KZHpYbWg5SjNjUjdoVFZFem51UFlRK28yemRVZ2NxWVYvVEJTSHZNWEJROXM4NnFubFVaU09UNDZYWSs4REpvYVdjdldaWVFYYlpPZFlpOWc0Z2cvSHA0YXlQMWVJMWlSeEFWakU2TzVyTXljM0xsMmVtMm5lLzMwWlZEbUlCZER3REZMWko0dTNPZGFSak5LRkdFNCIsIm1hYyI6IjIxYzNkNTM3MjVhOGVkN2Q5YjFjMDU2ZjYwM2QzM2MxMzVkYWIzODEwYmEyZDg1ODJiZjViMzUzZmU5NDBmYmIiLCJ0YWciOiIifQ=="
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      setDiscussionData(data.data);
      console.log('Lesson Discussion:', data.data);
    } catch (error) {
      console.error('Error fetching lesson discussion:', error.message);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchLessonDiscussion();
  }, []);


  const renderTopic = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate("Replies", { item }, { lesson_id : discussionData[0].lesson_id })}>
      <View style={styles.card}>
        <View style={{ flexDirection: 'row', marginBottom: 5, marginTop: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'black', }}>Uploaded by: </Text>
          <Text style={[styles.title, { flexShrink: 1 }]}>{item.user.name}</Text>
        </View>

        <View style={{ flexDirection: 'row', marginBottom: 5, marginTop: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'black', }}>Topic: </Text>
          <Text style={[styles.title, { flexShrink: 1 }]}>{item.title}</Text>
        </View>

        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'black' }}>Description:- </Text>
          <Text style={[styles.description, { flexShrink: 1 }]}>{item.description.replace(/<\/?[^>]+(>|$)/g, '')}</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <EvilIcons name='user' size={60} color='black' />
          <Text style={{ fontSize: 14, fontWeight: '400', marginTop: 15, marginHorizontal: 15, color: 'black' }}>{item.user.name}</Text>

          <View style={{ height: 25, width: '30%', backgroundColor: 'orange', borderRadius: 10, marginTop: 10 }}>
            <Text style={{ fontSize: 14, fontWeight: '400', marginTop: 2, marginHorizontal: 15, color: 'black' }}>{item.user.role}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );


  return (

    <View style={{ flex: 1, backgroundColor: '#173A70' }}>


      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('RyaDaySkipperCoursePlayer')}>
          <MaterialIcons
            name={"arrow-back-ios"}
            size={24}
            color={"white"}
            style={styles.ArrowIcon}
          />
        </TouchableOpacity>

        <View>
          <Text style={{ fontSize: 19, fontWeight: '700', color: 'white', marginHorizontal: 70 }}>Discussion</Text>
        </View>

        <MaterialIcons
          name={"search"}
          size={30}
          color={"white"}
          style={styles.ArrowIcon1}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : null}

     
<View style={styles.listContainer}>
        {discussionData && discussionData.length > 0 ? (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <FlatList
              style={styles.Flatlist}
              data={discussionData}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderTopic}
            />
          </View>
        ) : (
          <View style={{ flex: 1, alignItems: 'center', marginTop: 200 }}>
            <Text style={{ color: 'white' }}>No Discussion yet..</Text>
            <Text style={{ color: 'white' }}>Please use "+" button below to add..</Text>
          </View>
        )}

        <TouchableOpacity style={styles.floatingButton} 
        onPress={() => {
          console.log("Navigating with lesson_id:", discussionData[0].lesson_id);
          navigation.navigate("AddDiscusion", { lesson_id : discussionData[0].lesson_id });
        }}
        >
          <Icon name="add" size={30} color="white" />
        </TouchableOpacity>
        </View>

    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    height: 100,
    backgroundColor: '#173A70',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,

  },
  listContainer: {
    flex: 1,
    position: 'relative',
  },
  ArrowIcon: {
    marginHorizontal: 20
  },
  logo: {
    width: 120,
    height: 60,
    marginHorizontal: 70
  },
  ArrowIcon1: {
    marginHorizontal: 50
  },
  Flatlist: {
    backgroundColor: '#173A70',
    width: '90%',
    marginBottom: 0
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    elevation: 3,

  },
  title: {
    flex: 1,
    fontSize: 17,
    marginBottom: 5,
    color: 'black',
    marginHorizontal: 5
  },
  description: {
    fontSize: 15,
    color: '#555',
    marginHorizontal: 5,
    marginBottom: 50
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#FE8E91',
    width: 55,
    height: 55,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2, 
    zIndex: 0,
  },
})