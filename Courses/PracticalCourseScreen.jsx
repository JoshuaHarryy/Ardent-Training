import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../Components/HeaderCourses'
import { ScrollView } from 'react-native-gesture-handler'
import YoutubeIframe from 'react-native-youtube-iframe'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


export default function PracticalCourseScreen({ navigation }) {

  const [isExpanded1, setIsExpanded1] = useState();
  const [isExpanded2, setIsExpanded2] = useState();
  const [isExpanded3, setIsExpanded3] = useState();
  const [isExpanded4, setIsExpanded4] = useState();

  const toggleExpand1 = () => {
    setIsExpanded1(!isExpanded1);
  };
  const toggleExpand2 = () => {
    setIsExpanded2(!isExpanded2);
  };
  const toggleExpand3 = () => {
    setIsExpanded3(!isExpanded3);
  };
  const toggleExpand4 = () => {
    setIsExpanded4(!isExpanded4);
  };

  return (

    <ScrollView>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Header navigation={navigation} />
        <Image
          source={require('../Assets/course-cover.jpg')}
          style={{ height: 250, width: '100%' }}
        />
        <View style={{ marginHorizontal: 20, marginTop: 20 }}>
          <Text style={{ fontSize: 19, fontWeight: '500', color: '#003366' }}>Practical RYA Courses</Text>
        </View>

        <View style={{ alignItems: 'center', marginTop: 40 }}>
          <Text style={{ fontSize: 14, color: 'black' }}>Ardent Training works closely with the highest quality </Text>
          <Text style={{ fontSize: 14, color: 'black' }}>practical training centres around the world, putting you  </Text>
          <Text style={{ fontSize: 14, color: 'black' }}>in touch with some of the best schools to complete your</Text>
          <Text style={{ fontSize: 14, color: 'black' }}>practical RYA course.</Text>
        </View>

        <View style={{ borderWidth: 0.4, borderColor: 'black', width: '80%', alignSelf: 'center', marginTop: 30, marginBottom: 30 }}></View>

        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 14, color: 'black' }}>Speak to our team of highly experienced RYA</Text>
          <Text style={{ fontSize: 14, color: 'black' }}>Instructors to plan your route towards your next RYA</Text>
          <Text style={{ fontSize: 14, color: 'black' }}>practical course and qualification!</Text>
        </View>

        {/* What you get */}

        <View style={{ marginTop: 40, marginBottom: 30 }}>
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={require('../Assets/icon-1.png')}
              style={{ height: 40, width: 50, marginHorizontal: 15 }}
            />
            <Text style={{ fontSize: 15, fontWeight: '400', color: 'black', marginBottom: 30, marginTop: 10, marginHorizontal: 5 }}>Click on the live chat to speak to our RYA instructors instantly!</Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <Image
              source={require('../Assets/icon-2.png')}
              style={{ height: 40, width: 50, marginHorizontal: 15 }}
            />
            <Text style={{ fontSize: 15, fontWeight: '400', color: 'black', marginBottom: 30, marginTop: 10, marginHorizontal: 5 }}>Call us on (+44) 01688 325 025</Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <Image
              source={require('../Assets/icon-3.png')}
              style={{ height: 40, width: 50, marginHorizontal: 15 }}
            />

            <Text style={{ fontSize: 15, fontWeight: '400', color: 'black', marginBottom: 30, marginTop: 10, marginHorizontal: 5 }}>Drop us a line at info@ardent-training.com</Text>
          </View>
        </View>


        {/* DropDown Section */}
        {/* Scotland */}
        <View style={{ alignItems: 'center' }}>
          <View style={{ Height: 65, width: '90%', backgroundColor: '#003366' }}>
            <TouchableOpacity onPress={toggleExpand1}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ marginHorizontal: 20, marginTop: 10, fontSize: 20, fontWeight: '500', color: 'white' }}>Scotland</Text>
                <View style={{ marginTop: 10, marginRight: 20 }}>
                  <MaterialIcons name="keyboard-arrow-down" size={30} color="white" />
                </View>
              </View>
            </TouchableOpacity>

            <View style={{
              borderBottomWidth: 1,
              borderBottomColor: 'white',
              marginHorizontal: 20,
              marginTop: 10,
              marginBottom: 10,
            }} />


          </View>

          {isExpanded1 && (
            <View style={{ marginHorizontal: 20, marginTop: 50 }}>
              <Image
                source={require('../Assets/scot-youandsea.png')}
                style={{ height: 100, width: 300, marginHorizontal: 15 }}
              />
              {/* practical Course */}
              <Text style={{ fontSize: 19, fontWeight: '400', fontWeight: '500', color: 'black', marginTop: 20 }}>

                Practical Courses:
              </Text>
              <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color : 'black' }}>
                RYA Motor Cruising
              </Text>
              <Text style={{ fontSize: 16, fontWeight: '400', marginTop: 0, color : 'black' }}>
                RYA Powerboat
              </Text>
              <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color : 'black' }}>
                RYA Instructor Courses
              </Text>
              <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color : 'black' }}>
                MCA Courses
              </Text>


              {/* Boats: */}
              <Text style={{ fontSize: 19, fontWeight: '400', fontWeight: '500', color: 'black', marginTop: 20 }}>

                Boats:
              </Text>
              <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color : 'black' }}>
                Motor:
              </Text>
              <Text style={{ fontSize: 16, fontWeight: '400', marginTop: 0, color : 'black' }}>
                Nelson 42
              </Text>
              <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color : 'black' }}>
                Powerboat:
              </Text>
              <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color : 'black' }}>
                Humber Ocean Pro 6.8m
              </Text>


              {/* Contact: */}
              <Text style={{ fontSize: 19, fontWeight: '400', fontWeight: '500', color: 'black', marginTop: 20 }}>
                Contact:
              </Text>
              <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color : 'black' }}>
                01436 640303
              </Text>
              <Text style={{ fontSize: 16, fontWeight: '400', marginTop: 0, color : 'black' }}>
                office@youandsea.com
              </Text>
              <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color : 'black' }}>
                You & Sea,
              </Text>
              <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color : 'black' }}>
                Rhu Marina, Rhu,
              </Text>
              <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color : 'black' }}>
                Argyll & Bute, G84 8LH
              </Text>

              <View style={{ alignItems: 'center', marginTop: 30, marginBottom: 20 }}>
                <View style={{ borderWidth: 0.5, borderColor: 'grey', width: '90%' }}></View>
              </View>

              <View style={{ marginHorizontal: 0 }}>
                <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color : 'black' }}>
                  Why we like them:
                </Text>

                <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color : 'black' }}>
                  You & Sea pride themselves on providing the highest quality practical and shorebased maritime training using well maintained, high quality boats and equipment.
                </Text>
              </View>

              {/* greyBox */}
              <View style={{ alignItems: 'center', marginTop: 40 }}>
                <View style={{ height: 700, width: '100%', backgroundColor: '#f2f2f2' }}>
                  <View style={{ alignItems: 'center' }}>
                    <Image
                      source={require('../Assets/glance-removebg-preview.png')}
                      style={{ height: 100, width: 250, marginHorizontal: 15 }}
                    />
                  </View>


                  {/* practical Course */}
                  <View style={{ marginHorizontal: 20 }}>
                    <Text style={{ fontSize: 19, fontWeight: '400', fontWeight: '500', color: 'black', marginTop: 40, }}>
                      Practical Courses:
                    </Text>
                    <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color : 'black' }}>
                      RYA Competent Crew
                    </Text>
                    <Text style={{ fontSize: 16, fontWeight: '400', marginTop: 0, color : 'black' }}>
                      RYA Day Skipper
                    </Text>
                    <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color : 'black' }}>
                      RYA Coastal Skipper
                    </Text>
                    <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color : 'black' }}>
                      RYA Shorebased Courses
                    </Text>
                  </View>


                  {/* Boats: */}
                  <View style={{ marginHorizontal: 20 }}>
                    <Text style={{ fontSize: 19, fontWeight: '400', fontWeight: '500', color: 'black', marginTop: 20 }}>

                      Boats:
                    </Text>
                    <Text style={{ fontSize: 16, fontWeight: '400', marginTop: 0, color : 'black' }}>
                      Sail:
                    </Text>
                    <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color : 'black' }}>
                      Westerly 38
                    </Text>

                  </View>


                  {/* Contact: */}
                  <View style={{ marginHorizontal: 20 }}>
                    <Text style={{ fontSize: 19, fontWeight: '400', fontWeight: '500', color: 'black', marginTop: 20 }}>

                      Contact:
                    </Text>
                    <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color : 'black' }}>
                      01855811350
                    </Text>
                    <Text style={{ fontSize: 16, fontWeight: '400', marginTop: 0, color : 'black' }}>
                      office@glencoeoutdoorcentre.org.uk
                    </Text>
                    <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color : 'black' }}>
                      Carnoch House,
                    </Text>
                    <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color : 'black' }}>
                      Glencoe,
                    </Text>
                    <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color : 'black' }}>
                      Argyll,
                    </Text>
                    <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color : 'black' }}>
                      PH49 4HS
                    </Text>
                  </View>

                  <View style={{ marginHorizontal: 20, marginTop: 40 }}>
                    <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color : 'black' }}>
                      Why we like them:
                    </Text>

                    <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color : 'black' }}>
                      You & Sea pride themselves on providing the highest quality practical and shorebased maritime training using well maintained, high quality boats and equipment.
                    </Text>
                  </View>

                </View>
              </View>



              {/* britSail */}
              <View style={{ alignItems: 'center' }}>
                <Image
                  source={require('../Assets/britsail_logo.png')}
                  style={{ height: 100, width: 200, marginTop: 40 }}
                />
              </View>


              {/* Boats: */}
              <Text style={{ fontSize: 19, fontWeight: '400', fontWeight: '500', color: 'black', marginTop: 20 }}>

                Boats:
              </Text>
              <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10 , color : 'black'}}>
                Sail:
              </Text>
              <Text style={{ fontSize: 16, fontWeight: '400', marginTop: 0, color : 'black' }}>
                Beneteau Oceanis 411
              </Text>


              {/* Contact: */}
              <Text style={{ fontSize: 19, fontWeight: '400', fontWeight: '500', color: 'black', marginTop: 20 }}>
                Contact:
              </Text>
              <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color : 'black' }}>
                07939877791
              </Text>
              <Text style={{ fontSize: 16, fontWeight: '400', marginTop: 0, color : 'black' }}>
                bookings@britsail.com
              </Text>
              <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color : 'black' }}>
                Britsail,
              </Text>
              <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color : 'black' }}>
                Kip Marina,
              </Text>
              <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color : 'black' }}>
                Inverkip,
              </Text>
              <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color : 'black' }}>
                Inverclyde,
              </Text>
              <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color : 'black' }}>
                PA16 0AW
              </Text>

              <View style={{ alignItems: 'center', marginTop: 30, marginBottom: 20 }}>
                <View style={{ borderWidth: 0.3, borderColor: 'grey', width: '100%' }}></View>
              </View>

              <View style={{ marginHorizontal: 0 }}>
                <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color : 'black' }}>
                  Why we like them:
                </Text>

                <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color : 'black' }}>
                  You & Sea pride themselves on providing the highest quality practical and shorebased maritime training using well maintained, high quality boats and equipment.
                </Text>
              </View>


            </View>


          )}
        </View>





        {/* England */}
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <View style={{ height: 65, width: '90%', backgroundColor: '#003366' }}>
            <TouchableOpacity onPress={toggleExpand2}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ marginHorizontal: 20, marginTop: 10, fontSize: 20, fontWeight: '500', color: 'white' }}>England</Text>
                <View style={{ marginTop: 10, marginRight: 20 }}>
                  <MaterialIcons name="keyboard-arrow-down" size={30} color="white" />
                </View>
              </View>
            </TouchableOpacity>

            <View style={{
              borderBottomWidth: 1,
              borderBottomColor: 'white',
              marginHorizontal: 20,
              marginTop: 10,
              marginBottom: 10,
            }} />


          </View>

          {isExpanded2 && (
            <View style={{ marginHorizontal: 20, marginTop: 50 }}>
              <View style={{ alignItems: 'center' }}>
                <Image
                  source={require('../Assets/four-seasons-yacht-charter.jpeg')}
                  style={{ height: 50, width: 150, marginHorizontal: 15 }}
                />
              </View>
              {/* practical Course */}
              <Text style={{ fontSize: 19, fontWeight: '400', fontWeight: '500', color: 'black', marginTop: 20 }}>

                Practical Courses:
              </Text>
              <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10 , color : 'black'}}>
                RYA Competent Crew
              </Text>
              <Text style={{ fontSize: 16, fontWeight: '400', marginTop: 0, color : 'black' }}>
                RYA Day Skipper
              </Text>
              <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color : 'black' }}>
                RYA Coastal Skipper
              </Text>
              <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color : 'black' }}>
                Skippered or bareboat charter
              </Text>


              {/* Boats: */}
              <Text style={{ fontSize: 19, fontWeight: '400', fontWeight: '500', color: 'black', marginTop: 20 }}>

                Boats:
              </Text>
              <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color : 'black' }}>
                Sail:
              </Text>
              <Text style={{ fontSize: 16, fontWeight: '400', marginTop: 0, color : 'black' }}>
                Jeanneau 44i
              </Text>
              <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color : 'black' }}>
                Elan Impression 434
              </Text>
              <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color : 'black' }}>
                Jeanneau Sun Odyssey 43
              </Text>
              <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color : 'black' }}>
                Beneteau Oceanis 37
              </Text>
              <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0 , color : 'black'}}>
                JPK1010
              </Text>
              <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0 , color : 'black'}}>
                Huntsman 31
              </Text>


              {/* Contact: */}
              <Text style={{ fontSize: 19, fontWeight: '400', fontWeight: '500', color: 'black', marginTop: 20 }}>
                Contact:
              </Text>
              <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color : 'black' }}>
                02392 511789
              </Text>
              <Text style={{ fontSize: 16, fontWeight: '400', marginTop: 0, color : 'black' }}>
                fourseasonscharter@icloud.com
              </Text>
              <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color : 'black' }}>
                Four Seasons Yacht Charter & Sailing
              </Text>
              <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color : 'black' }}>
                School,
              </Text>
              <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color : 'black' }}>
                Haslar Marina,
              </Text>
              <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0 , color : 'black'}}>
                Haslar Road, Gosport,
              </Text>
              <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color : 'black' }}>
                Hants PO12 1NU
              </Text>

              <View style={{ alignItems: 'center', marginTop: 30, marginBottom: 20 }}>
                <View style={{ borderWidth: 0.5, borderColor: 'grey', width: '90%' }}></View>
              </View>

              <View style={{ marginHorizontal: 0 }}>
                <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color : 'black' }}>
                  Why we like them:
                </Text>

                <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color : 'black' }}>
                  You & Sea pride themselves on providing the highest quality practical and shorebased maritime training using well maintained, high quality boats and equipment.
                </Text>
              </View>

              {/* greyBox */}
              <View style={{ alignItems: 'center', marginTop: 40 }}>
                <View style={{ height: 900, width: '100%', backgroundColor: '#f2f2f2' }}>
                  <View style={{ alignItems: 'center' }}>
                    <Image
                      source={require('../Assets/Branding V1-03.png')}
                      style={{ height: 100, width: 350, marginHorizontal: 15 , marginTop: 40}}
                    />
                  </View>


                  {/* practical Course */}
                  <View style={{ marginHorizontal: 20 }}>
                    <Text style={{ fontSize: 19, fontWeight: '400', fontWeight: '500', color: 'black', marginTop: 40, }}>
                      Practical Courses:
                    </Text>
                    <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color : 'black' }}>
                      RYA Start Yachting
                    </Text>
                    <Text style={{ fontSize: 16, fontWeight: '400', marginTop: 0 , color : 'black'}}>
                      RYA Competent Crew
                    </Text>
                    <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color : 'black' }}>
                      RYA Day Skipper
                    </Text>
                    <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color : 'black' }}>
                      RYA Coastal Skipper
                    </Text>
                    <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0 , color : 'black'}}>
                      RYA Yachtmaster Offshore
                    </Text>
                    <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color : 'black' }}>
                      Mile Building
                    </Text>
                  </View>


                  {/* Boats: */}
                  <View style={{ marginHorizontal: 20 }}>
                    <Text style={{ fontSize: 19, fontWeight: '400', fontWeight: '500', color: 'black', marginTop: 20 }}>

                      Boats:
                    </Text>
                    <Text style={{ fontSize: 16, fontWeight: '400', marginTop: 0, color : 'black' }}>
                      Sail:
                    </Text>
                    <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color : 'black' }}>
                      Dufour Grandlarge 410
                    </Text>
                    <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color : 'black' }}>
                      Jeanneau Sun Odyssey 35
                    </Text>
                    <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color : 'black' }}>
                      Bavaria 38
                    </Text>
                    <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color : 'black' }}>
                      Elan 384
                    </Text>

                  </View>


                  {/* Contact: */}
                  <View style={{ marginHorizontal: 20 }}>
                    <Text style={{ fontSize: 19, fontWeight: '400', fontWeight: '500', color: 'black', marginTop: 20 }}>

                      Contact:
                    </Text>
                    <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color : 'black' }}>
                      +44 07495 612421
                    </Text>
                    <Text style={{ fontSize: 16, fontWeight: '400', marginTop: 0, color : 'black' }}>
                      info@sailtrainingsouthwest.co.uk
                    </Text>
                    <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0 , color : 'black'}}>
                      Falmouth Yacht Haven,
                    </Text>
                    <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color : 'black' }}>
                      Falmouth,
                    </Text>
                    <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color : 'black' }}>
                      Cornwall,
                    </Text>
                    <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color : 'black' }}>
                      TR11 3JQ
                    </Text>
                  </View>

                  <View style={{ marginHorizontal: 20, marginTop: 40 }}>
                    <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color : 'black' }}>
                      Why we like them:
                    </Text>

                    <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color : 'black' }}>
                      You & Sea pride themselves on providing the highest quality practical and shorebased maritime training using well maintained, high quality boats and equipment.
                    </Text>
                  </View>

                </View>
              </View>

            </View>
          )}
        </View>


        {/* Spain */}
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <View style={{ height: 65, width: '90%', backgroundColor: '#003366' }}>
            <TouchableOpacity onPress={toggleExpand3}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ marginHorizontal: 20, marginTop: 10, fontSize: 20, fontWeight: '500', color: 'white' }}>Spain</Text>
                <View style={{ marginTop: 10, marginRight: 20 }}>
                  <MaterialIcons name="keyboard-arrow-down" size={30} color="white" />
                </View>
              </View>
            </TouchableOpacity>

            <View style={{
              borderBottomWidth: 1,
              borderBottomColor: 'white',
              marginHorizontal: 20,
              marginTop: 10,
              marginBottom: 10,
            }} />


          </View>

          {isExpanded3 && (
            <View style={{ marginHorizontal: 20, marginTop: 50 }}>
              <View style={{ alignItems: 'center' }}>
                <Image
                  source={require('../Assets/Yachting.png')}
                  style={{ height: 100, width: 100, marginHorizontal: 15 }}
                />
              </View>
              {/* practical Course */}
              <Text style={{ fontSize: 19, fontWeight: '400', fontWeight: '500', color: 'black', marginTop: 20 }}>

                Practical Courses:
              </Text>
              <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color: 'black' }}>
                Competent Crew
              </Text>
              <Text style={{ fontSize: 16, fontWeight: '400', marginTop: 0, color: 'black' }}>
                Day Skipper
              </Text>
              <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color: 'black' }}>
                Coastal Skipper
              </Text>
              <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color: 'black' }}>
                Yachtmaster Offshore
              </Text>
              <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color: 'black' }}>
                Powerboat Level 2
              </Text>


              {/* Boats: */}
              <Text style={{ fontSize: 19, fontWeight: '400', fontWeight: '500', color: 'black', marginTop: 20 }}>

                Boats:
              </Text>
              <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color: 'black' }}>
                Sail:
              </Text>
              <Text style={{ fontSize: 16, fontWeight: '400', marginTop: 0, color: 'black' }}>
                Jeanneau Sun Oddysey 42i Beneteau
              </Text>
              <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color: 'black' }}>
                Oceanis 40 Lagoon 40 Catamaran
              </Text>
              <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color: 'black' }}>
                Motor:
              </Text>
              <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color: 'black' }}>
                Jeanneau Leader 40 Absolut 41
              </Text>
              <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color: 'black' }}>
                Dasmarine 25
              </Text>


              {/* Contact: */}
              <Text style={{ fontSize: 19, fontWeight: '400', fontWeight: '500', color: 'black', marginTop: 20 }}>
                Contact:
              </Text>
              <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color: 'black' }}>
                +34 680 681 233
              </Text>
              <Text style={{ fontSize: 16, fontWeight: '400', marginTop: 0, color: 'black' }}>
                skipper@yachtingsotogrande.com
              </Text>
              <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color: 'black' }}>
                Puerto de Sotogrande,
              </Text>
              <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color: 'black' }}>
                Cadiz,
              </Text>
              <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color: 'black' }}>
                Spain
              </Text>

              <View style={{ alignItems: 'center', marginTop: 30, marginBottom: 20 }}>
                <View style={{ borderWidth: 0.5, borderColor: 'grey', width: '90%' }}></View>
              </View>

              <View style={{ marginHorizontal: 0 }}>
                <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color: 'black' }}>
                  Why we like them:
                </Text>

                <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color: 'black' }}>
                  Based in the exquisite setting of Sotogrande, between Gibraltar and Marbella, benefit from great weather and beautiful coastal scenery of the Mediterranean whilst training to become a skipper from beginner to Yachtmaster. Supported by experienced sail & power RYA Yachtmaster instructors, getting your boating licence in Sotogrande will prove to be a fantastic opportunity to gain valuable skills and knowledge in navigating and operating sailing and motor boats.
                </Text>
              </View>

              {/* greyBox */}
              <View style={{ alignItems: 'center', marginTop: 40 }}>
                <View style={{ height: 900, width: '100%', backgroundColor: '#f2f2f2' }}>
                  <View style={{ alignItems: 'center' }}>
                    <Image
                      source={require('../Assets/PASS-Logo.png')}
                      style={{ height: 100, width: 150, marginHorizontal: 15, marginTop: 20 }}
                    />
                  </View>


                  {/* practical Course */}
                  <View style={{ marginHorizontal: 20 }}>
                    <Text style={{ fontSize: 19, fontWeight: '400', fontWeight: '500', color: 'black', marginTop: 40, }}>
                      Practical Courses:
                    </Text>
                    <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color : 'black' }}>
                      RYA Start Yachting
                    </Text>
                    <Text style={{ fontSize: 16, fontWeight: '400', marginTop: 0, color : 'black' }}>
                      RYA Competent Crew
                    </Text>
                    <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color : 'black' }}>
                      RYA Day Skipper
                    </Text>
                    <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color : 'black' }}>
                      RYA Coastal Skipper
                    </Text>
                    <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color : 'black' }}>
                      RYA Yachtmaster Offshore
                    </Text>
                    <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color : 'black' }}>
                      Advanced Skills courses
                    </Text>
                    <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color : 'black' }}>
                      Own Boat Tuition
                    </Text>
                    <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color : 'black' }}>
                      Charter
                    </Text>
                  </View>


                  {/* Boats: */}
                  <View style={{ marginHorizontal: 20 }}>
                    <Text style={{ fontSize: 19, fontWeight: '400', fontWeight: '500', color: 'black', marginTop: 20 }}>

                      Boats:
                    </Text>
                    <Text style={{ fontSize: 16, fontWeight: '400', marginTop: 0, color : 'black' }}>
                      Sail:
                    </Text>
                    <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color : 'black' }}>
                      Dehler 37CWS
                    </Text>

                  </View>


                  {/* Contact: */}
                  <View style={{ marginHorizontal: 20 }}>
                    <Text style={{ fontSize: 19, fontWeight: '400', fontWeight: '500', color: 'black', marginTop: 20 }}>

                      Contact:
                    </Text>
                    <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color : 'black' }}>
                      0034 722390055
                    </Text>
                    <Text style={{ fontSize: 16, fontWeight: '400', marginTop: 0, color : 'black' }}>
                      learntosail@passgc.com
                    </Text>
                    <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color : 'black' }}>
                      Calle Explanada de Castillete,
                    </Text>
                    <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color : 'black' }}>
                      SY Poseidon,
                    </Text>
                    <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color : 'black' }}>
                      Torre de Control S/N 1a,
                    </Text>
                    <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color : 'black' }}>
                      Marina de Puerto de Mogán,
                    </Text>
                    <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color : 'black' }}>
                      35138 Mogán,
                    </Text>
                    <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color : 'black' }}>
                      Las Palmas,
                    </Text>
                    <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color : 'black' }}>
                      Gran Canaria
                    </Text>
                  </View>

                  <View style={{ marginHorizontal: 20, marginTop: 40 }}>
                    <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color : 'black' }}>
                      Why we like them:
                    </Text>

                    <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color : 'black' }}>
                      You & Sea pride themselves on providing the highest quality practical and shorebased maritime training using well maintained, high quality boats and equipment.
                    </Text>
                  </View>

                </View>
              </View>

              {/* Original.png */}
              <View style={{ alignItems: 'center' }}>
                <Image
                  source={require('../Assets/Original.png')}
                  style={{ height: 100, width: 200, marginTop: 40 }}
                />
              </View>

              {/* practical Course */}
              <View style={{ marginHorizontal: 0 }}>
                <Text style={{ fontSize: 19, fontWeight: '400', fontWeight: '500', color: 'black', marginTop: 40, }}>
                  Practical Courses:
                </Text>
                <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color : 'black' }}>
                RYA Motorboat Syllabus
                </Text>
                <Text style={{ fontSize: 16, fontWeight: '400', marginTop: 0, color : 'black' }}>
                RYA Powerboat Syllabus
                </Text>
              </View>

              {/* Boats: */}
              <Text style={{ fontSize: 19, fontWeight: '400', fontWeight: '500', color: 'black', marginTop: 20 }}>

                Boats:
              </Text>
              <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color : 'black' }}>
                Motorboat:
              </Text>
              <Text style={{ fontSize: 16, fontWeight: '400', marginTop: 0, color : 'black' }}>
                Princess F55
              </Text>
              <Text style={{ fontSize: 16, fontWeight: '400', marginTop: 0, color : 'black' }}>
                Powerboat:
              </Text>
              <Text style={{ fontSize: 16, fontWeight: '400', marginTop: 0, color : 'black' }}>
                Nireus CL620
              </Text>
              <Text style={{ fontSize: 16, fontWeight: '400', marginTop: 0, color : 'black' }}>
                Narwhal RIB 7.99m
              </Text>


              {/* Contact: */}
              <Text style={{ fontSize: 19, fontWeight: '400', fontWeight: '500', color: 'black', marginTop: 20 }}>
                Contact:
              </Text>
              <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color : 'black' }}>
                (+34) 951 946 142
              </Text>
              <Text style={{ fontSize: 16, fontWeight: '400', marginTop: 0, color : 'black' }}>
                Tuition@pba-banus.com
              </Text>
              <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color : 'black' }}>
                Local A7,
              </Text>
              <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color : 'black' }}>
                Centro Commercial Cristamar,
              </Text>
              <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color : 'black' }}>
                Avendia Naciones Unidas 127,
              </Text>
              <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color : 'black' }}>
                Marbella,
              </Text>
              <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color : 'black' }}>
                29660
              </Text>

              <View style={{ alignItems: 'center', marginTop: 30, marginBottom: 20 }}>
                <View style={{ borderWidth: 0.3, borderColor: 'grey', width: '100%' }}></View>
              </View>

              <View style={{ marginHorizontal: 0 }}>
                <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color : 'black' }}>
                  Why we like them:
                </Text>

                <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color : 'black' }}>
                  You & Sea pride themselves on providing the highest quality practical and shorebased maritime training using well maintained, high quality boats and equipment.
                </Text>
              </View>

            </View>
          )}
        </View>


        {/* United Arab Emirates */}
        <View style={{ alignItems: 'center', marginTop: 20, marginBottom: 40 }}>
          <View style={{ height: 65, width: '90%', backgroundColor: '#003366' }}>
            <TouchableOpacity onPress={toggleExpand4}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ marginHorizontal: 20, marginTop: 10, fontSize: 20, fontWeight: '500', color: 'white' }}>United Arab Emirates</Text>
                <View style={{ marginTop: 10, marginRight: 20 }}>
                  <MaterialIcons name="keyboard-arrow-down" size={30} color="white" />
                </View>
              </View>
            </TouchableOpacity>

            <View style={{
              borderBottomWidth: 1,
              borderBottomColor: 'white',
              marginHorizontal: 20,
              marginTop: 10,
              marginBottom: 10,
            }} />


          </View>

          {isExpanded4 && (
            <View style={{ marginHorizontal: 20, marginTop: 50 }}>
               {/* Original.png */}
               <View style={{ alignItems: 'center' }}>
                <Image
                  source={require('../Assets/Copy of cropped-DOSC-Vector.png')}
                  style={{ height: 100, width: 250, marginTop: 40 }}
                />
              </View>

              {/* practical Course */}
              <View style={{ marginHorizontal: 0 }}>
                <Text style={{ fontSize: 19, fontWeight: '400', fontWeight: '500', color: 'black', marginTop: 40, }}>
                  Practical Courses:
                </Text>
                <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color : 'black' }}>
                Wingfoil
                </Text>
                <Text style={{ fontSize: 16, fontWeight: '400', marginTop: 0, color : 'black' }}>
                Dinghy
                </Text>
                <Text style={{ fontSize: 16, fontWeight: '400', marginTop: 0, color : 'black' }}>
                Powerboat
                </Text>
                <Text style={{ fontSize: 16, fontWeight: '400', marginTop: 0, color : 'black' }}>
                Cruising
                </Text>
              </View>

              {/* Boats: */}
              <Text style={{ fontSize: 19, fontWeight: '400', fontWeight: '500', color: 'black', marginTop: 20 }}>

                Boats:
              </Text>
              <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color : 'black' }}>
              TBC
              </Text>


              {/* Contact: */}
              <Text style={{ fontSize: 19, fontWeight: '400', fontWeight: '500', color: 'black', marginTop: 20 }}>
                Contact:
              </Text>
              <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color : 'black' }}>
              971 04 3941669
              </Text>
              <Text style={{ fontSize: 16, fontWeight: '400', marginTop: 0, color : 'black' }}>
              info@doscuae.com
              </Text>
              <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color : 'black' }}>
              Dubai Offshore Sailing Club,
              </Text>
              <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color : 'black' }}>
              Jumeirah Beach Road - 1 - Umm Suqeim -
              </Text>
              <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color : 'black' }}>
              Jumeirah 3,
              </Text>
              <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color : 'black' }}>
              Dubai,
              </Text>
              <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color : 'black' }}>
              United Arab Emirates
              </Text>

              <View style={{ alignItems: 'center', marginTop: 30, marginBottom: 20 }}>
                <View style={{ borderWidth: 0.3, borderColor: 'grey', width: '100%' }}></View>
              </View>

              <View style={{ marginHorizontal: 0 }}>
                <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 0, color : 'black' }}>
                  Why we like them:
                </Text>

                <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 10, color : 'black' }}>
                  You & Sea pride themselves on providing the highest quality practical and shorebased maritime training using well maintained, high quality boats and equipment.
                </Text>
              </View>

            </View>
          )}
        </View>
      </View>
    </ScrollView >
  )
}

const styles = StyleSheet.create({})