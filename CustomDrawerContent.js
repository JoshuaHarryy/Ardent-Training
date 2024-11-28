import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

export default function CustomDrawerContent(props) {
  const [isCoursesExpanded, setIsCoursesExpanded] = useState(false); // State to toggle course options

  const toggleCoursesDropdown = () => {
    setIsCoursesExpanded(!isCoursesExpanded);
  };

  return (
    <DrawerContentScrollView {...props}>
      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../Demo - Copy/Assets/Ardent.png')}
          style={styles.logo}
        />
      </View>

      {/* Drawer Items */}
      <View style={styles.drawerItemContainer}>
        {props.state.routes.map((route, index) => {
          // Check if the route is "Courses"
          if (route.name === 'Courses') {
            return (
              <View key={route.key}>
                {/* Main "Courses" Drawer Item */}
                <TouchableOpacity onPress={toggleCoursesDropdown}>
                  <DrawerItem
                    label="Courses"
                    onPress={toggleCoursesDropdown} // Toggle the dropdown
                  />
                </TouchableOpacity>

                {/* Conditionally Render Course Screens */}
                {isCoursesExpanded && (
                  <View style={styles.courseOptionsContainer}>
                    <DrawerItem
                      label="RYA Day Skipper Theory Course"
                      labelStyle={{ flexWrap: 'wrap'}}
                      onPress={() => {
                        props.navigation.navigate('RyaDaySkipper');
                      }}
                    />
                    <DrawerItem
                      label="RYA Coastal Skipper/Yachtmaster Offshore Theory Course"
                      onPress={() => {
                        props.navigation.navigate('RyaCoastalSkipper');
                      }}
                    />
                    <DrawerItem
                      label="RYA Fast Track to Coastal Skipper/Yachtmaster Offshore Theory Course."
                      onPress={() => {
                        props.navigation.navigate('RyaFastTrack');
                      }}
                    />
                    <DrawerItem
                      label="RYA PPR Course."
                      onPress={() => {
                        props.navigation.navigate('Rya PPR Course');
                      }}
                    />
                    <DrawerItem
                      label="Rya Marine Radio SRC Course"
                      onPress={() => {
                        props.navigation.navigate('Rya Marine Radio SRC Course');
                      }}
                    />
                    <DrawerItem
                      label="Rya Yachtmaster Ocean Theory Course"
                      onPress={() => {
                        props.navigation.navigate('Rya Yachtmaster Ocean Theory Course');
                      }}
                    />
                    <DrawerItem
                      label="Practical Course"
                      onPress={() => {
                        props.navigation.navigate('Practical Course');
                      }}
                    />
                  </View>
                )}

                {/* Divider */}
                {index < props.state.routes.length - 1 && <View style={styles.divider} />}
              </View>
            );
          } else {
            // Render other drawer items normally
            return (
              <View key={route.key}>
                <DrawerItem
                  label={route.name}
                  onPress={() => props.navigation.navigate(route.name)}
                />
                {index < props.state.routes.length - 1 && <View style={styles.divider} />}
              </View>
            );
          }
        })}
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'flex-start',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 100,
    resizeMode: 'contain',
  },
  drawerItemContainer: {
    marginVertical: 0,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginHorizontal: 16,
    marginVertical: 0,
  },
  courseOptionsContainer: {
    paddingLeft: 20, // Indent the course options
  },
});
