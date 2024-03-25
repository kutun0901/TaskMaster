import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import messaging from '@react-native-firebase/messaging'
import AsyncStorage from '@react-native-async-storage/async-storage'

const user = auth().currentUser;

export class HandleNotification{

    static checkNotificationPermission = async() => {
        const authStatus = await messaging().requestPermission();

        if (authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL){
                this.getFcmToken()
            }
    }

    static getFcmToken = async() => {
        const fcmtoken = await AsyncStorage.getItem('fcmtoken')

        if (!fcmtoken){
            // get fcmtoken

            const token = await messaging().getToken();

            if (token){
                await AsyncStorage.setItem('fcmtoken', token);
                this.updateToken(token);
            }
        }
    }

    static updateToken = async (token: string) => {
        await firestore().doc(`users/${user?.uid}`).get().then((snap) => {
            if (snap.exists){
                const data: any = snap.data();

                if (!data.tokens || !data.tokens.includes(token)){
                    firestore().doc(`users/${user?.uid}`).update({

                        // add token to tokens array using FieldValue from firestore

                        tokens: firestore.FieldValue.arrayUnion(token)
                    })
                }
            }
        })
    }
}
