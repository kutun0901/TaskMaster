import { View, Text, Button } from 'react-native'
import React, { useState } from 'react'
import Container from '../components/Container'
import TextComponent from '../components/TextComponent'
import { TaskModel } from '../models/TaskModel'
import SectionComponent from '../components/SectionComponent'
import InputComponent from '../components/InputComponent'
import DateTimeComponent from '../components/DateTimeComponent'
import RowComponent from '../components/RowComponent'
import SpaceComponent from '../components/SpaceComponent'
import DropDownPicker from '../components/DropDownPicker'

const initValues: TaskModel = {
    title: '',
    description: '',
    dueDate: new Date(),
    start: new Date(),
    end: new Date(),
    uids: [],
    fileUrls: []
}

const AddNewTask = ({ navigation }: any) => {

    const [taskDetail, setTaskDetail] = useState<TaskModel>(initValues)

    const handleChangeValue = (id: string, value: string | Date) => {
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

                <DateTimeComponent
                selected={taskDetail.dueDate}
                onSelect={val => handleChangeValue('dueDate', val)}
                placeholder='Choice'
                type='date'
                title='Due date'
                />

                <RowComponent>
                    <View style={{flex: 1}}>
                    <DateTimeComponent selected={taskDetail.start}
                    type='time'
                    onSelect={val => handleChangeValue("start", val)}
                    title='Start'
                    />
                    </View>
                    <SpaceComponent width={10}/>
                    <View style={{flex: 1}}>
                    <DateTimeComponent selected={taskDetail.end}
                    onSelect={val => handleChangeValue('end', val)}
                    title='End'
                    type='time'
                    />
                    </View>
                </RowComponent>
            </SectionComponent>

            <DropDownPicker selected={taskDetail.uids} items={[]}
            onSelect={(val) => console.log(val) }
            multiple
            title='Members' />

            <SectionComponent>
                <Button title='Save' onPress={handleAddNewTask} />
            </SectionComponent>
        </Container>
    );
};

export default AddNewTask
