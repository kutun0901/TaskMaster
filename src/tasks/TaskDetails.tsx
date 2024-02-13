import { View, Text } from 'react-native'
import React from 'react'
import Container from '../components/Container'

const TaskDetails = ({navigation, route}: any) => {

    // console.log(route)
    const {id, color} : {id: string, color?: string} = route.params

  return (
    <Container back>
      <Text>TaskDetails</Text>
    </Container>
  )
}

export default TaskDetails
