import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import HomeScreen from './src/home/HomeScreen'

const App = () => {
  return (
    <>
      <StatusBar
        translucent
        barStyle={'light-content'}
        backgroundColor='transparent'
      />
      <HomeScreen />
    </>
  )
}

export default App
