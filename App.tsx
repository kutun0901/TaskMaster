import { View, Text, StatusBar, SafeAreaView } from 'react-native'
import React from 'react'
import HomeScreen from './src/home/HomeScreen'
import { colors } from './src/constants/colors'
import { NavigationContainer } from '@react-navigation/native'
import Router from './src/routers/Router'
import linking from './linking'

const App = () => {
  return (
    <>

        {/* <StatusBar
          // translucent
          barStyle={'light-content'}
          backgroundColor={colors.bgColor}
        /> */}
        <NavigationContainer linking={linking} >
          <Router />
        </NavigationContainer>

    </>

  )
}

export default App
