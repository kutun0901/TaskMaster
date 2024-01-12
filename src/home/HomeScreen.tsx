import { View, Text } from 'react-native'
import React from 'react'
import Container from '../components/Container'
import { globalStyles } from '../styles/globalStyles'
import RowComponent from '../components/RowComponent'
import TextComponent from '../components/TextComponent'
import SectionComponent from '../components/SectionComponent'

const HomeScreen = () => {
  return (
    <Container>
      <SectionComponent>
        <RowComponent justify='space-between'>
          <TextComponent text='Hello' />
          <TextComponent text='Hi' />
        </RowComponent>
      </SectionComponent>
    </Container>
  )
}

export default HomeScreen
