import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { WebView } from 'react-native-webview';

export default function FeedbackScreen() {
  return (
    <View>
     
     <WebView
  source={{ uri: 'https://storage.googleapis.com/staging-ard/lesson/1/html/index.html' }}
  style={{ flex: 1 }}
  javaScriptEnabled={true}
  domStorageEnabled={true}
  allowsFullscreenVideo={true}
  mixedContentMode="always"  // Allow mixed content
/>
    </View>
  )
}

const styles = StyleSheet.create({
  webViewContainer: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 20,
  },
})