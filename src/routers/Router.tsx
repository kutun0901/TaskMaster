import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../home/HomeScreen';
import AddNewTask from '../tasks/AddNewTask';

const Router = () => {

    const Stack = createNativeStackNavigator();
    return (
    <Stack.Navigator
    screenOptions={{
        headerShown: false
    }}>
        {/* The first page when open an app has to be on the top */}
       <Stack.Screen name='HomeScreen' component={HomeScreen}/>
       <Stack.Screen name='AddNewTask' component={AddNewTask}/>
    </Stack.Navigator>
  )
}

export default Router
