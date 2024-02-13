import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { ReactNode } from 'react'
import { globalStyles } from '../styles/globalStyles';
import { useNavigation } from '@react-navigation/native';
import RowComponent from './RowComponent';
import { ArrowLeft2 } from 'iconsax-react-native';
import { colors } from '../constants/colors';
import TextComponent from './TextComponent';
import { fontFamilies } from '../constants/fontFamilies';

interface Props {
  title?: string;
  back?: boolean;
  right?: ReactNode;
  children: ReactNode;
  isScroll?: boolean;
}

const Container = (props: Props) => {
  const { title, back, right, children, isScroll } = props;

  const navigation: any = useNavigation()

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.bgColor}}>
      <View style={[globalStyles.container]}>
        <RowComponent
          styles={{
            paddingHorizontal: 16,
            paddingBottom: 16,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          {back && (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ArrowLeft2 size={24} color={colors.text} />
            </TouchableOpacity>
          )}
          <View style={{
            flex: 1,
            zIndex: -1,
          }}>
            {title && (
              <TextComponent
                text={title}
                flex={0}
                font={fontFamilies.bold}
                size={16}
                styles={{ textAlign: 'center', marginLeft: back ? -24 : 0 }}
              />
            )}
          </View>

        </RowComponent>
        {isScroll ? (
          <ScrollView style={{ flex: 1 }}>{children}</ScrollView>
        ) : (
          <View style={{ flex: 1 }}>
            {children}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};


export default Container
