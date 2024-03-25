import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import messaging from '@react-native-firebase/messaging'


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
        const fcmToken = await messaging().getToken()
    }
}
