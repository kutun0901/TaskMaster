import { View, Text } from 'react-native'
import React from 'react'

const ListTasks = ({navigation, route}: any) => {

    const tasks = route.params;

  return (
    <View>
      <Text>ListTasks</Text>
    </View>
  )
}

export default ListTasks
