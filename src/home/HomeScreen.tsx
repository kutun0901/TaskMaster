import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
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
import firestore from '@react-native-firebase/firestore'
import { TaskModel } from '../models/TaskModel'

const HomeScreen = ({ navigation }: any) => {

  const user = auth().currentUser;
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState<TaskModel[]>([])

  useEffect(() => {
    getNewTasks();
  }, []);

  const getNewTasks = async () => {
    setIsLoading(true);

    await firestore()
    .collection('tasks')
    .orderBy('dueDate')
    .where('uids', 'array-contains', user?.uid)
    .limit(3)
    .onSnapshot(snap => {
      if (snap) {
        if (snap.empty) {
          console.log('tasks not found');
        } else {
          const items: TaskModel[] = [];
          snap.forEach((item: any) =>
            items.push({
              id: item.id,
              ...item.data(),
            })
          );
          setIsLoading(false);
          setTasks(items);
        }
      } else {
        console.log('Snapshot is null');
      }
    })
  }

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
        {
          isLoading ? <ActivityIndicator /> : tasks.length > 0 ? (
            <SectionComponent>
              <RowComponent styles={{ alignItems: 'flex-start' }}>
                <View style={{ flex: 1 }}>
                  {tasks[0] &&
                    (<CardImage onPress={() => navigation.navigate('TaskDetails', {
                      id: tasks[0].id,
                    })}>
                      <TouchableOpacity onPress={() => { }} style={globalStyles.iconContainer}>
                        <Edit2 size={20} color={colors.white} />
                      </TouchableOpacity>
                      <TitleComponent text={tasks[0].title} />
                      <TextComponent line={3} text={tasks[0].description} size={13} />
                      <View style={{ marginVertical: 28 }}>
                        <AvatarGroup uids={tasks[0].uids} />
                        {tasks[0].progress && (tasks[0].progress as number) >= 0 ? (
                          <ProgressBarComponent percent={`${Math.floor(tasks[0].progress * 100)}%`} color='#0AACFF' size='large' />
                        ) : null}
                      </View>
                      <TextComponent text={`Due ${new Date(tasks[0].dueDate.toDate())}`} size={12} color={colors.desc} />
                    </CardImage>)

                  }
                </View>
                <SpaceComponent width={16} />
                <View style={{ flex: 1 }}>
                  {tasks[1] && (
                    <CardImage onPress={() => navigation.navigate('TaskDetails', {
                      id: tasks[1].id,
                      color: 'rgba(33, 150, 243, 0.9)'
                    })}
                    color='rgba(33, 150, 243, 0.9)'>
                      <TouchableOpacity onPress={() => { }} style={globalStyles.iconContainer}>
                        <Edit2 size={20} color={colors.white} />
                      </TouchableOpacity>
                      <TitleComponent text={tasks[1].title} size={18} />
                      <TextComponent text={tasks[1].description} />
                      <AvatarGroup uids={tasks[1].uids} />
                      {tasks[1].progress && (tasks[1].progress as number) >= 0 ? (
                        <ProgressBarComponent percent={`${Math.floor(tasks[1].progress * 100)}%`} color='#A2F068' />
                      ): null}

                    </CardImage>
                  )}
                  <SpaceComponent height={16} />
                  {tasks[2] && (
                    <CardImage onPress={() => navigation.navigate('TaskDetails', {
                      id: tasks[2].id,
                      color: 'rgba(18, 181, 22, 0.9))'
                    })}
                    color='rgba(18, 181, 22, 0.9)'>
                      <TouchableOpacity onPress={() => { }} style={globalStyles.iconContainer}>
                        <Edit2 size={20} color={colors.white} />
                      </TouchableOpacity>
                      <TitleComponent text={tasks[2].title} />
                      <TextComponent text={tasks[2].description} size={13} />
                    </CardImage>
                  )}
                </View>
              </RowComponent>
            </SectionComponent>
          ) : <></>
        }

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
