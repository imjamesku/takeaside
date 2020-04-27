import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAahSxTs6CdJzww9ueWlwY1QuIAkKl7upY",
    authDomain: "takeaside-df340.firebaseapp.com",
    databaseURL: "https://takeaside-df340.firebaseio.com",
    projectId: "takeaside-df340",
    storageBucket: "takeaside-df340.appspot.com",
    messagingSenderId: "824678074147",
    appId: "1:824678074147:web:6c2f287c1a0b1c4a002e96",
    measurementId: "G-WYXF0JSNK8"
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