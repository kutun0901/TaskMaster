import { View, Text, StatusBar, SafeAreaView } from 'react-native'
import React from 'react'
import HomeScreen from './src/home/HomeScreen'

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        translucent
        barStyle={'light-content'}
        backgroundColor='transparent'
      />
      <HomeScreen />
    </SafeAreaView>
  )
}

export default App
