import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Container from '../components/Container'
import { globalStyles } from '../styles/globalStyles'
import RowComponent from '../components/RowComponent'
import TextComponent from '../components/TextComponent'
import SectionComponent from '../components/SectionComponent'
import { fontFamilies } from '../constants/fontFamilies'
import TitleComponent from '../components/TitleComponent'
import CardComponent from '../components/CardComponent'

const HomeScreen = () => {
  return (
    <Container>
      <SectionComponent>
        <RowComponent justify='space-between'>
          <TextComponent text='Hello'/>
          <TextComponent text='Hi' />
        </RowComponent>
      </SectionComponent>
      <SectionComponent>
        <TextComponent text='Hi, Jason'/>
        <TitleComponent text='Be productive today'/>
      </SectionComponent>
      <SectionComponent>
        <RowComponent styles={[globalStyles.inputContainer]} onPress={() => console.log("hiiii")}>
          <TextComponent text='Search'/>
        </RowComponent>
      </SectionComponent>
      <SectionComponent>
        <CardComponent>
          <RowComponent>
            <View style={{flex: 1}}>
              <TitleComponent text='Task Progress' />
              <TextComponent text='20/40 tasks done'/>
              <TextComponent text='tag' />
            </View>
            <View>
              <TextComponent text='Circle' />
            </View>
          </RowComponent>
        </CardComponent>
      </SectionComponent>
    </Container>
  )
}

export default HomeScreen
