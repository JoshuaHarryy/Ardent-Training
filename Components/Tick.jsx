import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tick = (chapterIndex, lessonIndex) => (
  <TouchableOpacity
    onPress={() =>
      toggleCompletion(
        chapterIndex,
        lessonIndex,
        !courseData?.chapters?.[chapterIndex]?.lessons?.[lessonIndex]?.isCompleted
      )
    }
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

export default Tick;