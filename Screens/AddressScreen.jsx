import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal, FlatList, Alert, TouchableWithoutFeedback, Keyboard, } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function AddressScreen({ navigation }) {

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [stateModalVisible, setStateModalVisible] = useState(false);

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');

  const fetchCountries = async () => {
    try {
      const response = await fetch('https://staging.ardent-training.com/api/country'); // Replace with your API endpoint
      const json = await response.json();
      const countryOptions = Object.values(json.data).map(country => ({
        label: country.name,
        value: country.id, // You can also use country.code or country.id based on your requirement
      }));
      setCountries(countryOptions);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchStates = async (countryId) => {
    try {

      const response = await fetch(`https://staging.ardent-training.com/api/state/1${countryId}`);


      const json = await response.json();
      console.log('Response:', json);


      const stateOptions = json.data.map(state => ({
        label: state.name,
        value: state.id,
      }));

      setStates(stateOptions);
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const handleCountryPress = () => {
    setModalVisible(true);
    fetchCountries(); // Fetch countries when the user clicks on the text
  };

  const handleStatePress = () => {
    if (selectedCountry) {
      setStateModalVisible(true);
      fetchStates(selectedCountry); // Fetch states for the selected country
    }
  };

  const handleOutsidePress = () => {
    setModalVisible(false);
  };

  const saveAddress = async () => {
    const addressData = {
      name,
      phone_number: phoneNumber,
      address_line_1: addressLine1,
      address_line_2: addressLine2,
      country_id: selectedCountry,
      state_id: selectedState,
      city_id: city,
      zip_code: zipCode,
    };

    try {
      const response = await fetch('https://staging.ardent-training.com/api/address', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(addressData),
      });

      if (response.ok) {
        await AsyncStorage.setItem('addressData', JSON.stringify(addressData));
        Alert.alert('Success', 'Address saved successfully!');
       
      } else {
        Alert.alert('Error', 'Failed to save address.');
      }
    } catch (error) {
      console.error('Error saving address:', error);
      Alert.alert('Error', 'An error occurred while saving the address.');
    }
  };
  useEffect(() => {
    // Load the address from AsyncStorage when the component mounts
    const loadAddress = async () => {
      try {
        const storedAddress = await AsyncStorage.getItem('addressData');
        if (storedAddress) {
          const parsedAddress = JSON.parse(storedAddress);
          setName(parsedAddress.name);
          setPhoneNumber(parsedAddress.phone_number);
          setAddressLine1(parsedAddress.address_line_1);
          setAddressLine2(parsedAddress.address_line_2);
          setCity(parsedAddress.city_id);
          setZipCode(parsedAddress.zip_code);
          setSelectedCountry(parsedAddress.country_id); // Make sure you also set the country/state if applicable
          setSelectedState(parsedAddress.state_id); // Set state
        }
      } catch (error) {
        console.error('Failed to load address data:', error);
      }
    };

    loadAddress();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#1C3879' }}>
      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <TouchableOpacity onPress={() => navigation.navigate('MyProfile')}>
          <MaterialIcons name={"arrow-back-ios"} size={24} color={"white"} style={styles.ArrowIcon} />
        </TouchableOpacity>

        <View style={{ marginHorizontal: 80 }}>
          <Text style={{ fontSize: 18, fontWeight: '500', color: 'white' }}>Add Address</Text>
        </View>
      </View>

      <View style={{ marginTop: 30, marginHorizontal: 20 }}>
        <Text style={{ fontSize: 15, color: 'white' }}>Name</Text>
      </View>

      <View style={styles.MainFirstNameContainer}>
        <View style={styles.FirstNameContainer}>
          <TextInput style={styles.Textinput}
            value={name}
            onChangeText={setName}
            placeholder='First Name'
            placeholderTextColor="white" ></TextInput>
        </View>
      </View>

      <View style={{ marginTop: 15, marginHorizontal: 20 }}>
        <Text style={{ fontSize: 15, color: 'white' }}>Phone Number</Text>
      </View>

      <View style={styles.MainFirstNameContainer}>
        <View style={styles.FirstNameContainer}>
          <TextInput style={styles.Textinput}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder='Phone Number'
            placeholderTextColor="white" ></TextInput>
        </View>
      </View>

      <View style={{ marginTop: 15, marginHorizontal: 20 }}>
        <Text style={{ fontSize: 15, color: 'white' }}>Country</Text>
      </View>

      <TouchableOpacity onPress={handleCountryPress} style={styles.MainFirstNameContainer}>
        <View style={styles.FirstNameContainer}>
          <TextInput
            style={styles.Textinput}
            placeholder='Country'
            placeholderTextColor="white"
            value={selectedCountry}
            editable={false} // Make it non-editable to only allow selection
          />
        </View>
      </TouchableOpacity>

      {/* Modal for selecting country */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <TouchableWithoutFeedback onPress={handleOutsidePress}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={{ flex: 1 }}>
                <FlatList
                  data={countries}
                  keyExtractor={(item) => item.value.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedCountry(item.label);
                        setModalVisible(false);
                      }}
                      style={styles.optionContainer}
                    >
                      <Text style={styles.optionText}>{item.label}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <View style={{ marginTop: 15, marginHorizontal: 20 }}>
        <Text style={{ fontSize: 15, color: 'white' }}>State</Text>
      </View>

      <TouchableOpacity onPress={handleStatePress} style={styles.MainFirstNameContainer}>
        <View style={styles.FirstNameContainer}>
          <TextInput
            style={styles.Textinput}
            placeholder='State'
            placeholderTextColor="white"
            value={selectedState}
            editable={false} // Make it non-editable to only allow selection
          />
        </View>
      </TouchableOpacity>

      {/* Modal for selecting state */}
      <Modal visible={stateModalVisible} transparent animationType="slide">
        <TouchableWithoutFeedback onPress={handleOutsidePress}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={{ flex: 1 }}>
                <FlatList
                  data={states}
                  keyExtractor={(item) => item.value.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedState(item.label);
                        setStateModalVisible(false);
                      }}
                      style={styles.optionContainer}
                    >
                      <Text style={styles.optionText}>{item.label}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <View style={{ marginTop: 15, marginHorizontal: 20 }}>
        <Text style={{ fontSize: 15, color: 'white' }}>City</Text>
      </View>

      <View style={styles.MainFirstNameContainer}>
        <View style={styles.FirstNameContainer}>
          <TextInput style={styles.Textinput}
            value={city}
            onChangeText={setCity}
            placeholder='City'
            placeholderTextColor="white"></TextInput>
        </View>
      </View>

      <View style={{ marginTop: 15, marginHorizontal: 20 }}>
        <Text style={{ fontSize: 15, color: 'white' }}>Zip Code</Text>
      </View>

      <View style={styles.MainFirstNameContainer}>
        <View style={styles.FirstNameContainer}>
          <TextInput style={styles.Textinput}
            value={zipCode}
            onChangeText={setZipCode}
            placeholder='Zip Code'
            placeholderTextColor="white"></TextInput>
        </View>
      </View>

      <View style={{ marginTop: 15, marginHorizontal: 20 }}>
        <Text style={{ fontSize: 15, color: 'white' }}>Address Line 1</Text>
      </View>

      <View style={styles.MainFirstNameContainer}>
        <View style={styles.FirstNameContainer}>
          <TextInput style={styles.Textinput}
            value={addressLine1}
            onChangeText={setAddressLine1}
            placeholder='Address Line 1'
            placeholderTextColor="white"></TextInput>
        </View>
      </View>

      <View style={{ marginTop: 15, marginHorizontal: 20 }}>
        <Text style={{ fontSize: 15, color: 'white' }}>Address Line 2</Text>
      </View>

      <View style={styles.MainFirstNameContainer}>
        <View style={styles.FirstNameContainer}>
          <TextInput style={styles.Textinput}
             value={addressLine2}
             onChangeText={setAddressLine2}
            placeholder='Address Line 2'
            placeholderTextColor="white"></TextInput>
        </View>
      </View>

      <TouchableOpacity onPress={saveAddress}>
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <View style={{ width: '90%', height: 40, borderWidth: 2, borderColor: 'orange', borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'white', fontWeight: '500', fontSize: 17 }}>Add</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>

  )
}

const screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({

  ArrowIcon: {
    marginHorizontal: 20
  },
  MainFirstNameContainer: { alignItems: 'center', marginTop: 5, },
  FirstNameContainer: {
    width: '90%',
    height: 40,
    backgroundColor: '#666CAD',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  Textinput: {
    flex: 1,
    fontSize: 13,
    color: 'white',
    marginHorizontal: 10
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    height: screenHeight * 0.7,
    width: '100%',
    backgroundColor: 'white', // Set background to white
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    elevation: 5, // Add shadow for Android
    shadowColor: '#000', // Add shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  optionContainer: {
    padding: 15,
    backgroundColor: 'white', // Keep option background white
    marginVertical: 5,
    borderRadius: 5,
  },
  optionText: {
    fontSize: 16,
    color: 'black',
  },
})