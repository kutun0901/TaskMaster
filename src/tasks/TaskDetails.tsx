import React, { useEffect, useState } from 'react'
import { globalStyles } from '../styles/globalStyles'
import SectionComponent from '../components/SectionComponent'
import TextComponent from '../components/TextComponent'
import { ScrollView, TouchableOpacity } from 'react-native'
import RowComponent from '../components/RowComponent'
import { ArrowLeft2, CalendarEdit, Clock } from 'iconsax-react-native'
import { colors } from '../constants/colors'
import firestore from '@react-native-firebase/firestore'
import { TaskModel } from '../models/TaskModel'
import TitleComponent from '../components/TitleComponent'
import SpaceComponent from '../components/SpaceComponent'
import AvatarGroup from '../components/AvatarGroup'

const TaskDetails = ({ navigation, route }: any) => {

    // console.log(route)
    const { id, color }: { id: string, color?: string } = route.params
    const [taskDetail, setTaskDetail] = useState<TaskModel>()

    useEffect(() => {
        getTaskDetails()
    }, [])

    const getTaskDetails = () => {
        firestore().doc(`tasks/${id}`)
        .onSnapshot((snap : any) => {
            if (snap.exists){
                setTaskDetail({
                    id,
                    ...snap.data(),
                })
            } else {
                console.log('Task detail not found')
            }
        })

    }
    console.log(taskDetail)

    return taskDetail ? (
        <ScrollView style={[{flex: 1}]}>
            <SectionComponent styles={{
                backgroundColor: color ?? 'rgba(113, 77, 217, 0.9)',
                paddingVertical: 20,
                paddingTop: 32
            }}>
            <RowComponent>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ArrowLeft2 size={28} color={colors.text}/>
                </TouchableOpacity>
                <SpaceComponent width={12}/>
                <TitleComponent text={taskDetail.title} size={20} flex={1} styles={{marginBottom: 0}}/>
            </RowComponent>
            <SpaceComponent height={30} />
            <TextComponent text='Due date'/>
            <RowComponent styles={{marginTop: 12}}>
                <RowComponent styles={{flex: 1}} >
                    <Clock size={18} color={colors.text}/>
                    <SpaceComponent width={8} />
                    <TextComponent text='10am - 8pm'/>
                </RowComponent>
                <RowComponent styles={{flex: 1}} >
                    <CalendarEdit size={18} color={colors.text}/>
                    <SpaceComponent width={8} />
                    <TextComponent text='May 29th'/>
                </RowComponent>
                <RowComponent styles={{flex: 1}} justify='flex-end'>
                    <AvatarGroup uids={taskDetail.uids} />
                </RowComponent>
            </RowComponent>
            </SectionComponent>
        </ScrollView>
    ) : (
        <></>
    )
}

export default TaskDetails
