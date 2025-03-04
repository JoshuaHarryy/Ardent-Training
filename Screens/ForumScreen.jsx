import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView, Modal, Button, ActivityIndicator, Alert, TouchableOpacityBase } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-gesture-handler';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";



export default function ForumScreen({ item, navigation }) {
  const [activeTab, setActiveTab] = useState("Tab1");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [text, setText] = useState("");
  const [expandedComment, setExpandedComment] = useState(null);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [liked, setLiked] = useState([])
  const [likedPosts, setLikedPosts] = useState({});
  const [submittedText, setSubmittedText] = useState("");
  const [username, setUserName] = useState();

  const fetchUserInfo = async () => {
    try {
      const API_KEY = "eyJpdiI6ImpDdHdQL0NHYzVNQmwwYmE0NFMxbnc9PSIsInZhbHVlIjoiRmZPN2poWjg4OHJkR2xjOGg5SDgwSmg5M0lXMUhXeFhzbUJZZ05hT21MMmd1TUlpUlhEMWo1ekJXU1dTMThnT0szYTlMSlQva3BoODc3cDJhS2sxZE5KMDhyR1U0VlhoSUp1Z3pVSEwydk9KZHpYbWg5SjNjUjdoVFZFem51UFlRK28yemRVZ2NxWVYvVEJTSHZNWEJROXM4NnFubFVaU09UNDZYWSs4REpvYVdjdldaWVFYYlpPZFlpOWc0Z2cvSHA0YXlQMWVJMWlSeEFWakU2TzVyTXljM0xsMmVtMm5lLzMwWlZEbUlCZER3REZMWko0dTNPZGFSak5LRkdFNCIsIm1hYyI6IjIxYzNkNTM3MjVhOGVkN2Q5YjFjMDU2ZjYwM2QzM2MxMzVkYWIzODEwYmEyZDg1ODJiZjViMzUzZmU5NDBmYmIiLCJ0YWciOiIifQ==";
      const token = await AsyncStorage.getItem("token"); 
      if (!token) {
        console.error("No token found");
        return;
      }
  
      const response = await fetch("https://staging.ardent-training.com/api/student-profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
          "api-key": API_KEY,
        },
      });
  
      const data = await response.json();
     
        console.log("User Name:", data.data.name);
        setUserName(data.data.name)
    
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const ForumData = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const token = await AsyncStorage.getItem('token');
    const API_URL = `https://staging.ardent-training.com/api/forum/1/post?page=${page}`;
    const API_KEY = "eyJpdiI6ImpDdHdQL0NHYzVNQmwwYmE0NFMxbnc9PSIsInZhbHVlIjoiRmZPN2poWjg4OHJkR2xjOGg5SDgwSmg5M0lXMUhXeFhzbUJZZ05hT21MMmd1TUlpUlhEMWo1ekJXU1dTMThnT0szYTlMSlQva3BoODc3cDJhS2sxZE5KMDhyR1U0VlhoSUp1Z3pVSEwydk9KZHpYbWg5SjNjUjdoVFZFem51UFlRK28yemRVZ2NxWVYvVEJTSHZNWEJROXM4NnFubFVaU09UNDZYWSs4REpvYVdjdldaWVFYYlpPZFlpOWc0Z2cvSHA0YXlQMWVJMWlSeEFWakU2TzVyTXljM0xsMmVtMm5lLzMwWlZEbUlCZER3REZMWko0dTNPZGFSak5LRkdFNCIsIm1hYyI6IjIxYzNkNTM3MjVhOGVkN2Q5YjFjMDU2ZjYwM2QzM2MxMzVkYWIzODEwYmEyZDg1ODJiZjViMzUzZmU5NDBmYmIiLCJ0YWciOiIifQ==";

    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
          "api-key": API_KEY,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to mark the lesson as completed");
      }

      const data = await response.json();
      const newData = data.data || [];
      console.log(" data :", data)
      setData((prevData) => [...prevData, ...newData]);
      setPage((prevPage) => prevPage + 1);

      if (data.length + newData.length >= 24 || newData.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error marking lesson as completed:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    ForumData(1);
  }, [])

  const handleLoadMore = () => {
    ForumData(page);
  };

  const postToForum = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.error("No token found in AsyncStorage");
        return;
      }
      if (!title && !description) {
        Alert.alert("Validation Error", "Title and Description cannot be empty");
        return;
      }

      const API_URL = "https://staging.ardent-training.com/api/post";
      const KEY = "eyJpdiI6ImpDdHdQL0NHYzVNQmwwYmE0NFMxbnc9PSIsInZhbHVlIjoiRmZPN2poWjg4OHJkR2xjOGg5SDgwSmg5M0lXMUhXeFhzbUJZZ05hT21MMmd1TUlpUlhEMWo1ekJXU1dTMThnT0szYTlMSlQva3BoODc3cDJhS2sxZE5KMDhyR1U0VlhoSUp1Z3pVSEwydk9KZHpYbWg5SjNjUjdoVFZFem51UFlRK28yemRVZ2NxWVYvVEJTSHZNWEJROXM4NnFubFVaU09UNDZYWSs4REpvYVdjdldaWVFYYlpPZFlpOWc0Z2cvSHA0YXlQMWVJMWlSeEFWakU2TzVyTXljM0xsMmVtMm5lLzMwWlZEbUlCZER3REZMWko0dTNPZGFSak5LRkdFNCIsIm1hYyI6IjIxYzNkNTM3MjVhOGVkN2Q5YjFjMDU2ZjYwM2QzM2MxMzVkYWIzODEwYmEyZDg1ODJiZjViMzUzZmU5NDBmYmIiLCJ0YWciOiIifQ==";

      const formData = new FormData();
      formData.append("forum_id", "1");
      formData.append("title", title);
      formData.append("description", description);
      formData.append("status", "1");

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "api-key": KEY,
        },
        body: formData,
      });

      const data = await response.json();
      setTitle(null)
      setDescription(null)
      console.log("Response:", data.replies);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const postComment = async (item) => {
    setLoading(true)
    console.log("item id", item.id)
    console.log("description", text)
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.error("No token found in AsyncStorage");
        return;
      }
      if (!text) {
        Alert.alert("Validation Error", "Input cannot be empty");
        return;
      }

      const API_URL = "https://staging.ardent-training.com/api/post";
      const KEY = "eyJpdiI6ImpDdHdQL0NHYzVNQmwwYmE0NFMxbnc9PSIsInZhbHVlIjoiRmZPN2poWjg4OHJkR2xjOGg5SDgwSmg5M0lXMUhXeFhzbUJZZ05hT21MMmd1TUlpUlhEMWo1ekJXU1dTMThnT0szYTlMSlQva3BoODc3cDJhS2sxZE5KMDhyR1U0VlhoSUp1Z3pVSEwydk9KZHpYbWg5SjNjUjdoVFZFem51UFlRK28yemRVZ2NxWVYvVEJTSHZNWEJROXM4NnFubFVaU09UNDZYWSs4REpvYVdjdldaWVFYYlpPZFlpOWc0Z2cvSHA0YXlQMWVJMWlSeEFWakU2TzVyTXljM0xsMmVtMm5lLzMwWlZEbUlCZER3REZMWko0dTNPZGFSak5LRkdFNCIsIm1hYyI6IjIxYzNkNTM3MjVhOGVkN2Q5YjFjMDU2ZjYwM2QzM2MxMzVkYWIzODEwYmEyZDg1ODJiZjViMzUzZmU5NDBmYmIiLCJ0YWciOiIifQ==";

      const formData = new FormData();
      formData.append("forum_id", "1");
      formData.append("description", text);
      formData.append("status", "1");
      formData.append("parent_id", item.id);

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          ContentType: "multipart/form-data",
          "api-key": KEY,
        },
        body: formData,
      });

      const data = await response.json();
      console.log("Response:", data.replies);
      setSubmittedText(text);
      setText("");
      setLoading(false)
    } catch (error) {
      console.error("Error:", error);
    }
  };


  const toggleLike = async (post_id) => {
    const token = await AsyncStorage.getItem('token');
    const API_KEY = "eyJpdiI6ImpDdHdQL0NHYzVNQmwwYmE0NFMxbnc9PSIsInZhbHVlIjoiRmZPN2poWjg4OHJkR2xjOGg5SDgwSmg5M0lXMUhXeFhzbUJZZ05hT21MMmd1TUlpUlhEMWo1ekJXU1dTMThnT0szYTlMSlQva3BoODc3cDJhS2sxZE5KMDhyR1U0VlhoSUp1Z3pVSEwydk9KZHpYbWg5SjNjUjdoVFZFem51UFlRK28yemRVZ2NxWVYvVEJTSHZNWEJROXM4NnFubFVaU09UNDZYWSs4REpvYVdjdldaWVFYYlpPZFlpOWc0Z2cvSHA0YXlQMWVJMWlSeEFWakU2TzVyTXljM0xsMmVtMm5lLzMwWlZEbUlCZER3REZMWko0dTNPZGFSak5LRkdFNCIsIm1hYyI6IjIxYzNkNTM3MjVhOGVkN2Q5YjFjMDU2ZjYwM2QzM2MxMzVkYWIzODEwYmEyZDg1ODJiZjViMzUzZmU5NDBmYmIiLCJ0YWciOiIifQ==";

    setLikedPosts((prev) => ({
      ...prev,
      [post_id]: !prev[post_id],
    }));

    try {
      const response = await fetch('https://staging.ardent-training.com/api/post/toggle-like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          "api-key": API_KEY,
        },
        body: JSON.stringify({ post_id }),
      });

      const data = await response.json();
      console.log('Like toggled:', data);
    } catch (error) {
      console.error('Error toggling like:', error);
      setLikedPosts((prev) => ({
        ...prev,
        [post_id]: !prev[post_id],
      }));
    }
  };

  const toggleReplies = (commentId) => {
    setExpandedComment(expandedComment === commentId ? null : commentId);
  };

  const toggleInputField = (commentId) => {
    setSelectedCommentId(selectedCommentId === commentId ? null : commentId);
  };

  const renderItem = ({ item }) => (

    <View style={styles.Flatlist}>
      <View style={styles.profileContainer}>
        <View style={styles.initialsCircle}>
          <Text style={styles.initialsText}>
            {item.user.name.split(" ").map(word => word[0]).join("").toUpperCase()}
          </Text>
        </View>
        <Text style={{ fontSize: 16, color: '#191970' }}>{item.user.name}</Text>
      </View>
      <Text style={{ fontSize: 18, fontWeight: "500", color: '#191970', marginHorizontal: 25 }}>{item.title}</Text>
      <Text style={{ fontSize: 17, fontWeight: "400", color: 'black', marginHorizontal: 20, marginBottom: 40, }}>{item.description}</Text>

      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={{ flexDirection: 'row' }}
          onPress={() => toggleLike(item.id)}
        >
          <FontAwesome
            name={likedPosts[item.id] === false || likedPosts[item.id] === undefined
              ? (item.is_liked_by_you ? "heart" : "heart-o")
              : (likedPosts[item.id] ? "heart" : "heart-o")}
            size={17}
            color={likedPosts[item.id] === false || likedPosts[item.id] === undefined
              ? (item.is_liked_by_you ? "red" : "gray")
              : (likedPosts[item.id] ? "red" : "gray")}
            style={{ marginLeft: 10 }}
          />
          <Text style={{ marginLeft: 5 }}>{item.likes || 0}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => toggleInputField(item.id)}
        >
          <Text style={styles.CommentText}>Comment</Text>
        </TouchableOpacity>
      </View>

      {selectedCommentId === item.id && (
        <View style={styles.profileContainer}>
          <View style={styles.initialsCircle}>
          </View>
          <View style={[styles.inputContainer1, {}]}>
            <TextInput
              style={{ height: 100, width: '80%', borderWidth: 1, marginTop: 50, borderColor: 'grey', borderRadius: 10, padding: 10, textAlignVertical: 'top' }}
              placeholder="Insert text here......"
              placeholderTextColor="#696969"
              value={text}
              onChangeText={setText}
            />
            <View style={{ flexDirection: 'row' }}>

              <TouchableOpacity onPress={() => setSelectedCommentId(null)}>
                <View style={{ height: 20, width: 60, borderWidth: 1, borderRadius: 5, marginTop: 10, justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                  <Text>Cancel</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => postComment(item)}>
                <View style={{ height: 20, width: 60, borderWidth: 1, borderRadius: 5, marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                  <Text>Send</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {!selectedCommentId && (
        <View style={styles.profileContainer}>
          <View style={styles.initialsCircle}>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Type @ to mention another"
              placeholderTextColor="#696969"
              value={text}
              onChangeText={setText}
            />
          </View>
        </View>
      )}


      <TouchableOpacity onPress={() => toggleReplies(item.id)}>
        <View>
          <Text style={{ fontSize: 16, fontWeight: '700', color: "#191970", marginHorizontal: 20, marginTop: 20, marginBottom: 10 }}>
          {expandedComment === item.id ? `Comments` : `${item.replies.length} Comments`}
          </Text>
          
        </View>
      </TouchableOpacity>

      {expandedComment === item.id && item.replies.length > 0 && (
        <View style={{ marginLeft: 30, marginTop: 10 }}>
          {item.replies.map((reply) => (
            <View key={reply.id} style={{ marginBottom: 10 }}>

              <View style={styles.profileContainer}>
                <View style={[styles.initialsCircle, { width: 30, height: 30 }]}>
                </View>
                <Text style={{ fontWeight: '500', color: '#191970' }}>{reply.user.name}</Text>
              </View>
              <Text style={{ color: 'black', marginHorizontal: 60 }}>{reply.description}</Text>

              <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                {/* replies like */}
                <TouchableOpacity
                  style={{ marginLeft: 60, marginTop: 20, flexDirection: 'row', }}
                  onPress={() => setLiked(!liked)}
                >
                  <FontAwesome name={liked ? "heart" : "heart-o"} size={16} color={liked ? "red" : "gray"} />
                  <Text style={{ marginHorizontal: 5 }}>{item.likes.length || 0}</Text>
                </TouchableOpacity>

                <Text style={{ marginTop: 20, marginLeft: 30 }}>{item.replies.length || 0} replies</Text>
                <MaterialIcons name="comment" size={20} color="gray" style={{ marginHorizontal: 30, marginTop: 20 }} />
              </View>
            </View>
          ))}
        </View>
      )}

      {expandedComment === item.id && submittedText && item.replies.length > 0 && (
        <View style={{ marginLeft: 30, marginTop: 10 }}>
          {item.replies.map((reply) => (
            <View key={reply.id} style={{ marginBottom: 10 }}>

              <View style={styles.profileContainer}>
                <View style={[styles.initialsCircle, { width: 30, height: 30 }]}>
                </View>
                <Text style={{ fontWeight: '500', color: '#191970' }}>{username}</Text>
              </View>
              <Text style={{ color: 'black', marginHorizontal: 60 }}>{submittedText}</Text>

              <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                {/* replies like */}
                <TouchableOpacity
                  style={{ marginLeft: 60, marginTop: 20, flexDirection: 'row', }}
                  onPress={() => setLiked(!liked)}
                >
                  <FontAwesome name={liked ? "heart" : "heart-o"} size={16} color={liked ? "red" : "gray"} />
                  <Text style={{ marginHorizontal: 5 }}>{item.likes.length || 0}</Text>
                </TouchableOpacity>

                <Text style={{ marginTop: 20, marginLeft: 30 }}>{item.replies.length || 0} replies</Text>
                <MaterialIcons name="comment" size={20} color="gray" style={{ marginHorizontal: 30, marginTop: 20 }} />
              </View>
            </View>
          ))}
        </View>
      )}

    </View>
  );
  const renderItem1 = ({ item }) => (
    <View>
      <View style={styles.profileContainer2}>
        <View style={styles.initialsCircle2}>
          <Text style={styles.initialsText2}>
            {item.user.name.split(" ").map(word => word[0]).join("").toUpperCase()}
          </Text>
        </View>
        <Text style={{ fontSize: 14, fontWeight: "400", color: '#191970', marginHorizontal: 10 }}>
          {item.title}{"\n"}
          <Text style={{ fontSize: 12, fontWeight: "400", color: 'gray' }}>
            {item.replies.length || 0} comments
          </Text>
        </Text>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <MaterialIcons
            name={"arrow-back-ios"}
            size={24}
            color={"white"}
            style={styles.ArrowIcon}
          />
        </TouchableOpacity>

        <Text style={{ fontSize: 20, fontWeight: '600', color: "white", marginHorizontal: 30 }}>Student Forum</Text>
        <Image
          source={require('../Assets/Vertical.png')}
          style={styles.logo}
        />
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Tab1" && styles.activeTab]}
          onPress={() => setActiveTab("Tab1")}
        >
          <Text style={[styles.tabText, activeTab === "Tab1" && styles.activeText]}>RECENTPOST</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "Tab2" && styles.activeTab]}
          onPress={() => setActiveTab("Tab2")}
        >
          <Text style={[styles.tabText, activeTab === "Tab2" && styles.activeText]}>TRENDINGPOST</Text>
        </TouchableOpacity>
      </View>

      {/* Content Area */}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.content}>
          {activeTab === "Tab1" ? (
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={{ width: '100%' }}
            />

          ) : (
            <FlatList
              data={data}
              renderItem={renderItem1}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={{ flexGrow: 1 }}
            />
          )}
        </View>

        {activeTab === "Tab1" && (
          <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
            {loading ? (
              <ActivityIndicator size="large" color="blue" />
            ) : (
              <Button
                title="Load More"
                onPress={handleLoadMore}
                disabled={!hasMore}
                color={hasMore ? "#0096FF" : "gray"}
              />
            )}
          </View>
        )}

      </ScrollView>






      {/* Plus Button at the bottom-right */}
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.plusButton}
      >
        <MaterialIcons name="add" size={30} color="white" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.modalTitle}>Create Post</Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeIcon}
              >
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>

            <Text style={{ fontSize: 20, color: 'black', marginBottom: 10, marginTop: 20 }}>Post Title</Text>
            {/* Title input */}
            <TextInput
              value={title}
              onChangeText={setTitle}
              style={styles.input}
            />

            <Text style={{ fontSize: 20, color: 'black', marginBottom: 10, marginTop: 20 }}>Post</Text>
            {/* Description input */}
            <TextInput
              value={description}
              onChangeText={setDescription}
              style={[styles.input, { height: 100 }]}
              multiline
              textAlignVertical='top'
            />

            <View style={{ flexDirection: 'row' }}>
              <View style={{ width: '20%', height: 25, borderWidth: 1, borderRadius: 5, marginRight: 10, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'black', }}>IMAGE</Text>
              </View>
              <View style={{ width: '20%', height: 25, borderWidth: 1, borderRadius: 5, marginRight: 10, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'black' }}>VIDEO</Text>
              </View>
              <View style={{ width: '20%', height: 25, borderWidth: 1, borderRadius: 5, marginRight: 10, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'black' }}>FILE</Text>
              </View>
            </View>

            <TouchableOpacity onPress={postToForum} style={styles.modalButtons}>
              <Text style={{ fontSize: 18, fontWeight: '500', color: 'white' }}>POST</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  )
}

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
    marginHorizontal: 20
  },

  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: "#FE8E91",
  },
  tabText: {
    fontSize: 14,
    color: "#555",
  },
  activeText: {
    fontWeight: '400',
    color: "black",
  },
  content: {
    padding: 20,
  },
  contentText: {
    fontSize: 18,
    color: "#333",

  },
  Flatlist: {
    width: '300%',
    backgroundColor: 'white',
    marginBottom: 50,
    elevation: 4,

  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 20,
    marginHorizontal: 20,
  },
  initialsCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F0FFFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    elevation: 5,
    marginBottom: 5
  },
  initialsText: {
    color: "#7393B3",
    fontSize: 16,
    fontWeight: '400',
  },

  profileContainer2: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
    marginHorizontal: 10,
  },
  initialsCircle2: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: "#F0FFFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    elevation: 5
  },
  initialsText2: {
    color: "#7393B3",
    fontSize: 16,
    fontWeight: '400',
  },

  actionsContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 0
  },
  CommentText: {
    marginHorizontal: 220
  },
  inputContainer: {
    elevation: 10,
    width: "25%",
  },
  inputContainer1: {
    elevation: 10,
    width: "30%",
  },
  input: {
    height: 40,
    width: "80%",
    backgroundColor: '#DCDCDC',
    borderRadius: 8,
    paddingHorizontal: 10,

  },
  plusButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#FE8E91',
    borderRadius: 30,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3.5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    color: 'black'
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  modalButtons: {
    height: '12%',
    width: '100%',
    backgroundColor: '#FE8E91',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50
  },
})