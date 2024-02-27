import { FirebaseAuthTypes } from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"

export class HandleUser {
    static SaveToDB = async (user: FirebaseAuthTypes.User) => {
        const data = {
            email: user.email ?? "",
        }

        try {
            await firestore().doc(`users/${user.uid}`)
            .set(data)
            .then(() => {
                console.log('user added!')
            })
        } catch(error) {
            console.log(error)
        }
    }
}
