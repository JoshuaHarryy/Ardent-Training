import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ScrollView } from 'react-native-gesture-handler';
import YoutubeIframe from 'react-native-youtube-iframe'

export default function RyaDaySkipperScreen() {
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
                console.log(data)
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
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <MaterialIcons name={"arrow-back-ios"} size={24} color={"white"} style={styles.ArrowIcon} />
                    </TouchableOpacity>

                    <Image
                        source={require('../Assets/Vertical.png')}
                        style={styles.logo}
                    />
                </View>
                <View>
                    {courses
                        .filter(course => course.id === 1)
                        .map(item => (
                            <View key={item.id}>
                                <Image
                                    source={
                                        item.imageFulUrl && item.imageFulUrl !== 'null'
                                            ? { uri: item.imageFulUrl }
                                            : require('../Assets/DaySkipper.jpg')
                                    }
                                    onError={() => {
                                        console.log('Image URL failed to load, showing default image.');
                                        setImageSource(require('../Assets/DaySkipper.jpg'));
                                    }}
                                    style={{
                                        width: '100%',
                                        height: 250,
                                        borderTopLeftRadius: 10,
                                        borderTopRightRadius: 10,
                                    }}
                                />
                            </View>
                        ))}
                </View>

                {/* Name */}
                <View style={{ marginTop: 25, marginHorizontal: 20 }}>
                    {courses
                        .filter(course => course.id === 1)
                        .map((item) => (
                            <Text style={{ fontSize: 18, color: '#00008B', fontWeight: '500', marginBottom: 10 }} key={item.id}>
                                {item.name}
                            </Text>
                        ))}
                </View>

                <Text style={{ marginHorizontal: 20, fontSize: 15, fontWeight: '500', color: 'black' }}>Online Course</Text>


                <Text style={{ marginHorizontal: 20, marginTop: 150, fontSize: 20, fontWeight: '500', color: 'black' }}>What You Get:</Text>

                <View style={{ marginTop: 40 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image
                            source={require('../Assets/icon-1.png')}
                            style={{ height: 40, width: 50, marginHorizontal: 15 }}
                        />
                        <Text style={{ fontSize: 15, fontWeight: '400', color: 'black', marginBottom: 30, marginTop: 10, marginHorizontal: 5 }}>Live RYA instructor support</Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <Image
                            source={require('../Assets/icon-2.png')}
                            style={{ height: 40, width: 50, marginHorizontal: 15 }}
                        />
                        <Text style={{ fontSize: 15, fontWeight: '400', color: 'black', marginBottom: 30, marginTop: 10, marginHorizontal: 5 }}>21.5 hours of video content</Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <Image
                            source={require('../Assets/icon-3.png')}
                            style={{ height: 40, width: 50, marginHorizontal: 15 }}
                        />

                        <Text style={{ fontSize: 15, fontWeight: '400', color: 'black', marginBottom: 30, marginTop: 10, marginHorizontal: 5 }}>Knowledge base full of extra learning resources</Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <Image
                            source={require('../Assets/icon-4.png')}
                            style={{ height: 40, width: 50, marginHorizontal: 15 }}
                        />
                        <Text style={{ fontSize: 15, fontWeight: '400', color: 'black', marginBottom: 30, marginTop: 10, marginHorizontal: 5 }}>Communities Forum</Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <Image
                            source={require('../Assets/icon-5.png')}
                            style={{ height: 40, width: 50, marginHorizontal: 15 }}
                        />
                        <Text style={{ fontSize: 15, fontWeight: '400', color: 'black', marginBottom: 30, marginTop: 10, marginHorizontal: 5 }}>Mock exam, Personal feedback and tailored revision plan</Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <Image
                            source={require('../Assets/icon-6.png')}
                            style={{ height: 40, width: 50, marginHorizontal: 15 }}
                        />
                        <Text style={{ fontSize: 15, fontWeight: '400', color: 'black', marginBottom: 30, marginTop: 10, marginHorizontal: 5 }}>Professional quality student pack</Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <Image
                            source={require('../Assets/icon-7.png')}
                            style={{ height: 40, width: 50, marginHorizontal: 15 }}
                        />
                        <Text style={{ fontSize: 15, fontWeight: '400', color: 'black', marginBottom: 30, marginTop: 10, marginHorizontal: 5 }}>Access for 12 months</Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <Image
                            source={require('../Assets/icon-8.png')}
                            style={{ height: 40, width: 50, marginHorizontal: 15 }}
                        />
                        <Text style={{ fontSize: 15, fontWeight: '400', color: 'black', marginBottom: 30, marginTop: 10, marginHorizontal: 5 }}>RYA Day Skipper Theory Courses Shoreboard certificate</Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <Image
                            source={require('../Assets/icon-9.png')}
                            style={{ height: 40, width: 50, marginHorizontal: 15 }}
                        />
                        <Text style={{ fontSize: 15, fontWeight: '400', color: 'black', marginBottom: 300, marginTop: 10, marginHorizontal: 5 }}>Free international shipping</Text>
                    </View>
                </View>

                {/* YoutubeVideo */}
                <View>
                    <YoutubeIframe
                    height={300}
                    play={true}
                    videoId={'zwo86zuka-0&t=4s'}
                    />
                </View>

                <View style={{ alignItems: 'center' }}>
                    <View style={{ width: '90%', height: 50, backgroundColor: '#003366' }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, }}>
                            <Text style={{ fontWeight: 500, color: 'white', fontSize: 17 }}>TAKE THIS COURSE</Text>
                        </View>
                    </View>

                    <View style={{ width: '90%' }}>
                        {/* Block 1 */}
                        <View style={{
                            height: 100,
                            borderWidth: 0.5,
                            borderColor: 'black',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderBottomWidth: 0

                        }}>
                            <Text style={{ fontWeight: '700', fontSize: 19, color: '#003366', marginBottom: 5 }}>No Pre-Course Experience Required</Text>
                            <Text style={{ fontWeight: '600', fontSize: 14, }}>Although some practical experience is desirable</Text>
                        </View>

                        {/* Block 2 */}
                        <View style={{
                            height: 100,
                            borderWidth: 0.5,
                            borderColor: 'black',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderBottomWidth: 0
                        }}>
                            <Text style={{ fontWeight: '700', fontSize: 19, color: '#003366', marginBottom: 5 }}>Assumed Knowledge</Text>
                            <Text style={{ fontWeight: '600', fontSize: 14, }}>None</Text>
                        </View>

                        {/* Block 3 */}
                        <View style={{
                            height: 200,
                            borderWidth: 0.5,
                            borderColor: 'black',
                            marginBottom: 50,
                            position: 'relative',
                        }}>

                            <Text style={{ fontWeight: '700', fontSize: 19, color: '#003366', marginBottom: 5, alignSelf: 'center', marginTop: 20 }}>Duration</Text>

                            <Text style={{ fontWeight: '600', fontSize: 14, alignSelf: 'center' }}>Minimum 40-50 hours</Text>


                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText}>Buy Now</Text>
                            </TouchableOpacity>
                        </View>



                    </View>
                </View>

                <View>
                    {courses
                        .filter(course => course.id === 1)
                        .map(item => (
                            <View key={item.id}>
                                <Image
                                    source={
                                        item.imageFulUrl && item.imageFulUrl !== 'null'
                                            ? { uri: item.imageFulUrl }
                                            : require('../Assets/DaySkipper.jpg')
                                    }
                                    onError={() => {
                                        console.log('Image URL failed to load, showing default image.');
                                        setImageSource(require('../Assets/DaySkipper.jpg'));
                                    }}
                                    style={{
                                        width: '100%',
                                        height: 250,
                                        marginBottom: 300
                                    }}
                                />
                            </View>
                        ))}
                </View>


                {/* {What you get} */}
                <View>
                    <Text style={{ marginHorizontal: 20, marginTop: 150, fontSize: 20, fontWeight: '500', color: '#003366' }}>
                        What You Get:
                    </Text>

                    <View>
                        <Text style={{ fontSize: 14, color: 'black', marginTop: 20, marginHorizontal: 20 }}> • Instant RYA instructor support; live chat, email, phone or video calls, 12 hours a day</Text>
                    </View>

                    <View>
                        <Text style={{ fontSize: 14, color: 'black', marginTop: 10, marginHorizontal: 20 }}> • 21.5 hours of video content across 112 video lessons</Text>
                    </View>

                    <View>
                        <Text style={{ fontSize: 14, color: 'black', marginTop: 10, marginHorizontal: 20 }}> • Knowledge base feature filled with extra learning resources</Text>
                    </View>

                    <View>
                        <Text style={{ fontSize: 14, color: 'black', marginTop: 10, marginHorizontal: 20 }}> • Communities forum to engage with other like minded students and instructors</Text>
                    </View>

                    <View>
                        <Text style={{ fontSize: 14, color: 'black', marginTop: 10, marginHorizontal: 20 }}> • Mock and final exams marked with personal feedback and tailored revision plan</Text>
                    </View>

                    <View>
                        <Text style={{ fontSize: 14, color: 'black', marginTop: 10, marginHorizontal: 20 }}> • Access for 12 months</Text>
                    </View>

                    <View>
                        <Text style={{ fontSize: 14, color: 'black', marginTop: 10, marginHorizontal: 20 }}> • RYA Day Skipper Shorebased certificate</Text>
                    </View>

                    <View>
                        <Text style={{ fontSize: 14, color: 'black', marginTop: 10, marginHorizontal: 20 }}> • FREE international postage</Text>
                    </View>

                    <View>
                        <Text style={{ fontSize: 14, color: 'black', marginTop: 10, marginHorizontal: 20 }}> • Professional quality student pack including:</Text>
                    </View>

                    <View >
                        <Text style={{ fontSize: 14, color: 'black', marginTop: 10, marginHorizontal: 60 }}> •   Blundell harling portland plotter and dividers</Text>
                    </View>

                    <View >
                        <Text style={{ fontSize: 14, color: 'black', marginTop: 10, marginHorizontal: 60 }}> •   2 x Admiralty Training Charts</Text>
                    </View>

                    <View>
                        <Text style={{ fontSize: 14, color: 'black', marginTop: 10, marginHorizontal: 60 }}> •   2b mechanical chartwork pencil</Text>
                    </View>

                    <View>
                        <Text style={{ fontSize: 14, color: 'black', marginTop: 10, marginHorizontal: 60 }}> •   Soft chartwork rubber</Text>
                    </View>

                    <View>
                        <Text style={{ fontSize: 14, color: 'black', marginTop: 10, marginHorizontal: 60 }}> •   Ardent Training 'Handy hints' bookmark</Text>
                    </View>

                    <View>
                        <Text style={{ fontSize: 14, color: 'black', marginTop: 10, marginHorizontal: 60 }}> •   Two lengths of Marlow rope</Text>
                    </View>

                    <View>
                        <Text style={{ fontSize: 14, color: 'black', marginTop: 10, marginHorizontal: 60 }}> •   RYA Day Skipper Shorebased Notes e-book</Text>
                    </View>
                </View>

                {/* DropDown section  */}

                <View>
                    {/* Full course Syllabus */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ marginHorizontal: 20, marginTop: 70, fontSize: 20, fontWeight: '500', color: '#003366' }}>Full Course Syllabus</Text>
                        <View style={{ marginTop: 50, marginRight: 20 }}>
                            <MaterialIcons name="keyboard-arrow-down" size={30} color="#003366" />
                        </View>
                    </View>
                    <View style={{
                        borderBottomWidth: 1.5, 
                        borderBottomColor: '#003366', 
                        marginHorizontal: 20, 
                        marginTop: 10,
                        marginBottom: 5,
                    }} />

                    {/* Why Ardent Training? */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ marginHorizontal: 20, marginTop: 30, fontSize: 20, fontWeight: '500', color: '#003366' }}>Why Ardent Training?</Text>
                        <View style={{ marginTop: 30, marginRight: 20 }}>
                            <MaterialIcons name="keyboard-arrow-down" size={30} color="#003366" />
                        </View>
                    </View>
                    <View style={{
                        borderBottomWidth: 1.5, 
                        borderBottomColor: '#003366', 
                        marginHorizontal: 20, 
                        marginTop: 10,
                        marginBottom: 5,
                    }} />

                    {/* Your Support */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ marginHorizontal: 20, marginTop: 30, fontSize: 20, fontWeight: '500', color: '#003366' }}>Your Support</Text>
                        <View style={{ marginTop: 30, marginRight: 20 }}>
                            <MaterialIcons name="keyboard-arrow-down" size={30} color="#003366" />
                        </View>
                    </View>
                    <View style={{
                        borderBottomWidth: 1.5, 
                        borderBottomColor: '#003366', 
                        marginHorizontal: 20, 
                        marginTop: 10,
                        marginBottom: 5,
                    }} />

                    {/* Your Course */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ marginHorizontal: 20, marginTop: 30, fontSize: 20, fontWeight: '500', color: '#003366' }}>Your Course</Text>
                        <View style={{ marginTop: 30, marginRight: 20 }}>
                            <MaterialIcons name="keyboard-arrow-down" size={30} color="#003366" />
                        </View>
                    </View>
                    <View style={{
                        borderBottomWidth: 1.5, 
                        borderBottomColor: '#003366', 
                        marginHorizontal: 20, 
                        marginTop: 10,
                        marginBottom: 5,
                    }} />

                    {/* Your Exam */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ marginHorizontal: 20, marginTop: 30, fontSize: 20, fontWeight: '500', color: '#003366' }}>Your Exam</Text>
                        <View style={{ marginTop: 30, marginRight: 20 }}>
                            <MaterialIcons name="keyboard-arrow-down" size={30} color="#003366" />
                        </View>
                    </View>
                    <View style={{
                        borderBottomWidth: 1.5, 
                        borderBottomColor: '#003366', 
                        marginHorizontal: 20, 
                        marginTop: 10,
                        marginBottom: 5,
                    }} />


                    {/* Your Qualification */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ marginHorizontal: 20, marginTop: 30, fontSize: 20, fontWeight: '500', color: '#003366' }}>Your Qualification</Text>
                        <View style={{ marginTop: 30, marginRight: 20 }}>
                            <MaterialIcons name="keyboard-arrow-down" size={30} color="#003366" />
                        </View>
                    </View>
                    <View style={{
                        borderBottomWidth: 1.5, 
                        borderBottomColor: '#003366', 
                        marginHorizontal: 20, 
                        marginTop: 10,
                        marginBottom: 5,
                    }} />

                    {/* Extra Details */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ marginHorizontal: 20, marginTop: 30, fontSize: 20, fontWeight: '500', color: '#003366' }}>Extra Details</Text>
                        <View style={{ marginTop: 30, marginRight: 20 }}>
                            <MaterialIcons name="keyboard-arrow-down" size={30} color="#003366" />
                        </View>
                    </View>
                    <View style={{
                        borderBottomWidth: 1.5, 
                        borderBottomColor: '#003366', 
                        marginHorizontal: 20, 
                        marginTop: 10,
                        marginBottom: 5,
                    }} />
                </View>

<View style={{ alignItems: 'center', marginTop: 60, marginBottom: 40}}>
    <Text style={{marginHorizontal: 20, fontSize: 20, fontWeight: '500', color: '#003366'}}>Why Learn With Us?</Text>
</View>

<View style={{alignItems: 'center'}}>
    <Text style={{ marginHorizontal: 20, fontSize: 15, lineHeight: 25,}}>Ardent Training is committed to providing the premium quality online RYA courses.  As experienced professional sailors we have written our RYA theory courses with the aim of improving the quality of RYA online courses available. We continually update and improve our courses as well as providing the highest level of support for our students.</Text>

    <Text style={{ marginHorizontal: 20, marginTop: 10, fontSize: 15, lineHeight: 25, marginBottom: 20}}>Every lesson is filmed and you can choose to learn through RYA instructor led videos or read through our content and images.</Text>
</View>

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        height: 120,
        backgroundColor: '#003366',
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
    scrollViewContent: {
        flexGrow: 1,
    },
    block: {
        height: 100,
        borderWidth: 0.5,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    blockText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#003366',
        alignSelf: 'center',
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 0.5,
        borderTopColor: 'black',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    buttonText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 17,
    },
})