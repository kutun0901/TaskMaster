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

interface Props {
    onUpload: (file: Attachment) => void
}

const UploadFileComponent = (props: Props) => {
    const { onUpload } = props

    const [file, setFile] = useState<DocumentPickerResponse>()
    const [isVisibleUploadModal, setIsVisibleUploadModal] = useState(false)
    const [progressUpload, setProgressUpload] = useState(0)


    useEffect(() => {
        file && handleUploadFiletoStorage()
    }, [])

    const handleUploadFiletoStorage = async () => {
        setIsVisibleUploadModal(true)

        console.log(file)
    }

    return (
        <>
            <TouchableOpacity onPress={() => DocumentPicker.pick({}).then(res => {
                setFile(res[0])
            })}>
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
                    // `${colors.gray}80` 80 is hex value. look it up color hex value instead of using rgba
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
                            text={`${file?.size} byte`}
                            flex={0}
                            />
                        </View>
                        <RowComponent>
                            <View style={{flex: 1, marginRight: 12}}>
                                <Slider
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
