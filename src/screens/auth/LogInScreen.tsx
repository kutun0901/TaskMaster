import { View, Text } from 'react-native'
import React, { useState } from 'react'
import Container from '../../components/Container'
import SectionComponent from '../../components/SectionComponent'
import TextComponent from '../../components/TextComponent'
import TitleComponent from '../../components/TitleComponent'
import { fontFamilies } from '../../constants/fontFamilies'
import InputComponent from '../../components/InputComponent'
import { Lock, Sms } from 'iconsax-react-native'
import { colors } from '../../constants/colors'
import ButtonComponent from '../../components/ButtonComponent'

const LogInScreen = ({navigation}: any) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [errorText, setErrorText] = useState('')

    const handleLogInWithEmail = async () => {

    }


  return (
    <Container>
        <SectionComponent styles={{
            justifyContent: 'center',
            // alignItems: 'center',
            flex: 1
        }}>
            <TitleComponent text='LogIn' size={32}
            font={fontFamilies.bold}
            styles={{textTransform: 'uppercase',
            // flex: 0,
            textAlign: 'center'}}
            />

            <View style={{marginVertical: 20}}>
            <InputComponent
            value={email}
            onChange={val => setEmail(val)}
            prefix={<Sms size={20} color={colors.desc} />}
            placeHolder="Email"
            title="Email"
            allowClear
          />

          <InputComponent
            value={password}
            onChange={val => setPassword(val)}
            prefix={<Lock size={20} color={colors.desc} />}
            placeHolder="Password"
            title="Password"
            isPassword
            // allowClear
          />
            </View>

            <ButtonComponent isLoading={isLoading} text='login' onPress={handleLogInWithEmail}/>

        </SectionComponent>
    </Container>
  )
}

export default LogInScreen
