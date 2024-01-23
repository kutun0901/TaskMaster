import { View, Text } from 'react-native'
import React from 'react'
import Container from '../../components/Container'
import SectionComponent from '../../components/SectionComponent'
import TextComponent from '../../components/TextComponent'

const LogInScreen = () => {
  return (
    <Container>
        <SectionComponent>
            <TextComponent text='LogIn' />
        </SectionComponent>
    </Container>
  )
}

export default LogInScreen
