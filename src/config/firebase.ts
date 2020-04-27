import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import { User } from "../types/User"

// const firebaseConfig = {
//     apiKey: "AIzaSyAahSxTs6CdJzww9ueWlwY1QuIAkKl7upY",
//     authDomain: "takeaside-df340.firebaseapp.com",
//     databaseURL: "https://takeaside-df340.firebaseio.com",
//     projectId: "takeaside-df340",
//     storageBucket: "takeaside-df340.appspot.com",
//     messagingSenderId: "824678074147",
//     appId: "1:824678074147:web:6c2f287c1a0b1c4a002e96",
//     measurementId: "G-WYXF0JSNK8"
// }

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
}
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}
export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
export const signInWithGoogle = () => {
    auth.signInWithPopup(provider)
}


export const generateUserDocument = async (user: firebase.User | null, additionalData: any) => {
    if (!user) return;
    const userRef = firestore.doc(`users/${user.uid}`);
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
        const { email, displayName, photoURL } = user;
        try {
            await userRef.set({
                displayName,
                email,
                photoURL,
                ...additionalData
            });
        } catch (error) {
            console.error("Error creating user document", error);
        }
    }
    return getUserDocument(user.uid);
};
const getUserDocument = async (uid: string) => {
    if (!uid) return null;
    try {
        const userDocument = await firestore.doc(`users/${uid}`).get();
        return {
            uid,
            ...userDocument.data()
        };
    } catch (error) {
        console.error("Error fetching user", error);
    }
};