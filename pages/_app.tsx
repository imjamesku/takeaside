import { AppProps } from 'next/app'
import '../src/scss/styles.scss'
import {store} from '../src/_helpers/store'
import { Provider } from 'react-redux'



function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    )
}

export default MyApp