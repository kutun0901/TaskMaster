import { View, Text } from 'react-native'
import React, { useState } from 'react'
import Container from '../components/Container'
import TextComponent from '../components/TextComponent'
import { TaskModel } from '../models/TaskModel'
import SectionComponent from '../components/SectionComponent'
import InputComponent from '../components/InputComponent'

const initValues: TaskModel = {
    title: '',
    description: '',
    dueDate: '',
    start: '',
    end: '',
    uids: [],
    fileUrls: []
}

const AddNewTask = ({ navigation }: any) => {
    const [taskDetail, setTaskDetail] = useState<TaskModel>(initValues)

    const handleChangeValue = (id: string, value: string) => {
        const item: any = {...taskDetail};

        item[`${id}`] = value;

        setTaskDetail(item);
    }

    return (
        <Container back title='Add new task'>
            <SectionComponent>
                <InputComponent
                value={taskDetail.title}
                onChange={val => handleChangeValue('title', val)}
                title='Title'
                allowClear
                placeHolder='Task title'
                />

            </SectionComponent>
        </Container>
    )
}

export default AddNewTask
