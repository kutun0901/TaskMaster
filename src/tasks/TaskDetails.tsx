import React, { useEffect, useState } from 'react'
import SectionComponent from '../components/SectionComponent'
import TextComponent from '../components/TextComponent'
import { Alert, ScrollView, TouchableOpacity, View } from 'react-native'
import RowComponent from '../components/RowComponent'
import { AddSquare, ArrowLeft2, CalendarEdit, Clock, TickCircle, TickSquare } from 'iconsax-react-native'
import { colors } from '../constants/colors'
import firestore from '@react-native-firebase/firestore'
import { Attachment, Subtask, TaskModel } from '../models/TaskModel'
import TitleComponent from '../components/TitleComponent'
import SpaceComponent from '../components/SpaceComponent'
import AvatarGroup from '../components/AvatarGroup'
import { HandleDateTime } from '../utils/handleDateTime'
import CardComponent from '../components/CardComponent'
import { fontFamilies } from '../constants/fontFamilies'
import { Slider } from '@miblanchard/react-native-slider'
import ButtonComponent from '../components/ButtonComponent'
import UploadFileComponent from '../components/UploadFileComponent'
import { calcFileSize } from '../utils/calculateFileSize'
import AddSubTaskModal from '../modals/AddSubTaskModal'

const TaskDetails = ({ navigation, route }: any) => {

    // console.log(route)
    const { id, color }: { id: string, color?: string } = route.params
    const [taskDetail, setTaskDetail] = useState<TaskModel>()
    const [progress, setProgress] = useState(0)
    const [attachments, setAttachments] = useState<Attachment[]>([])
    const [subTasks, setSubTasks] = useState<Subtask[]>([])
    const [isChanged, setIsChanged] = useState(false)
    const [isVisibleSubTaskModal, setIsVisibleSubTaskModal] = useState(false)
    const [isUrgent, setIsUrgent] = useState(false)

    useEffect(() => {
        getTaskDetails()
        getSubTasksById()
    }, [id])

    useEffect(() => {
        if (taskDetail) {
            setProgress(taskDetail.progress ?? 0)
            setAttachments(taskDetail.attachments)
            setIsUrgent(taskDetail.isUrgent);
        }
    }, [taskDetail])

    useEffect(() => {
        if (progress !== taskDetail?.progress || attachments?.length !== taskDetail.attachments?.length) {
            setIsChanged(true)
        } else {
            setIsChanged(false)
        }
    }, [progress, taskDetail, attachments])

    useEffect(() => {
        if (subTasks.length > 0) {
            const completedPercent = (subTasks.filter(item => item.isComplete)).length / subTasks.length

            setProgress(completedPercent)
        }
    }, [subTasks])

    const handleUpdateUrgentTask = () => {
        firestore().doc(`tasks/${id}`)
            .update({
                isUrgent: !isUrgent,
                updateAt: Date.now()
            })
    }

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

    // when using snapshot, no need to use async await because snapshot always listen to changes
    const getSubTasksById = () => {
        firestore().collection('subTasks').where('taskId', '==', id).onSnapshot(snap => {
            if (snap.empty) {
                console.log('Data not found')
            } else {
                const items: Subtask[] = [];
                snap.forEach((item: any) => {
                    items.push({
                        id: item.id,
                        ...item.data()
                    });
                })
                setSubTasks(items)
            }
        })
    }


    const handleUpdateTask = async () => {
        const data = { ...taskDetail, progress, attachments, updatedAt: Date.now() }

        await firestore()
            .doc(`tasks/${id}`)
            .update(data)
            .then(() => {
                Alert.alert('Task updated')
            }).catch(error => console.log(error))
    }

    const handleUpdateSubTask = (id: string, isComplete: boolean) => {
        try {
            firestore().doc(`subTasks/${id}`).update({ isComplete: !isComplete })
        } catch (error) {
            console.log(error)
        }
    }
    // console.log(taskDetail)
    // console.log(subTasks)

    const handleRemoveTask = () => {
        Alert.alert('Confirm', 'Are you sure you want to delete task?', [
            {
                text: 'Cancel',
                style: 'cancel',
                onPress: () => console.log('cancel')
            }, {
                text: 'Delete',
                style: 'destructive',
                onPress: async () => {
                    await firestore().doc(`tasks/${id}`)
                    .delete()
                    .then(() => {
                        navigation.goBack();
                    }).catch(error => {
                        console.log(error)
                    })
                }
            }
        ])
    }

    return taskDetail ? (
        <>
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
                        <TitleComponent line={1} text={taskDetail.title} size={20} flex={1} styles={{ marginBottom: 0 }} />
                    </RowComponent>
                    <SpaceComponent height={30} />
                    <TextComponent text='Due date' />
                    <RowComponent styles={{ justifyContent: 'space-between' }}>
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
                    <RowComponent onPress={handleUpdateUrgentTask}>
                        <TickSquare variant={isUrgent ? 'Bold' : 'Outline'} size={24} color={colors.white} />
                        <SpaceComponent width={8} />
                        <TextComponent text='Is Urgent' flex={1} font={fontFamilies.bold} size={18} />
                    </RowComponent>
                </SectionComponent>
                <SectionComponent>
                    {/* <CardComponent>
                    <RowComponent>
                        <TextComponent text='Files and Links' flex={0} />
                        <RowComponent styles={{ flex: 1 }}>
                            <Ionicons name='document-text' size={38} color='#0263D1' style={globalStyles.documentImg} />
                            <AntDesign name='pdffile1' size={34} color='#E5252A' style={globalStyles.documentImg} />
                            <MaterialCommunityIcons name='file-excel' size={38} color='#00733B' style={globalStyles.documentImg} />
                            <AntDesign name='addfile' size={32} color={colors.white} />
                        </RowComponent>
                    </RowComponent>
                </CardComponent> */}

                    <RowComponent>
                        <TitleComponent text='Files and Links' flex={1} />
                        <UploadFileComponent onUpload={file => file && setAttachments([...attachments, file])} />
                    </RowComponent>
                    {
                        attachments && (attachments.map((item, index) => (
                            <View style={{ justifyContent: 'flex-start', marginBottom: 8 }} key={`attachment${index}`}>
                                <TextComponent flex={0} text={item.name} />
                                <TextComponent flex={0} text={calcFileSize(item.size)} size={12} />
                            </View>
                        )))
                    }

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
                            <Slider value={progress}
                                disabled
                                onValueChange={val => setProgress(val[0])}
                                thumbTintColor={colors.success}
                                thumbStyle={{ borderWidth: 2, borderColor: colors.white }}
                                maximumTrackTintColor={colors.gray2}
                                minimumTrackTintColor={colors.success}
                                trackStyle={{ height: 10, borderRadius: 100 }}

                            />
                        </View>
                        <SpaceComponent width={20} />
                        <TextComponent text={`${Math.floor(progress * 100)}%`} flex={0} font={fontFamilies.bold} size={18} />
                    </RowComponent>
                </SectionComponent>
                <SectionComponent>
                    <RowComponent>
                        <TitleComponent flex={1} text='Sub tasks' size={20} />
                        <TouchableOpacity onPress={() => setIsVisibleSubTaskModal(true)}>
                            <AddSquare size={24} color={colors.success} variant='Bold' />
                        </TouchableOpacity>
                    </RowComponent>
                    <SpaceComponent height={12} />
                    {
                        subTasks.length > 0 &&
                        subTasks.map((item, index) => (
                            <CardComponent key={`subtask${index}`} styles={{ marginBottom: 12 }}>
                                <RowComponent onPress={() => handleUpdateSubTask(item.id, item.isComplete)}>
                                    <TickCircle variant={item.isComplete ? 'Bold' : 'Outline'} color={colors.success} size={20} />
                                    <View style={{ flex: 1, marginLeft: 12 }}>
                                        <TextComponent text={item.title} />
                                        <TextComponent size={12} color='#e0e0e0' text={HandleDateTime.DateString(new Date(item.createdAt))} />
                                    </View>
                                </RowComponent>

                            </CardComponent>
                        ))
                    }
                </SectionComponent>
                <SectionComponent>
                    <RowComponent onPress={handleRemoveTask}>
                        <TextComponent text='Delete task' color='red' flex={0} />
                    </RowComponent>
                </SectionComponent>
            </ScrollView>
            {
                isChanged && (<View style={{
                    position: 'absolute',
                    bottom: 20,
                    right: 20,
                    left: 20
                }}>
                    <ButtonComponent text='Update' onPress={handleUpdateTask} />
                </View>)
            }

            <AddSubTaskModal taskId={id} visible={isVisibleSubTaskModal} onClose={() => setIsVisibleSubTaskModal(false)} />
        </>
    ) : (
        <></>
    )
}

export default TaskDetails
