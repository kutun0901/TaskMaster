import { Text, StyleProp, TextStyle, Platform } from 'react-native'
import React from 'react'
import { globalStyles } from '../styles/globalStyles';
import { fontFamilies } from '../constants/fontFamilies';
import { colors } from '../constants/colors';

interface Props {
    text: string;
    size?: number;
    font?: string;
    color?: string;
    flex?: number
    styles?: StyleProp<TextStyle>
}

const TextComponent = (props: Props) => {
    const { text, size, font, color, flex, styles } = props

    const weight: any =
        Platform.OS === 'ios'
            ? font
                ? {
                    fontWeight: font,
                }
                : { fontWeight: fontFamilies.regular }
            : {};

    return (
        <Text style={[globalStyles.text,
            weight,
        {
            fontFamily: font ?? fontFamilies.regular,
            fontSize: size ?? 14,
            color: color ?? colors.desc,
            flex: flex ?? 1
        },
            styles

        ]}>
            {text}
        </Text>
    )
}

export default TextComponent
