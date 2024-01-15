import { StyleProp, ViewStyle, TouchableOpacity } from 'react-native'
import React from 'react'
import TextComponent from './TextComponent';
import { globalStyles } from '../styles/globalStyles';
import { colors } from '../constants/colors';

interface Props {
    text: string;
    color?: string;
    tagStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<ViewStyle>
    onPress?: () => void;
}

const TagComponent = (props: Props) => {

    const { text, textStyle, color, tagStyle, onPress } = props
    return (
        <TouchableOpacity style={[globalStyles.tag, tagStyle, {backgroudColor: color ?? colors.blue} ]}>
            <TextComponent text={text} styles={textStyle} />
        </TouchableOpacity>
    )
}

export default TagComponent
