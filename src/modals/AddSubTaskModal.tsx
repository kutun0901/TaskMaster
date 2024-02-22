import { View, Text, Modal, TouchableOpacity } from 'react-native'
import React from 'react'
import { globalStyles } from '../styles/globalStyles';
import RowComponent from '../components/RowComponent';
import TextComponent from '../components/TextComponent';
import ButtonComponent from '../components/ButtonComponent';
import { colors } from '../constants/colors';

interface Props {
    visible: boolean,
    subTask?: any,
    onClose: () => void
}

const AddSubTaskModal = (props: Props) => {
    const {visible, subTask, onClose} = props;

  return (
   <Modal visible={visible} style={[globalStyles.modalContainer]} transparent animationType='slide'>
        <View style={[globalStyles.modalContainer]}>
            <View style={[globalStyles.modalContent]}>

            <RowComponent>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity onPress={onClose}>
                        <TextComponent text='Close' flex={0} color={colors.bgColor}/>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1}}>
                    <ButtonComponent text='Save' onPress={onClose} />
                </View>
            </RowComponent>
            </View>
        </View>
   </Modal>
  )
}

export default AddSubTaskModal
