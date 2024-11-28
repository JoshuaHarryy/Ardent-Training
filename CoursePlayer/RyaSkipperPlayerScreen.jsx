import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import HTMLView from 'react-native-htmlview';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { WebView } from 'react-native-webview';
import * as Progress from 'react-native-progress';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import CheckBox from '@react-native-community/checkbox';
import Tick from '../Components/Tick';



export default function RyaSkipperPlayerScreen({ navigation }) {

  const [courseData, setCourseData] = useState();
  const [courseData1, setCourseData1] = useState();
  const [loading, setLoading] = useState();
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [selectedLesson, setSelectedLesson] = React.useState({
    lessonId: null,
    chapterIndex: null,
    lessonIndex: null,
  });

  const toggleCompletion = (chapterIndex, lessonIndex, isComplete) => {
    const updatedCourseData = { ...courseData };
    updatedCourseData.chapters[chapterIndex].lessons[lessonIndex].isCompleted = isComplete ? 1 : 0;

    console.log(
      `Lesson ${lessonIndex} of chapter ${chapterIndex} completion status updated to:`,
      updatedCourseData.chapters[chapterIndex].lessons[lessonIndex].isCompleted
    );

    setCourseData(updatedCourseData);
  };

  const totalChapters = courseData?.chapters?.length || 0;
  const progress = totalChapters > 0 ? (currentChapterIndex + 1) / totalChapters : 0;

  const totalLessons = courseData?.chapters
    ?.flatMap(chapter => chapter.lessons)
    .length || 0;

  const progress1 = totalLessons > 0 ? (currentLessonIndex + 1) / totalLessons : 0;

  const toggleChapter = (index) => {
    setSelectedChapterIndex(selectedChapterIndex === index ? null : index);
  };

  const closeWebView = () => {
    setVideoUrl(null);
  }

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('https://staging.ardent-training.com/api/course/1', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "api-key": "eyJpdiI6ImpDdHdQL0NHYzVNQmwwYmE0NFMxbnc9PSIsInZhbHVlIjoiRmZPN2poWjg4OHJkR2xjOGg5SDgwSmg5M0lXMUhXeFhzbUJZZ05hT21MMmd1TUlpUlhEMWo1ekJXU1dTMThnT0szYTlMSlQva3BoODc3cDJhS2sxZE5KMDhyR1U0VlhoSUp1Z3pVSEwydk9KZHpYbWg5SjNjUjdoVFZFem51UFlRK28yemRVZ2NxWVYvVEJTSHZNWEJROXM4NnFubFVaU09UNDZYWSs4REpvYVdjdldaWVFYYlpPZFlpOWc0Z2cvSHA0YXlQMWVJMWlSeEFWakU2TzVyTXljM0xsMmVtMm5lLzMwWlZEbUlCZER3REZMWko0dTNPZGFSak5LRkdFNCIsIm1hYyI6IjIxYzNkNTM3MjVhOGVkN2Q5YjFjMDU2ZjYwM2QzM2MxMzVkYWIzODEwYmEyZDg1ODJiZjViMzUzZmU5NDBmYmIiLCJ0YWciOiIifQ=="
          },
        });

        const data = await response.json();
        setCourseData(data.data)

      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // useEffect(() => {
  //   if (courseData) {
  //     console.log('Updated courseData:', courseData.chapters[0].lessons[0]);
  //   }
  // }, [courseData]);
  

  const markLessonAsCompleted = async (lessonId) => {
    const API_URL = "https://staging.ardent-training.com/api/mark-lesson-as-completed";
    const AUTH_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiMDAwZTRjMGVhMjlkZmFjMjQ3MjgwODg4NzhkNGMyZmVlYTk0YjdmYjkzODA5ZDIxZTlhMWY5Y2MxZGY1NWE3OWVlOWI5ODUwMmYzNDE4ZmMiLCJpYXQiOjE3Mjk1ODYwOTEuNTE0MDc0LCJuYmYiOjE3Mjk1ODYwOTEuNTE0MDc2LCJleHAiOjE3NDUzMTA4OTEuNTAxMDA4LCJzdWIiOiI2ODg0Iiwic2NvcGVzIjpbXX0.ZmQdv7CIgnHDXwEoic1Ovqi2VB_OMewVjUhfUmjEKutqVh-hxG6gNDlVXM3EECfKH5n8umwG-BVttsyJiw38t0zUnthfo7P3U6mVaTu1POhUlxLk8942GPj6ntb0_WI-KhMpYFhoedg-905tJDBzoe4oHlR5rN4XeYgnP_AnmnlZej-thCDOudRB_Z5tk0SE76aLzU_zEiffp9vxdaWdEOwbFfqF9stCDWeoE6RDMNUNUbderRZtz92dDBDkYOXvalVHHQJi3LXJWNXar7NUccGLYTkGUiDU8n6dgkAMijxaeYC1fGoHunf0TK20m92hc21YDwMjW8Eh7Tl2gQ8DLZpFACbkt0YQfMAn-F_bbQFElo1or3xGGGlodWSUcC5h-hQ9w_xNlWz4eu8M3-_EWOfgiwj5B0GRo5vXLpw3mIPxw1P1t1pqxvez64aO2gaRngpKK9graFE0RiSubrNUfk9cDKY9uXHZ1F6yA0F6gFd2Ey0OliyA5rw4T7HGOV3LBGbFM7ZlL9J6CDAD10gSoNpgbfy4FnbdxPBw7WD8rjUIbhl5Ppkt8OGqWsrYm97aCKMf41oQUvjAipNbzV1FzcGP0fVI7BZvnYJ-wWHMGaCoHVdMJG5pChK3BX2Fh9dCPbQvBcdcSc7gNhfHVBTqJSQFW_5ucbBMIyJs4dgx_4s"; 
    const API_KEY = "eyJpdiI6ImpDdHdQL0NHYzVNQmwwYmE0NFMxbnc9PSIsInZhbHVlIjoiRmZPN2poWjg4OHJkR2xjOGg5SDgwSmg5M0lXMUhXeFhzbUJZZ05hT21MMmd1TUlpUlhEMWo1ekJXU1dTMThnT0szYTlMSlQva3BoODc3cDJhS2sxZE5KMDhyR1U0VlhoSUp1Z3pVSEwydk9KZHpYbWg5SjNjUjdoVFZFem51UFlRK28yemRVZ2NxWVYvVEJTSHZNWEJROXM4NnFubFVaU09UNDZYWSs4REpvYVdjdldaWVFYYlpPZFlpOWc0Z2cvSHA0YXlQMWVJMWlSeEFWakU2TzVyTXljM0xsMmVtMm5lLzMwWlZEbUlCZER3REZMWko0dTNPZGFSak5LRkdFNCIsIm1hYyI6IjIxYzNkNTM3MjVhOGVkN2Q5YjFjMDU2ZjYwM2QzM2MxMzVkYWIzODEwYmEyZDg1ODJiZjViMzUzZmU5NDBmYmIiLCJ0YWciOiIifQ==";
  
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
          "Content-Type": "application/json",
          Accept: "application/json",
          "api-key": API_KEY,
        },
        body: JSON.stringify({
          lesson_id: lessonId,
        }),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to mark the lesson as completed");
      }
  
      const data = await response.json();
      console.log("Lesson marked as completed:", data);
      console.log(lessonId)
      return data;
    } catch (error) {
      console.error("Error marking lesson as completed:", error.message);
      throw error;
    }
  };
  
  
  // markLessonAsCompleted("1") 
  //   .then((data) => console.log(data))
  //   .catch((error) => console.error(error));


  const markLessonInCompleted = async (lessonId) => {
    const API_URL = "https://staging.ardent-training.com/api/mark-lesson-as-incomplete";
    const AUTH_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiMDAwZTRjMGVhMjlkZmFjMjQ3MjgwODg4NzhkNGMyZmVlYTk0YjdmYjkzODA5ZDIxZTlhMWY5Y2MxZGY1NWE3OWVlOWI5ODUwMmYzNDE4ZmMiLCJpYXQiOjE3Mjk1ODYwOTEuNTE0MDc0LCJuYmYiOjE3Mjk1ODYwOTEuNTE0MDc2LCJleHAiOjE3NDUzMTA4OTEuNTAxMDA4LCJzdWIiOiI2ODg0Iiwic2NvcGVzIjpbXX0.ZmQdv7CIgnHDXwEoic1Ovqi2VB_OMewVjUhfUmjEKutqVh-hxG6gNDlVXM3EECfKH5n8umwG-BVttsyJiw38t0zUnthfo7P3U6mVaTu1POhUlxLk8942GPj6ntb0_WI-KhMpYFhoedg-905tJDBzoe4oHlR5rN4XeYgnP_AnmnlZej-thCDOudRB_Z5tk0SE76aLzU_zEiffp9vxdaWdEOwbFfqF9stCDWeoE6RDMNUNUbderRZtz92dDBDkYOXvalVHHQJi3LXJWNXar7NUccGLYTkGUiDU8n6dgkAMijxaeYC1fGoHunf0TK20m92hc21YDwMjW8Eh7Tl2gQ8DLZpFACbkt0YQfMAn-F_bbQFElo1or3xGGGlodWSUcC5h-hQ9w_xNlWz4eu8M3-_EWOfgiwj5B0GRo5vXLpw3mIPxw1P1t1pqxvez64aO2gaRngpKK9graFE0RiSubrNUfk9cDKY9uXHZ1F6yA0F6gFd2Ey0OliyA5rw4T7HGOV3LBGbFM7ZlL9J6CDAD10gSoNpgbfy4FnbdxPBw7WD8rjUIbhl5Ppkt8OGqWsrYm97aCKMf41oQUvjAipNbzV1FzcGP0fVI7BZvnYJ-wWHMGaCoHVdMJG5pChK3BX2Fh9dCPbQvBcdcSc7gNhfHVBTqJSQFW_5ucbBMIyJs4dgx_4s"; 
    const API_KEY = "eyJpdiI6ImpDdHdQL0NHYzVNQmwwYmE0NFMxbnc9PSIsInZhbHVlIjoiRmZPN2poWjg4OHJkR2xjOGg5SDgwSmg5M0lXMUhXeFhzbUJZZ05hT21MMmd1TUlpUlhEMWo1ekJXU1dTMThnT0szYTlMSlQva3BoODc3cDJhS2sxZE5KMDhyR1U0VlhoSUp1Z3pVSEwydk9KZHpYbWg5SjNjUjdoVFZFem51UFlRK28yemRVZ2NxWVYvVEJTSHZNWEJROXM4NnFubFVaU09UNDZYWSs4REpvYVdjdldaWVFYYlpPZFlpOWc0Z2cvSHA0YXlQMWVJMWlSeEFWakU2TzVyTXljM0xsMmVtMm5lLzMwWlZEbUlCZER3REZMWko0dTNPZGFSak5LRkdFNCIsIm1hYyI6IjIxYzNkNTM3MjVhOGVkN2Q5YjFjMDU2ZjYwM2QzM2MxMzVkYWIzODEwYmEyZDg1ODJiZjViMzUzZmU5NDBmYmIiLCJ0YWciOiIifQ==";
  
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
          "Content-Type": "application/json",
          Accept: "application/json",
          "api-key": API_KEY,
        },
        body: JSON.stringify({
          lesson_id: lessonId,
        }),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to mark the lesson In completed");
      }
  
      const data = await response.json();
      console.log("Lesson marked In completed:", data);
      console.log(lessonId)
      return data;
    } catch (error) {
      console.error("Error marking lesson In completed:", error.message);
      throw error;
    }
  };
  
  
  // markLessonInCompleted("1") 
  //   .then((data) => console.log(data))
  //   .catch((error) => console.error(error));
  

  const customTick = (chapterIndex, lessonIndex) => (
    <TouchableOpacity
      style={{
        width: 17,
        height: 17,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'grey',
        backgroundColor: courseData?.chapters?.[chapterIndex]?.lessons?.[lessonIndex]?.isCompleted
          ? 'green'
          : 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginLeft: 10
      }}
    >
      {/* If completed, display a tick icon */}
      {courseData?.chapters?.[chapterIndex]?.lessons?.[lessonIndex]?.isCompleted && (
        <Icon name="check" size={13} color="white" />
      )}
    </TouchableOpacity>
  );

  return (
    <View>
      {/* WebView for displaying video */}
      {videoUrl && (
        <View style={styles.fullScreenWebView}>
          <WebView
            source={{ uri: videoUrl }}
            style={{ flex: 1 }}
            javaScriptEnabled={true}
            allowsInlineMediaPlayback={true}
          />
        </View>
      )}
      <ScrollView>
        <View style={styles.container}>



          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => {
              if (videoUrl) {
                closeWebView();
              } else {
                setVideoUrl(courseData?.chapters[0].lessons[0].courseLink);
              }
            }}>
              <Icon name="menu" size={25} color="white" />
            </TouchableOpacity>
            <Image
              source={require('../Assets/Vertical.png')}
              style={styles.logo}
            />
          </View>



          {/* Three Options at the Top */}
          {videoUrl ? (
            <View style={{ height: 55, width: '100%', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
              <View style={{ justifyContent: 'center', alignItems: 'center', height: 40, width: '25%', backgroundColor: '#173A70', borderRadius: 7, marginHorizontal: 2 }}>
                <TouchableOpacity
                  onPress={() => markLessonInCompleted(selectedLesson.lessonId)}
                  style={styles.button}>
                  <Text style={{ color: 'white', fontSize: 11 }}>Mark Incomplete</Text>
                </TouchableOpacity>
              </View>


              <View style={{ justifyContent: 'center', alignItems: 'center', height: 40, width: '25%', backgroundColor: '#173A70', borderRadius: 7, marginHorizontal: 2 }}>
                <TouchableOpacity
                   onPress={() => {
                    if (selectedLesson) {
                      markLessonAsCompleted(selectedLesson.lessonId); 
                    } else {
                      alert("Please select a lesson first.");
                    }
                  }}
                  style={styles.button}
                >
                  <Text style={{ color: 'white', fontSize: 11 }}>Mark as complete</Text>
                </TouchableOpacity>
              </View>


              <View style={{ justifyContent: 'center', alignItems: 'center', height: 40, width: '20%', backgroundColor: '#173A70', borderRadius: 7, marginHorizontal: 2 }}>
                <Text style={{ color: 'white', fontSize: 11 }}>Discussion</Text>
              </View>
            </View>
          ) : (
            <View style={{ height: 50, width: '100%', backgroundColor: '#173A70', alignItems: 'flex-end', }}>
              <View style={{ height: 40, width: '27%', backgroundColor: '#FF9090', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'white', fontSize: 13 }}>Buy Full Course</Text>
              </View>
            </View>
          )}


          {/* back to classroom */}
          <TouchableOpacity onPress={() => { navigation.navigate('Home') }}>
            <View style={{ flexDirection: 'row', marginTop: 10, marginHorizontal: 30 }}>
              <MaterialIcons name={"arrow-back-ios"} size={24} color={"black"} style={styles.ArrowIcon} />
              <Text style={{ color: 'black', fontSize: 15, marginTop: 1 }}>Back to Classroom</Text>
            </View>
          </TouchableOpacity>



          <View style={{ flexDirection: 'row' }}>
            <Image style={{ height: 60, width: 80, marginTop: 20, marginHorizontal: 20 }}
              source={

                require('../Assets/DaySkipper.jpg')
              }
            />


            <View>
              <Text style={{ color: 'black', marginHorizontal: 0, marginTop: 40 }}>{courseData?.name}</Text>
            </View>

          </View>

          {/* Progress Bar */}
          <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>

            <Progress.Bar
              width={null}
              height={1}
              color="#e0e0e0"
              borderRadius={5}
            />
            <Text style={{ marginTop: 5 }}>{Math.round(progress * 100)}% completed</Text>
          </View>




          {/* Chapter 1  */}
          <View style={{ marginHorizontal: 20, marginTop: 10 }}>
            {courseData?.chapters && courseData.chapters[0] && (
              <View>
                <View style={{ flexDirection: 'row' }}>
                  <AnimatedCircularProgress
                    size={30}
                    width={2}
                    fill={progress1}
                    tintColor="#FF0000"
                    backgroundColor="#e0e0e0"
                    rotation={0}
                    lineCap="round"
                  >

                  </AnimatedCircularProgress>
                  {/* Display the current chapter */}
                  <TouchableOpacity onPress={() => toggleChapter(0)}>
                    <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 5, marginTop: 4 }}>
                      {courseData.chapters[0].name}
                    </Text>
                  </TouchableOpacity>
                </View>



                {/* If this chapter is selected, show the lessons */}
                {selectedChapterIndex === 0 && courseData.chapters[0].lessons?.[0] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[0].lessons[0].courseLink);
                      setSelectedLesson({ lessonId: courseData.chapters[0].lessons[0].id, chapterIndex: 0, lessonIndex: 0 }); 
                    }}
                  >

                    <View style={{ marginLeft: 20, marginTop: 20 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[0].lessons[0].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(0, 0)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[0].lessons[0].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 2 */}
                {selectedChapterIndex === 0 && courseData.chapters[0].lessons?.[1] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[0].lessons[1].courseLink);
                      setSelectedLesson({ lessonId: courseData.chapters[0].lessons[1].id, chapterIndex: 0, lessonIndex: 0 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 20 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[0].lessons[1].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {customTick(0, 1)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[0].lessons[1].name}
                        </Text>
                        {/* Add more lesson details like link, file, etc. */}
                      </View>
                    </View>
                  </TouchableOpacity>
                )}


                {/* lesson 3 */}
                {selectedChapterIndex === 0 && courseData.chapters[0].lessons?.[2] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[0].lessons[2].courseLink);
                      setSelectedLesson({ chapterIndex: 0, lessonIndex: 2 }); // Update indices
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 20 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[0].lessons[2].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {customTick(0, 2)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[0].lessons[2].name}
                        </Text>
                        {/* Add more lesson details like link, file, etc. */}
                      </View>
                    </View>
                  </TouchableOpacity>
                )}


                {/* lesson 4 */}
                {selectedChapterIndex === 0 && courseData.chapters[0].lessons?.[3] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[0].lessons[3].courseLink);
                      setSelectedLesson({ chapterIndex: 0, lessonIndex: 3 }); // Update indices
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 20 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[0].lessons[3].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {customTick(0, 3)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[0].lessons[3].name}
                        </Text>
                        {/* Add more lesson details like link, file, etc. */}
                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 5 */}
                {selectedChapterIndex === 0 && courseData.chapters[0].lessons?.[4] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[0].lessons[4].courseLink);
                      setSelectedLesson({ chapterIndex: 0, lessonIndex: 4 }); // Update indices
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 20, marginBottom: 20 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[0].lessons[4].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {customTick(0, 4)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[0].lessons[4].name}
                        </Text>
                        {/* Add more lesson details like link, file, etc. */}
                      </View>
                    </View>
                  </TouchableOpacity>
                )}

              </View>
            )}
          </View>








          {/* Chapter 2 */}
          <View style={{ marginHorizontal: 20, marginTop: 10 }}>
            {courseData?.chapters && courseData.chapters[1] && (
              <View>
                <View style={{ flexDirection: 'row' }}>
                  <AnimatedCircularProgress
                    size={30}
                    width={2}
                    fill={progress1}
                    tintColor="#FF0000"
                    backgroundColor="#e0e0e0"
                    rotation={0}
                    lineCap="round"
                  >

                  </AnimatedCircularProgress>
                  {/* Display the current chapter */}
                  <TouchableOpacity onPress={() => toggleChapter(1)}>
                    <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 5, marginTop: 4 }}>
                      {courseData.chapters[1].name}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* lesson 1 */}
                {selectedChapterIndex === 1 && courseData.chapters[1].lessons?.[0] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[1].lessons[0].courseLink);
                      setSelectedLesson({ chapterIndex: 1, lessonIndex: 0 }); // Update indices
                    }}
                  >

                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[1].lessons[0].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(1, 0)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[1].lessons[0].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* Lesson 2 */}
                {selectedChapterIndex === 1 && courseData.chapters[1].lessons?.[1] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[1].lessons[1].courseLink);
                      setSelectedLesson({ chapterIndex: 1, lessonIndex: 1 }); // Update indices
                    }}
                  >

                    <View style={{ marginLeft: 20, marginTop: 20 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[1].lessons[1].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(1, 1)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[1].lessons[1].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* Lesson 3 */}
                {selectedChapterIndex === 1 && courseData.chapters[1].lessons?.[2] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[1].lessons[2].courseLink);
                      setSelectedLesson({ chapterIndex: 1, lessonIndex: 2 }); // Update indices
                    }}
                  >

                    <View style={{ marginLeft: 20, marginTop: 20 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[1].lessons[2].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(1, 2)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[1].lessons[2].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* Lesson 4 */}
                {selectedChapterIndex === 1 && courseData.chapters[1].lessons?.[3] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[1].lessons[3].courseLink);
                      setSelectedLesson({ chapterIndex: 1, lessonIndex: 3 }); // Update indices
                    }}
                  >

                    <View style={{ marginLeft: 20, marginTop: 20 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[1].lessons[3].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(1, 3)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[1].lessons[3].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* Lesson 5 */}
                {selectedChapterIndex === 1 && courseData.chapters[1].lessons?.[4] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[1].lessons[4].courseLink);
                      setSelectedLesson({ chapterIndex: 1, lessonIndex: 4 }); // Update indices
                    }}
                  >

                    <View style={{ marginLeft: 20, marginTop: 20 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[1].lessons[4].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(1, 4)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[1].lessons[4].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* Lesson 6 */}
                {selectedChapterIndex === 1 && courseData.chapters[1].lessons?.[5] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[1].lessons[5].courseLink);
                      setSelectedLesson({ chapterIndex: 1, lessonIndex: 5 }); // Update indices
                    }}
                  >

                    <View style={{ marginLeft: 20, marginTop: 20 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[1].lessons[5].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(1, 5)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[1].lessons[5].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* Lesson 7 */}
                {selectedChapterIndex === 1 && courseData.chapters[1].lessons?.[6] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[1].lessons[6].courseLink);
                      setSelectedLesson({ chapterIndex: 1, lessonIndex: 6 }); // Update indices
                    }}
                  >

                    <View style={{ marginLeft: 20, marginTop: 20 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[1].lessons[6].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(1, 6)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[1].lessons[6].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* Lesson 8 */}
                {selectedChapterIndex === 1 && courseData.chapters[1].lessons?.[6] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[1].lessons[6].courseLink);
                      setSelectedLesson({ chapterIndex: 1, lessonIndex: 6 }); // Update indices
                    }}
                  >

                    <View style={{ marginLeft: 20, marginTop: 20 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[1].lessons[6].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(1, 6)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[1].lessons[6].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}


                {/* Lesson 9 */}
                {selectedChapterIndex === 1 && courseData.chapters[1].lessons?.[7] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[1].lessons[7].courseLink);
                      setSelectedLesson({ chapterIndex: 1, lessonIndex: 7 }); // Update indices
                    }}
                  >

                    <View style={{ marginLeft: 20, marginTop: 20 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[1].lessons[7].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(1, 7)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[1].lessons[7].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* Lesson 10 */}
                {selectedChapterIndex === 1 && courseData.chapters[1].lessons?.[8] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[1].lessons[8].courseLink);
                      setSelectedLesson({ chapterIndex: 1, lessonIndex: 7 }); // Update indices
                    }}
                  >

                    <View style={{ marginLeft: 20, marginTop: 20 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[1].lessons[8].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(1, 8)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[1].lessons[8].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* Lesson 11 */}
                {selectedChapterIndex === 1 && courseData.chapters[1].lessons?.[9] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[1].lessons[9].courseLink);
                      setSelectedLesson({ chapterIndex: 1, lessonIndex: 7 }); // Update indices
                    }}
                  >

                    <View style={{ marginLeft: 20, marginTop: 20 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[1].lessons[9].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(1, 9)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[1].lessons[9].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* Lesson 12 */}
                {selectedChapterIndex === 1 && courseData.chapters[1].lessons?.[10] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[1].lessons[10].courseLink);
                      setSelectedLesson({ chapterIndex: 1, lessonIndex: 7 }); // Update indices
                    }}
                  >

                    <View style={{ marginLeft: 20, marginTop: 20 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[1].lessons[10].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(1, 10)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[1].lessons[10].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>


          {/* Chapter 3 */}
          <View style={{ marginHorizontal: 20, marginTop: 10 }}>
            {courseData?.chapters && courseData.chapters[2] && (
              <View>
                <View style={{ flexDirection: 'row' }}>
                  <AnimatedCircularProgress
                    size={30}
                    width={2}
                    fill={progress1}
                    tintColor="#FF0000"
                    backgroundColor="#e0e0e0"
                    rotation={0}
                    lineCap="round"
                  >

                  </AnimatedCircularProgress>
                  {/* Display the current chapter */}
                  <TouchableOpacity onPress={() => toggleChapter(2)}>
                    <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 5, marginTop: 4 }}>
                      {courseData.chapters[2].name}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* lesson 1 */}
                {selectedChapterIndex === 2 && courseData.chapters[2].lessons?.[0] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[2].lessons[0].courseLink);
                      setSelectedLesson({ chapterIndex: 1, lessonIndex: 0 }); // Update indices
                    }}
                  >

                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[2].lessons[0].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(1, 0)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[2].lessons[0].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}


                {/* lesson 2*/}
                {selectedChapterIndex === 2 && courseData.chapters[2].lessons?.[1] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[2].lessons[1].courseLink);
                      setSelectedLesson({ chapterIndex: 1, lessonIndex: 1 }); // Update indices
                    }}
                  >

                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[2].lessons[1].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(1, 1)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[2].lessons[1].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 3*/}
                {selectedChapterIndex === 2 && courseData.chapters[2].lessons?.[2] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[2].lessons[2].courseLink);
                      setSelectedLesson({ chapterIndex: 1, lessonIndex: 2 }); // Update indices
                    }}
                  >

                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[2].lessons[2].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(1, 2)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[2].lessons[2].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 4*/}
                {selectedChapterIndex === 2 && courseData.chapters[2].lessons?.[3] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[2].lessons[3].courseLink);
                      setSelectedLesson({ chapterIndex: 1, lessonIndex: 3 }); // Update indices
                    }}
                  >

                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[2].lessons[3].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(1, 3)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[2].lessons[3].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 5*/}
                {selectedChapterIndex === 2 && courseData.chapters[2].lessons?.[4] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[2].lessons[4].courseLink);
                      setSelectedLesson({ chapterIndex: 1, lessonIndex: 4 }); // Update indices
                    }}
                  >

                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[2].lessons[4].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(1, 4)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[2].lessons[4].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 6*/}
                {selectedChapterIndex === 2 && courseData.chapters[2].lessons?.[5] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[2].lessons[5].courseLink);
                      setSelectedLesson({ chapterIndex: 1, lessonIndex: 5 }); // Update indices
                    }}
                  >

                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[2].lessons[5].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(1, 5)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[2].lessons[5].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 7*/}
                {selectedChapterIndex === 2 && courseData.chapters[2].lessons?.[6] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[2].lessons[6].courseLink);
                      setSelectedLesson({ chapterIndex: 1, lessonIndex: 6 }); // Update indices
                    }}
                  >

                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[2].lessons[6].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(1, 6)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[2].lessons[6].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 8*/}
                {selectedChapterIndex === 2 && courseData.chapters[2].lessons?.[7] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[2].lessons[7].courseLink);
                      setSelectedLesson({ chapterIndex: 1, lessonIndex: 7 }); // Update indices
                    }}
                  >

                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[2].lessons[7].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(1, 7)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[2].lessons[7].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 9*/}
                {selectedChapterIndex === 2 && courseData.chapters[2].lessons?.[8] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[2].lessons[8].courseLink);
                      setSelectedLesson({ chapterIndex: 1, lessonIndex: 8 }); // Update indices
                    }}
                  >

                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[2].lessons[8].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(1, 8)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[2].lessons[8].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 10*/}
                {selectedChapterIndex === 2 && courseData.chapters[2].lessons?.[9] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[2].lessons[9].courseLink);
                      setSelectedLesson({ chapterIndex: 1, lessonIndex: 9 }); // Update indices
                    }}
                  >

                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[2].lessons[9].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(1, 9)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[2].lessons[9].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}


                {/* lesson 11*/}
                {selectedChapterIndex === 2 && courseData.chapters[2].lessons?.[10] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[2].lessons[10].courseLink);
                      setSelectedLesson({ chapterIndex: 1, lessonIndex: 10 }); // Update indices
                    }}
                  >

                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[2].lessons[10].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(1, 10)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[2].lessons[10].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}


                {/* lesson 12*/}
                {selectedChapterIndex === 2 && courseData.chapters[2].lessons?.[11] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[2].lessons[11].courseLink);
                      setSelectedLesson({ chapterIndex: 1, lessonIndex: 11 }); // Update indices
                    }}
                  >

                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[2].lessons[11].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(1, 11)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[2].lessons[11].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 13*/}
                {selectedChapterIndex === 2 && courseData.chapters[2].lessons?.[12] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[2].lessons[12].courseLink);
                      setSelectedLesson({ chapterIndex: 1, lessonIndex: 12 }); // Update indices
                    }}
                  >

                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[2].lessons[12].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(1, 12)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[2].lessons[12].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 14*/}
                {selectedChapterIndex === 2 && courseData.chapters[2].lessons?.[13] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[2].lessons[13].courseLink);
                      setSelectedLesson({ chapterIndex: 1, lessonIndex: 13 }); // Update indices
                    }}
                  >

                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[2].lessons[13].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(1, 13)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[2].lessons[13].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 15*/}
                {selectedChapterIndex === 2 && courseData.chapters[2].lessons?.[14] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[2].lessons[14].courseLink);
                      setSelectedLesson({ chapterIndex: 1, lessonIndex: 14 }); // Update indices
                    }}
                  >

                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[2].lessons[14].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(1, 14)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[2].lessons[14].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 16*/}
                {selectedChapterIndex === 2 && courseData.chapters[2].lessons?.[15] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[2].lessons[15].courseLink);
                      setSelectedLesson({ chapterIndex: 1, lessonIndex: 15 }); // Update indices
                    }}
                  >

                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[2].lessons[15].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(1, 15)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[2].lessons[15].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 17*/}
                {selectedChapterIndex === 2 && courseData.chapters[2].lessons?.[16] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[2].lessons[16].courseLink);
                      setSelectedLesson({ chapterIndex: 1, lessonIndex: 16 }); // Update indices
                    }}
                  >

                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[2].lessons[16].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(1, 16)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[2].lessons[16].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}


                {/* lesson 18*/}
                {selectedChapterIndex === 2 && courseData.chapters[2].lessons?.[17] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[2].lessons[17].courseLink);
                      setSelectedLesson({ chapterIndex: 1, lessonIndex: 17 }); // Update indices
                    }}
                  >

                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[2].lessons[17].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(1, 17)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[2].lessons[17].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 19*/}
                {selectedChapterIndex === 2 && courseData.chapters[2].lessons?.[18] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[2].lessons[18].courseLink);
                      setSelectedLesson({ chapterIndex: 1, lessonIndex: 18 }); // Update indices
                    }}
                  >

                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[2].lessons[18].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(1, 18)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9, marginBottom: 20 }}>
                          {courseData.chapters[2].lessons[18].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

              </View>
            )}
          </View>

          {/* Chapter 4 */}
          <View style={{ marginHorizontal: 20, marginTop: 10 }}>
            {courseData?.chapters && courseData.chapters[3] && (
              <View>
                <View style={{ flexDirection: 'row' }}>
                  <AnimatedCircularProgress
                    size={30}
                    width={2}
                    fill={progress1}
                    tintColor="#FF0000"
                    backgroundColor="#e0e0e0"
                    rotation={0}
                    lineCap="round"
                  >

                  </AnimatedCircularProgress>
                  {/* Display the current chapter */}
                  <TouchableOpacity onPress={() => toggleChapter(3)}>
                    <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 5, marginTop: 4 }}>
                      {courseData.chapters[3].name}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* lesson 1 */}
                {selectedChapterIndex === 3 && courseData.chapters[3].lessons?.[0] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[3].lessons[0].courseLink);
                      setSelectedLesson({ chapterIndex: 3, lessonIndex: 0 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[3].lessons[0].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(3, 0)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[3].lessons[0].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 2*/}
                {selectedChapterIndex === 3 && courseData.chapters[3].lessons?.[1] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[3].lessons[1].courseLink);
                      setSelectedLesson({ chapterIndex: 3, lessonIndex: 1 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[3].lessons[1].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(3, 1)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[3].lessons[1].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 3*/}
                {selectedChapterIndex === 3 && courseData.chapters[3].lessons?.[2] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[3].lessons[2].courseLink);
                      setSelectedLesson({ chapterIndex: 3, lessonIndex: 2 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[3].lessons[2].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(3, 2)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[3].lessons[2].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 4*/}
                {selectedChapterIndex === 3 && courseData.chapters[3].lessons?.[3] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[3].lessons[3].courseLink);
                      setSelectedLesson({ chapterIndex: 3, lessonIndex: 3 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[3].lessons[3].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(3, 3)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[3].lessons[3].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 5*/}
                {selectedChapterIndex === 3 && courseData.chapters[3].lessons?.[4] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[3].lessons[4].courseLink);
                      setSelectedLesson({ chapterIndex: 3, lessonIndex: 4 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[3].lessons[4].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(3, 4)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[3].lessons[4].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 6*/}
                {selectedChapterIndex === 3 && courseData.chapters[3].lessons?.[5] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[3].lessons[5].courseLink);
                      setSelectedLesson({ chapterIndex: 3, lessonIndex: 5 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[3].lessons[5].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(3, 5)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[3].lessons[5].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 7*/}
                {selectedChapterIndex === 3 && courseData.chapters[3].lessons?.[6] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[3].lessons[6].courseLink);
                      setSelectedLesson({ chapterIndex: 3, lessonIndex: 6 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[3].lessons[6].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(3, 6)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[3].lessons[6].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 8*/}
                {selectedChapterIndex === 3 && courseData.chapters[3].lessons?.[7] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[3].lessons[7].courseLink);
                      setSelectedLesson({ chapterIndex: 3, lessonIndex: 7 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[3].lessons[7].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(3, 7)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[3].lessons[7].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 8*/}
                {selectedChapterIndex === 3 && courseData.chapters[3].lessons?.[8] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[3].lessons[8].courseLink);
                      setSelectedLesson({ chapterIndex: 3, lessonIndex: 8 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[3].lessons[8].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(3, 8)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[3].lessons[8].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 9*/}
                {selectedChapterIndex === 3 && courseData.chapters[3].lessons?.[9] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[3].lessons[9].courseLink);
                      setSelectedLesson({ chapterIndex: 3, lessonIndex: 9 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[3].lessons[9].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(3, 9)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[3].lessons[9].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 10*/}
                {selectedChapterIndex === 3 && courseData.chapters[3].lessons?.[10] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[3].lessons[10].courseLink);
                      setSelectedLesson({ chapterIndex: 3, lessonIndex: 10 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[3].lessons[10].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(3, 10)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[3].lessons[10].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 11*/}
                {selectedChapterIndex === 3 && courseData.chapters[3].lessons?.[11] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[3].lessons[11].courseLink);
                      setSelectedLesson({ chapterIndex: 3, lessonIndex: 11 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[3].lessons[11].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(3, 11)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[3].lessons[11].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                {/* lesson 11*/}
                {selectedChapterIndex === 3 && courseData.chapters[3].lessons?.[11] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[3].lessons[11].courseLink);
                      setSelectedLesson({ chapterIndex: 3, lessonIndex: 11 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[3].lessons[11].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(3, 11)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[3].lessons[11].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 12*/}
                {selectedChapterIndex === 3 && courseData.chapters[3].lessons?.[12] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[3].lessons[12].courseLink);
                      setSelectedLesson({ chapterIndex: 3, lessonIndex: 12 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[3].lessons[12].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(3, 12)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[3].lessons[12].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 13*/}
                {selectedChapterIndex === 3 && courseData.chapters[3].lessons?.[13] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[3].lessons[13].courseLink);
                      setSelectedLesson({ chapterIndex: 3, lessonIndex: 13 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[3].lessons[13].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(3, 13)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[3].lessons[13].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 14*/}
                {selectedChapterIndex === 3 && courseData.chapters[3].lessons?.[14] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[3].lessons[14].courseLink);
                      setSelectedLesson({ chapterIndex: 3, lessonIndex: 14 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[3].lessons[14].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(3, 14)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[3].lessons[14].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

              </View>
            )}
          </View>

          {/* Chapter 5 */}
          <View style={{ marginHorizontal: 20, marginTop: 10 }}>
            {courseData?.chapters && courseData.chapters[4] && (
              <View>
                <View style={{ flexDirection: 'row' }}>
                  <AnimatedCircularProgress
                    size={30}
                    width={2}
                    fill={progress1}
                    tintColor="#FF0000"
                    backgroundColor="#e0e0e0"
                    rotation={0}
                    lineCap="round"
                  >

                  </AnimatedCircularProgress>
                  {/* Display the current chapter */}
                  <TouchableOpacity onPress={() => toggleChapter(4)}>
                    <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 5, marginTop: 4 }}>
                      {courseData.chapters[4].name}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* lesson 1 */}
                {selectedChapterIndex === 4 && courseData.chapters[4].lessons?.[0] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[4].lessons[0].courseLink);
                      setSelectedLesson({ chapterIndex: 4, lessonIndex: 0 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[4].lessons[0].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(4, 0)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[4].lessons[0].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 2*/}
                {selectedChapterIndex === 4 && courseData.chapters[4].lessons?.[1] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[4].lessons[1].courseLink);
                      setSelectedLesson({ chapterIndex: 4, lessonIndex: 1 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[4].lessons[1].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(4, 1)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[4].lessons[1].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 3*/}
                {selectedChapterIndex === 4 && courseData.chapters[4].lessons?.[2] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[4].lessons[2].courseLink);
                      setSelectedLesson({ chapterIndex: 4, lessonIndex: 2 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[4].lessons[2].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(4, 2)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[4].lessons[2].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 4*/}
                {selectedChapterIndex === 4 && courseData.chapters[4].lessons?.[3] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[4].lessons[3].courseLink);
                      setSelectedLesson({ chapterIndex: 3, lessonIndex: 3 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[4].lessons[3].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(4, 3)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[4].lessons[3].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 5*/}
                {selectedChapterIndex === 4 && courseData.chapters[4].lessons?.[4] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[4].lessons[4].courseLink);
                      setSelectedLesson({ chapterIndex: 4, lessonIndex: 4 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[4].lessons[4].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(4, 4)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[4].lessons[4].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 6*/}
                {selectedChapterIndex === 4 && courseData.chapters[4].lessons?.[5] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[4].lessons[5].courseLink);
                      setSelectedLesson({ chapterIndex: 4, lessonIndex: 5 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[4].lessons[5].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(4, 5)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[4].lessons[5].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 7*/}
                {selectedChapterIndex === 4 && courseData.chapters[4].lessons?.[6] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[4].lessons[6].courseLink);
                      setSelectedLesson({ chapterIndex: 4, lessonIndex: 6 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[4].lessons[6].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(4, 6)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[4].lessons[6].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 8*/}
                {selectedChapterIndex === 4 && courseData.chapters[4].lessons?.[7] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[4].lessons[7].courseLink);
                      setSelectedLesson({ chapterIndex: 4, lessonIndex: 7 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[4].lessons[7].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(4, 7)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[4].lessons[7].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 8*/}
                {selectedChapterIndex === 4 && courseData.chapters[4].lessons?.[8] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[4].lessons[8].courseLink);
                      setSelectedLesson({ chapterIndex: 4, lessonIndex: 8 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[4].lessons[8].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(4, 8)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[4].lessons[8].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 9*/}
                {selectedChapterIndex === 4 && courseData.chapters[4].lessons?.[9] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[4].lessons[9].courseLink);
                      setSelectedLesson({ chapterIndex: 4, lessonIndex: 9 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[4].lessons[9].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(4, 9)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[4].lessons[9].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 10*/}
                {selectedChapterIndex === 4 && courseData.chapters[4].lessons?.[10] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[4].lessons[10].courseLink);
                      setSelectedLesson({ chapterIndex: 4, lessonIndex: 10 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[4].lessons[10].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(4, 10)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[4].lessons[10].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 11*/}
                {selectedChapterIndex === 4 && courseData.chapters[4].lessons?.[11] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[4].lessons[11].courseLink);
                      setSelectedLesson({ chapterIndex: 3, lessonIndex: 11 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[4].lessons[11].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(4, 11)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[4].lessons[11].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                {/* lesson 11*/}
                {selectedChapterIndex === 4 && courseData.chapters[4].lessons?.[11] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[4].lessons[11].courseLink);
                      setSelectedLesson({ chapterIndex: 4, lessonIndex: 11 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[4].lessons[11].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(4, 11)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[4].lessons[11].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>

          {/* Chapter 6 */}
          <View style={{ marginHorizontal: 20, marginTop: 10 }}>
            {courseData?.chapters && courseData.chapters[5] && (
              <View>
                <View style={{ flexDirection: 'row' }}>
                  <AnimatedCircularProgress
                    size={30}
                    width={2}
                    fill={progress1}
                    tintColor="#FF0000"
                    backgroundColor="#e0e0e0"
                    rotation={0}
                    lineCap="round"
                  >

                  </AnimatedCircularProgress>
                  {/* Display the current chapter */}
                  <TouchableOpacity onPress={() => toggleChapter(5)}>
                    <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 5, marginTop: 4 }}>
                      {courseData.chapters[5].name}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* lesson 1 */}
                {selectedChapterIndex === 5 && courseData.chapters[5].lessons?.[0] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[5].lessons[0].courseLink);
                      setSelectedLesson({ chapterIndex: 5, lessonIndex: 0 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[5].lessons[0].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(5, 0)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[5].lessons[0].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 2*/}
                {selectedChapterIndex === 5 && courseData.chapters[5].lessons?.[1] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[5].lessons[1].courseLink);
                      setSelectedLesson({ chapterIndex: 5, lessonIndex: 1 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[5].lessons[1].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(5, 1)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[5].lessons[1].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 3*/}
                {selectedChapterIndex === 5 && courseData.chapters[5].lessons?.[2] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[5].lessons[2].courseLink);
                      setSelectedLesson({ chapterIndex: 5, lessonIndex: 2 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[5].lessons[2].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(5, 2)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[5].lessons[2].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 4*/}
                {selectedChapterIndex === 5 && courseData.chapters[5].lessons?.[3] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[5].lessons[3].courseLink);
                      setSelectedLesson({ chapterIndex: 5, lessonIndex: 3 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[5].lessons[3].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(5, 3)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[5].lessons[3].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 5*/}
                {selectedChapterIndex === 5 && courseData.chapters[5].lessons?.[4] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[5].lessons[4].courseLink);
                      setSelectedLesson({ chapterIndex: 5, lessonIndex: 4 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[5].lessons[4].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(5, 4)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[5].lessons[4].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 6*/}
                {selectedChapterIndex === 5 && courseData.chapters[5].lessons?.[5] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[5].lessons[5].courseLink);
                      setSelectedLesson({ chapterIndex: 5, lessonIndex: 5 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[5].lessons[5].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(5, 5)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[5].lessons[5].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 7*/}
                {selectedChapterIndex === 5 && courseData.chapters[5].lessons?.[6] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[5].lessons[6].courseLink);
                      setSelectedLesson({ chapterIndex: 5, lessonIndex: 6 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[5].lessons[6].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(5, 6)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[5].lessons[6].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>

          {/* Chapter 7 */}
          <View style={{ marginHorizontal: 20, marginTop: 10 }}>
            {courseData?.chapters && courseData.chapters[6] && (
              <View>
                <View style={{ flexDirection: 'row' }}>
                  <AnimatedCircularProgress
                    size={30}
                    width={2}
                    fill={progress1}
                    tintColor="#FF0000"
                    backgroundColor="#e0e0e0"
                    rotation={0}
                    lineCap="round"
                  >

                  </AnimatedCircularProgress>
                  {/* Display the current chapter */}
                  <TouchableOpacity onPress={() => toggleChapter(6)}>
                    <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 5, marginTop: 4 }}>
                      {courseData.chapters[6].name}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* lesson 1 */}
                {selectedChapterIndex === 6 && courseData.chapters[6].lessons?.[0] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[6].lessons[0].courseLink);
                      setSelectedLesson({ chapterIndex: 6, lessonIndex: 0 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[6].lessons[0].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(6, 0)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[6].lessons[0].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 2*/}
                {selectedChapterIndex === 6 && courseData.chapters[6].lessons?.[1] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[6].lessons[1].courseLink);
                      setSelectedLesson({ chapterIndex: 6, lessonIndex: 1 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[6].lessons[1].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(6, 1)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[6].lessons[1].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 3*/}
                {selectedChapterIndex === 6 && courseData.chapters[6].lessons?.[2] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[6].lessons[2].courseLink);
                      setSelectedLesson({ chapterIndex: 6, lessonIndex: 2 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[6].lessons[2].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(6, 2)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[6].lessons[2].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 4*/}
                {selectedChapterIndex === 6 && courseData.chapters[6].lessons?.[3] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[6].lessons[3].courseLink);
                      setSelectedLesson({ chapterIndex: 6, lessonIndex: 3 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[6].lessons[3].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(6, 3)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[6].lessons[3].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 5*/}
                {selectedChapterIndex === 6 && courseData.chapters[6].lessons?.[4] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[6].lessons[4].courseLink);
                      setSelectedLesson({ chapterIndex: 6, lessonIndex: 4 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[6].lessons[4].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(6, 4)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[6].lessons[4].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 6*/}
                {selectedChapterIndex === 6 && courseData.chapters[6].lessons?.[5] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[6].lessons[5].courseLink);
                      setSelectedLesson({ chapterIndex: 6, lessonIndex: 5 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[6].lessons[5].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(6, 5)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[6].lessons[5].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 7*/}
                {selectedChapterIndex === 6 && courseData.chapters[6].lessons?.[6] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[6].lessons[6].courseLink);
                      setSelectedLesson({ chapterIndex: 6, lessonIndex: 6 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[6].lessons[6].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(6, 6)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[6].lessons[6].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                {/* lesson 8*/}
                {selectedChapterIndex === 6 && courseData.chapters[6].lessons?.[7] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[6].lessons[7].courseLink);
                      setSelectedLesson({ chapterIndex: 6, lessonIndex: 7 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[6].lessons[7].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(6, 7)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[6].lessons[7].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                {/* lesson 9*/}
                {selectedChapterIndex === 6 && courseData.chapters[6].lessons?.[8] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[6].lessons[8].courseLink);
                      setSelectedLesson({ chapterIndex: 6, lessonIndex: 8 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[6].lessons[8].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(6, 8)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[6].lessons[8].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                {/* lesson 10*/}
                {selectedChapterIndex === 6 && courseData.chapters[6].lessons?.[9] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[6].lessons[9].courseLink);
                      setSelectedLesson({ chapterIndex: 6, lessonIndex: 9 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[6].lessons[9].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(6, 9)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[6].lessons[9].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                {/* lesson 11*/}
                {selectedChapterIndex === 6 && courseData.chapters[6].lessons?.[10] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[6].lessons[10].courseLink);
                      setSelectedLesson({ chapterIndex: 6, lessonIndex: 10 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[6].lessons[10].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(6, 10)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[6].lessons[10].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>

          {/* Chapter 8 */}
          <View style={{ marginHorizontal: 20, marginTop: 10 }}>
            {courseData?.chapters && courseData.chapters[7] && (
              <View>
                <View style={{ flexDirection: 'row' }}>
                  <AnimatedCircularProgress
                    size={30}
                    width={2}
                    fill={progress1}
                    tintColor="#FF0000"
                    backgroundColor="#e0e0e0"
                    rotation={0}
                    lineCap="round"
                  >

                  </AnimatedCircularProgress>
                  {/* Display the current chapter */}
                  <TouchableOpacity onPress={() => toggleChapter(7)}>
                    <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 5, marginTop: 4 }}>
                      {courseData.chapters[7].name}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* lesson 1 */}
                {selectedChapterIndex === 7 && courseData.chapters[7].lessons?.[0] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[7].lessons[0].courseLink);
                      setSelectedLesson({ chapterIndex: 7, lessonIndex: 0 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[7].lessons[0].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(7, 0)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[7].lessons[0].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 2*/}
                {selectedChapterIndex === 7 && courseData.chapters[7].lessons?.[1] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[7].lessons[1].courseLink);
                      setSelectedLesson({ chapterIndex: 7, lessonIndex: 1 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[7].lessons[1].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(7, 1)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[7].lessons[1].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 3*/}
                {selectedChapterIndex === 7 && courseData.chapters[7].lessons?.[2] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[7].lessons[2].courseLink);
                      setSelectedLesson({ chapterIndex: 7, lessonIndex: 2 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[7].lessons[2].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(7, 2)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[7].lessons[2].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 4*/}
                {selectedChapterIndex === 7 && courseData.chapters[7].lessons?.[3] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[7].lessons[3].courseLink);
                      setSelectedLesson({ chapterIndex: 7, lessonIndex: 3 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[7].lessons[3].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(7, 3)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[7].lessons[3].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 5*/}
                {selectedChapterIndex === 7 && courseData.chapters[7].lessons?.[4] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[7].lessons[4].courseLink);
                      setSelectedLesson({ chapterIndex: 7, lessonIndex: 4 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[7].lessons[4].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(7, 4)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[7].lessons[4].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 6*/}
                {selectedChapterIndex === 7 && courseData.chapters[7].lessons?.[5] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[7].lessons[5].courseLink);
                      setSelectedLesson({ chapterIndex: 7, lessonIndex: 5 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[7].lessons[5].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(7, 5)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[7].lessons[5].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 7*/}
                {selectedChapterIndex === 7 && courseData.chapters[7].lessons?.[6] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[7].lessons[6].courseLink);
                      setSelectedLesson({ chapterIndex: 7, lessonIndex: 6 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[7].lessons[6].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(7, 6)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[7].lessons[6].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                {/* lesson 8*/}
                {selectedChapterIndex === 7 && courseData.chapters[7].lessons?.[7] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[7].lessons[7].courseLink);
                      setSelectedLesson({ chapterIndex: 7, lessonIndex: 7 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[7].lessons[7].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(7, 7)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[7].lessons[7].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                {/* lesson 9*/}
                {selectedChapterIndex === 7 && courseData.chapters[7].lessons?.[8] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[7].lessons[8].courseLink);
                      setSelectedLesson({ chapterIndex: 7, lessonIndex: 8 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[7].lessons[8].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(7, 8)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[7].lessons[8].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                {/* lesson 10*/}
                {selectedChapterIndex === 7 && courseData.chapters[7].lessons?.[9] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[7].lessons[9].courseLink);
                      setSelectedLesson({ chapterIndex: 7, lessonIndex: 9 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[7].lessons[9].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(7, 9)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[7].lessons[9].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                {/* lesson 11*/}
                {selectedChapterIndex === 7 && courseData.chapters[7].lessons?.[10] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[7].lessons[10].courseLink);
                      setSelectedLesson({ chapterIndex: 7, lessonIndex: 10 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[7].lessons[10].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(7, 10)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[7].lessons[10].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>


          {/* Chapter 9 */}
          <View style={{ marginHorizontal: 20, marginTop: 10 }}>
            {courseData?.chapters && courseData.chapters[8] && (
              <View>
                <View style={{ flexDirection: 'row' }}>
                  <AnimatedCircularProgress
                    size={30}
                    width={2}
                    fill={progress1}
                    tintColor="#FF0000"
                    backgroundColor="#e0e0e0"
                    rotation={0}
                    lineCap="round"
                  >

                  </AnimatedCircularProgress>
                  {/* Display the current chapter */}
                  <TouchableOpacity onPress={() => toggleChapter(8)}>
                    <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 5, marginTop: 4 }}>
                      {courseData.chapters[8].name}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* lesson 1 */}
                {selectedChapterIndex === 8 && courseData.chapters[8].lessons?.[0] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[8].lessons[0].courseLink);
                      setSelectedLesson({ chapterIndex: 8, lessonIndex: 0 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[8].lessons[0].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(8, 0)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[8].lessons[0].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 2*/}
                {selectedChapterIndex === 8 && courseData.chapters[8].lessons?.[1] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[8].lessons[1].courseLink);
                      setSelectedLesson({ chapterIndex: 8, lessonIndex: 1 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[8].lessons[1].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(8, 1)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[8].lessons[1].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 3*/}
                {selectedChapterIndex === 8 && courseData.chapters[8].lessons?.[2] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[8].lessons[2].courseLink);
                      setSelectedLesson({ chapterIndex: 8, lessonIndex: 2 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[8].lessons[2].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(8, 2)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[8].lessons[2].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 4*/}
                {selectedChapterIndex === 8 && courseData.chapters[8].lessons?.[3] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[8].lessons[3].courseLink);
                      setSelectedLesson({ chapterIndex: 8, lessonIndex: 3 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[8].lessons[3].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(8, 3)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[8].lessons[3].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 5*/}
                {selectedChapterIndex === 8 && courseData.chapters[8].lessons?.[4] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[8].lessons[4].courseLink);
                      setSelectedLesson({ chapterIndex: 8, lessonIndex: 4 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[8].lessons[4].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(8, 4)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[8].lessons[4].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 6*/}
                {selectedChapterIndex === 8 && courseData.chapters[8].lessons?.[5] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[8].lessons[5].courseLink);
                      setSelectedLesson({ chapterIndex: 8, lessonIndex: 5 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[8].lessons[5].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(8, 5)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[8].lessons[5].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 7*/}
                {selectedChapterIndex === 8 && courseData.chapters[8].lessons?.[6] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[8].lessons[6].courseLink);
                      setSelectedLesson({ chapterIndex: 8, lessonIndex: 6 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[8].lessons[6].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(8, 6)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[8].lessons[6].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                {/* lesson 8*/}
                {selectedChapterIndex === 8 && courseData.chapters[8].lessons?.[7] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[8].lessons[7].courseLink);
                      setSelectedLesson({ chapterIndex: 8, lessonIndex: 7 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[8].lessons[7].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(8, 7)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[8].lessons[7].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                {/* lesson 9*/}
                {selectedChapterIndex === 8 && courseData.chapters[8].lessons?.[8] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[8].lessons[8].courseLink);
                      setSelectedLesson({ chapterIndex: 8, lessonIndex: 8 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[8].lessons[8].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(8, 8)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[8].lessons[8].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                {/* lesson 10*/}
                {selectedChapterIndex === 8 && courseData.chapters[8].lessons?.[9] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[8].lessons[9].courseLink);
                      setSelectedLesson({ chapterIndex: 8, lessonIndex: 9 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[8].lessons[9].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(8, 9)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[8].lessons[9].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                {/* lesson 11*/}
                {selectedChapterIndex === 8 && courseData.chapters[8].lessons?.[10] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[8].lessons[10].courseLink);
                      setSelectedLesson({ chapterIndex: 8, lessonIndex: 10 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[8].lessons[10].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(8, 10)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[8].lessons[10].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                {/* lesson 12*/}
                {selectedChapterIndex === 8 && courseData.chapters[8].lessons?.[11] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[8].lessons[11].courseLink);
                      setSelectedLesson({ chapterIndex: 8, lessonIndex: 11 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[8].lessons[11].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(8, 11)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[8].lessons[11].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                {/* lesson 13*/}
                {selectedChapterIndex === 8 && courseData.chapters[8].lessons?.[11] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[8].lessons[11].courseLink);
                      setSelectedLesson({ chapterIndex: 8, lessonIndex: 11 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[8].lessons[11].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(8, 11)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[8].lessons[11].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>

          {/* Chapter 10 */}
          <View style={{ marginHorizontal: 20, marginTop: 10 }}>
            {courseData?.chapters && courseData.chapters[9] && (
              <View>
                <View style={{ flexDirection: 'row' }}>
                  <AnimatedCircularProgress
                    size={30}
                    width={2}
                    fill={progress1}
                    tintColor="#FF0000"
                    backgroundColor="#e0e0e0"
                    rotation={0}
                    lineCap="round"
                  >

                  </AnimatedCircularProgress>
                  {/* Display the current chapter */}
                  <TouchableOpacity onPress={() => toggleChapter(9)}>
                    <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 5, marginTop: 4 }}>
                      {courseData.chapters[9].name}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* lesson 1 */}
                {selectedChapterIndex === 9 && courseData.chapters[9].lessons?.[0] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[9].lessons[0].courseLink);
                      setSelectedLesson({ chapterIndex: 9, lessonIndex: 0 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[9].lessons[0].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(9, 0)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[9].lessons[0].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 2*/}
                {selectedChapterIndex === 9 && courseData.chapters[9].lessons?.[1] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[9].lessons[1].courseLink);
                      setSelectedLesson({ chapterIndex: 9, lessonIndex: 1 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[9].lessons[1].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(9, 1)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[9].lessons[1].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 3*/}
                {selectedChapterIndex === 9 && courseData.chapters[9].lessons?.[2] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[9].lessons[2].courseLink);
                      setSelectedLesson({ chapterIndex: 9, lessonIndex: 2 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[9].lessons[2].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(9, 2)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[9].lessons[2].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 4*/}
                {selectedChapterIndex === 9 && courseData.chapters[9].lessons?.[3] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[9].lessons[3].courseLink);
                      setSelectedLesson({ chapterIndex: 9, lessonIndex: 3 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[9].lessons[3].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(9, 3)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[9].lessons[3].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 5*/}
                {selectedChapterIndex === 9 && courseData.chapters[9].lessons?.[4] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[9].lessons[4].courseLink);
                      setSelectedLesson({ chapterIndex: 9, lessonIndex: 4 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[9].lessons[4].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(9, 4)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[9].lessons[4].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 6*/}
                {selectedChapterIndex === 9 && courseData.chapters[9].lessons?.[5] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[9].lessons[5].courseLink);
                      setSelectedLesson({ chapterIndex: 9, lessonIndex: 5 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[9].lessons[5].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(9, 5)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[9].lessons[5].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 7*/}
                {selectedChapterIndex === 9 && courseData.chapters[9].lessons?.[6] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[9].lessons[6].courseLink);
                      setSelectedLesson({ chapterIndex: 9, lessonIndex: 6 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[9].lessons[6].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(9, 6)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[9].lessons[6].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                {/* lesson 8*/}
                {selectedChapterIndex === 9 && courseData.chapters[9].lessons?.[7] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[9].lessons[7].courseLink);
                      setSelectedLesson({ chapterIndex: 9, lessonIndex: 7 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[9].lessons[7].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(9, 7)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[9].lessons[7].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                {/* lesson 9*/}
                {selectedChapterIndex === 9 && courseData.chapters[9].lessons?.[8] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[9].lessons[8].courseLink);
                      setSelectedLesson({ chapterIndex: 9, lessonIndex: 8 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[9].lessons[8].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(9, 8)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[9].lessons[8].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                {/* lesson 10*/}
                {selectedChapterIndex === 9 && courseData.chapters[9].lessons?.[9] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[9].lessons[9].courseLink);
                      setSelectedLesson({ chapterIndex: 9, lessonIndex: 9 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[9].lessons[9].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(9, 9)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[9].lessons[9].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                {/* lesson 11*/}
                {selectedChapterIndex === 9 && courseData.chapters[9].lessons?.[10] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[9].lessons[10].courseLink);
                      setSelectedLesson({ chapterIndex: 9, lessonIndex: 10 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[9].lessons[10].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(9, 10)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[9].lessons[10].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                {/* lesson 12*/}
                {selectedChapterIndex === 9 && courseData.chapters[9].lessons?.[11] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[9].lessons[11].courseLink);
                      setSelectedLesson({ chapterIndex: 9, lessonIndex: 11 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[9].lessons[11].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(9, 11)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[9].lessons[11].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                {/* lesson 13*/}
                {selectedChapterIndex === 9 && courseData.chapters[9].lessons?.[12] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[9].lessons[12].courseLink);
                      setSelectedLesson({ chapterIndex: 9, lessonIndex: 12 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[9].lessons[12].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(9, 12)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[9].lessons[12].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                {/* lesson 14*/}
                {selectedChapterIndex === 9 && courseData.chapters[9].lessons?.[13] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[9].lessons[13].courseLink);
                      setSelectedLesson({ chapterIndex: 9, lessonIndex: 13 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[9].lessons[13].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(9, 13)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[9].lessons[13].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                {/* lesson 15*/}
                {selectedChapterIndex === 9 && courseData.chapters[9].lessons?.[14] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[9].lessons[14].courseLink);
                      setSelectedLesson({ chapterIndex: 9, lessonIndex: 14});
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[9].lessons[14].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(9, 14)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[9].lessons[14].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                {/* lesson 16*/}
                {selectedChapterIndex === 9 && courseData.chapters[9].lessons?.[15] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[9].lessons[15].courseLink);
                      setSelectedLesson({ chapterIndex: 9, lessonIndex: 15 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[9].lessons[15].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(9, 15)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[9].lessons[15].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                {/* lesson 17*/}
                {selectedChapterIndex === 9 && courseData.chapters[9].lessons?.[16] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[9].lessons[16].courseLink);
                      setSelectedLesson({ chapterIndex: 9, lessonIndex: 16 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[9].lessons[16].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(9, 16)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[9].lessons[16].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                {/* lesson 18*/}
                {selectedChapterIndex === 9 && courseData.chapters[9].lessons?.[17] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[9].lessons[17].courseLink);
                      setSelectedLesson({ chapterIndex: 9, lessonIndex: 117});
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[9].lessons[17].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(9, 17)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[9].lessons[17].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                {/* lesson 19*/}
                {selectedChapterIndex === 9 && courseData.chapters[9].lessons?.[18] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[9].lessons[18].courseLink);
                      setSelectedLesson({ chapterIndex: 9, lessonIndex: 18 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[9].lessons[18].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(9, 18)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[9].lessons[18].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
 {/* Chapter 11 */}
 <View style={{ marginHorizontal: 20, marginTop: 10 }}>
            {courseData?.chapters && courseData.chapters[10] && (
              <View>
                <View style={{ flexDirection: 'row' }}>
                  <AnimatedCircularProgress
                    size={30}
                    width={2}
                    fill={progress1}
                    tintColor="#FF0000"
                    backgroundColor="#e0e0e0"
                    rotation={0}
                    lineCap="round"
                  >

                  </AnimatedCircularProgress>
                  {/* Display the current chapter */}
                  <TouchableOpacity onPress={() => toggleChapter(10)}>
                    <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 5, marginTop: 4 }}>
                      {courseData.chapters[10].name}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* lesson 1 */}
                {selectedChapterIndex === 10 && courseData.chapters[10].lessons?.[0] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[10].lessons[0].courseLink);
                      setSelectedLesson({ chapterIndex: 10, lessonIndex: 0 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[10].lessons[0].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(10, 0)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[10].lessons[0].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 2*/}
                {selectedChapterIndex === 10 && courseData.chapters[10].lessons?.[1] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[10].lessons[1].courseLink);
                      setSelectedLesson({ chapterIndex: 10, lessonIndex: 1 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[10].lessons[1].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(10, 1)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[10].lessons[1].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 3*/}
                {selectedChapterIndex === 10 && courseData.chapters[10].lessons?.[2] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[10].lessons[2].courseLink);
                      setSelectedLesson({ chapterIndex: 10, lessonIndex: 2 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[10].lessons[2].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(10, 2)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[10].lessons[2].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 4*/}
                {selectedChapterIndex === 10 && courseData.chapters[10].lessons?.[3] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[10].lessons[3].courseLink);
                      setSelectedLesson({ chapterIndex: 10, lessonIndex: 3 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[10].lessons[3].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(10, 3)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[10].lessons[3].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 5*/}
                {selectedChapterIndex === 10 && courseData.chapters[10].lessons?.[4] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[10].lessons[4].courseLink);
                      setSelectedLesson({ chapterIndex: 10, lessonIndex: 4 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[10].lessons[4].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(10, 4)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[10].lessons[4].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 6*/}
                {selectedChapterIndex === 10 && courseData.chapters[10].lessons?.[5] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[10].lessons[5].courseLink);
                      setSelectedLesson({ chapterIndex: 10, lessonIndex: 5 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[10].lessons[5].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(10, 5)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[10].lessons[5].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 7*/}
                {selectedChapterIndex === 10 && courseData.chapters[10].lessons?.[6] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[10].lessons[6].courseLink);
                      setSelectedLesson({ chapterIndex: 10, lessonIndex: 6 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[10].lessons[6].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(10, 6)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[10].lessons[6].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                {/* lesson 8*/}
                {selectedChapterIndex === 10 && courseData.chapters[10].lessons?.[7] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[10].lessons[7].courseLink);
                      setSelectedLesson({ chapterIndex: 10, lessonIndex: 7 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[10].lessons[7].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(10, 7)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[10].lessons[7].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                {/* lesson 9*/}
                {selectedChapterIndex === 10 && courseData.chapters[10].lessons?.[8] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[10].lessons[8].courseLink);
                      setSelectedLesson({ chapterIndex: 10, lessonIndex: 8 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[10].lessons[8].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(10, 8)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[10].lessons[8].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                {/* lesson 10*/}
                {selectedChapterIndex === 10 && courseData.chapters[10].lessons?.[9] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[10].lessons[9].courseLink);
                      setSelectedLesson({ chapterIndex: 10, lessonIndex: 9 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[10].lessons[9].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(10, 9)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[10].lessons[9].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>

           {/* Chapter 12 */}
 <View style={{ marginHorizontal: 20, marginTop: 10 }}>
            {courseData?.chapters && courseData.chapters[11] && (
              <View>
                <View style={{ flexDirection: 'row' }}>
                  <AnimatedCircularProgress
                    size={30}
                    width={2}
                    fill={progress1}
                    tintColor="#FF0000"
                    backgroundColor="#e0e0e0"
                    rotation={0}
                    lineCap="round"
                  >

                  </AnimatedCircularProgress>
                  {/* Display the current chapter */}
                  <TouchableOpacity onPress={() => toggleChapter(11)}>
                    <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 5, marginTop: 4 }}>
                      {courseData.chapters[11].name}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* lesson 1 */}
                {selectedChapterIndex === 11 && courseData.chapters[11].lessons?.[0] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[11].lessons[0].courseLink);
                      setSelectedLesson({ chapterIndex: 11, lessonIndex: 0 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[11].lessons[0].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(11, 0)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[11].lessons[0].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 2*/}
                {selectedChapterIndex === 11 && courseData.chapters[11].lessons?.[1] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[11].lessons[1].courseLink);
                      setSelectedLesson({ chapterIndex: 11, lessonIndex: 1 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[11].lessons[1].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(11, 1)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[11].lessons[1].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 3*/}
                {selectedChapterIndex === 11 && courseData.chapters[11].lessons?.[2] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[11].lessons[2].courseLink);
                      setSelectedLesson({ chapterIndex: 11, lessonIndex: 2 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[11].lessons[2].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(11, 2)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[11].lessons[2].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 4*/}
                {selectedChapterIndex === 11 && courseData.chapters[11].lessons?.[3] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[11].lessons[3].courseLink);
                      setSelectedLesson({ chapterIndex: 11, lessonIndex: 3 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[11].lessons[3].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(11, 3)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[11].lessons[3].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 5*/}
                {selectedChapterIndex === 11 && courseData.chapters[11].lessons?.[4] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[11].lessons[4].courseLink);
                      setSelectedLesson({ chapterIndex: 11, lessonIndex: 4 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[11].lessons[4].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(11, 4)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[11].lessons[4].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 6*/}
                {selectedChapterIndex === 11 && courseData.chapters[11].lessons?.[5] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[11].lessons[5].courseLink);
                      setSelectedLesson({ chapterIndex: 11, lessonIndex: 5 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[11].lessons[5].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(11, 5)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[11].lessons[5].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 7*/}
                {selectedChapterIndex === 11 && courseData.chapters[11].lessons?.[6] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[11].lessons[6].courseLink);
                      setSelectedLesson({ chapterIndex: 11, lessonIndex: 6 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[11].lessons[6].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(11, 6)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[11].lessons[6].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                {/* lesson 8*/}
                {selectedChapterIndex === 11 && courseData.chapters[11].lessons?.[7] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[11].lessons[7].courseLink);
                      setSelectedLesson({ chapterIndex: 11, lessonIndex: 7 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[11].lessons[7].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(11, 7)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[11].lessons[7].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                {/* lesson 9*/}
                {selectedChapterIndex === 11 && courseData.chapters[11].lessons?.[8] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[11].lessons[8].courseLink);
                      setSelectedLesson({ chapterIndex: 11, lessonIndex: 8 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[11].lessons[8].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(11, 8)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[11].lessons[8].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                {/* lesson 10*/}
                {selectedChapterIndex === 11 && courseData.chapters[11].lessons?.[9] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[11].lessons[9].courseLink);
                      setSelectedLesson({ chapterIndex: 11, lessonIndex: 9 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[11].lessons[9].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(11, 9)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[11].lessons[9].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 11*/}
                {selectedChapterIndex === 11 && courseData.chapters[11].lessons?.[10] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[11].lessons[10].courseLink);
                      setSelectedLesson({ chapterIndex: 11, lessonIndex: 10 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[11].lessons[10].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(11, 10)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[11].lessons[10].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 12*/}
                {selectedChapterIndex === 11 && courseData.chapters[11].lessons?.[11] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[11].lessons[11].courseLink);
                      setSelectedLesson({ chapterIndex: 11, lessonIndex: 11 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[11].lessons[11].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(11, 11)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[11].lessons[11].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 13*/}
                {selectedChapterIndex === 11 && courseData.chapters[11].lessons?.[12] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[11].lessons[12].courseLink);
                      setSelectedLesson({ chapterIndex: 11, lessonIndex: 12 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[11].lessons[12].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(11, 12)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[11].lessons[12].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 14*/}
                {selectedChapterIndex === 11 && courseData.chapters[11].lessons?.[13] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[11].lessons[13].courseLink);
                      setSelectedLesson({ chapterIndex: 11, lessonIndex: 13 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[11].lessons[13].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(11, 13)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[11].lessons[13].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 15*/}
                {selectedChapterIndex === 11 && courseData.chapters[11].lessons?.[14] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[11].lessons[14].courseLink);
                      setSelectedLesson({ chapterIndex: 11, lessonIndex: 14 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[11].lessons[14].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(11, 14)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[11].lessons[14].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 16*/}
                {selectedChapterIndex === 11 && courseData.chapters[11].lessons?.[15] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[11].lessons[15].courseLink);
                      setSelectedLesson({ chapterIndex: 11, lessonIndex: 15 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[11].lessons[15].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(11, 15)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[11].lessons[15].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 17*/}
                {selectedChapterIndex === 11 && courseData.chapters[11].lessons?.[16] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[11].lessons[16].courseLink);
                      setSelectedLesson({ chapterIndex: 11, lessonIndex: 16 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[11].lessons[16].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(11, 16)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[11].lessons[16].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 18*/}
                {selectedChapterIndex === 11 && courseData.chapters[11].lessons?.[17] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[11].lessons[17].courseLink);
                      setSelectedLesson({ chapterIndex: 11, lessonIndex: 17 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[11].lessons[17].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(11, 17)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[11].lessons[17].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 19*/}
                {selectedChapterIndex === 11 && courseData.chapters[11].lessons?.[18] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[11].lessons[18].courseLink);
                      setSelectedLesson({ chapterIndex: 11, lessonIndex: 18});
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[11].lessons[18].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(11, 18)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[11].lessons[18].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>

         {/* Chapter 13 */}
 <View style={{ marginHorizontal: 20, marginTop: 10 }}>
            {courseData?.chapters && courseData.chapters[12] && (
              <View>
                <View style={{ flexDirection: 'row' }}>
                  <AnimatedCircularProgress
                    size={30}
                    width={2}
                    fill={progress1}
                    tintColor="#FF0000"
                    backgroundColor="#e0e0e0"
                    rotation={0}
                    lineCap="round"
                  >

                  </AnimatedCircularProgress>
                  {/* Display the current chapter */}
                  <TouchableOpacity onPress={() => toggleChapter(12)}>
                    <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 5, marginTop: 4 }}>
                      {courseData.chapters[12].name}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* lesson 1 */}
                {selectedChapterIndex === 12 && courseData.chapters[12].lessons?.[0] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[12].lessons[0].courseLink);
                      setSelectedLesson({ chapterIndex: 12, lessonIndex: 0 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[12].lessons[0].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(12, 0)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[12].lessons[0].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 2*/}
                {selectedChapterIndex === 12 && courseData.chapters[12].lessons?.[1] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[12].lessons[1].courseLink);
                      setSelectedLesson({ chapterIndex: 12, lessonIndex: 1 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[12].lessons[1].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(12, 1)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[12].lessons[1].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 3*/}
                {selectedChapterIndex === 12 && courseData.chapters[12].lessons?.[2] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[12].lessons[2].courseLink);
                      setSelectedLesson({ chapterIndex: 12, lessonIndex: 2 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[12].lessons[2].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(12, 2)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[12].lessons[2].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 4*/}
                {selectedChapterIndex === 12 && courseData.chapters[12].lessons?.[3] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[12].lessons[3].courseLink);
                      setSelectedLesson({ chapterIndex: 12, lessonIndex: 3 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[12].lessons[3].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(12, 3)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[12].lessons[3].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 5*/}
                {selectedChapterIndex === 12 && courseData.chapters[12].lessons?.[4] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[12].lessons[4].courseLink);
                      setSelectedLesson({ chapterIndex: 12, lessonIndex: 4 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[12].lessons[4].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(12, 4)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[12].lessons[4].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 6*/}
                {selectedChapterIndex === 12 && courseData.chapters[12].lessons?.[5] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[12].lessons[5].courseLink);
                      setSelectedLesson({ chapterIndex: 12, lessonIndex: 5 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[12].lessons[5].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(12, 5)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[12].lessons[5].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 7*/}
                {selectedChapterIndex === 12 && courseData.chapters[12].lessons?.[6] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[12].lessons[6].courseLink);
                      setSelectedLesson({ chapterIndex: 12, lessonIndex: 6 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[12].lessons[6].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(12, 6)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[12].lessons[6].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                {/* lesson 8*/}
                {selectedChapterIndex === 12 && courseData.chapters[12].lessons?.[7] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[12].lessons[7].courseLink);
                      setSelectedLesson({ chapterIndex: 12, lessonIndex: 7 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[12].lessons[7].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(12, 7)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[12].lessons[7].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                {/* lesson 9*/}
                {selectedChapterIndex === 12 && courseData.chapters[12].lessons?.[8] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[12].lessons[8].courseLink);
                      setSelectedLesson({ chapterIndex: 12, lessonIndex: 8 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[12].lessons[8].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(12, 8)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[12].lessons[8].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                {/* lesson 10*/}
                {selectedChapterIndex === 12 && courseData.chapters[12].lessons?.[9] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[12].lessons[9].courseLink);
                      setSelectedLesson({ chapterIndex: 12, lessonIndex: 9 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[12].lessons[9].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(12, 9)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[12].lessons[9].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

               

                {/* lesson 12*/}
                {selectedChapterIndex === 11 && courseData.chapters[11].lessons?.[11] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[11].lessons[11].courseLink);
                      setSelectedLesson({ chapterIndex: 11, lessonIndex: 11 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[11].lessons[11].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(11, 11)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[11].lessons[11].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 13*/}
                {selectedChapterIndex === 11 && courseData.chapters[11].lessons?.[12] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[11].lessons[12].courseLink);
                      setSelectedLesson({ chapterIndex: 11, lessonIndex: 12 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[11].lessons[12].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(11, 12)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[11].lessons[12].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 14*/}
                {selectedChapterIndex === 11 && courseData.chapters[11].lessons?.[13] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[11].lessons[13].courseLink);
                      setSelectedLesson({ chapterIndex: 11, lessonIndex: 13 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[11].lessons[13].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(11, 13)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[11].lessons[13].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 15*/}
                {selectedChapterIndex === 11 && courseData.chapters[11].lessons?.[14] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[11].lessons[14].courseLink);
                      setSelectedLesson({ chapterIndex: 11, lessonIndex: 14 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[11].lessons[14].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(11, 14)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[11].lessons[14].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 16*/}
                {selectedChapterIndex === 11 && courseData.chapters[11].lessons?.[15] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[11].lessons[15].courseLink);
                      setSelectedLesson({ chapterIndex: 11, lessonIndex: 15 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[11].lessons[15].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(11, 15)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[11].lessons[15].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 17*/}
                {selectedChapterIndex === 11 && courseData.chapters[11].lessons?.[16] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[11].lessons[16].courseLink);
                      setSelectedLesson({ chapterIndex: 11, lessonIndex: 16 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[11].lessons[16].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(11, 16)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[11].lessons[16].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 18*/}
                {selectedChapterIndex === 11 && courseData.chapters[11].lessons?.[17] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[11].lessons[17].courseLink);
                      setSelectedLesson({ chapterIndex: 11, lessonIndex: 17 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[11].lessons[17].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(11, 17)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[11].lessons[17].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 19*/}
                {selectedChapterIndex === 11 && courseData.chapters[11].lessons?.[18] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[11].lessons[18].courseLink);
                      setSelectedLesson({ chapterIndex: 11, lessonIndex: 18});
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[11].lessons[18].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(11, 18)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[11].lessons[18].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>

         {/* Chapter 14 */}
 <View style={{ marginHorizontal: 20, marginTop: 10 }}>
            {courseData?.chapters && courseData.chapters[13] && (
              <View>
                <View style={{ flexDirection: 'row' }}>
                  <AnimatedCircularProgress
                    size={30}
                    width={2}
                    fill={progress1}
                    tintColor="#FF0000"
                    backgroundColor="#e0e0e0"
                    rotation={0}
                    lineCap="round"
                  >

                  </AnimatedCircularProgress>
                  {/* Display the current chapter */}
                  <TouchableOpacity onPress={() => toggleChapter(13)}>
                    <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 5, marginTop: 4 }}>
                      {courseData.chapters[13].name}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* lesson 1 */}
                {selectedChapterIndex === 13 && courseData.chapters[13].lessons?.[0] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[13].lessons[0].courseLink);
                      setSelectedLesson({ chapterIndex: 13, lessonIndex: 0 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[13].lessons[0].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(13, 0)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[13].lessons[0].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 2*/}
                {selectedChapterIndex === 13 && courseData.chapters[13].lessons?.[1] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[13].lessons[1].courseLink);
                      setSelectedLesson({ chapterIndex: 13, lessonIndex: 1 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[13].lessons[1].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(13, 1)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[13].lessons[1].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 3*/}
                {selectedChapterIndex === 13 && courseData.chapters[13].lessons?.[2] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[13].lessons[2].courseLink);
                      setSelectedLesson({ chapterIndex: 13, lessonIndex: 2 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[13].lessons[2].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(13, 2)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[13].lessons[2].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 4*/}
                {selectedChapterIndex === 13 && courseData.chapters[13].lessons?.[3] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[13].lessons[3].courseLink);
                      setSelectedLesson({ chapterIndex: 13, lessonIndex: 3 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[13].lessons[3].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(13, 3)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[13].lessons[3].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 5*/}
                {selectedChapterIndex === 13 && courseData.chapters[13].lessons?.[4] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[13].lessons[4].courseLink);
                      setSelectedLesson({ chapterIndex: 13, lessonIndex: 4 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[13].lessons[4].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(13, 4)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[13].lessons[4].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 6*/}
                {selectedChapterIndex === 13 && courseData.chapters[13].lessons?.[5] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[13].lessons[5].courseLink);
                      setSelectedLesson({ chapterIndex: 13, lessonIndex: 5 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[13].lessons[5].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(13, 5)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[13].lessons[5].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 7*/}
                {selectedChapterIndex === 13 && courseData.chapters[13].lessons?.[6] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[13].lessons[6].courseLink);
                      setSelectedLesson({ chapterIndex: 13, lessonIndex: 6 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[13].lessons[6].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(13, 6)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[13].lessons[6].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                {/* lesson 8*/}
                {selectedChapterIndex === 13 && courseData.chapters[13].lessons?.[7] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[13].lessons[7].courseLink);
                      setSelectedLesson({ chapterIndex: 13, lessonIndex: 7 });
                    }}s
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[13].lessons[7].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(13, 7)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[13].lessons[7].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                {/* lesson 9*/}
                {selectedChapterIndex === 13 && courseData.chapters[13].lessons?.[8] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[13].lessons[8].courseLink);
                      setSelectedLesson({ chapterIndex: 13, lessonIndex: 8 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[13].lessons[8].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(13, 8)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[13].lessons[8].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                {/* lesson 10*/}
                {selectedChapterIndex === 13 && courseData.chapters[13].lessons?.[9] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[13].lessons[9].courseLink);
                      setSelectedLesson({ chapterIndex: 13, lessonIndex: 9 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[13].lessons[9].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(13, 9)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[13].lessons[9].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

               

                {/* lesson 12*/}
                {selectedChapterIndex === 13 && courseData.chapters[13].lessons?.[11] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[13].lessons[11].courseLink);
                      setSelectedLesson({ chapterIndex: 13, lessonIndex: 11 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[13].lessons[11].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(13, 11)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[13].lessons[11].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 13*/}
                {selectedChapterIndex === 13 && courseData.chapters[13].lessons?.[12] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[13].lessons[12].courseLink);
                      setSelectedLesson({ chapterIndex: 13, lessonIndex: 12 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[13].lessons[12].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(13, 12)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[13].lessons[12].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 14*/}
                {selectedChapterIndex === 11 && courseData.chapters[11].lessons?.[13] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[11].lessons[13].courseLink);
                      setSelectedLesson({ chapterIndex: 11, lessonIndex: 13 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[11].lessons[13].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(11, 13)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[11].lessons[13].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>

         {/* Chapter 15 */}
 <View style={{ marginHorizontal: 20, marginTop: 10 }}>
            {courseData?.chapters && courseData.chapters[14] && (
              <View>
                <View style={{ flexDirection: 'row' }}>
                  <AnimatedCircularProgress
                    size={30}
                    width={2}
                    fill={progress1}
                    tintColor="#FF0000"
                    backgroundColor="#e0e0e0"
                    rotation={0}
                    lineCap="round"
                  >

                  </AnimatedCircularProgress>
                  {/* Display the current chapter */}
                  <TouchableOpacity onPress={() => toggleChapter(14)}>
                    <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 5, marginTop: 4 }}>
                      {courseData.chapters[14].name}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* lesson 1 */}
                {selectedChapterIndex === 14 && courseData.chapters[14].lessons?.[0] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[14].lessons[0].courseLink);
                      setSelectedLesson({ chapterIndex: 14, lessonIndex: 0 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[14].lessons[0].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(14, 0)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[14].lessons[0].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 2*/}
                {selectedChapterIndex === 14 && courseData.chapters[14].lessons?.[1] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[14].lessons[1].courseLink);
                      setSelectedLesson({ chapterIndex: 14, lessonIndex: 1 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[14].lessons[1].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(14, 1)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[14].lessons[1].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 3*/}
                {selectedChapterIndex === 14 && courseData.chapters[14].lessons?.[2] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[14].lessons[2].courseLink);
                      setSelectedLesson({ chapterIndex: 14, lessonIndex: 2 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[14].lessons[2].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(14, 2)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[14].lessons[2].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 4*/}
                {selectedChapterIndex === 14 && courseData.chapters[14].lessons?.[3] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[14].lessons[3].courseLink);
                      setSelectedLesson({ chapterIndex: 14, lessonIndex: 3 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[14].lessons[3].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(14, 3)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[14].lessons[3].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 5*/}
                {selectedChapterIndex === 14 && courseData.chapters[14].lessons?.[4] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[14].lessons[4].courseLink);
                      setSelectedLesson({ chapterIndex: 14, lessonIndex: 4 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[14].lessons[4].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(14, 4)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[14].lessons[4].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 6*/}
                {selectedChapterIndex === 14 && courseData.chapters[14].lessons?.[5] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[14].lessons[5].courseLink);
                      setSelectedLesson({ chapterIndex: 14, lessonIndex: 5 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[14].lessons[5].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(14, 5)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[14].lessons[5].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 7*/}
                {selectedChapterIndex === 14 && courseData.chapters[14].lessons?.[6] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[14].lessons[6].courseLink);
                      setSelectedLesson({ chapterIndex: 14, lessonIndex: 6 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[14].lessons[6].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(14, 6)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[14].lessons[6].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                {/* lesson 8*/}
                {selectedChapterIndex === 14 && courseData.chapters[14].lessons?.[7] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[14].lessons[7].courseLink);
                      setSelectedLesson({ chapterIndex: 14, lessonIndex: 7 });
                    }}s
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[14].lessons[7].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(14, 7)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[14].lessons[7].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                {/* lesson 9*/}
                {selectedChapterIndex === 14 && courseData.chapters[14].lessons?.[8] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[14].lessons[8].courseLink);
                      setSelectedLesson({ chapterIndex: 14, lessonIndex: 8 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[14].lessons[8].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(14, 8)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[14].lessons[8].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                {/* lesson 10*/}
                {selectedChapterIndex === 13 && courseData.chapters[13].lessons?.[9] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[13].lessons[9].courseLink);
                      setSelectedLesson({ chapterIndex: 13, lessonIndex: 9 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[13].lessons[9].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(13, 9)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[13].lessons[9].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

               

                {/* lesson 12*/}
                {selectedChapterIndex === 13 && courseData.chapters[13].lessons?.[11] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[13].lessons[11].courseLink);
                      setSelectedLesson({ chapterIndex: 13, lessonIndex: 11 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[13].lessons[11].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(13, 11)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[13].lessons[11].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 13*/}
                {selectedChapterIndex === 13 && courseData.chapters[13].lessons?.[12] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[13].lessons[12].courseLink);
                      setSelectedLesson({ chapterIndex: 13, lessonIndex: 12 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[13].lessons[12].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(13, 12)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[13].lessons[12].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 14*/}
                {selectedChapterIndex === 11 && courseData.chapters[11].lessons?.[13] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[11].lessons[13].courseLink);
                      setSelectedLesson({ chapterIndex: 11, lessonIndex: 13 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[11].lessons[13].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(11, 13)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[11].lessons[13].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>

{/* Chapter 16 */}
<View style={{ marginHorizontal: 20, marginTop: 10 }}>
            {courseData?.chapters && courseData.chapters[15] && (
              <View>
                <View style={{ flexDirection: 'row' }}>
                  <AnimatedCircularProgress
                    size={30}
                    width={2}
                    fill={progress1}
                    tintColor="#FF0000"
                    backgroundColor="#e0e0e0"
                    rotation={0}
                    lineCap="round"
                  >

                  </AnimatedCircularProgress>
                  {/* Display the current chapter */}
                  <TouchableOpacity onPress={() => toggleChapter(15)}>
                    <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 5, marginTop: 4 }}>
                      {courseData.chapters[15].name}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* lesson 1 */}
                {selectedChapterIndex === 15 && courseData.chapters[15].lessons?.[0] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[15].lessons[0].courseLink);
                      setSelectedLesson({ chapterIndex: 15, lessonIndex: 0 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[15].lessons[0].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(15, 0)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[15].lessons[0].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {/* lesson 2*/}
                {selectedChapterIndex === 15 && courseData.chapters[15].lessons?.[1] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[15].lessons[1].courseLink);
                      setSelectedLesson({ chapterIndex: 15, lessonIndex: 1 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[15].lessons[1].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(15, 1)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[15].lessons[1].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>

         
{/* Chapter 17 */}
<View style={{ marginHorizontal: 20, marginTop: 10 }}>
            {courseData?.chapters && courseData.chapters[16] && (
              <View>
                <View style={{ flexDirection: 'row' }}>
                  <AnimatedCircularProgress
                    size={30}
                    width={2}
                    fill={progress1}
                    tintColor="#FF0000"
                    backgroundColor="#e0e0e0"
                    rotation={0}
                    lineCap="round"
                  >

                  </AnimatedCircularProgress>
                  {/* Display the current chapter */}
                  <TouchableOpacity onPress={() => toggleChapter(16)}>
                    <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 5, marginTop: 4 }}>
                      {courseData.chapters[16].name}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* lesson 1 */}
                {selectedChapterIndex === 16 && courseData.chapters[16].lessons?.[0] && (
                  <TouchableOpacity
                    onPress={() => {
                      setVideoUrl(courseData.chapters[16].lessons[0].courseLink);
                      setSelectedLesson({ chapterIndex: 16, lessonIndex: 0 });
                    }}
                  >
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                      {/* Display only the first lesson */}
                      <View key={courseData.chapters[16].lessons[0].id} style={{ marginTop: 10, flexDirection: 'row' }}>
                        {/* Custom Circular Checkbox */}
                        {customTick(16, 0)}
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10, marginTop: 9 }}>
                          {courseData.chapters[16].lessons[0].name}
                        </Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

              </View>
            )}
          </View>


        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    height: 60,
    backgroundColor: '#173A70',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  logo: {
    width: 90,
    height: 55,
    marginHorizontal: 120
  },
  webViewContainer: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 20,
  },
  fullScreenWebView: {
    position: 'absolute',
    top: 120,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10, // Makes sure it's on top of everything else
    backgroundColor: '#173A70', // Optional, for a cleaner look
  },
})