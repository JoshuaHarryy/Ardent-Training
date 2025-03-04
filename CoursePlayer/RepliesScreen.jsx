import { Image, ScrollView, StyleSheet, Text, View, ActivityIndicator, TextInput } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
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
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor';

export default function RepliesScreen({ navigation, route }) {
    const { item } = route.params;
    const [isReplying, setIsReplying] = useState(false);
    const [loading, setLoading] = useState("");
    const { lesson_id } = route.params || {};
    const [successMessage, setSuccessMessage] = useState('')
    const [replyText, setReplyText] = useState('')
    const richText = useRef();

    const toggleReply = () => {
        setIsReplying(!isReplying);
    };
    const toggleCancel = () => {
        setIsReplying(!isReplying);
    };

    const replyapi = async () => {
        setLoading(true)
        setSuccessMessage('')
        const token = await AsyncStorage.getItem('token');
        const url = "https://staging.ardent-training.com/api/discussion";

        console.log("item id : ", item.id)
        console.log("lesson id : ", item.lesson_id)
        console.log("discussion : ", replyText)
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "api-key": "eyJpdiI6ImpDdHdQL0NHYzVNQmwwYmE0NFMxbnc9PSIsInZhbHVlIjoiRmZPN2poWjg4OHJkR2xjOGg5SDgwSmg5M0lXMUhXeFhzbUJZZ05hT21MMmd1TUlpUlhEMWo1ekJXU1dTMThnT0szYTlMSlQva3BoODc3cDJhS2sxZE5KMDhyR1U0VlhoSUp1Z3pVSEwydk9KZHpYbWg5SjNjUjdoVFZFem51UFlRK28yemRVZ2NxWVYvVEJTSHZNWEJROXM4NnFubFVaU09UNDZYWSs4REpvYVdjdldaWVFYYlpPZFlpOWc0Z2cvSHA0YXlQMWVJMWlSeEFWakU2TzVyTXljM0xsMmVtMm5lLzMwWlZEbUlCZER3REZMWko0dTNPZGFSak5LRkdFNCIsIm1hYyI6IjIxYzNkNTM3MjVhOGVkN2Q5YjFjMDU2ZjYwM2QzM2MxMzVkYWIzODEwYmEyZDg1ODJiZjViMzUzZmU5NDBmYmIiLCJ0YWciOiIifQ=="
                },
                body: JSON.stringify({
                    lesson_id: item.lesson_id,
                    parent_id: item.id,
                    title: item.title,
                    description: replyText,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Response:", data);
                setSuccessMessage("Discussion added successfully!")
                setTimeout(() => setSuccessMessage(''), 3000);
                navigation.navigate("Discussion")
            } else {
                console.error("Error:", response.status, response.statusText);
            }
        } catch (error) {
            console.error("Network error:", error);
        } finally {
            setLoading(false)
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#173A70' }}>

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('Discussion')}>
                    <MaterialIcons
                        name={"arrow-back-ios"}
                        size={24}
                        color={"white"}
                        style={styles.ArrowIcon}
                    />
                </TouchableOpacity>

                <View>
                    <Text style={{ fontSize: 19, fontWeight: '700', color: 'white', marginHorizontal: 80 }}>Replies</Text>
                </View>
            </View>

            <View style={styles.card}>
                <Text style={styles.title}> {item.title}</Text>
                <Text style={styles.description}> {item.description.replace(/<\/?[^>]+(>|$)/g, '')}</Text>

                <View style={{ flexDirection: 'row' }}>
                    <EvilIcons name='user' size={60} color='black' />
                    <Text style={{ fontSize: 14, fontWeight: '400', marginTop: 15, marginHorizontal: 15, color: 'black' }}>{item.user.name}</Text>

                    <View style={{ height: 25, width: '30%', backgroundColor: 'orange', borderRadius: 10, marginTop: 10 }}>
                        <Text style={{ fontSize: 14, fontWeight: '400', marginTop: 2, marginHorizontal: 20, color: 'black' }}>{item.user.role}</Text>
                    </View>

                    <TouchableOpacity onPress={toggleReply} >
                        <View style={{ height: 25, width: '70%', backgroundColor: 'grey', borderRadius: 10, marginTop: 10, marginHorizontal: 20 }}>
                            <Text style={{ fontSize: 14, fontWeight: '400', marginTop: 2, marginHorizontal: 20, color: 'white' }}>reply</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>


            {isReplying && (
               <View style={{ height: 200, width: '90%', marginHorizontal: 20, marginTop: 10 }}>
               <RichEditor
                   ref={richText}
                   placeholder="Enter Here"
                   onChange={(text) => setReplyText(text)}
                   initialHeight={250} // Set an appropriate height
                   style={{
                       flex: 1,
                       backgroundColor: 'white',
                   }}
               />
           </View>
            )}

            {isReplying && (

                <RichToolbar
                    style={{ marginHorizontal: 20, width: '90%', backgroundColor: '#f1f1f1' }}
                    editor={richText}
                    actions={[
                        actions.insertImage,
                        actions.setBold,
                        actions.setItalic,
                        actions.insertBulletsList,
                        actions.insertOrderedList,
                        actions.insertLink,
                        actions.setStrikethrough,
                    ]}
                    iconTint="black"
                />

            )}
            

            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                {isReplying && (
                    <TouchableOpacity onPress={toggleCancel}>
                        <View style={{ alignItems: 'flex-end', marginRight: 20 }}>
                            <View style={{ width: '120%', height: 40, backgroundColor: '#FE8E91', borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                                <Text style={{ fontSize: 15, color: 'black' }}>Cancel</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}

                {isReplying && (
                    <TouchableOpacity onPress={replyapi}>
                        <View style={{ alignItems: 'flex-end', marginRight: 20 }}>
                            <View style={{ width: '120%', height: 40, backgroundColor: '#FE8E91', borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                                <Text style={{ fontSize: 15, color: 'black' }}>Send</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            </View>

            {!isReplying && (
                <Text style={{ fontSize: 17, color: 'white', fontWeight: 'bold', marginHorizontal: 20, marginBottom: 20, marginTop: 10 }}>Replies</Text>
            )}


            {!isReplying && (item.replies.length > 0 ? (
                console.log("Replies Data", item.replies),
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <FlatList
                        style={styles.Flatlist}
                        data={item.replies}
                        keyExtractor={(reply, index) => index.toString()}
                        renderItem={({ item: reply }) => (
                            <View style={styles.card1}>

                                <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                                    <EvilIcons name='user' size={60} color='black' />
                                    <Text style={{ fontSize: 14, fontWeight: '400', marginTop: 15, marginHorizontal: 15, color: 'black' }}>{reply.user.name}</Text>

                                    <View style={{ height: 25, width: '30%', backgroundColor: 'orange', borderRadius: 10, marginTop: 10 }}>
                                        <Text style={{ fontSize: 14, fontWeight: '400', marginTop: 2, marginHorizontal: 20, color: 'black' }}>{reply.user.role}</Text>
                                    </View>
                                </View>
                                <Text style={{ fontSize: 14, color: 'black', marginBottom: 30 }}>{reply.description.replace(/<\/?[^>]+(>|$)/g, "")}</Text>
                            </View>
                        )}
                    />
                </View>
            ) : (
                <Text style={{ fontSize: 16, color: 'white', textAlign: 'center', marginVertical: 10, fontWeight: 'bold', marginTop: 100 }}>
                    No replies yet!
                </Text>
            ))}



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
    ArrowIcon: {
        marginHorizontal: 20
    },
    card: {
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 10,
        elevation: 3,
    },
    card1: {
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 0.5,
        elevation: 3,

    },
    title: {
        fontSize: 17,
        marginBottom: 10,
        color: 'black',
        marginHorizontal: 5,
        fontWeight: 'bold'
    },
    description: {
        fontSize: 15,
        color: '#555',
        marginHorizontal: 5,
        marginBottom: 20,
    },
    Flatlist: {
        backgroundColor: '#173A70',
        width: '90%',
        marginBottom: 400
    },
    textInput: {
        height: 200,
        width: '100%',
        borderWidth: 1,
        borderColor: 'grey',
        marginTop: 0,
        padding: 10,
        backgroundColor: '#f5f5f5',
    },
})