import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import messaging from '@react-native-firebase/messaging'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { serviceKey } from '../constants/appInfos';

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

    static sendNotification = async ({
        memberId, title, body, taskId
    } : {
        memberId: string;
        title: string;
        body: string;
        taskId: string;
    }) => {
        try {
            // send notification
      const member: any = await firestore().doc(`users/${memberId}`).get();

      if (member && member.data().tokens) {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', `key=${serviceKey}`);

        var raw = JSON.stringify({
          registration_ids: member.data().tokens,
          notification: {
            title,
            body,
          },
          data: {
            taskId,
          },
        });

        var requestOptions: any = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow',
        };

        fetch('https://fcm.googleapis.com/fcm/send', requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
      }
        } catch (error) {
            console.log(error)
        }
    }
}
