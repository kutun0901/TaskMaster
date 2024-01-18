import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { ReactNode } from 'react'
import TitleComponent from './TitleComponent';
import RowComponent from './RowComponent';
import { globalStyles } from '../styles/globalStyles';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { colors } from '../constants/colors';


interface Props {
    value: string,
    onChange: (val: string) => void,
    placeHolder?: string,
    title?: string,
    prefix?: ReactNode,
    affix?: ReactNode,
    allowClear?: boolean,
    multiple?: boolean,
    numberOfLine?: number
}

const InputComponent = (props: Props) => {
    const { value, onChange, placeHolder, title, prefix, affix, allowClear, multiple, numberOfLine } = props;
    return (
        <View style={{ marginBottom: 16 }}>
            {title && <TitleComponent text={title} />}
            <RowComponent styles={[globalStyles.inputContainer,
            {
                marginTop: title ? 8 : 0,
                minHeight: multiple && numberOfLine ? 32 * numberOfLine : 32,
                paddingVertical: 14,
                paddingHorizontal: 10,
                alignItems: 'flex-start'
            }]}>
                {prefix && prefix}
                <View style={{ flex: 1 }}>
                    <TextInput style={[globalStyles.text, { margin: 0, padding: 0, paddingVertical: 6, flex: 1,}]}
                        placeholder={placeHolder ?? ""}
                        placeholderTextColor={'#676767'}
                        value={value}
                        onChangeText={val => onChange(val)}
                        multiline={multiple}
                        numberOfLines={numberOfLine}
                    />

                </View>
                {affix && affix}

                {allowClear && value && (
                    <TouchableOpacity onPress={() => onChange('')}>
                        <AntDesign name='close' size={20} color={colors.white} />
                    </TouchableOpacity>
                )}
            </RowComponent>
        </View>
    )
}

export default InputComponent
