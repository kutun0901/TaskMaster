import { View, Text } from 'react-native'
import React, { ReactNode } from 'react'
import { globalStyles } from '../styles/globalStyles';
import { fontFamilies } from '../constants/fontFamilies';
import { colors } from '../constants/colors';

interface Props {
    text: string;
    size?: number;
    font?: string;
    color?: string;
    flex?: number
}

const TextComponent = (props: Props) => {
    const { text, size, font, color, flex } = props
    return (
        <Text style={[globalStyles.text,
        {
            fontFamily: font ?? fontFamilies.regular,
            fontSize: size ?? 14,
            color: color ?? colors.desc,
            flex: flex ?? 1
        }

        ]}>{text}</Text>
    )
}

export default TextComponent
