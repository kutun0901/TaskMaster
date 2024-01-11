import { View, Text } from 'react-native'
import React from 'react'
import Container from '../components/Container'
import { globalStyles } from '../styles/globalStyles'
import RowComponent from '../components/RowComponent'

const HomeScreen = () => {
  return (
    <Container>
      <RowComponent justify='space-between'>
        <Text style={[globalStyles.text]}>AAAAAAA</Text>
        <Text style={[globalStyles.text]}>AAAAAAA</Text>
      </RowComponent>
    </Container>
  )
}

export default HomeScreen
