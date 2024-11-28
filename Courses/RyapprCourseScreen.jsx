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
                    <Text style={{ fontSize: 19, fontWeight: '500', color: '#003366' }}>Professional Practises And Responsibilities</Text>
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
                            <Text style={{ fontWeight: '600', fontSize: 14, color: 'black'}}>Although some practical experience is desirable</Text>
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
                            <Text style={{ fontWeight: '600', fontSize: 14, color: 'black'}}>None</Text>
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

                            <Text style={{ fontWeight: '600', fontSize: 14, alignSelf: 'center',color: 'black' }}>Minimum 40-50 hours</Text>


                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText}>Buy Now (£59)</Text>
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
                    <Text style={{ fontSize: 19, fontWeight: '500', color: '#003366', marginTop: 10 }}>For Sailors Wishing To Use Their RYA Qualifications For Work</Text>

                    <Text style={{ fontSize: 15, marginTop: 30, color: 'black' }}>In the PPR course, participants learn about the legal framework that commercial operators need to follow for various vessels. While the course doesn't delve into specific rules for every type of operation, it provides a solid understanding of the duty of care. The course also offers principles, guidance, and techniques to help skippers make informed choices and decisions. Its primary goal is to introduce seafarers to relevant legislation, such as SOLAS, COSWoP, MARPOL, Flag State, Port State Authorities, and the Code of Practice.</Text>


                    <Text style={{ fontSize: 15, marginTop: 30, color: 'black' }}>The online RYA PPR course is priced at £59.00 and is a necessary step for those seeking a commercial endorsement. This requirement applies to various certificates, including Yachtmaster Ocean, Yachtmaster Offshore, Yachtmaster Coastal, Day Skipper Practical, Powerboat Advanced Certificate of Competence, and Powerboat Level 2.</Text>
                </View>


                {/* BlueBox */}
                <View style={{ height: 750, width: '100%', backgroundColor: '#003366', marginTop: 20, marginBottom: 40 }}>
                    <View>
                        <Text style={{ fontSize: 20, fontWeight: '500', color: 'white', marginTop: 30, marginHorizontal: 20 }}>Hosted by Your Favourite Team!</Text>

                        <Text style={{ fontSize: 15, fontWeight: '500', color: 'white', marginTop: 10, marginHorizontal: 20 }}>RYA Interactive Platform + Ardent Training Instructors</Text>

                        <Text style={{ fontSize: 15, fontWeight: '500', color: 'white', marginTop: 10, marginHorizontal: 20 }}>Unlike our Ardent-created RYA navigation courses, this online course is authored by the RYA and is accessible on the 'RYA Interactive' platform. While you'll access the course through the RYA Interactive platform, your friendly team of Ardent instructors will still be available to answer your questions with the fast response times we are known for.</Text>

                        <Text style={{ fontSize: 15, fontWeight: '500', color: 'white', marginTop: 20, marginHorizontal: 20 }}>Feel free to email us with any questions during the course, and we'll strive to respond within 1 hour during our helpdesk hours (8 am - 8 pm, 7 days a week). Check our instructor profiles here.</Text>
                    </View>

                    <Image
                        source={require('../Assets/course-cover.jpg')}
                        style={{ height: 300, width: '100%', marginTop: 60 }}
                    />
                </View>

                <View style={{ height : 1850, width : '100%', backgroundColor: '#f2f2f2'}}>
                    <Image
                        source={require('../Assets/ppr-laptop.webp')}
                        style={{ alignSelf: 'center', height: 300, width: '95%', marginTop: 60, marginBottom: 20 }}
                    />
                    <Text style={{ fontSize: 19, fontWeight: '500', color: '#003366', marginTop: 0, marginHorizontal: 10 }}> Sign Up Now For Speedy Access</Text>

                    <Text style={{ fontSize: 14, fontWeight: '500', color: '#003366', marginTop: 5, marginHorizontal: 20 }}>You will Receive</Text>

                    <View>
                        <Text style={{ fontSize: 14, color: 'black', marginTop: 10, marginHorizontal: 20 }}> • Swift access to the RYA Interactive PPR course</Text>
                    </View>

                    <View>
                        <Text style={{ fontSize: 14, color: 'black', marginTop: 10, marginHorizontal: 20 }}> • Unlimited access to Ardent Training's RYA instructors with fast response times</Text>
                    </View>

                    <View>
                        <Text style={{ fontSize: 14, color: 'black', marginTop: 10, marginHorizontal: 20 }}> • Three optional mock assessments</Text>
                    </View>

                    <View>
                        <Text style={{ fontSize: 14, color: 'black', marginTop: 10, marginHorizontal: 20 }}> • Final exam & downloadable certificate</Text>
                    </View>

                    <TouchableOpacity >
                        <View style={{ width: '95%', height: 50, backgroundColor: '#FE8E91', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                            <Text style={{ color: 'white', fontWeight: '500', fontSize: 19 }}> BUY NOW (£59)</Text>
                        </View>
                    </TouchableOpacity>
                
                   
                <Image
                    source={require('../Assets/ppr1.jpeg')}
                    style={{ alignSelf: 'center', height: 300, width: '95%', marginTop: 20, marginBottom: 20 }}
                />

                {/* YoutubeVideo */}
                <View style={{ alignItems: 'center' }}>
                    <YoutubeIframe
                        height={300}
                        width={'95%'}
                        play={false}
                        videoId="zwo86zuka-0"
                    />
                </View>
                
                <View style={{ marginHorizontal: 20 }}>
                    <Text style={{ fontSize: 19, fontWeight: '500', color: '#003366', marginTop: 0 }}>Course Structure:</Text>

                    <Text style={{ fontSize: 19, fontWeight: '500', color: '#003366', marginTop: 10 }}>There are 4 modules + Online Exam:</Text>

                    <Text style={{ fontSize: 15, fontWeight: '500', color: '#003366', marginTop: 5 }}>(Approx 6-8 hours total study time)</Text>

                    <View>
                        <Text style={{ fontSize: 14, fontWeight: '500', color: 'black', marginTop: 10 }}> Commercial Environment</Text>

                        <Text style={{ fontSize: 14, color: 'black', marginTop: 10 }}> Final exam & downloadable certificate</Text>
                    </View>

                    <View>
                        <Text style={{ fontSize: 14, fontWeight: '500', color: 'black', marginTop: 10 }}> People</Text>

                        <Text style={{ fontSize: 14, color: 'black', marginTop: 10 }}>Highlighting the importance of adequate staffing, ongoing skill improvement, and safe management of commercial vessels.</Text>
                    </View>

                    <View>
                        <Text style={{ fontSize: 14, fontWeight: '500', color: 'black', marginTop: 10 }}> Vessel</Text>

                        <Text style={{ fontSize: 14, color: 'black', marginTop: 10 }}>Guiding on the required presence and upkeep of safety equipment, and creating and implementing risk control and operating procedures.</Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: 14, fontWeight: '500', color: 'black', marginTop: 10 }}> Purpose</Text>

                        <Text style={{ fontSize: 14, color: 'black', marginTop: 10 }}>Ensuring vessels are suitable and legal for work, understanding environmental protection duties, and stressing proper planning and awareness.</Text>
                    </View>

                    <View>
                        <Text style={{ fontSize: 14, fontWeight: '500', color: 'black', marginTop: 10 }}> Online Assessment</Text>

                        <Text style={{ fontSize: 14, color: 'black', marginTop: 10 }}>After finishing these four training modules, participants take an online assessment that is included in the course.</Text>
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
                            <Text style={{ fontSize: 15, fontWeight: '400' }}>
                                To enroll in the PPR course, click the Buy Now button, select your preferred payment method, make your purchase, and then check your email inbox for your login details which will be sent promptly. Once logged in, you can commence the course.
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10 }}>
                                The total cost of the online PPR course is £59.00, with no additional VAT.
                            </Text>
                            <Text style={{ fontSize: 16, fontWeight: '400', marginTop: 10 }}>
                                PLEASE NOTE:
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10 }}>
                                RYA Interactive Courses are not automatically activated and whilst we are usually able to set the course up within an hour, during business hours, occasionally it can be slightly longer. If you require urgent access please contact us and we will likely be able to process immediately. Do check your spam box for joining info particularly if you have a Gmail account.
                            </Text>
                        </View>
                    )}
                </View>


                {/* Texhnical Minimum */}
                <View>
                    <TouchableOpacity onPress={toggleExpand1}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ marginHorizontal: 20, marginTop: 30, fontSize: 20, fontWeight: '500', color: '#003366' }}>Technical Minimum Requirements & Personal Data Storage</Text>
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
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10 }}>
                                Mac or PC with JavaScript enabled in your web browser
                            </Text>
                            <Text style={{ fontSize: 16, fontWeight: '400', marginTop: 10 }}>
                                iPad (iOS 6 or above)
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10 }}>
                                Android tablet on OS 4.1 or above (we advise using Google Chrome NOT default Android browser) – Please note, that we cannot guarantee the course will work on all Android Tablets as the variety on the market is so vast, but our testing so far has been successful. Please let us know if you come across any problems
                            </Text>


                            <Text style={{ fontSize: 19, fontWeight: '400', fontWeight: '500', color: '#003366', marginTop: 20 }}>
                                Personal Data Storage
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10 }}>
                                Mac or PC with JavaScript enabled in your web browser
                            </Text>
                            <Text style={{ fontSize: 16, fontWeight: '400', marginTop: 10 }}>
                                iPad (iOS 6 or above)
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10 }}>
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
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10 }}>
                                The link to the RYA interactive website and your login credentials will be emailed to you shortly after purchasing the course. If you are just looking for the link, click here.
                            </Text>


                            <Text style={{ fontSize: 19, fontWeight: '400', fontWeight: '500', color: '#003366', marginTop: 20 }}>
                                What is a commercial endorsement? How do I know if I need one?
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10 }}>
                                A commercial endorsement is required for work on board British flagged vessels subject to the MCA's codes of practice for small commercial vessels. A number of additional training courses and medical fitness certificates are required to be eligible for a commercial endorsement. Obtaining a commercial endorsement is a great way of increasing your employability. If you aren't sure if you need one for your workplace, contact your employer.
                            </Text>
                            
                            <Text style={{ fontSize: 19, fontWeight: '400', fontWeight: '500', color: '#003366', marginTop: 20 }}>
                            Where can I find more information about gaining a commercial endorsement?
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10 }}>
                            The RYA website has a page which gives all the necessary details about what's needed to gain a commercial endorsement and how to apply. You can also download the application form or a revalidation form from the same page. To visit, please click here.
                            </Text>

                            <Text style={{ fontSize: 19, fontWeight: '400', fontWeight: '500', color: '#003366', marginTop: 20 }}>
                           Do I have to take the course in one sitting or can I spread it out over a number of days?
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10 }}>
                            You can sit this course at your own pace, and over as many sessions as you wish. Some students will complete the course in one day, but it could also be spread over multiple sessions, for instance 2 hours per evening over the space of a week, or two days over a weekend.
                            </Text>

                            <Text style={{ fontSize: 19, fontWeight: '400', fontWeight: '500', color: '#003366', marginTop: 20 }}>
                          How long will I have access to the course for?
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10 }}>
                            The course access will be available for 6 months after purchase.
                            </Text>

                            <Text style={{ fontSize: 19, fontWeight: '400', fontWeight: '500', color: '#003366', marginTop: 20 }}>
                        How does the instructor support work?
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10 }}>
                            You can email us for support, and we will strive to respond within 1 hour during our business times. (8am - 8pm, 7 days).
                            </Text>

                            <Text style={{ fontSize: 19, fontWeight: '400', fontWeight: '500', color: '#003366', marginTop: 20 }}>
                      How long will it really take me to gain the certificate?
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10 }}>
                            We estimate users will take around 6 to 8 hours to work through the four course modules. The graded end of course assessment is split into two sections, totaling 2 ½ hours.
                            </Text>

                            <Text style={{ fontSize: 19, fontWeight: '400', fontWeight: '500', color: '#003366', marginTop: 20 }}>
                            How does the exam work?
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10 }}>
                            After completing the 4 modules, there is a mock assessment that will help check your readiness for the final exam. The final exam is then split into two sections, totaling 2.5 hours. It will be marked automatically online and your certificate will be downloadable once you have passsed.
                            </Text>

                            <Text style={{ fontSize: 19, fontWeight: '400', fontWeight: '500', color: '#003366', marginTop: 20 }}>
                          What if I fail the exam?
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10 }}>
                            Thanks to the mock which will check your readiness, very few people fail the final exam. However, if it does happen, you'll get a second attempt. If you fail that also, you'll need to contact us and a small re-sit fee will be payable to the RYA. Please don't hesitate to contact your instructors for advice and support if you are struggling!
                            </Text>

                            <Text style={{ fontSize: 19, fontWeight: '400', fontWeight: '500', color: '#003366', marginTop: 20, }}>
                         How long is the PPR certificate valid for?
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10 }}>
                            The RYA keep a digital record of all people who have passed the PPR course, and no revalidation is required. The certificate does not expire.
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