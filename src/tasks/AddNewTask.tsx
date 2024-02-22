import { View, Text, Button, Platform, PermissionsAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import Container from '../components/Container'
// import TextComponent from '../components/TextComponent'
import { Attachment, TaskModel } from '../models/TaskModel'
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
import storage from '@react-native-firebase/storage'
import RNFetchBlob from "rn-fetch-blob";
import UploadFileComponent from '../components/UploadFileComponent'

const initValues: TaskModel = {
    title: '',
    description: '',
    dueDate: undefined,
    start: undefined,
    end: undefined,
    uids: [],
    attachments: []
}

const AddNewTask = ({ navigation }: any) => {

    const [taskDetail, setTaskDetail] = useState<TaskModel>(initValues)
    const [userSelect, setUserSelect] = useState<selectModel[]>([])
    const [attachments, setAttachments] = useState<Attachment[]>([])


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


    // const handleDocumentPicker = () => {
    //     DocumentPicker.pick({}).then(res => {
    //         // console.log(res)
    //         setAttachments(res)

    //         res.forEach(item => handleUploadFiletoStorage(item))
    //     })
    //         .catch(error => {
    //             console.log(error)
    //         })
    // }

    // handle permission access to upload file in android. ios doesn't require this step.
    useEffect(() => {
        if (Platform.OS === "android") {
            PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
            ])
        }
    }, [])


    // // handle uri to match accepted format in android
    // const getFilePath = async (file: DocumentPickerResponse) => {
    //     if (Platform.OS === 'ios') {
    //         return file.uri
    //     } else {
    //         return (await RNFetchBlob.fs.stat(file.uri)).path;
    //     }
    // }


    // const handleUploadFiletoStorage = async (item: DocumentPickerResponse) => {
    //     const fileName = item.name ?? `file${Date.now()}`;
    //     const path = `documents/${fileName}`
    //     const items = [...attachmentUrl]

    //     // console.log(item)
    //     const uri = await getFilePath(item)

    //     // upload file to storage
    //     await storage().ref(path).putFile(uri)

    //     // get the download link to store on local device after upload file
    //     await storage().ref(path).getDownloadURL().then(url => {
    //         items.push(url)
    //         setAttachmentUrl(items)

    //     }).catch(error => {
    //         console.log(error)
    //     })
    // }


    const handleAddNewTask = async () => {
        const data = {
            ...taskDetail,
            attachments
        }

        await firestore().collection('tasks').add(data).then(() => {
            console.log('New tasks added')
            navigation.goBack()
        }).catch(error => {
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
                    <RowComponent justify='flex-start'>
                        <TitleComponent text='Attachments' flex={0} />
                        <SpaceComponent width={8} />
                        <UploadFileComponent onUpload={file => file && setAttachments([...attachments, file])} />
                    </RowComponent>
                    {
                        attachments.length > 0 && attachments.map((item, index) => (
                            <RowComponent key={`attachment${index}`} styles={{ paddingVertical: 12 }}>
                                <TextComponent text={item.name ?? ''} />
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
