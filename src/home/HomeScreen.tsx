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
import { Add, Card, Edit2, Element4, Logout, Notification, SearchNormal1 } from 'iconsax-react-native'
import { colors } from '../constants/colors'
import TagComponent from '../components/TagComponent'
import SpaceComponent from '../components/SpaceComponent'
import CircularComponent from '../components/CircularComponent'
import CardImage from '../components/CardImage'
import AvatarGroup from '../components/AvatarGroup'
import ProgressBarComponent from '../components/ProgressBarComponent'
// import IonIcons from 'react-native-vector-icons/Ionicons'
import auth from '@react-native-firebase/auth'

const HomeScreen = ({ navigation }: any) => {

  const user = auth().currentUser;

  return (
    <View style={{ flex: 1 }}>

      <Container isScroll>
        <SectionComponent>
          <RowComponent justify='space-between'>
            <Element4 size={24} color={colors.desc} />
            <Notification size={24} color={colors.desc} />

            {/* <IonIcons name='notifications' size={24} color={colors.desc}/> */}
          </RowComponent>
        </SectionComponent>
        <SectionComponent>
          <RowComponent>
            <View style={{ flex: 1 }}>
              <TextComponent text={`Hi, ${user?.email}`} />
              <TitleComponent text='Be productive today' />
            </View>
            <TouchableOpacity onPress={async () => auth().signOut()}>
              <Logout size={22} color='coral' />
            </TouchableOpacity>
          </RowComponent>

        </SectionComponent>
        <SectionComponent>
          <RowComponent styles={[globalStyles.inputContainer]} onPress={() => navigation.navigate('SearchScreen')}>
            <TextComponent color='#696B6F' text='Search Task' />
            <SearchNormal1 size={20} color={colors.desc} />
          </RowComponent>
        </SectionComponent>
        <SectionComponent>
          <CardComponent>
            <RowComponent>
              <View style={{ flex: 1 }}>
                <TitleComponent text='Task Progress' />
                <TextComponent text='20/40 tasks done' />
                <SpaceComponent height={7} />
                <RowComponent justify='flex-start'>
                  <TagComponent text='March 12' onPress={() => console.log("hiii")} />
                </RowComponent>
              </View>
              <View>
                <CircularComponent value={20} />
              </View>
            </RowComponent>
          </CardComponent>
        </SectionComponent>
        <SectionComponent>
          <RowComponent styles={{ alignItems: 'flex-start' }}>
            <View style={{ flex: 1 }}>
              <CardImage>
                <TouchableOpacity onPress={() => { }} style={globalStyles.iconContainer}>
                  <Edit2 size={20} color={colors.white} />
                </TouchableOpacity>
                <TitleComponent text='UX Design' />
                <TextComponent text='Task management mobile app' size={13} />
                <View style={{ marginVertical: 28 }}>
                  <AvatarGroup />
                  <ProgressBarComponent percent="70%" color='#0AACFF' size='large' />
                </View>
                <TextComponent text='Due 2023 March 22' size={12} color={colors.desc} />
              </CardImage>
            </View>
            <SpaceComponent width={16} />
            <View style={{ flex: 1 }}>

              <CardImage color='rgba(33, 150, 243, 0.9)'>
                <TouchableOpacity onPress={() => { }} style={globalStyles.iconContainer}>
                  <Edit2 size={20} color={colors.white} />
                </TouchableOpacity>
                <TitleComponent text='API payment' size={18} />
                <TextComponent text='' />
                <AvatarGroup />
                <ProgressBarComponent percent="40%" color='#A2F068' />

              </CardImage>
              <SpaceComponent height={16} />
              <CardImage color='rgba(18, 181, 22, 0.9)'>
                <TouchableOpacity onPress={() => { }} style={globalStyles.iconContainer}>
                  <Edit2 size={20} color={colors.white} />
                </TouchableOpacity>
                <TitleComponent text='Update work' />
                <TextComponent text='Revision homepage' size={13} />
              </CardImage>
            </View>
          </RowComponent>
        </SectionComponent>
        <SpaceComponent height={16} />
        <SectionComponent>
          <TitleComponent text='Urgent tasks' />
          <CardComponent>
            <RowComponent>
              <CircularComponent value={40} radius={40} />
              <View style={{
                flex: 1,
                justifyContent: 'center',
                paddingLeft: 16,
              }}>
                <TextComponent text='Report UI/UX' />
              </View>
            </RowComponent>
          </CardComponent>
        </SectionComponent>
      </Container>
      <View style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigation.navigate('AddNewTask')}
          style={[globalStyles.row, {
            backgroundColor: colors.blue,
            padding: 10,
            borderRadius: 12,
            paddingVertical: 14,
            width: '80%',

          }]}>
          <TextComponent text='Add new task' flex={0} />
          <Add size={22} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default HomeScreen
