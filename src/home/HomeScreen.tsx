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
import { Element4, Notification, SearchNormal1 } from 'iconsax-react-native'
import { colors } from '../constants/colors'
import TagComponent from '../components/TagComponent'
import SpaceComponent from '../components/SpaceComponent'
// import IonIcons from 'react-native-vector-icons/Ionicons'

const HomeScreen = () => {
  return (
    <Container>
      <SectionComponent>
        <RowComponent justify='space-between'>
          <Element4 size={24} color={colors.desc}/ >
          <Notification size={24} color={colors.desc} />

          {/* <IonIcons name='notifications' size={24} color={colors.desc}/> */}
        </RowComponent>
      </SectionComponent>
      <SectionComponent>
        <TextComponent text='Hi, Jason'/>
        <TitleComponent text='Be productive today'/>
      </SectionComponent>
      <SectionComponent>
        <RowComponent styles={[globalStyles.inputContainer]} onPress={() => console.log("hiiii")}>
          <TextComponent color='#696B6F' text='Search Task'/>
          <SearchNormal1 size={20} color={colors.desc} />
        </RowComponent>
      </SectionComponent>
      <SectionComponent>
        <CardComponent>
          <RowComponent>
            <View style={{flex: 1}}>
              <TitleComponent text='Task Progress' />
              <TextComponent text='20/40 tasks done'/>
              <SpaceComponent height={7}/>
              <RowComponent justify='flex-start'>
              <TagComponent text='fafa' />
              </RowComponent>
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
