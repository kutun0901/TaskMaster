import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import RowComponent from './RowComponent'
import TextComponent from './TextComponent';
import { colors } from '../constants/colors';
import { fontFamilies } from '../constants/fontFamilies';
import { globalStyles } from '../styles/globalStyles';
import firestore from '@react-native-firebase/firestore'

interface Props{
    uids: string[]
}

const AvatarGroup = (props: Props) => {

    const {uids} = props;

    const [usersName, setUsersName] = useState<{
        name: string;
        imgUrl: string
    }[]>([]);

    // const uidsLength = 10;
    // const imageUrl = 'https://static.wikia.nocookie.net/saintpirates/images/6/66/Tony_Tony_Chopper.png'

    useEffect(() => {
        getUserAvatar()
    }, [uids])

    const getUserAvatar = async () => {
        uids.forEach(async id => {
            await firestore()
            .doc(`users/${id}`)
            .get()
            .then((snap: any) => {
                const items: any = [...usersName]
                if (snap.exists){
                    items.push({
                        name: snap.data().name,
                        imgUrl: snap.data().imgUrl ?? ""
                    })
                }
                setUsersName(items)
            }).catch(error => {
                console.log(error)
            })
        })
    }

    const imageStyle = {
        width: 32,
        height: 32,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: colors.white
    }
  return (
    <RowComponent styles={{justifyContent: 'flex-start'}}>
        {/* {Array.from({length: uidsLength}).map((item, index) =>
          index < 3 && (
                <Image source={{uri: imageUrl}}
                key={`image${index}`}
                style={[imageStyle, {marginLeft: index > 0 ? -10 : 0}]}
                />
            )
        )} */}

        {usersName.map((item, index) =>
            index < 3 && (item.imgUrl ? (
                <Image source={{uri: item.imgUrl}}
                key={`image${index}`}
                style={[imageStyle, {marginLeft: index > 0 ? -10 : 0}]}
                />
            ) : (
                <View key={`image${index}`}
                style={[imageStyle,
                {
                    marginLeft: index > 0 ? -10 : 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: colors.gray2
                }
                ]}
                >
                    <Text style={[
                        globalStyles.text,
                        {fontFamily: fontFamilies.bold, fontSize: 14}
                    ]}>
                        {item.name.substring(0, 1)}
                    </Text>
                </View>
            ))
        )}

        {uids.length > 3 && (
            <View style={[imageStyle, {
                backgroundColor: 'coral',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                marginLeft: -10
            }]}>
                <TextComponent flex={0} styles={{
                    lineHeight: 19
                }}
                font={fontFamilies.semiBold}
                text={`+${uids.length - 3 > 9 ? 9 : uids.length - 3}`} />
            </View>
        )}

    </RowComponent>
  )
}

export default AvatarGroup
