import { View, Text, Modal, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { globalStyles } from '../styles/globalStyles';
import RowComponent from '../components/RowComponent';
import TextComponent from '../components/TextComponent';
import ButtonComponent from '../components/ButtonComponent';
import { colors } from '../constants/colors';
import TitleComponent from '../components/TitleComponent';
import InputComponent from '../components/InputComponent';
import firestore from '@react-native-firebase/firestore'

interface Props {
    visible: boolean,
    subTask?: any,
    onClose: () => void,
    taskId: string
}

const initValue = {
    title: "",
    description: "",
    isComplete: false
}

const AddSubTaskModal = (props: Props) => {
    const { visible, subTask, onClose, taskId } = props;
    const [subTaskForm, setSubTaskForm] = useState(initValue);
    const [isLoading, setIsLoading] = useState(false)

    // const handleChangeValue = (key: string, value: string) => {
    //     const data: any = [...subTask];

    //     data[`${key}`] = value;

    //     setSubTaskForm(data)
    // }

    const handleCloseModal = () => {
        setSubTaskForm(initValue);
        onClose();
    }

    const handleSavetoDataBase = async () => {
        const data = {
            ...subTaskForm,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            taskId
        }

        setIsLoading(true)
        try {
            await firestore().collection('subTasks').add(data)
            setIsLoading(false)
            handleCloseModal()

        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }

    return (
        <Modal visible={visible} style={[globalStyles.modalContainer]} transparent animationType='slide'>
            <View style={[globalStyles.modalContainer]}>
                <View style={[globalStyles.modalContent, {
                    backgroundColor: colors.bgColor
                }]}>
                    <TitleComponent text='Add New Subtask' />
                    <View style={{ paddingVertical: 16 }}>
                        <InputComponent title='Title' placeHolder='Title' value={subTaskForm.title}
                            onChange={val => setSubTaskForm({ ...subTaskForm, title: val })}
                            allowClear
                        />
                        <InputComponent title='Description' placeHolder='Description' value={subTaskForm.description}
                            onChange={val => setSubTaskForm({ ...subTaskForm, description: val })}
                            multiple
                            allowClear
                            numberOfLine={3}
                        />
                    </View>
                    <RowComponent>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity onPress={handleCloseModal}>
                                <TextComponent text='Close' flex={0} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1 }}>
                            <ButtonComponent isLoading={isLoading} text='Save' onPress={handleSavetoDataBase} />
                        </View>
                    </RowComponent>
                </View>
            </View>
        </Modal>
    )
}

export default AddSubTaskModal
