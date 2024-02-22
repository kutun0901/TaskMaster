import { View, Text, TouchableOpacityComponent, TouchableOpacity, Modal, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Attachment } from '../models/TaskModel'
import { DocumentUpload } from 'iconsax-react-native'
import { colors } from '../constants/colors'
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker'
import TextComponent from './TextComponent'
import { globalStyles } from '../styles/globalStyles'
import TitleComponent from './TitleComponent'
import SpaceComponent from './SpaceComponent'
import RowComponent from './RowComponent'
import { Slider } from '@miblanchard/react-native-slider'
import { calcFileSize } from '../utils/calculateFileSize'
import storage from '@react-native-firebase/storage'

interface Props {
    onUpload: (file: Attachment) => void
}

const UploadFileComponent = (props: Props) => {
    const { onUpload } = props

    const [file, setFile] = useState<DocumentPickerResponse>()
    const [isVisibleUploadModal, setIsVisibleUploadModal] = useState(false)
    const [progressUpload, setProgressUpload] = useState(0)
    const [attachmentFile, setAttachMentFile] = useState<Attachment>()


    useEffect(() => {
        file && handleUploadFiletoStorage()
    }, [file])

    useEffect(() => {
        if (attachmentFile){
            onUpload(attachmentFile)
            setIsVisibleUploadModal(false)
            setProgressUpload(0);
            setAttachMentFile(undefined)
        }
    }, [attachmentFile])

    const handleUploadFiletoStorage =  () => {
        if (file) {
            setIsVisibleUploadModal(true)

            const path = `/documents/${file.name}`;

            const res = storage().ref(path).putFile(file.uri)

            res.on('state_changed', task => {
                setProgressUpload(task.bytesTransferred/task.totalBytes)
            })

            res.then(() => {
                storage().ref(path).getDownloadURL().then(url => {
                    const data: Attachment = {
                        name: file.name ?? "",
                        url,
                        size: file.size ?? 0
                    }
                    setAttachMentFile(data)
                })
            })

            res.catch(error => console.log(error.message))

        }

    }

    return (
        <>
            <TouchableOpacity onPress={() => DocumentPicker.pick({
                allowMultiSelection: false,
                type: ['application/pdf', DocumentPicker.types.docx, DocumentPicker.types.pdf]
            }).then(res => {
                setFile(res[0])
            }).catch(error => console.log(error))}>
                <DocumentUpload size={24} color={colors.white} />
            </TouchableOpacity>
            <Modal visible={isVisibleUploadModal}
                statusBarTranslucent
                transparent
                animationType='slide'
                style={{ flex: 1 }}
            >
                <View style={[globalStyles.container,
                {
                    // `${colors.gray}80` 80 is hex opacity value. look it up color hex value instead of using rgba
                    backgroundColor: `${colors.gray}80`,
                    justifyContent: 'center',
                    alignItems: 'center'
                }]}>
                    <View style={{
                        // 0.8 mean make it 80% width
                        width: Dimensions.get('window').width * 0.8,
                        height: 'auto',
                        padding: 12,
                        backgroundColor: colors.white,
                        borderRadius: 12
                    }}>
                        <TitleComponent color={colors.bgColor} text='Uploading' flex={0} />
                        <SpaceComponent height={12}/>
                        <View>
                            <TextComponent color={colors.bgColor}
                            text={file?.name ?? ''}
                            flex={0}
                            />
                            <TextComponent color={colors.gray2}
                            text={`${calcFileSize(file?.size as number)}`}
                            size={12}
                            flex={0}
                            />
                        </View>
                        <RowComponent>
                            <View style={{flex: 1, marginRight: 12}}>
                                <Slider
                                disabled
                                value={progressUpload}
                                renderThumbComponent={() => null}
                                trackStyle={{
                                    height: 6,
                                    borderRadius: 100
                                }}
                                maximumTrackTintColor={colors.success}
                                minimumTrackTintColor={colors.desc}
                                />
                                <TextComponent text={`${Math.floor(progressUpload * 100)}%`}
                                color={colors.bgColor}
                                flex={0}
                                />
                            </View>
                        </RowComponent>
                    </View>

                </View>
            </Modal>
        </>
    )
}

export default UploadFileComponent
