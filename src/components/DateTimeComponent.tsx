import { View, Text, Modal, Button } from 'react-native'
import React, { useState } from 'react'
import TitleComponent from './TitleComponent';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
import { colors } from '../constants/colors';
import { ArrowDown2 } from 'iconsax-react-native';
import { globalStyles } from '../styles/globalStyles';
import SpaceComponent from './SpaceComponent';
import DatePicker from 'react-native-date-picker';

interface Props {
    type?: 'date' | 'time' | 'datetime';
    title?: string;
    placeholder?: string;
    selected?: Date;
    onSelect: (val: Date) => Date
}

const DateTimeComponent = (props: Props) => {

    const { selected, onSelect, placeholder, title, type } = props

    const [isVisibleDateTimeModal, setIsVisibleDateTimeModal] = useState(false)

    const [date, setDate] = useState(selected ?? new Date())

    return (
        <>
            <View style={{ marginBottom: 16 }}>
                {title && <TitleComponent text={title} />}
                <RowComponent
                    styles={[globalStyles.inputContainer, { marginTop: title ? 8 : 0, paddingVertical: 16 }]}
                    onPress={() => setIsVisibleDateTimeModal(true)}
                >
                    <TextComponent
                        flex={1}
                        text={
                            selected
                                ? type === 'time'
                                    ? `${selected.getHours()}:${selected?.getMinutes()}`
                                    : `${selected.getMonth() + 1}/${selected.getDate()}/${selected.getFullYear()}`
                                : placeholder
                                    ? placeholder
                                    : ''
                        }
                        color={selected ? colors.text : '#676767'}
                    />

                    <ArrowDown2 size={20} color={colors.text} />
                </RowComponent>
            </View>

            <Modal visible={isVisibleDateTimeModal}
                transparent
                animationType='slide'
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.6)'
                }}>
                    <View style={{
                        margin: 20,
                        padding: 20,
                        borderRadius: 20,
                        width: '90%',
                        backgroundColor: colors.white
                    }}>
                        <TitleComponent text='Date Time picker' color={colors.blue} />
                        <View>
                            <DatePicker mode={type ? type : 'datetime'} date={date}
                                onDateChange={val => setDate(val)} />
                        </View>
                        <SpaceComponent height={16} />
                        <Button title='Confirm' onPress={() => {
                            onSelect(date)
                            setIsVisibleDateTimeModal(false)
                        }} />
                        <Button title='Close' onPress={() => setIsVisibleDateTimeModal(false)} />
                    </View>
                </View>

            </Modal>
        </>

    )
}

export default DateTimeComponent
