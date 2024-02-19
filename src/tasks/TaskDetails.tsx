import React, { useEffect, useState } from 'react'
import { globalStyles } from '../styles/globalStyles'
import SectionComponent from '../components/SectionComponent'
import TextComponent from '../components/TextComponent'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import RowComponent from '../components/RowComponent'
import { AddSquare, ArrowLeft2, CalendarEdit, Clock, DocumentUpload, TickCircle } from 'iconsax-react-native'
import { colors } from '../constants/colors'
import firestore from '@react-native-firebase/firestore'
import { TaskModel } from '../models/TaskModel'
import TitleComponent from '../components/TitleComponent'
import SpaceComponent from '../components/SpaceComponent'
import AvatarGroup from '../components/AvatarGroup'
import { HandleDateTime } from '../utils/handleDateTime'
import CardComponent from '../components/CardComponent'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { fontFamilies } from '../constants/fontFamilies'

const TaskDetails = ({ navigation, route }: any) => {

    // console.log(route)
    const { id, color }: { id: string, color?: string } = route.params
    const [taskDetail, setTaskDetail] = useState<TaskModel>()

    useEffect(() => {
        getTaskDetails()
    }, [])

    const getTaskDetails = () => {
        firestore().doc(`tasks/${id}`)
            .onSnapshot((snap: any) => {
                if (snap.exists) {
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
        <ScrollView style={[{ flex: 1, backgroundColor: colors.bgColor }]}>
            <SectionComponent
                color={color ?? 'rgba(113, 77, 217, 0.9)'}
                styles={{
                    backgroundColor: color ?? 'rgba(113, 77, 217, 0.9)',
                    paddingVertical: 20,
                    paddingTop: 32,
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20
                }}>
                <RowComponent styles={{ alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ArrowLeft2 size={28} color={colors.text} style={{ marginTop: -8, marginRight: 12 }} />
                    </TouchableOpacity>
                    <SpaceComponent width={12} />
                    <TitleComponent text={taskDetail.title} size={20} flex={1} styles={{ marginBottom: 0 }} />
                </RowComponent>
                <SpaceComponent height={30} />
                <TextComponent text='Due date' />
                <RowComponent styles={{justifyContent: 'space-between'}}>
                    <RowComponent
                        styles={{
                            flex: 1,
                            justifyContent: 'flex-start',
                        }}>
                        <Clock size={20} color={colors.white} />
                        <SpaceComponent width={4} />
                        {taskDetail.end && taskDetail.start && (
                            <TextComponent
                                flex={0}
                                text={`${HandleDateTime.GetHour(
                                    taskDetail.start?.toDate(),
                                )} - ${HandleDateTime.GetHour(taskDetail.end?.toDate())}`}
                            />
                        )}
                    </RowComponent>
                    <RowComponent styles={{ flex: 1 }} >
                        <CalendarEdit size={18} color={colors.text} />
                        <SpaceComponent width={8} />
                        <TextComponent text={HandleDateTime.DateString(taskDetail.dueDate?.toDate())} />
                    </RowComponent>
                    <RowComponent styles={{ flex: 1 }} justify='flex-end'>
                        <AvatarGroup uids={taskDetail.uids} />
                    </RowComponent>
                </RowComponent>
            </SectionComponent>
            <SectionComponent>
                <TitleComponent text='Description' size={20} />
                <CardComponent bgColor={colors.bgColor}
                    styles={{
                        borderWidth: 1,
                        borderColor: colors.gray,
                        borderRadius: 12,
                        marginTop: 12,
                    }}
                >
                    <TextComponent text={taskDetail.description} />
                </CardComponent>
            </SectionComponent>
            <SectionComponent>
                <CardComponent>
                    <RowComponent>
                        <TextComponent text='Files and Links' flex={0} />
                        <RowComponent styles={{ flex: 1 }}>
                            <Ionicons name='document-text' size={38} color='#0263D1' style={globalStyles.documentImg} />
                            <AntDesign name='pdffile1' size={34} color='#E5252A' style={globalStyles.documentImg} />
                            <MaterialCommunityIcons name='file-excel' size={38} color='#00733B' style={globalStyles.documentImg} />
                            <AntDesign name='addfile' size={32} color={colors.white} />
                        </RowComponent>
                    </RowComponent>
                </CardComponent>
            </SectionComponent>
            <SectionComponent>
                <RowComponent>
                    <View style={{
                        width: 24,
                        height: 24,
                        borderRadius: 100,
                        borderWidth: 2,
                        borderColor: colors.success,
                        marginRight: 4,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <View style={{
                            backgroundColor: colors.success,
                            width: 16,
                            height: 16,
                            borderRadius: 100,
                        }} />

                    </View>
                    <TextComponent flex={1} text='Progress' font={fontFamilies.medium} size={18} />
                </RowComponent>
                <SpaceComponent height={12} />
                <RowComponent>
                    <View style={{ flex: 1 }}>
                        <TextComponent text='slide' />
                    </View>
                    <TextComponent text='70%' flex={0} font={fontFamilies.bold} size={18} />
                </RowComponent>
            </SectionComponent>
            <SectionComponent>
                <RowComponent>
                    <TitleComponent flex={1} text='Sub tasks' size={20} />
                    <TouchableOpacity>
                        <AddSquare size={24} color={colors.success} variant='Bold' />
                    </TouchableOpacity>
                </RowComponent>
                <SpaceComponent height={12} />
                {Array.from({ length: 3 }).map((item, index) => (
                    <CardComponent key={`subtask${index}`} styles={{ marginBottom: 12 }}>
                        <RowComponent>
                            <TickCircle variant='Bold' color={colors.success} size={20} />
                            <SpaceComponent width={8} />
                            <TextComponent text='fafa' />
                        </RowComponent>

                    </CardComponent>
                ))}
            </SectionComponent>
        </ScrollView>
    ) : (
        <></>
    )
}

export default TaskDetails
