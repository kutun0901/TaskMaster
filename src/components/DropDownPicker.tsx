import { View, Text } from 'react-native'
import React from 'react'
import { selectModel } from '../models/SelectModel';
import TitleComponent from './TitleComponent';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
import { colors } from '../constants/colors';
import { ArrowDown2 } from 'iconsax-react-native';
import { globalStyles } from '../styles/globalStyles';

interface Props {
    title?: string;
    items: selectModel[];
    selected?: string[];
    onSelect: (val: string[]) => void;
    multiple?: boolean;
}

const DropDownPicker = (props: Props) => {

    const { title, items, selected, multiple, onSelect } = props;
    // console.log(items)
    return (
        <View style={{ marginBottom: 16 }}>
            {title && <TitleComponent text={title} />}
            <RowComponent onPress={() => {}} styles={[globalStyles.inputContainer,
            {
                marginTop: title ? 8 : 0,
                paddingVertical: 16
            }
            ]}>
                <View style={{flex: 1, paddingRight: 12}}>
                    <TextComponent text='Select' color={colors.gray2} flex={0} />
                </View>
                <ArrowDown2 size={20} color={colors.text} />
            </RowComponent>
        </View>
    )
}

export default DropDownPicker
