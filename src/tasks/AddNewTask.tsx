import { View, Text, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import Container from '../components/Container'
// import TextComponent from '../components/TextComponent'
import { TaskModel } from '../models/TaskModel'
import SectionComponent from '../components/SectionComponent'
import InputComponent from '../components/InputComponent'
import DateTimeComponent from '../components/DateTimeComponent'
import RowComponent from '../components/RowComponent'
import SpaceComponent from '../components/SpaceComponent'
import DropDownPicker from '../components/DropDownPicker'
import { selectModel } from '../models/SelectModel'
import firestore from '@react-native-firebase/firestore'
import ButtonComponent from '../components/ButtonComponent'
import TitleComponent from '../components/TitleComponent'
import { AttachSquare } from 'iconsax-react-native'
import { colors } from '../constants/colors'
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker'
import TextComponent from '../components/TextComponent'

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
    const [userSelect, setUserSelect] = useState<selectModel[]>([])
    const [attachments, setAttachments] = useState<DocumentPickerResponse[]>([])

    useEffect(() => {
        handleGetAllUsers()
    }, [])

    // Handle getting data from firestore
    const handleGetAllUsers = async () => {
        try {
            const snapshot = await firestore().collection('users').get();

            if (snapshot.empty) {
                console.log('User data not found');
            } else {
                const items: selectModel[] = [];

                snapshot.forEach((item) => {
                    items.push({
                        label: item.data().name,
                        value: item.id,
                    });
                });

                setUserSelect(items);
            }
        } catch (error: any) {
            console.error(`Cannot get user data: ${error.message}`);
        }
    };

    const handleChangeValue = (id: string, value: string | string[] | Date) => {
        const item: any = { ...taskDetail };

        item[`${id}`] = value;

        setTaskDetail(item);
    }

    const handleAddNewTask = async () => {
        console.log(taskDetail)
    }

    const handleDocumentPicker = () => {
        DocumentPicker.pick({}).then(res => {
            setAttachments(res)
        })
        .catch(error => {
            console.log(error)
        })
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
                    <View style={{ flex: 1 }}>
                        <DateTimeComponent selected={taskDetail.start}
                            type='time'
                            onSelect={val => handleChangeValue("start", val)}
                            title='Start'
                        />
                    </View>
                    <SpaceComponent width={10} />
                    <View style={{ flex: 1 }}>
                        <DateTimeComponent selected={taskDetail.end}
                            onSelect={val => handleChangeValue('end', val)}
                            title='End'
                            type='time'
                        />
                    </View>
                </RowComponent>

                <DropDownPicker
                    selected={taskDetail.uids}
                    items={userSelect}
                    onSelect={(val) => handleChangeValue('uids', val)}
                    multiple
                    title='Members' />

                <View>
                    <RowComponent justify='flex-start' onPress={handleDocumentPicker}>
                        <TitleComponent text='Attachments' flex={0} />
                        <SpaceComponent width={8}/>
                        <AttachSquare size={20} color={colors.white}/>
                    </RowComponent>
                    {
                        attachments.length > 0 && attachments.map((item, index) => (
                            <RowComponent key={`attachment${index}`} styles={{paddingVertical: 12}}>
                                <TextComponent text={item.name ?? ''}/>
                            </RowComponent>
                        ))
                    }
                </View>
            </SectionComponent>


            <SectionComponent>
                <ButtonComponent text='Save' onPress={handleAddNewTask} />
            </SectionComponent>
        </Container>
    );
};

export default AddNewTask
