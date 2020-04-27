import { AppProps } from 'next/app'
import UserProvider from '../src/providers/UserProvider'

// import * as firebase from 'firebase'
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
// if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseConfig)
// }

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <UserProvider>
            <Component {...pageProps} />
        </UserProvider>
    )
}

export default MyApp