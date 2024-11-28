import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../Components/HeaderCourses'
import YoutubeIframe from 'react-native-youtube-iframe';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


export default function RyaCoastalSkipperScreen({ navigation }) {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isExpanded, setIsExpanded] = useState();
    const [expand, setExpand] = useState();
    const [expand1, setExpand1] = useState();
    const [expand2, setExpand2] = useState();
    const [expand3, setExpand3] = useState();
    const [expand4, setExpand4] = useState();
    const [expand5, setExpand5] = useState();
    const [imageError, setImageError] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };
    const toggleExpand1 = () => {
        setExpand(!expand);
    };
    const toggleExpand2 = () => {
        setExpand1(!expand1);
    };
    const toggleExpand3 = () => {
        setExpand2(!expand2);
    };
    const toggleExpand4 = () => {
        setExpand3(!expand3);
    };
    const toggleExpand5 = () => {
        setExpand4(!expand4);
    };
    const toggleExpand6 = () => {
        setExpand5(!expand5);
    };

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
                <Header navigation={navigation} />
                <View>
                {courses
                .filter(course => course.id === 4)
                .map(item => (
                  <View key={item.id}>
                    <Image
                  source={
                    !imageError && item.imageFulUrl
                      ? { uri: item.imageFulUrl }
                      : require('../Assets/DaySkipper.jpg')
                  }
                  style={{
                    width: '100%',
                    height: 250,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}
                  onError={() => setImageError(true)} 
                />
                    {/* <View
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
                    </View> */}
                  </View>
                ))}
            </View>

                <View style={{ marginTop: 25, marginHorizontal: 20 }}>
                    {courses
                        .filter(course => course.id === 4)
                        .map((item) => (
                            <Text style={{ fontSize: 18, color: '#00008B', fontWeight: '500', marginBottom: 10 }} key={item.id}>
                                {item.name}
                            </Text>
                        ))}
                </View>

                <Text style={{ marginHorizontal: 20, fontSize: 15, fontWeight: '400', color: '#00008B' }}>Online Course</Text>

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
                        <Text style={{ fontSize: 15, fontWeight: '400', color: 'black', marginBottom: 40, marginTop: 10, marginHorizontal: 5 }}>Free international shipping</Text>
                    </View>
                </View>

                {/* YoutubeVideo */}
                <View style={{ alignItems: 'center' }}>
                    <YoutubeIframe
                        height={350}
                        width={'95%'}
                        play={false}
                        videoId="zwo86zuka-0"
                    />
                </View>

                {/* Blocks section */}
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
                            <Text style={{ fontWeight: '600', fontSize: 14,color: 'black' }}>An extensive experience of sailing, time on boats and</Text>
                            <Text style={{ fontWeight: '600', fontSize: 14, color: 'black'}}> the water but no formal qualifications required</Text>
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
                            <Text style={{ fontWeight: '600', fontSize: 14,color: 'black' }}>Understanding of navigation,tides and meteorology </Text>
                            <Text style={{ fontWeight: '600', fontSize: 14,color: 'black' }}>to Day Skipper Standard.</Text>
                          
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

                            <Text style={{ fontWeight: '600', fontSize: 14, alignSelf: 'center',color: 'black' }}>Minimum 70 hours</Text>


                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText}>Buy Now (£475)</Text>
                            </TouchableOpacity>
                        </View>



                    </View>
                </View>

                <View>
                    {courses
                        .filter(course => course.id === 1)
                        .map(item => (
                            <View key={item.id}>
                                {/* Image Section */}
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
                                        marginBottom: 20,
                                    }}
                                />

                                {/* Text and Button Section */}
                                <View style={{ position: 'absolute', top: '20%', width: '100%', alignItems: 'center' }}>
                                    {/* Text 1 */}
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}>
                                    Start Your
                                    </Text>

                                    {/* Text 2 */}
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff', marginTop: 10 }}>
                                    RYA Fast Track to Coastal Skipper/Yachtmaster Offshore Theory Course
                                    </Text>

                                    {/* Buy Now Button */}
                                    <TouchableOpacity
                                        style={{
                                            paddingVertical: 10,
                                            paddingHorizontal: 20,
                                            backgroundColor:  '#FE8E91',
                                            marginTop: 10,
                                            height: 60,
                                            width: '60%',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                        onPress={() => console.log('Buy Now clicked!')}
                                    >
                                        <Text style={{ color: '#fff', fontWeight: '500', fontSize: 18 }}>Buy Now  (£475)</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                </View>

                {/* YoutubeVideo */}
                <View style={{ alignItems: 'center' }}>
                    <YoutubeIframe
                        height={350}
                        width={'95%'}
                        play={false}
                        videoId="zwo86zuka-0"
                    />
                </View>

                  {/* {What you get} */}
                  <View>
                    <Text style={{ marginHorizontal: 20, marginTop: 40, fontSize: 20, fontWeight: '500', color: '#003366' }}>
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
                    <TouchableOpacity onPress={toggleExpand}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ marginHorizontal: 20, marginTop: 70, fontSize: 20, fontWeight: '500', color: '#003366' }}>Full Course Syllabus</Text>
                            <View style={{ marginTop: 65, marginRight: 20 }}>
                                <MaterialIcons name="keyboard-arrow-down" size={30} color="#003366" />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={{
                        borderBottomWidth: 1.5,
                        borderBottomColor: '#003366',
                        marginHorizontal: 20,
                        marginTop: 10,
                        marginBottom: 5,
                    }} />

                    {isExpanded && (
                        <View style={{ marginHorizontal: 20, marginTop: 50 }}>
                            <Text style={{ fontSize: 15, fontWeight: '400',color: 'black' }}>
                                Nautical Terminology
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color: 'black' }}>
                                Charts
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color: 'black' }}>
                                Buoyage
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color: 'black' }}>
                                Latitude and Longitude
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color: 'black' }}>
                                Measuring Bearings
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color: 'black' }}>
                                Measuring Distance
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color: 'black' }}>
                                The Compass and Magnetic Variation
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color: 'black' }}>
                                GNSS (Global Navigation Satellite System)
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color: 'black' }}>
                                Chartplotters
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color: 'black' }}>
                                Transducers
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color: 'black' }}>
                                Radar
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color: 'black' }}>
                                AIS (Automatic Identification System)
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color: 'black' }}>
                                Position Fixing (including range and bearing, transits, and three-point fixes)
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color: 'black' }}>
                                Rope Materials and Construction
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color: 'black' }}>
                                Knots
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color: 'black' }}>
                                Tidal Theory
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color: 'black' }}>
                                Tidal Curves
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color: 'black' }}>
                                Anchors
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color: 'black' }}>
                                Anchoring
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color: 'black' }}>
                                Dead Reckoning
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color: 'black' }}>
                                Tidal Streams
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color: 'black' }}>
                                Estimated Positions
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color: 'black' }}>
                                Course to Steer
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color: 'black' }}>
                                Vectors
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color: 'black' }}>
                                International Regulations for the Prevention of Collisions at Sea
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color: 'black' }}>
                                Pressure Systems and the Passage of Fronts
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color: 'black' }}>
                                Land and Sea Breezes
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color: 'black' }}>
                                Fog
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color: 'black' }}>
                                Forecasts
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color: 'black' }}>
                                Personal Care
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color: 'black' }}>
                                Lifejackets
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color: 'black' }}>
                                Man Overboard
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color: 'black' }}>
                                Stability
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color: 'black' }}>
                                Fire
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color: 'black' }}>
                                Distress Signals
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color: 'black' }}>
                                Helicopter Rescue
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color: 'black' }}>
                                Abandon Ship
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color: 'black' }}>
                                Safety Brief
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color: 'black' }}>
                                Pilotage
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color: 'black' }}>
                                Passage Planning
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color: 'black' }}>
                                Marine Environment
                            </Text>
                        </View>
                    )}

                    {/* Why Ardent Training? */}
                    <TouchableOpacity onPress={toggleExpand1}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ marginHorizontal: 20, marginTop: 30, fontSize: 20, fontWeight: '500', color: '#003366' }}>Why Ardent Training?</Text>
                            <View style={{ marginTop: 30, marginRight: 20 }}>
                                <MaterialIcons name="keyboard-arrow-down" size={30} color="#003366" />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={{
                        borderBottomWidth: 1.5,
                        borderBottomColor: '#003366',
                        marginHorizontal: 20,
                        marginTop: 10,
                        marginBottom: 5,
                    }} />

                    {expand && (
                        <View style={{ marginHorizontal: 20, marginTop: 50 }}>
                            <Text style={{ fontSize: 15, fontWeight: '500', color: '#003366' }}>
                                Why choose Ardent Training? Is it the best RYA Day Skipper online theory course?
                            </Text>
                            <Text style={{ fontSize: 13, fontWeight: '400', color: '#003366', marginTop: 10 }}>
                                While we may not be the cheapest, we take pride in offering a top-tier learning experience. Our course includes extensive video lessons, unlimited instructor support, and a vibrant student community, combining the convenience of online study with the social aspect of a classroom.
                            </Text>

                            <Text style={{ fontSize: 15, fontWeight: '500', color: '#003366', marginTop: 20 }}>
                                What is the advantage of online learning?
                            </Text>
                            <Text style={{ fontSize: 13, fontWeight: '400', color: '#003366', marginTop: 10 }}>
                                Online learning offers the flexibility to study at your own pace. You can focus more time on challenging topics and progress faster in areas you find easier. Our 1:1 instructor support is available whenever you need it. Additionally, you can study from anywhere, anytime, eliminating the need for taking time off work, booking accommodation, and eating out.
                            </Text>


                            <Text style={{ fontSize: 15, fontWeight: '500', color: '#003366', marginTop: 20 }}>
                                What's the disadvantage of online learning?
                            </Text>
                            <Text style={{ fontSize: 13, fontWeight: '400', color: '#003366', marginTop: 10 }}>
                                While online learning provides flexibility, some learners miss the in-person classroom experience. However, our discussion feature allows students to ask questions and interact with instructors, bridging this gap. We also host live webinars to provide a social element to your learning experience, as well as a Student Forum to engage with your peers outside of the classroom.
                            </Text>

                            <Text style={{ fontSize: 15, fontWeight: '500', color: '#003366', marginTop: 20 }}>
                                Why does your course cost more than your competitors?
                            </Text>
                            <Text style={{ fontSize: 13, fontWeight: '400', color: '#003366', marginTop: 10 }}>
                                Our course prioritises delivering a premium learning experience with over 21.5 hours of video content, expert support, and a vibrant student community. Quality and success in the RYA theory exam are our focus.
                            </Text>

                            <Text style={{ fontSize: 15, fontWeight: '500', color: '#003366', marginTop: 20 }}>
                                Are there any hidden costs?
                            </Text>
                            <Text style={{ fontSize: 13, fontWeight: '400', color: '#003366', marginTop: 10 }}>
                                No hidden costs; your student pack, delivery, instructor support, exam, and certificate are all covered in the signup price. If you choose to have your final exam invigilated, any associated fees go directly to the invigilator and are not part of our course fee.
                            </Text>


                            <Text style={{ fontSize: 15, fontWeight: '500', color: '#003366', marginTop: 20 }}>
                                Are the RYA online courses accessible for people with disabilities?
                            </Text>
                            <Text style={{ fontSize: 13, fontWeight: '400', color: '#003366', marginTop: 10 }}>
                                We aim to make our courses accessible; please contact us to discuss specific requirements or accommodations.
                            </Text>
                        </View>
                    )}


                    {/* Your Support */}
                    <TouchableOpacity onPress={toggleExpand2}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ marginHorizontal: 20, marginTop: 30, fontSize: 20, fontWeight: '500', color: '#003366' }}>Your Support</Text>
                            <View style={{ marginTop: 30, marginRight: 20 }}>
                                <MaterialIcons name="keyboard-arrow-down" size={30} color="#003366" />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={{
                        borderBottomWidth: 1.5,
                        borderBottomColor: '#003366',
                        marginHorizontal: 20,
                        marginTop: 10,
                        marginBottom: 5,
                    }} />

                    {expand1 && (
                        <View style={{ marginHorizontal: 20, marginTop: 50 }}>
                            <Text style={{ fontSize: 15, fontWeight: '500', color: '#003366' }}>
                                How do I contact my instructor?
                            </Text>
                            <Text style={{ fontSize: 13, fontWeight: '400', color: '#003366', marginTop: 10 }}>
                                You can easily reach out to our RYA instructors via Live Chat, Email, or Phone. Our support team operates from 0800-2000 UK Time, and within these hours, we typically respond within minutes (often around 30 seconds). This personalised 1:1 support ensures you get the precise assistance you need and the best out of your course.
                            </Text>


                            <Text style={{ fontSize: 15, fontWeight: '500', color: '#003366', marginTop: 20 }}>
                                Who will my instructor be?
                            </Text>
                            <Text style={{ fontSize: 13, fontWeight: '400', color: '#003366', marginTop: 10 }}>
                                We employ the top Instructors in the industry to give you the best learning experience. Check out our instructor profiles page to meet your team. We're all passionate about our subject, and giving you the best learning experience. We are also the ones who have written and filmed the course and so are with you every step of the way, whether you need extra support or not!
                            </Text>


                            <Text style={{ fontSize: 15, fontWeight: '500', color: '#003366', marginTop: 20 }}>
                                How quickly do you answer queries?
                            </Text>
                            <Text style={{ fontSize: 13, fontWeight: '400', color: '#003366', marginTop: 10 }}>
                                Our instructors are available from 0800 to 2000 (UK time), 7 days a week. We aim to respond within 4 minutes, with most queries answered in around 30 seconds.
                            </Text>


                            <Text style={{ fontSize: 15, fontWeight: '500', color: '#003366', marginTop: 20 }}>
                                Can I take this course if I am dyslexic?
                            </Text>
                            <Text style={{ fontSize: 13, fontWeight: '400', color: '#003366', marginTop: 10 }}>
                                Absolutely, our course is designed to be inclusive. We provide content in multiple formats, including video, written, images, and diagrams, allowing you to select the learning style that best suits you. If you have specific needs or questions related to dyslexia, please reach out to our dedicated support team for further assistance.
                            </Text>
                        </View>
                    )}

                    {/* Your Course */}
                    <TouchableOpacity onPress={toggleExpand3}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ marginHorizontal: 20, marginTop: 30, fontSize: 20, fontWeight: '500', color: '#003366' }}>Your Course</Text>
                            <View style={{ marginTop: 30, marginRight: 20 }}>
                                <MaterialIcons name="keyboard-arrow-down" size={30} color="#003366" />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={{
                        borderBottomWidth: 1.5,
                        borderBottomColor: '#003366',
                        marginHorizontal: 20,
                        marginTop: 10,
                        marginBottom: 5,
                    }} />

                    {expand2 && (
                        <View style={{ marginHorizontal: 20, marginTop: 40 }}>
                            <Text style={{ fontSize: 15, fontWeight: '500', color: '#003366' }}>
                                Is this course RYA approved?
                            </Text>
                            <Text style={{ fontSize: 13, fontWeight: '400', color: '#003366', marginTop: 10 }}>
                                Yes, our course is approved by the Royal Yachting Association (RYA). It adheres to RYA curriculum guidelines and standards, ensuring high-quality, recognized training.
                            </Text>


                            <Text style={{ fontSize: 15, fontWeight: '500', color: '#003366', marginTop: 20 }}>
                                How is the course presented?
                            </Text>
                            <Text style={{ fontSize: 13, fontWeight: '400', color: '#003366', marginTop: 10 }}>
                                Our RYA Day Skipper theory course presents lessons through videos created by our team of RYA Instructors. These videos were filmed in various UK locations, including our own vessels and floating classrooms. You have the flexibility to choose between video content, written materials, as well as images and diagrams to suit your preferred learning style.
                            </Text>


                            <Text style={{ fontSize: 15, fontWeight: '500', color: '#003366', marginTop: 20 }}>
                                How long does the course take?
                            </Text>
                            <Text style={{ fontSize: 13, fontWeight: '400', color: '#003366', marginTop: 10 }}>
                                The RYA Day Skipper theory course is a minimum of 40 hours but typically takes around 50 hours. It's self-paced, enabling you to tailor your learning to your schedule.
                            </Text>


                            <Text style={{ fontSize: 15, fontWeight: '500', color: '#003366', marginTop: 20 }}>
                                Is the learning scheduled/timetabled?
                            </Text>
                            <Text style={{ fontSize: 13, fontWeight: '400', color: '#003366', marginTop: 10 }}>
                                No, the RYA Day Skipper theory course is self-paced, allowing you to study whenever it suits you.
                            </Text>

                            <Text style={{ fontSize: 15, fontWeight: '500', color: '#003366', marginTop: 20 }}>
                                Books and charts are supplied with the RYA online course. do I need a desk to use these?
                            </Text>
                            <Text style={{ fontSize: 13, fontWeight: '400', color: '#003366', marginTop: 10 }}>
                                To complete chartwork accurately, you'll need a large, clean, flat space, ideally 60x70cm. Some modules don't require a desk, but a tidy, distraction-free study area is recommended.
                            </Text>

                            <Text style={{ fontSize: 15, fontWeight: '500', color: '#003366', marginTop: 20 }}>
                                Do I need to download anything to complete my RYA courses?
                            </Text>
                            <Text style={{ fontSize: 13, fontWeight: '400', color: '#003366', marginTop: 10 }}>
                                No downloads are necessary. You can access and complete the entire course online through your web browser.
                            </Text>

                            <Text style={{ fontSize: 15, fontWeight: '500', color: '#003366', marginTop: 20 }}>
                                What are the system requirements for my computer?
                            </Text>
                            <Text style={{ fontSize: 13, fontWeight: '400', color: '#003366', marginTop: 10 }}>
                                All you need is an up-to-date web browser. If you choose to use the videos (optional), your device should support sound playback.
                            </Text>

                            <Text style={{ fontSize: 15, fontWeight: '500', color: '#003366', marginTop: 20 }}>
                                Can I use my iPad/tablet/phone to complete the course?
                            </Text>
                            <Text style={{ fontSize: 13, fontWeight: '400', color: '#003366', marginTop: 10 }}>
                                Yes, our courses are designed to work on various devices, and we're developing an app for offline viewing on iOS and Android.
                            </Text>


                            <Text style={{ fontSize: 15, fontWeight: '500', color: '#003366', marginTop: 20 }}>
                                How can I track my progress hhrough the course?
                            </Text>
                            <Text style={{ fontSize: 13, fontWeight: '400', color: '#003366', marginTop: 10 }}>
                                Our online platform includes a built-in progress tracker, showing module and overall course progress.
                            </Text>


                            <Text style={{ fontSize: 15, fontWeight: '500', color: '#003366', marginTop: 20 }}>
                                Can I take my RYA courses on the bus, train or at sea?
                            </Text>
                            <Text style={{ fontSize: 13, fontWeight: '400', color: '#003366', marginTop: 10 }}>
                                Yes, you can take our courses on the go. Our online format allows you to study anywhere, anytime. However, some modules may require a stable workspace for chartwork and navigation. You will need an internet connection.
                            </Text>


                            <Text style={{ fontSize: 15, fontWeight: '500', color: '#003366', marginTop: 20 }}>
                                Can I take my RYA courses offline?
                            </Text>
                            <Text style={{ fontSize: 13, fontWeight: '400', color: '#003366', marginTop: 10 }}>
                                Currently, a stable internet connection is needed to access and progress through the course. However, we are working on making our courses available for offline viewing using an app, recognising the needs of seafarers.
                            </Text>

                            <Text style={{ fontSize: 15, fontWeight: '500', color: '#003366', marginTop: 20 }}>
                                Is this course for sailing or motor boats?
                            </Text>
                            <Text style={{ fontSize: 13, fontWeight: '400', color: '#003366', marginTop: 10 }}>
                                The theory course covers topics relevant to both sailing and motor cruising. The distinction between them usually comes into play during the practical course. Our curriculum provides foundational knowledge for both types of vessels.
                            </Text>


                            <Text style={{ fontSize: 15, fontWeight: '500', color: '#003366', marginTop: 20 }}>
                                Can I take this course in a classroom?
                            </Text>
                            <Text style={{ fontSize: 13, fontWeight: '400', color: '#003366', marginTop: 10 }}>
                                Our course is primarily designed for online learning convenience. However, you can inquire about classroom-based RYA courses at local training centers or seek recommendations from our instructors.
                            </Text>

                            <Text style={{ fontSize: 15, fontWeight: '500', color: '#003366', marginTop: 20 }}>
                                What is the difference between the theory course and the shorebased course?
                            </Text>
                            <Text style={{ fontSize: 13, fontWeight: '400', color: '#003366', marginTop: 10 }}>
                                The theory course and shorebased course are interchangeable terms referring to the theoretical part of RYA training, providing essential knowledge and skills for safe sailing.
                            </Text>
                        </View>
                    )}



                    {/* Your Exam */}
                    <TouchableOpacity onPress={toggleExpand4}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ marginHorizontal: 20, marginTop: 30, fontSize: 20, fontWeight: '500', color: '#003366' }}>Your Exam</Text>
                            <View style={{ marginTop: 30, marginRight: 20 }}>
                                <MaterialIcons name="keyboard-arrow-down" size={30} color="#003366" />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={{
                        borderBottomWidth: 1.5,
                        borderBottomColor: '#003366',
                        marginHorizontal: 20,
                        marginTop: 10,
                        marginBottom: 5,
                    }} />

                    {expand3 && (
                        <View style={{ marginHorizontal: 20, marginTop: 40 }}>
                            <Text style={{ fontSize: 15, fontWeight: '500', color: '#003366' }}>
                                How does the RYA theory exam work?
                            </Text>
                            <Text style={{ fontSize: 13, fontWeight: '400', color: '#003366', marginTop: 10 }}>
                                Upon course completion, you gain access to a mock exam. Our instructors provide detailed feedback on your mock results and create a revision plan for you. The Day Skipper exam consists of two sections, each lasting 90 minutes. It can be completed from home, following a format similar to the mock and module assessments you've encountered throughout the course.
                            </Text>


                            <Text style={{ fontSize: 15, fontWeight: '500', color: '#003366', marginTop: 20 }}>
                                Can I get extended time on the exam if I am dyslexic?
                            </Text>
                            <Text style={{ fontSize: 13, fontWeight: '400', color: '#003366', marginTop: 10 }}>
                                We understand the importance of accommodating individual needs. If you have dyslexia or any other condition that may require additional exam time, please contact our instructors. We will work closely with you to ensure you have the necessary accommodations for a fair and comfortable exam experience.
                            </Text>

                            <Text style={{ fontSize: 15, fontWeight: '500', color: '#003366', marginTop: 20 }}>
                                What if I fail the exam?
                            </Text>
                            <Text style={{ fontSize: 13, fontWeight: '400', color: '#003366', marginTop: 10 }}>
                                We're committed to your success. Before you're even put forward for the final exam, we work with you to ensure you're fully prepared. If the final exam doesn't go as expected, we provide additional support, including reviewing your answers and setting additional questions as needed, until you pass.
                            </Text>

                            <Text style={{ fontSize: 15, fontWeight: '500', color: '#003366', marginTop: 20 }}>
                                How much does the exam cost?
                            </Text>
                            <Text style={{ fontSize: 13, fontWeight: '400', color: '#003366', marginTop: 10 }}>
                                There are no hidden costs for the exam, resits, or additional questions – everything is included in the signup fee.
                            </Text>


                            <Text style={{ fontSize: 15, fontWeight: '500', color: '#003366', marginTop: 20 }}>
                                Do I need to have my exam invigilated?
                            </Text>
                            <Text style={{ fontSize: 13, fontWeight: '400', color: '#003366', marginTop: 10 }}>
                                The RYA Day Skipper Theory/Shorebased exam typically doesn't require invigilation, except if you plan to commercially endorse your RYA Day Skipper license for use as a commercial vessel skipper. In such cases, we can arrange invigilation at a convenient location for you, though this might involve an additional fee paid directly to the invigilator. For guidance on this, please reach out to us.
                            </Text>


                            <Text style={{ fontSize: 15, fontWeight: '500', color: '#003366', marginTop: 20 }}>
                                What Is the pass rate? am I guaranteed to get my RYA certificate?
                            </Text>
                            <Text style={{ fontSize: 13, fontWeight: '400', color: '#003366', marginTop: 10 }}>
                                We are dedicated to your success and offer comprehensive support. We work with you until we're confident you'll pass the final exam. Your commitment is key to achieving your RYA theory certificate.
                            </Text>

                            <Text style={{ fontSize: 15, fontWeight: '500', color: '#003366', marginTop: 20 }}>
                                How long is the exam?
                            </Text>
                            <Text style={{ fontSize: 13, fontWeight: '400', color: '#003366', marginTop: 10 }}>
                                The final exam is made up of two 90 minute papers. There is a 30 minutes timed break in between each paper.
                            </Text>
                        </View>
                    )}


                    {/* Your Qualification */}
                    <TouchableOpacity onPress={toggleExpand5}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ marginHorizontal: 20, marginTop: 30, fontSize: 20, fontWeight: '500', color: '#003366' }}>Your Qualification</Text>
                            <View style={{ marginTop: 30, marginRight: 20 }}>
                                <MaterialIcons name="keyboard-arrow-down" size={30} color="#003366" />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={{
                        borderBottomWidth: 1.5,
                        borderBottomColor: '#003366',
                        marginHorizontal: 20,
                        marginTop: 10,
                        marginBottom: 5,
                    }} />

                    {expand4 && (
                        <View style={{ marginHorizontal: 20, marginTop: 40 }}>
                            <Text style={{ fontSize: 15, fontWeight: '500', color: '#003366' }}>
                            Will I get my RYA practical certificate for completing an online course?
                            </Text>
                            <Text style={{ fontSize: 13, fontWeight: '400', color: '#003366', marginTop: 10 }}>
                            No, our courses are for RYA shorebased theory only. To earn your practical certificate, you'll need to complete the practical training at an RYA Training Centre. If you'd like recommendations for training centers, please contact us.
                            </Text>


                            <Text style={{ fontSize: 15, fontWeight: '500', color: '#003366', marginTop: 20 }}>
                            Is this certificate internationally recognised?
                            </Text>
                            <Text style={{ fontSize: 13, fontWeight: '400', color: '#003366', marginTop: 10 }}>
                            Absolutely, RYA certificates earned through our courses hold international recognition. They are highly regarded not only in the UK but also in many other countries, and they entitle you to an International Certificate of Competence (ICC) without further assessment.
                            </Text>

                            <Text style={{ fontSize: 15, fontWeight: '500', color: '#003366', marginTop: 20 }}>
                           Is this an ICC (International Certificate of Competence)?
                            </Text>
                            <Text style={{ fontSize: 13, fontWeight: '400', color: '#003366', marginTop: 10 }}>
                            Yes, the RYA Day Skipper certificate can be used to obtain an ICC without further assessment, making it internationally valuable.
                            </Text>

                            <Text style={{ fontSize: 15, fontWeight: '500', color: '#003366', marginTop: 20 }}>
                            Can I captain a boat with this licence?
                            </Text>
                            <Text style={{ fontSize: 13, fontWeight: '400', color: '#003366', marginTop: 10 }}>
                            To become a licensed boat captain, you need to complete both the theory and practical courses. However, specific requirements for licensing and captaincy may vary by location and vessel type, so consult local authorities and regulations for clarity.
                            </Text>


                            <Text style={{ fontSize: 15, fontWeight: '500', color: '#003366', marginTop: 20 }}>
                           Can I use this licence to work on yachts?
                            </Text>
                            <Text style={{ fontSize: 13, fontWeight: '400', color: '#003366', marginTop: 10 }}>
                            The RYA Day Skipper Licence can be commercially endorsed for yacht work. However, professional yacht roles might require additional certifications and qualifications such as the RYA Yachtmaster Offshore. The RYA Day Skipper is a good starting point. If you're at all unsure consult our instructors for personalised guidance.
                            </Text>

                            <Text style={{ fontSize: 15, fontWeight: '500', color: '#003366', marginTop: 20 }}>
                          Can I charter a boat abroad with this licence?
                            </Text>
                            <Text style={{ fontSize: 13, fontWeight: '400', color: '#003366', marginTop: 10 }}>
                            You can typically charter a boat abroad with an RYA Day Skipper license, although charter companies may have varying requirements. Be sure to check with your specific charter company and local regulations for any additional requirements.
                            </Text>
                            </View>
                    )}

                    {/* Extra Details */}
                    <TouchableOpacity onPress={toggleExpand6}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ marginHorizontal: 20, marginTop: 30, fontSize: 20, fontWeight: '500', color: '#003366' }}>Extra Details</Text>
                            <View style={{ marginTop: 30, marginRight: 20 }}>
                                <MaterialIcons name="keyboard-arrow-down" size={30} color="#003366" />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={{
                        borderBottomWidth: 1.5,
                        borderBottomColor: '#003366',
                        marginHorizontal: 20,
                        marginTop: 10,
                        marginBottom: 5,
                    }} />
                </View>

                {expand5 && (
                        <View style={{ marginHorizontal: 20, marginTop: 40 }}>
                            <Text style={{ fontSize: 15, fontWeight: '500', color: '#003366' }}>
                            How long do I have to do the course?
                            </Text>
                            <Text style={{ fontSize: 13, fontWeight: '400', color: '#003366', marginTop: 10 }}>
                            You have access to the course for 12 months. If you wish to extend it for an additional 6 months, there's a £30 administration fee.
                            </Text>

                            <Text style={{ fontSize: 15, fontWeight: '500', color: '#003366', marginTop: 20 }}>
                            When can I start?
                            </Text>
                            <Text style={{ fontSize: 13, fontWeight: '400', color: '#003366', marginTop: 10 }}>
                            You can start the RYA Day Skipper theory course as soon as you sign up. Our online platform grants you instant access to the full course as soon as you log in.
                            </Text>


                            <Text style={{ fontSize: 15, fontWeight: '500', color: '#003366', marginTop: 20 }}>
                           I live abroad, how much will the postage cost?
                            </Text>
                            <Text style={{ fontSize: 13, fontWeight: '400', color: '#003366', marginTop: 10 }}>
                            We offer free international express delivery for the student pack, eliminating additional postage costs for overseas students.
                            </Text>


                            <Text style={{ fontSize: 15, fontWeight: '500', color: '#003366', marginTop: 20 }}>
                          What happens if I don’t finish my online RYA theory course in 12 months?
                            </Text>
                            <Text style={{ fontSize: 13, fontWeight: '400', color: '#003366', marginTop: 10 }}>
                            If your course nears expiry, contact us for a small extension fee of £30 for an additional 6 months of access.
                            </Text>


                            <Text style={{ fontSize: 15, fontWeight: '500', color: '#003366', marginTop: 20 }}>
                        What is the minimum age to take the online RYA courses?
                            </Text>
                            <Text style={{ fontSize: 13, fontWeight: '400', color: '#003366', marginTop: 10 }}>
                            There's no minimum age for RYA theory courses, but for the Day Skipper Practical course, the minimum age is 16.
                            </Text>


                            <Text style={{ fontSize: 15, fontWeight: '500', color: '#003366', marginTop: 20 }}>
                       What level of english proficiency do I need to take an RYA course online?
                            </Text>
                            <Text style={{ fontSize: 13, fontWeight: '400', color: '#003366', marginTop: 10 }}>
                            Basic English understanding is necessary as our courses are conducted in English.
                            </Text>


                            <Text style={{ fontSize: 15, fontWeight: '500', color: '#003366', marginTop: 20 }}>
                      Can I complete an RYA online course in another language?
                            </Text>
                            <Text style={{ fontSize: 13, fontWeight: '400', color: '#003366', marginTop: 10 }}>
                            Currently, our courses are available only in English.
                            </Text>

                            <Text style={{ fontSize: 15, fontWeight: '500', color: '#003366', marginTop: 20 }}>
                     What Is the refund policy for online RYA courses?
                            </Text>
                            <Text style={{ fontSize: 13, fontWeight: '400', color: '#003366', marginTop: 10 }}>
                            Under distance selling regulations, you have a 14-day cooling-off period from receiving your student pack. You can request a refund during this period, except for postage and any damaged materials.
                            </Text>


                            <Text style={{ fontSize: 15, fontWeight: '500', color: '#003366', marginTop: 20 }}>
                 Is there an option for group enrolment for RYA online courses?
                            </Text>
                            <Text style={{ fontSize: 13, fontWeight: '400', color: '#003366', marginTop: 10 }}>
                            Yes, we offer group enrolment with potential discounts based on group size. Contact us for details.
                            </Text>


                            <Text style={{ fontSize: 15, fontWeight: '500', color: '#003366', marginTop: 20 }}>
              Can I gift an RYA online course to someone else?
                            </Text>
                            <Text style={{ fontSize: 13, fontWeight: '400', color: '#003366', marginTop: 10 }}>
                            Yes, our courses make great gifts. We can provide gift wrapping for student packs or gift vouchers for course access.
                            </Text>
                            </View>
                )}

                <View style={{ alignItems: 'center', marginTop: 60, marginBottom: 40 }}>
                    <Text style={{ marginHorizontal: 20, fontSize: 20, fontWeight: '500', color: '#003366' }}>Why Learn With Us?</Text>
                </View>

                <View style={{ alignItems: 'center' }}>
                    <Text style={{ marginHorizontal: 20, fontSize: 15, lineHeight: 25, color: 'black'}}>Ardent Training is committed to providing the premium quality online RYA courses.  As experienced professional sailors we have written our RYA theory courses with the aim of improving the quality of RYA online courses available. We continually update and improve our courses as well as providing the highest level of support for our students.</Text>

                    <Text style={{ marginHorizontal: 20, marginTop: 10, fontSize: 15, lineHeight: 25, marginBottom: 20, color: 'black' }}>Every lesson is filmed and you can choose to learn through RYA instructor led videos or read through our content and images.</Text>
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