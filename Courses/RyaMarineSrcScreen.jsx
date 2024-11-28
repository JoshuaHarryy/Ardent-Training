import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../Components/HeaderCourses'
import { ScrollView } from 'react-native-gesture-handler'
import YoutubeIframe from 'react-native-youtube-iframe'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


export default function RyapprCourseScreen({ navigation }) {

    const [isExpanded, setIsExpanded] = useState();
    const [isExpanded1, setIsExpanded1] = useState();
    const [isExpanded2, setIsExpanded2] = useState();

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const toggleExpand1 = () => {
        setIsExpanded1(!isExpanded1);
    };
    const toggleExpand2 = () => {
        setIsExpanded2(!isExpanded2);
    };
    return (
        <ScrollView>
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <Header navigation={navigation} />
                <Image
                    source={require('../Assets/course-cover.jpg')}
                    style={{ height: 250, width: '100%' }}
                />
                <View style={{ marginHorizontal: 10, marginTop: 20 }}>
                    <Text style={{ fontSize: 19, fontWeight: '500', color: '#003366' }}>RYA Marine Radio SRC Course</Text>
                </View>

                {/* Blocks section */}
                <View style={{ alignItems: 'center' }}>
                    <View style={{ width: '90%', height: 50, backgroundColor: '#003366', marginTop: 30 }}>
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
                            <Text style={{ fontWeight: '600', fontSize: 14,color: 'black' }}>None</Text>
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
                            <Text style={{ fontWeight: '700', fontSize: 19, color: '#003366', marginBottom: 5 }}>Minimum Age</Text>
                            <Text style={{ fontWeight: '600', fontSize: 14, color: 'black'}}>16</Text>
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
                            <Text style={{ fontWeight: '700', fontSize: 19, color: '#003366', marginBottom: 5 }}>Duration</Text>
                            <Text style={{ fontWeight: '600', fontSize: 14,color: 'black' }}>Approx 10 hours + classroom exam</Text>
                        </View>

                        {/* Block 3 */}
                        <View style={{
                            height: 200,
                            borderWidth: 0.5,
                            borderColor: 'black',
                            marginBottom: 50,
                            position: 'relative',
                        }}>

                            <Text style={{ fontWeight: '700', fontSize: 19, color: '#003366', marginBottom: 5, alignSelf: 'center', marginTop: 20 }}>Exam</Text>

                            <Text style={{ fontWeight: '600', fontSize: 14, alignSelf: 'center' ,color: 'black'}}>Not Included. Bookable with Ardent Training</Text>


                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText}>Buy Now (£109)</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* image */}
                <Image
                        source={require('../Assets/onlyrya.png')}
                        style={{ alignSelf: 'center', height: 150, width: '95%', marginTop: 0, marginBottom: 20 }}   resizeMode="contain"
                    />

                <View style={{ marginHorizontal: 20 }}>
                    <Text style={{ fontSize: 19, fontWeight: '500', color: '#003366', marginTop: 10 }}>For Safe and Effective Communication at Sea</Text>

                    <Text style={{ fontSize: 16, marginTop: 30, color: 'black' }}>A course for anyone who owns or operates a fixed or handheld marine VHF radio. A radio is an important piece of safety equipment on board and it is vital to understand the correct procedures. The Short Range Certificate is the minimum qualification required by law to control the operation of VHF and VHF Digital Selective Calling (DSC) equipment on any British flagged vessel voluntarily fitted with a radio either fixed or hand held.</Text>


                    <Text style={{ fontSize: 16, marginTop: 30, color: 'black' }}>This certification isn't just a legal requirement and for safety; it also unlocks the convenient option of communicating with other vessels, harbours and marinas by radio.</Text>
                </View>


                {/* BlueBox */}
                <View style={{ height: 750, width: '100%', backgroundColor: '#003366', marginTop: 20, marginBottom: 0 }}>
                    <View>
                        <Text style={{ fontSize: 20, fontWeight: '500', color: 'white', marginTop: 30, marginHorizontal: 20 }}>Hosted by Your Favourite Team!</Text>

                        <Text style={{ fontSize: 15, fontWeight: '500', color: 'white', marginTop: 10, marginHorizontal: 20 }}>RYA Interactive Platform + Ardent Training Instructors</Text>

                        <Text style={{ fontSize: 15, fontWeight: '500', color: 'white', marginTop: 10, marginHorizontal: 20 }}>Unlike our Ardent-created RYA navigation courses, this online course is authored by the RYA and is accessible on the 'RYA Interactive' platform. While you'll access the course through the RYA Interactive platform, your friendly team of Ardent instructors will still be available to answer your questions with the fast response times we are known for.</Text>

                        <Text style={{ fontSize: 15, fontWeight: '500', color: 'white', marginTop: 20, marginHorizontal: 20 }}>Feel free to email us with any questions during the course, and we'll strive to respond within 1 hour during our helpdesk hours (8 am - 8 pm, 7 days a week). Check our instructor profiles here.</Text>
                    </View>

                    <Image
                        source={require('../Assets/hostedteeam.jpeg')}
                        style={{ height: 300, width: '100%', marginTop: 60 }}
                    />
                </View>


                <View style={{ height : 2000, width : '100%', backgroundColor: '#f2f2f2'}}>

{/* the Exam */}
                <View style={{ marginHorizontal: 20 }}>
                    <Text style={{ fontSize: 19, fontWeight: '500', color: '#003366', marginTop: 10 }}>The Exam</Text>

                    <Text style={{ fontSize: 14, marginTop: 30, color: 'black' }}>The exam is always conducted in-person and so you will need to travel to our training center in Tobermory, Scotland, or contact us to get help making arrangements with another recognised training centre.</Text>


                    <Text style={{ fontSize: 14, marginTop:10, color: 'black' }}>SRC exams consist of a written theory exam and an assessment of the practical use of marine VHF radios. There is a separate exam fee payable to the RYA of £70.</Text>

                    <Text style={{ fontSize: 14, marginTop: 10, color: 'black' }}>Please contact us to find out our exam schedule.</Text>

                    <Text style={{ fontSize: 14, marginTop: 10, color: 'black' }}>Find out more about eligibility, arranging and paying for the SRC exam here and check out our FAQs below.</Text>
                </View>

                

                    <Image
                        source={require('../Assets/pewrson-22.jpeg')}
                        style={{ alignSelf: 'center', height: 300, width: '100%', marginTop: 60, marginBottom: 20 }}
                    />

                    <Image
                        source={require('../Assets/ppr-laptop.webp')}
                        style={{ alignSelf: 'center', height: 300, width: '95%', marginTop: 60, marginBottom: 20 }}
                    />
                    <Text style={{ fontSize: 19, fontWeight: '500', color: '#003366', marginTop: 0, marginHorizontal: 10 }}> Sign Up Now For Speedy Access</Text>

                    <Text style={{ fontSize: 14, fontWeight: '500', color: '#003366', marginTop: 5, marginHorizontal: 20 }}>You will Receive</Text>

                    <View>
                        <Text style={{ fontSize: 15, color: 'black', marginTop: 10, marginHorizontal: 90 }}> • Swift access to the RYA Interactive PPR course</Text>
                    </View>

                    <View>
                        <Text style={{ fontSize: 15, color: 'black', marginTop: 10, marginHorizontal: 90 }}> • Unlimited access to Ardent Training's RYA instructors with fast response times</Text>
                    </View>

                    <View>
                        <Text style={{ fontSize: 15, color: 'black', marginTop: 10, marginHorizontal: 90 }}> • RYA Handbook included for UK students</Text>
                    </View>

                    <View>
                        <Text style={{ fontSize: 15, color: 'black', marginTop: 10, marginHorizontal: 90 }}> • RYA Handbook (eBook) included for International students (please let us know if you’d like a physical copy).</Text>
                    </View>

                    <TouchableOpacity >
                        <View style={{ width: '95%', height: 50, backgroundColor: '#FE8E91', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 20}}>
                            <Text style={{ color: 'white', fontWeight: '500', fontSize: 19 }}> BUY NOW(£109)</Text>
                        </View>
                    </TouchableOpacity>
                
                   

                {/* YoutubeVideo */}
                <View style={{ alignItems: 'center' }}>
                    <YoutubeIframe
                        height={300}
                        width={'95%'}
                        play={false}
                        videoId="zwo86zuka-0"
                    />
                </View>
                

                {/* Course Structure */}
                <View style={{ marginHorizontal: 20 }}>
                    <Text style={{ fontSize: 19, fontWeight: '500', color: '#003366', marginTop: 0 }}>Course Syllabus</Text>

                    <Text style={{ fontSize: 19, fontWeight: '500', color: '#003366', marginTop: 10 }}>The course covers the following topics:</Text>

                    <View>

                        <Text style={{ fontSize: 14, color: 'black', marginTop: 10 }}>• Basics of radio operation</Text>
                    </View>

                    <View>

                        <Text style={{ fontSize: 14, color: 'black', marginTop: 10 }}> • Frequencies</Text>
                    </View>

                    <View>
                        <Text style={{ fontSize: 14, color: 'black', marginTop: 10 }}> • Distress, emergency, and medical assistance procedures</Text>
                    </View>
                    <View>

                        <Text style={{ fontSize: 14, color: 'black', marginTop: 10 }}>  • Making ship-to-shore telephone calls</Text>
                    </View>

                    <View>

                        <Text style={{ fontSize: 14, color: 'black', marginTop: 10 }}> •  Digital Selective Calling (DSC)</Text>
                    </View>

                    <View>
                        <Text style={{ fontSize: 14, color: 'black', marginTop: 10 }}> •  Global Maritime Distress Safety System (GMDSS)</Text>
                    </View>
                </View>
                </View>
                

                {/* DropDownSection */}

                {/* How to enroll */}
                <View>
                    <TouchableOpacity onPress={toggleExpand}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ marginHorizontal: 20, marginTop: 70, fontSize: 20, fontWeight: '500', color: '#003366' }}>How to Enrol</Text>
                            <View style={{ marginTop: 65, marginRight: 20 }}>
                                <MaterialIcons name="keyboard-arrow-down" size={30} color="#003366" />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={{
                        borderBottomWidth: 1,
                        borderBottomColor: '#003366',
                        marginHorizontal: 20,
                        marginTop: 10,
                        marginBottom: 5,
                    }} />

                    {isExpanded && (
                        <View style={{ marginHorizontal: 20, marginTop: 50 }}>
                            <Text style={{ fontSize: 15, fontWeight: '400', color: 'black' }}>
                                To enroll in the PPR course, click the Buy Now button, select your preferred payment method, make your purchase, and then check your email inbox for your login details which will be sent promptly. Once logged in, you can commence the course.
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color: 'black' }}>
                            The total cost of the online RYA Marine Radio Course is £109.00
                            </Text>
                            <Text style={{ fontSize: 16, fontWeight: '500', marginTop: 10, color: 'red' }}>
                                PLEASE NOTE:
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color: 'black' }}>
                            RYA Interactive Courses are not automatically activated and whilst we are usually able to set the course up within an hour, occasionally it can be longer. If a course is purchased outside of our opening hours (8am-8pm) it will be processed the next morning. If you require urgent access please contact us and we will likely be able to process immediately. Do check your spam box for joining info particularly if you have a Gmail account.
                            </Text>
                        </View>
                    )}
                </View>


                {/* Texhnical Minimum */}
                <View>
                    <TouchableOpacity onPress={toggleExpand1}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ marginHorizontal: 20, marginTop: 30, fontSize: 18, fontWeight: '500', color: '#003366' }}>Technical Minimum Requirements & Personal Data Storage</Text>
                            <View style={{ marginTop: 30, marginRight: 20 }}>
                                <MaterialIcons name="keyboard-arrow-down" size={30} color="#003366" />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={{
                        borderBottomWidth: 1,
                        borderBottomColor: '#003366',
                        marginHorizontal: 20,
                        marginTop: 10,
                        marginBottom: 5,
                    }} />

                    {isExpanded1 && (
                        <View style={{ marginHorizontal: 20, marginTop: 50 }}>
                            <Text style={{ fontSize: 19, fontWeight: '400', fontWeight: '500', color: '#003366' }}>
                                Technical Requirements
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color: 'black' }}>
                                Mac or PC with JavaScript enabled in your web browser
                            </Text>
                            <Text style={{ fontSize: 16, fontWeight: '400', marginTop: 10 , color: 'black'}}>
                                iPad (iOS 6 or above)
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color: 'black' }}>
                                Android tablet on OS 4.1 or above (we advise using Google Chrome NOT default Android browser) – Please note, that we cannot guarantee the course will work on all Android Tablets as the variety on the market is so vast, but our testing so far has been successful. Please let us know if you come across any problems
                            </Text>


                            <Text style={{ fontSize: 19, fontWeight: '400', fontWeight: '500', color: '#003366', marginTop: 20 }}>
                                Personal Data Storage
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10 , color: 'black'}}>
                                Mac or PC with JavaScript enabled in your web browser
                            </Text>
                            <Text style={{ fontSize: 16, fontWeight: '400', marginTop: 10 , color: 'black'}}>
                                iPad (iOS 6 or above)
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10 , color: 'black'}}>
                                When you place an order via our website we will ask for your name and email address. This information will only be used for the purposes of delivering the services we are providing and so will only be shared with the RYA.
                            </Text>
                        </View>
                    )}
                </View>


                {/* FAQ's */}
                <View>
                    <TouchableOpacity onPress={toggleExpand2}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ marginHorizontal: 20, marginTop: 30, fontSize: 20, fontWeight: '500', color: '#003366' }}>FAQ's</Text>
                            <View style={{ marginTop: 30, marginRight: 20 }}>
                                <MaterialIcons name="keyboard-arrow-down" size={30} color="#003366" />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={{
                        borderBottomWidth: 1,
                        borderBottomColor: '#003366',
                        marginHorizontal: 20,
                        marginTop: 10,
                        marginBottom: 5,
                    }} />

                    {isExpanded2 && (
                        <View style={{ marginHorizontal: 20, marginTop: 50, }}>
                            <Text style={{ fontSize: 19, fontWeight: '400', fontWeight: '500', color: '#003366' }}>
                                How do I log in?
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10,color: '#003366'  }}>
                                The link to the RYA interactive website and your login credentials will be emailed to you shortly after purchasing the course. If you are just looking for the link, click here.
                            </Text>


                            <Text style={{ fontSize: 19, fontWeight: '400', fontWeight: '500', color: '#003366', marginTop: 20 }}>
                            Do the RYA have a page of information about the Short Range Certificate?
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color: '#003366'  }}>
                            Yes, you can find more information from the RYA here
                            </Text>
                            
                            <Text style={{ fontSize: 19, fontWeight: '400', fontWeight: '500', color: '#003366', marginTop: 20 }}>
                            Is there an alternative to taking this course online?
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10 , color: '#003366' }}>
                            Yes, this course can be completed in-person, in the classroom as a one-day course. Due to our location in Tobermory on the Isle of Mull, Scotland, we don't get many visitors so we only run 1x classroom course per year, in March. Please get in touch if you'd like to attend.
                            </Text>

                            <Text style={{ fontSize: 19, fontWeight: '400', fontWeight: '500', color: '#003366', marginTop: 20 }}>
                            Do I have to take the SRC exam at the same training centre that I purchased the online course from?
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color: '#003366'  }}>
                            No. You can take your exam at any recognised RYA training centre who offers the assessments.
                            </Text>

                            <Text style={{ fontSize: 19, fontWeight: '400', fontWeight: '500', color: '#003366', marginTop: 20 }}>
                            If I can't visit Ardent Training in Scotland for my assessment, how can I find a nearer RYA Training Center?
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color: '#003366'  }}>
                            Whilst we'd love for everybody to be able to attend their exams here on the beautiful Isle-of-Mull, we understand it might not be practical for everybody. You can get in touch with us and we'll send you a link to your nearest training centre who will be able to offer the exam for you. Or you can research by yourself using the RYA's 'Find My Nearest' tool on their website.
                            </Text>

                            <Text style={{ fontSize: 19, fontWeight: '400', fontWeight: '500', color: '#003366', marginTop: 20 }}>
                            Will I be able to take the RYA SRC exam with Ardent Training after taking the online RYA SRC Marine Radio Course?
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color: '#003366'  }}>
                            Yes. We do examinations in Tobermory on the Isle of Mull, Scotland, twice a year. March and October. If you'd like more information, please get in touch.
                            </Text>

                            <Text style={{ fontSize: 19, fontWeight: '400', fontWeight: '500', color: '#003366', marginTop: 20 }}>
                            Will I get a chance to familiarise myself with the actual radio equipment I will be using during my exam?
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10,color: '#003366'  }}>
                            Yes, there will be a 30 minute familiarisation period before the exam starts.
                            </Text>

                            <Text style={{ fontSize: 19, fontWeight: '400', fontWeight: '500', color: '#003366', marginTop: 20 }}>
                            Does Ardent Training charge an additional Exam Attendance Fee?
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color: '#003366'  }}>
                            The RYA SRC Exam costs £70 payable to the RYA. If you would like to do the exam with Ardent Training but you took the course with another provider, then there will be an additional £35 surcharge payable to Ardent Training.
                            </Text>

                            <Text style={{ fontSize: 19, fontWeight: '400', fontWeight: '500', color: '#003366', marginTop: 20 }}>
                            Can I just take the exam without taking the course?
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color: '#003366'  }}>
                            No, you can’t. You must successfully complete a course before you will be eligible to take the assessment.
                            </Text>

                            <Text style={{ fontSize: 19, fontWeight: '400', fontWeight: '500', color: '#003366', marginTop: 20, }}>
                            What's involved in the SRC exam?
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color: '#003366'  }}>
                            The SRC exam is an in-person exam. Please contact us to arrange an exam with us in Tobermory, Scotland (March or October), or with an alternative training centre near you. There will be 15-30 minutes familiarisation time with the 'real' training radio sets, a 30 minute practical test with the radios, and finally a 30 minute theory exam, where approximately 50% of the questions are multiple choice.
                            </Text>

                            <Text style={{ fontSize: 19, fontWeight: '400', fontWeight: '500', color: '#003366', marginTop: 20, }}>
                            What's involved in the SRC exam?
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10 , color: '#003366' }}>
                            The SRC exam is an in-person exam. Please contact us to arrange an exam with us in Tobermory, Scotland (March or October), or with an alternative training centre near you. There will be 15-30 minutes familiarisation time with the 'real' training radio sets, a 30 minute practical test with the radios, and finally a 30 minute theory exam, where approximately 50% of the questions are multiple choice.
                            </Text>

                            <Text style={{ fontSize: 19, fontWeight: '400', fontWeight: '500', color: '#003366', marginTop: 20, }}>
                           Will Ardent Training run an exam for a group? For example a dive group, watersports club or maritime workplace.
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color: '#003366'  }}>
                            Yes, please contact us to arrange. For groups of 3 or more we will run exams outside of our usual March / October schedule.
                            </Text>


                            <Text style={{ fontSize: 19, fontWeight: '400', fontWeight: '500', color: '#003366', marginTop: 20, }}>
                           Is there a minimum age for the SRC Radio Certificate?
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color: '#003366'  }}>
                            Yes, the minimum age is 16.
                            </Text>


                            <Text style={{ fontSize: 19, fontWeight: '400', fontWeight: '500', color: '#003366', marginTop: 20, }}>
                         I have a pre-1999 restricted VHF radio certificate. Can I upgrade it to include Digital Selective Calling (DSC)?
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color: '#003366'  }}>
                            Yes, but you'll still need to take the online course and exam. You'll find if you do the online course, you will be able to progress through the parts you already know more quickly.
                            </Text>


                            <Text style={{ fontSize: 19, fontWeight: '400', fontWeight: '500', color: '#003366', marginTop: 20, }}>
                      I have bought a new radio for my boat. What do I do?
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10 , color: '#003366' }}>
                            You will need an 'Authority to Operate' such as the RYA SRC certificate, to demonstrate your ability to operate the radio, but you'll also need a license for the radio itself, which is called a 'Ships Radio License'. In the UK these are issued for free by Ofcom through their website, www.ofcom.org.uk. More can be learned about licensing and registering your radio through this RYA SRC Marine Radio Course.
                            </Text>


                            <Text style={{ fontSize: 19, fontWeight: '400', fontWeight: '500', color: '#003366', marginTop: 20, }}>
                     I only have a hand-held VHF radio, what type of licence do I need?
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color: '#003366'  }}>
                            You will need an 'Authority to Operate' such as the RYA SRC certificate to demonstrate your ability to operate the radio, and you will also need a 'Ship’s Portable License' for the radio itself. In the UK, these are issued for free by Ofcom through their website, www.ofcom.org.uk. More can be learned about licensing and registering your radio through this RYA SRC Marine Radio Course.
                            </Text>

                            <Text style={{ fontSize: 19, fontWeight: '400', fontWeight: '500', color: '#003366', marginTop: 20, }}>
                            I'm going to use my radio in the European inland waterways. Do I need an Automatic Transmitter Identification System (ATIS) fitted to my radio?
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10,color: '#003366'  }}>
                            Yes, you will need to upgrade your set to transmit ATIS. For more info go to: https://www.ofcom.org.uk/manage-your-licence/radiocommunication-licences/ships-radio/atis-info
                            </Text>
                        </View>
                    )}
                </View>

               {/* image */}
               <Image
                        source={require('../Assets/onlyrya.png')}
                        style={{ alignSelf: 'center', height: 150, width: '95%', marginTop: 40, marginBottom: 0 }}   resizeMode="contain"
                    />

                <Image
                    source={require('../Assets/british-marine.webp')}
                    style={{ alignSelf: 'center', height: 200, width: 200, marginTop: 0, marginBottom: 40 }}
                    resizeMode="contain"
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
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