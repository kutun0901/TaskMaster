import { View, Text, Button } from 'react-native'
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
        const item: any = { ...taskDetail };

        item[`${id}`] = value;

        setTaskDetail(item);
    }

    const handleAddNewTask = async () => {
        console.log(taskDetail)
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

                <InputComponent
                    value={taskDetail.description}
                    onChange={val => handleChangeValue('description', val)}
                    title='Description'
                    allowClear
                    placeHolder='content'
                    multiple
                    numberOfLine={3}
                />
            </SectionComponent>
            <SectionComponent>
                <Button title='Save' onPress={handleAddNewTask} />
            </SectionComponent>
        </Container>
    )
}

export default AddNewTask
