import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../home/HomeScreen';
import AddNewTask from '../tasks/AddNewTask';
import SearchScreen from '../SearchScreen';
import auth from '@react-native-firebase/auth';
import LogInScreen from '../screens/auth/LogInScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import TaskDetails from '../tasks/TaskDetails';
import ListTasks from '../tasks/ListTasks';
import Notifications from '../screens/Notifications';



const Router = () => {

  const Stack = createNativeStackNavigator();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      if (user){
        setIsLogin(true)
      } else {
        setIsLogin(false);
      }
    })
  }, [])

  const MainRouter = (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
      {/* The first page when open an app has to be on the top */}
      <Stack.Screen name='HomeScreen' component={HomeScreen} />
      <Stack.Screen name='AddNewTask' component={AddNewTask} />
      <Stack.Screen name='SearchScreen' component={SearchScreen} />
      <Stack.Screen name='TaskDetails' component={TaskDetails} />
      <Stack.Screen name='ListTasks' component={ListTasks} />
      <Stack.Screen name='Notifications' component={Notifications} />
    </Stack.Navigator>
  )

  const AuthRouter = (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen  name='LogInScreen' component={LogInScreen}/>
        <Stack.Screen  name='SignupScreen' component={SignupScreen}/>
      </Stack.Navigator>
  )

  return isLogin ?  MainRouter : AuthRouter;
}

export default Router
