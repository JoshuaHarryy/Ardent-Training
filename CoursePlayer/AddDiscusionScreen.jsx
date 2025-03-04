import { Image, ScrollView, StyleSheet, Text, View, ActivityIndicator, TextInput, Dimensions } from 'react-native'
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

export default function AddDiscusionScreen({ route, navigation }) {
    const [Topic, setTopic] = useState('');
    const [DiscussionText, setDiscussionText] = useState('');
    const { lesson_id } = route.params || {};
    const [loading, setLoading] = useState('');
    const [successMessage, setSuccessMessage] = useState('')
    const richText = useRef();
    const [editorWidth, setEditorWidth] = useState(Dimensions.get('window').width * 0.9);
    const [editorHeight, setEditorHeight] = useState(300);

    useEffect(() => {
        const updateDimensions = () => {
            const { width, height } = Dimensions.get('window');
            setEditorWidth(width * 0.9);
            setEditorHeight(height * 0.4);
        };
        const subscription = Dimensions.addEventListener('change', updateDimensions);
        return () => subscription?.remove();
    }, []);


    const postDiscussion = async () => {
        setLoading(true)
        setSuccessMessage('')
        const token = await AsyncStorage.getItem('token');
        const url = "https://staging.ardent-training.com/api/discussion";

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
                    lesson_id: lesson_id,
                    title: Topic,
                    description: DiscussionText,
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
                    <Text style={{ fontSize: 19, fontWeight: '700', color: 'white', marginHorizontal: 80 }}>Add Discussion</Text>
                </View>
            </View>

            <View style={{ alignItems: 'center' }}>
                <TextInput
                    style={styles.TopicInput}
                    value={Topic}
                    onChangeText={setTopic}
                    placeholder="Topic Name"
                    placeholderTextColor='white'
                />

                <RichEditor
                    ref={richText}
                    placeholder="Enter Here"
                    onChange={(text) => setDiscussionText(text)}
                    initialHeight={editorHeight}
                    style={{
                        height: editorHeight,
                        width: editorWidth,
                        backgroundColor: 'white',
                        marginTop: 20,
                        marginHorizontal: 10,
                    }}
                />

                {/* Toolbar for formatting */}
                <RichToolbar
                    style={{ width: '90%', backgroundColor: '#f1f1f1' }}
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
            </View>

            <TouchableOpacity onPress={postDiscussion}>
                <View style={{ alignItems: 'center' }}>
                    <View style={{ height: 50, width: '90%', borderWidth: 2, borderRadius: 20, borderColor: 'orange', marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 17, fontWeight: '700', color: 'white' }}> Submit </Text>
                    </View>
                </View>
            </TouchableOpacity>

            {loading && <ActivityIndicator size="large" color="orange" style={styles.loader} />}

            {successMessage ? (
                <Text style={styles.successText}>{successMessage}</Text>
            ) : null}

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
    TopicInput: {
        height: 50,
        width: '90%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 7,
        paddingHorizontal: 10,
        fontSize: 14,
        color: 'white'
    },

    DiscusionInput: {
        height: 200,
        width: '90%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 7,
        paddingHorizontal: 10,
        fontSize: 14,
        marginTop: 20,
        color: 'white'
    },
    loader: {
        marginTop: 20,
    },
    successText: {
        marginTop: 20,
        textAlign: 'center',
        color: 'green',
        fontSize: 16,
    },
})