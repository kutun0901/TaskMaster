import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import RowComponent from './RowComponent'
import TextComponent from './TextComponent';
import { colors } from '../constants/colors';
import { fontFamilies } from '../constants/fontFamilies';
import { globalStyles } from '../styles/globalStyles';
import firestore from '@react-native-firebase/firestore'
import AvatarComponent from './AvatarComponent';

interface Props {
    uids: string[]
}

const AvatarGroup = (props: Props) => {

    const { uids } = props;

    const [usersName, setUsersName] = useState<{
        name: string;
        imgUrl: string
    }[]>([]);

    // const uidsLength = 10;
    // const imageUrl = 'https://static.wikia.nocookie.net/saintpirates/images/6/66/Tony_Tony_Chopper.png'

    useEffect(() => {
        getUserAvatar()
    }, [uids])

    // You're using forEach with an async function inside. The problem with
    // forEach in this context is that it doesn't wait for asynchronous
    // operations to complete before moving on to the next iteration. This
    // means that your state update might occur before the asynchronous Firestore calls finish,
    //  resulting in incomplete or incorrect data being set in the state.

    // const getUserAvatar = async () => {
    //     uids.forEach(async id => {
    //       await firestore()
    //         .doc(`users/${id}`)
    //         .get()
    //         .then((snap: any) => {
    //           const items: any = [...usersName];
    //           if (snap.exists) {
    //             items.push({
    //               name: snap.data().name,
    //               imgUrl: snap.data().imgUrl ?? '',
    //             });
    //           }
    //           setUsersName(items);
    //         })
    //         .catch(error => {
    //           console.log(error);
    //         });
    //     });
    //   };

    const getUserAvatar = async () => {
        const updatedUsersName = [];
        for (const id of uids) {
            try {
                const snap = await firestore().doc(`users/${id}`).get();
                if (snap.exists) {
                    updatedUsersName.push({
                        name: snap.data().displayName,
                        imgUrl: snap.data().imgUrl ?? ""
                    });
                }
            } catch (error) {
                console.log(error);
            }
        }
        setUsersName(updatedUsersName);
    };

    const imageStyle = {
        width: 32,
        height: 32,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: colors.white
    }
    return (
        <RowComponent styles={{ justifyContent: 'flex-start' }}>
            {/* {Array.from({length: uidsLength}).map((item, index) =>
          index < 3 && (
                <Image source={{uri: imageUrl}}
                key={`image${index}`}
                style={[imageStyle, {marginLeft: index > 0 ? -10 : 0}]}
                />
            )
        )} */}

            {uids.map(
                (item, index) =>
                    index < 3 && <AvatarComponent uid={item} index={index} key={item} />,
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
