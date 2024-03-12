import { View, Text } from 'react-native'
import React from 'react'
import CircularProgress from 'react-native-circular-progress-indicator'
import { colors } from '../constants/colors'
import { fontFamilies } from '../constants/fontFamilies'

interface Props{
    color?: string,
    value: number,
    maxValue?: number,
    radius?: number
}

const CircularComponent = (props: Props) => {
    const {color, value, maxValue, radius} = props

  return (
    <CircularProgress value={value}
    radius={radius ?? 46}
    title={`${value}%`}
    showProgressValue={false}
    activeStrokeColor={color ?? colors.blue}
    inActiveStrokeColor={colors.gray2}
    titleColor={colors.text}
    titleFontSize={22}
    titleStyle={{fontFamily: fontFamilies.semiBold,
      fontSize: 18
    }}
    />
  )
}

export default CircularComponent
