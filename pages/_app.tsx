import { AppProps } from 'next/app'
import '../src/scss/styles.scss'
import { store } from '../src/_helpers/store'
import { Provider } from 'react-redux'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'


function MyApp({ Component, pageProps }: AppProps) {
    // Todo: load token from localstorage

    return (
        <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY}>
            <Provider store={store}>
                <Component {...pageProps} id="app" />
            </Provider>
        </GoogleReCaptchaProvider>
    )
}

export default MyApp