import { View, Text } from 'react-native'
import React from 'react'
import { selectModel } from '../models/SelectModel';
import TitleComponent from './TitleComponent';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
import { colors } from '../constants/colors';
import { ArrowDown2 } from 'iconsax-react-native';

interface Props {
    title?: string;
    items: selectModel[];
    selected?: string[];
    onSelect: (val: string[]) => void;
    multiple?: boolean;
}

const DropDownPicker = (props: Props) => {

    const {title, items, selected, multiple, onSelect} = props;

  return (
    <View style={{marginBottom: 16}}>
        {title && <TitleComponent text={title} />}
        <RowComponent>
            <View>
                <TextComponent text='Select' color={colors.gray} flex={0}/>
            </View>
            <ArrowDown2 size={20} color={colors.text} />
        </RowComponent>
    </View>
  )
}

export default DropDownPicker
