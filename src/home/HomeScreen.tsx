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
import { Add, AlignBottom, Card, Edit2, Element4, Logout, Notification, SearchNormal1 } from 'iconsax-react-native'
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
import { monthNames } from '../constants/appInfos'
import { add0ToNumber } from '../utils/add0ToNumber'

const date = new Date()

const HomeScreen = ({ navigation }: any) => {

  const user = auth().currentUser;
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState<TaskModel[]>([])
  const [urgentTask, setUrgentTask] = useState<TaskModel[]>([])

  useEffect(() => {
    getTasks();
  }, []);

  useEffect(() => {
    if (tasks.length) {
      const items = tasks.filter(element => element.isUrgent)

      setUrgentTask(items)
    }
  }, [tasks])

  const getTasks = async () => {
    setIsLoading(true);

    await firestore()
      .collection('tasks')
      .where('uids', 'array-contains', user?.uid)
      .onSnapshot(snap => {

        // if the onSnapshot event listener is being triggered before the initial snapshot
        // has been received from Firestore. To handle this situation, you can check if snap is not null
        // before accessing its properties.

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
            setTasks(items.sort((a, b) => b.createdAt - a.createdAt));
          }
          setIsLoading(false);
        }

      })
  }

  const handleMoveToTaskDetail = (id?: string, color?: string) =>
    navigation.navigate('TaskDetails', {
      id,
      color,
    });

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
          <RowComponent styles={[globalStyles.inputContainer]} onPress={() => navigation.navigate('ListTasks', {
                tasks: tasks
              })}>
            <TextComponent color='#696B6F' text='Search Task' />
            <SearchNormal1 size={20} color={colors.desc} />
          </RowComponent>
        </SectionComponent>
        <SectionComponent>
          <CardComponent onPress={() => navigation.navigate('ListTasks', {
                tasks: tasks
              })}>
            <RowComponent>
              <View style={{ flex: 1 }}>
                <TitleComponent text='Task Progress' />
                <TextComponent text={`${tasks.filter(element => element.progress && element.progress === 1).length}/${tasks.length}`} />
                <SpaceComponent height={7} />
                <RowComponent justify='flex-start'>
                  <TagComponent text={`${monthNames[date.getMonth()]} ${add0ToNumber(date.getDate())}`} />
                </RowComponent>
              </View>
              <View>
                <CircularComponent value={Math.floor((tasks.filter(element => element.progress && element.progress === 1).length/tasks.length) * 100)} />
              </View>
            </RowComponent>
          </CardComponent>
        </SectionComponent>
        {
          isLoading ? <ActivityIndicator /> : tasks.length > 0 ? (
            <SectionComponent>
              <RowComponent onPress={() => navigation.navigate('ListTasks', {
                tasks: tasks
              })}
              justify='flex-end' styles={{
                  marginBottom: 16,
              }}>
                <TextComponent size={16}
                text='See all' flex={0}/>
                </RowComponent>
              <RowComponent styles={{ alignItems: 'flex-start' }}>
                <View style={{ flex: 1 }}>
                  {tasks[0] &&
                    (<CardImage onPress={() => handleMoveToTaskDetail(tasks[0].id as string)}>
                      <TouchableOpacity onPress={() => navigation.navigate('AddNewTask', {
                        editable: true,
                        task: tasks[0]
                      })} style={globalStyles.iconContainer}>
                        <Edit2 size={20} color={colors.white} />
                      </TouchableOpacity>
                      <TitleComponent text={tasks[0].title} />
                      <TextComponent line={3} text={tasks[0].description} size={13} />
                      <View style={{ marginVertical: 28 }}>
                        <AvatarGroup uids={tasks[0].uids} />
                        {tasks[0].progress || tasks[0].progress === 0 ? (
                          <ProgressBarComponent percent={`${Math.floor(tasks[0].progress * 100)}%`} color='#0AACFF' size='large' />
                        ) : <></>}
                      </View>
                      <TextComponent text={`Due ${tasks[0]?.dueDate?.toDate() ? new Date(tasks[0].dueDate.toDate()) : 'Unknown'}`}
                        size={12} color={colors.desc} />
                    </CardImage>)
                  }
                </View>
                <SpaceComponent width={16} />
                <View style={{ flex: 1 }}>
                  {tasks[1] && (
                    <CardImage onPress={() => handleMoveToTaskDetail(tasks[1].id as string,'rgba(33, 150, 243, 0.9)')}
                      color='rgba(33, 150, 243, 0.9)'>
                      <TouchableOpacity onPress={() => navigation.navigate('AddNewTask', {
                        editable: true,
                        task: tasks[1]
                      })} style={globalStyles.iconContainer}>
                        <Edit2 size={20} color={colors.white} />
                      </TouchableOpacity>
                      <TitleComponent text={tasks[1].title} size={18} />
                      <TextComponent text={tasks[1].description} line={3} />
                      <AvatarGroup uids={tasks[1].uids} />
                      {tasks[1].progress || tasks[1].progress === 0 ? (
                        <ProgressBarComponent percent={`${Math.floor(tasks[1].progress * 100)}%`} color='#A2F068' />
                      ) : <></>}

                    </CardImage>
                  )}
                  <SpaceComponent height={16} />
                  {tasks[2] && (
                    <CardImage onPress={() => handleMoveToTaskDetail(tasks[2].id as string, 'rgba(18, 181, 22, 0.9))')}
                      color='rgba(18, 181, 22, 0.9)'>
                      <TouchableOpacity onPress={() => navigation.navigate('AddNewTask', {
                        editable: true,
                        task: tasks[2]
                      })} style={globalStyles.iconContainer}>
                        <Edit2 size={20} color={colors.white} />
                      </TouchableOpacity>
                      <TitleComponent text={tasks[2].title} />
                      <TextComponent text={tasks[2].description} size={13} line={3} />
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
          {urgentTask.length > 0 && urgentTask.map(item => (
            <CardComponent key={item.id} onPress={() => handleMoveToTaskDetail(item.id as string)}>
              <RowComponent>
                <CircularComponent value={item.progress ? item.progress * 100 : 0} radius={40} />
                <View style={{
                  flex: 1,
                  justifyContent: 'center',
                  paddingLeft: 16,
                }}>
                  <TextComponent text={item.title} />
                </View>
              </RowComponent>
            </CardComponent>
          ))}

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
          onPress={() => navigation.navigate('AddNewTask', {
            editable: false,
            task: undefined,
          })}
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
