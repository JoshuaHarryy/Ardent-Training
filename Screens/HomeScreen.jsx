import { Image, StyleSheet, Text, View, TouchableOpacity, ScrollView, ActivityIndicator, Modal, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import HTMLView from 'react-native-htmlview';
import Entypo from 'react-native-vector-icons/Entypo';
import { useDispatch, useSelector } from 'react-redux';
import { checkToken } from '../Redux/authSlice';



export default function HomeScreen({ navigation }) {

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imageError, setImageError] = useState(false);
  const dispatch = useDispatch();

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
        setCourses(data.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleBuyNow = async() => {

    const result = await dispatch(checkToken());
    if (result.payload && result.payload.token) {
      
      setIsModalVisible(true);
    } else {
      
      Alert.alert("Sign In Required", 'Please sign in first to enable this feature.', [
        { text: 'OK', onPress: () => navigation.navigate('Signup') },
      ]);
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="orange" />

      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Icon name="menu" size={30} color="white" />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: '500', color: 'white', flex: 1, textAlign: 'center' }}>Classroom</Text>
        <Image
          source={require('../Assets/Vertical.png')}
          style={styles.logo}
        />
      </View>

      <ScrollView>
        <View style={{ marginTop: 60, marginBottom: 60, flex: 1, alignItems: 'center' }}>
          <Text style={{ fontSize: 18, color: 'white' }}>You have not enrolled in any course.</Text>
        </View>


        {/* RYA Day Skipper Theory Course */}

        <View style={{ alignItems: 'center', marginBottom: 40 }}>
          <View style={{ width: '90%', height: 720, backgroundColor: 'white', borderRadius: 10, elevation: 10, position: 'relative' }}>

            {/* Image and Price */}
            <View>
              {courses
                .filter(course => course.id === 1)
                .map(item => (
                  <View key={item.id}>
                    <Image
                      source={
                        item.imageFulUrl && item.imageFulUrl !== 'null'
                          ? { uri: item.imageFulUrl }
                          : require('../Assets/DaySkipper.jpg') // Fallback image
                      }
                      onError={() => {
                        console.log('Image URL failed to load, showing default image.');
                        setImageSource(require('../Assets/DaySkipper.jpg')); // Ensure fallback if URL fails
                      }}
                      style={{
                        width: '100%',
                        height: 200,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                      }}
                    />
                    <View
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
                    </View>
                  </View>
                ))}
            </View>

            {/* Name */}
            <View style={{ marginTop: 25, marginHorizontal: 30 }}>
              {courses
                .filter(course => course.id === 1)
                .map((item) => (
                  <Text style={{ fontSize: 16, color: '#00008B', fontWeight: '500', marginBottom: 10 }} key={item.id}>
                    {item.name}
                  </Text>
                ))}
            </View>

            {/* Description */}
            <View style={{ marginTop: 15, marginHorizontal: 30 }}>
              {courses
                .filter(course => course.id === 1)
                .map((item) => (
                  <HTMLView
                    key={item.id}
                    value={item.description}
                    stylesheet={{ p: { fontSize: 15, color: 'black', fontWeight: '400' } }}
                  />
                ))}
            </View>

            {/* View More and Buy Now at the Bottom */}
            <View style={{ position: 'absolute', bottom: 20, left: 30, right: 30, justifyContent: 'space-between' }}>
              <Text style={{ color: 'purple', fontSize: 14, marginBottom: 20 }}>View more details</Text>

              <TouchableOpacity onPress={handleBuyNow}>
                <View style={{ width: '100%', height: 60, backgroundColor: '#FE8E91', borderRadius: 15, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ color: 'white', fontWeight: '500', fontSize: 19 }}> BUY NOW</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Modal visible={isModalVisible} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>

            <View style={styles.modalContent}>
              <TouchableOpacity onPress={closeModal}>
                <Entypo name={"cross"} size={24} color={"black"} style={styles.ArrowIcon1} />
              </TouchableOpacity>

              <View style={{ justifyContent: 'space-between', flex: 1 }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.modalTitle}>Select Delivery Address</Text>
                  <TouchableOpacity onPress={() => navigation.navigate('Address')}>
                    <Entypo name={"plus"} size={24} color={"black"} style={styles.ArrowIcon} />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>PLACE ORDER</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* RYA   Coastal   Skipper/Yachtmaster Offshore Theory Course */}

        <View style={{ alignItems: 'center', marginBottom: 40 }}>
          <View style={{ width: '90%', height: 760, backgroundColor: 'white', borderRadius: 10, elevation: 10 }}>
            <View style={{ position: 'relative' }}>
              {courses
                .filter(course => course.id === 15)
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
                    height: 200,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}
                  onError={() => setImageError(true)} 
                />
                    <View
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
                    </View>
                  </View>
                ))}
            </View>

            <View style={{ marginTop: 25, marginHorizontal: 30 }}>
              {courses
                .filter(course => course.id === 15)
                .map((item) => (
                  <Text style={{ fontSize: 16, color: '#00008B', fontWeight: '500' }} key={item.id}>
                    {item.name}
                  </Text>
                ))}
            </View>

            <View style={{ marginTop: 25, marginHorizontal: 30 }}>
              {courses
                .filter(course => course.id === 15)
                .map((item) => (
                  <HTMLView
                    key={item.id}
                    value={item.description}
                    stylesheet={{ p: { fontSize: 15, color: 'black', fontWeight: '400' } }}
                  />
                ))}
            </View>

            {/* View More and Buy Now at the Bottom */}
            <View style={{ position: 'absolute', bottom: 20, left: 30, right: 30, justifyContent: 'space-between' }}>
              <Text style={{ color: 'purple', fontSize: 14, marginBottom: 20 }}>View more details</Text>

              <TouchableOpacity onPress={handleBuyNow}>
                <View style={{ width: '100%', height: 60, backgroundColor: '#FE8E91', borderRadius: 15, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ color: 'white', fontWeight: '500', fontSize: 19 }}> BUY NOW</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Modal visible={isModalVisible} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>

            <View style={styles.modalContent}>
              <TouchableOpacity onPress={closeModal}>
                <Entypo name={"cross"} size={24} color={"black"} style={styles.ArrowIcon1} />
              </TouchableOpacity>

              <View style={{ justifyContent: 'space-between', flex: 1 }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.modalTitle}>Select Delivery Address</Text>
                  <TouchableOpacity onPress={() => navigation.navigate('Address')}>
                    <Entypo name={"plus"} size={24} color={"black"} style={styles.ArrowIcon} />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>PLACE ORDER</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* RYA Fast Track to Coastal Skipper/Yachtmaster Offshore Theory Course. */}

        <View style={{ alignItems: 'center', marginBottom: 40 }}>
          <View style={{ width: '90%', height: 700, backgroundColor: 'white', borderRadius: 10, elevation: 10 }}>
            <View style={{ position: 'relative' }}>
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
                    height: 200,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}
                  onError={() => setImageError(true)} 
                />
                    <View
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
                    </View>
                  </View>
                ))}
            </View>

            <View style={{ marginTop: 25, marginHorizontal: 30 }}>
              {courses
                .filter(course => course.id === 4)
                .map((item) => (
                  <Text style={{ fontSize: 16, color: '#00008B', fontWeight: '500' }} key={item.id}>
                    {item.name}
                  </Text>
                ))}
            </View>

            <View style={{ marginTop: 25, marginHorizontal: 30 }}>
              {courses
                .filter(course => course.id === 4)
                .map((item) => (
                  <HTMLView
                    key={item.id}
                    value={item.description}
                    stylesheet={{ p: { fontSize: 15, color: 'black', fontWeight: '400' } }} // Optional: style the HTML
                  />
                ))}
            </View>


            {/* View More and Buy Now at the Bottom */}
            <View style={{ position: 'absolute', bottom: 20, left: 30, right: 30, justifyContent: 'space-between' }}>
              <Text style={{ color: 'purple', fontSize: 14, marginBottom: 20 }}>View more details</Text>

              <TouchableOpacity onPress={handleBuyNow}>
                <View style={{ width: '100%', height: 60, backgroundColor: '#FE8E91', borderRadius: 15, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ color: 'white', fontWeight: '500', fontSize: 19 }}> BUY NOW</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Modal visible={isModalVisible} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>

            <View style={styles.modalContent}>
              <TouchableOpacity onPress={closeModal}>
                <Entypo name={"cross"} size={24} color={"black"} style={styles.ArrowIcon1} />
              </TouchableOpacity>

              <View style={{ justifyContent: 'space-between', flex: 1 }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.modalTitle}>Select Delivery Address</Text>
                  <TouchableOpacity onPress={() => navigation.navigate('Address')}>
                    <Entypo name={"plus"} size={24} color={"black"} style={styles.ArrowIcon} />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>PLACE ORDER</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        {/* RYA PPR Course */}

        <View style={{ alignItems: 'center', marginBottom: 40 }}>
          <View style={{ width: '90%', height: 545, backgroundColor: 'white', borderRadius: 10, elevation: 10 }}>
            <View style={{ position: 'relative' }}>
              {courses
                .filter(course => course.id === 42)
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
                    height: 200,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}
                  onError={() => setImageError(true)} 
                />
                    <View
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
                    </View>
                  </View>
                ))}
            </View>

            <View style={{ marginTop: 25, marginHorizontal: 30 }}>
              {courses
                .filter(course => course.id === 42)
                .map((item) => (
                  <Text style={{ fontSize: 16, color: '#00008B', fontWeight: '500' }} key={item.id}>
                    {item.name}
                  </Text>
                ))}
            </View>

            <View style={{ marginTop: 25, marginHorizontal: 30 }}>
              {courses
                .filter(course => course.id === 42)
                .map((item) => (
                  <HTMLView
                    key={item.id}
                    value={item.description}
                    stylesheet={{ p: { fontSize: 15, color: 'black', fontWeight: '400' } }} // Optional: style the HTML
                  />
                ))}
            </View>

            <View style={{ marginTop: 30, marginHorizontal: 30 }}>
              <Text style={{ color: 'purple', fontSize: 14 }}>View more details</Text>
            </View>

            <View style={{ marginTop: 15, alignItems: 'center' }}>
              <View style={{ width: '90%', height: 60, backgroundColor: '#FE8E91', borderRadius: 15, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: 'white', fontWeight: '500', fontSize: 19 }}> BUY NOW</Text>
              </View>
            </View>
          </View>
        </View>
        {/* RYA Marine Radio SRC Course */}

        <View style={{ alignItems: 'center', marginBottom: 40 }}>
          <View style={{ width: '90%', height: 580, backgroundColor: 'white', borderRadius: 10, elevation: 10 }}>
            <View style={{ position: 'relative' }}>
              {courses
                .filter(course => course.id === 43)
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
                    height: 200,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}
                  onError={() => setImageError(true)} 
                />
                    <View
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
                    </View>
                  </View>
                ))}
            </View>

            <View style={{ marginTop: 25, marginHorizontal: 30 }}>
              {courses
                .filter(course => course.id === 43)
                .map((item) => (
                  <Text style={{ fontSize: 16, color: '#00008B', fontWeight: '500' }} key={item.id}>
                    {item.name}
                  </Text>
                ))}
            </View>

            <View style={{ marginTop: 25, marginHorizontal: 30 }}>
              {courses
                .filter(course => course.id === 43)
                .map((item) => (
                  <HTMLView
                    key={item.id}
                    value={item.description}
                    stylesheet={{ p: { fontSize: 15, color: 'black', fontWeight: '400' } }} // Optional: style the HTML
                  />
                ))}
            </View>


            {/* View More and Buy Now at the Bottom */}
            <View style={{ position: 'absolute', bottom: 20, left: 30, right: 30, justifyContent: 'space-between' }}>
              <Text style={{ color: 'purple', fontSize: 14, marginBottom: 20 }}>View more details</Text>

              <TouchableOpacity onPress={handleBuyNow}>
                <View style={{ width: '100%', height: 60, backgroundColor: '#FE8E91', borderRadius: 15, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ color: 'white', fontWeight: '500', fontSize: 19 }}> BUY NOW</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Modal visible={isModalVisible} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>

            <View style={styles.modalContent}>
              <TouchableOpacity onPress={closeModal}>
                <Entypo name={"cross"} size={24} color={"black"} style={styles.ArrowIcon1} />
              </TouchableOpacity>

              <View style={{ justifyContent: 'space-between', flex: 1 }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.modalTitle}>Select Delivery Address</Text>
                  <TouchableOpacity onPress={() => navigation.navigate('Address')}>
                    <Entypo name={"plus"} size={24} color={"black"} style={styles.ArrowIcon} />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>PLACE ORDER</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* RYA Yachtmaster Ocean Theory Course */}

        <View style={{ alignItems: 'center', marginBottom: 40 }}>
          <View style={{ width: '90%', height: 675, backgroundColor: 'white', borderRadius: 10, elevation: 10 }}>
            {courses
              .filter(course => course.id === 36)
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
                    height: 200,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}
                  onError={() => setImageError(true)} 
                />
                  <View
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
                  </View>
                </View>
              ))}

            <View style={{ marginTop: 25, marginHorizontal: 30 }}>
              {courses
                .filter(course => course.id === 36)
                .map((item) => (
                  <Text style={{ fontSize: 16, color: '#00008B', fontWeight: '500' }} key={item.id}>
                    {item.name}
                  </Text>
                ))}
            </View>

            <View style={{ marginTop: 25, marginHorizontal: 30 }}>
              {courses
                .filter(course => course.id === 36)
                .map((item) => (
                  <HTMLView
                    key={item.id}
                    value={item.description}
                    stylesheet={{ p: { fontSize: 15, color: 'black', fontWeight: '400' } }} // Optional: style the HTML
                  />
                ))}
            </View>

            {/* View More and Buy Now at the Bottom */}
            <View style={{ position: 'absolute', bottom: 20, left: 30, right: 30, justifyContent: 'space-between' }}>
              <Text style={{ color: 'purple', fontSize: 14, marginBottom: 20 }}>View more details</Text>

              <TouchableOpacity onPress={handleBuyNow}>
                <View style={{ width: '100%', height: 60, backgroundColor: '#FE8E91', borderRadius: 15, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ color: 'white', fontWeight: '500', fontSize: 19 }}> BUY NOW</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Modal visible={isModalVisible} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>

            <View style={styles.modalContent}>
              <TouchableOpacity onPress={closeModal}>
                <Entypo name={"cross"} size={24} color={"black"} style={styles.ArrowIcon1} />
              </TouchableOpacity>

              <View style={{ justifyContent: 'space-between', flex: 1 }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.modalTitle}>Select Delivery Address</Text>
                  <TouchableOpacity onPress={() => navigation.navigate('Address')}>
                    <Entypo name={"plus"} size={24} color={"black"} style={styles.ArrowIcon} />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>PLACE ORDER</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>


      </ScrollView>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5E71EA',
  },
  header: {
    height: 120,
    backgroundColor: '#173A70',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,

  },
  headerText: {
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
    marginLeft: 10,
    flex: 1,
  },
  logo: {
    width: 90,
    height: 40,
  },
  mainContent: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: '#000',
  },
  buyButton: {
    marginTop: 20,
    backgroundColor: '#FE8E91',
    borderRadius: 15,
    alignItems: 'center',
    paddingVertical: 15,
  },
  buyButtonText: {
    color: 'white',
    fontSize: 19,
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    height: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,

  },
  modalTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
    marginTop: 25
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#FE8E91',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    height: 50,
    justifyContent: 'center'
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500'
  },
  ArrowIcon: {
    marginTop: 25,
    marginHorizontal: 120
  },
  ArrowIcon1: {
    alignSelf: 'flex-end'
  },
})