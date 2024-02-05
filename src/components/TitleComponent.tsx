import { View, Text, TextStyle, Platform } from 'react-native';
import { StyleProp } from 'react-native';
import React from 'react'
import TextComponent from './TextComponent';
import { fontFamilies } from '../constants/fontFamilies';
import { globalStyles } from '../styles/globalStyles';
import { colors } from '../constants/colors';

interface Props {
    text: string;
    font?: string;
    size?: number;
    color?: string;
    styles?: StyleProp<TextStyle>;
    flex?: number;
    height?: number;
}

const TitleComponent = (props: Props) => {
    const { text, font, size, color, styles, height, flex } = props

    const weight: any =
        Platform.OS === 'ios'
            ? font
                ? {
                    fontWeight: font,
                }
                : { fontWeight: fontFamilies.semiBold }
            : {};

    return (
        <TextComponent
            text={text}
            size={size ?? 20}
            font={font ?? fontFamilies.semiBold}
            color={color}
            styles={[globalStyles.text,
                weight,
            {
                fontFamily: font ?? fontFamilies.bold,
                fontSize: size ?? 16,
                lineHeight: height ? height : size ? size + 4 : 20,
                color: color ? color : colors.text,
                flex: flex ?? 0,
                // marginBottom: 8,
            },
                styles]}

        />
    )
}

export default TitleComponent
