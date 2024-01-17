import { View, Text, StatusBar, SafeAreaView } from 'react-native'
import React from 'react'
import HomeScreen from './src/home/HomeScreen'

const App = () => {
  return (
    <>
      {/* <StatusBar
        translucent
        barStyle={'light-content'}
        backgroundColor='transparent'
      /> */}
      <SafeAreaView style={{ flex: 1 }}>
        <HomeScreen />
      </SafeAreaView>
    </>

  )
}

export default App
