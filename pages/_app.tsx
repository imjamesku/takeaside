import { AppProps } from 'next/app'
import '../src/scss/styles.scss'
import {store} from '../src/_helpers/store'
import { Provider, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import {userActions} from '../src/_actions/user.actions'

//setup fake backend
// import { configureFakeBackend } from '../src/_helpers/fake-backend'
// configureFakeBackend()

function MyApp({ Component, pageProps }: AppProps) {
    // Todo: load token from localstorage
    
    return (
        <Provider store={store}>
            <Component {...pageProps} id="app" />
        </Provider>
    )
}

export default MyApp