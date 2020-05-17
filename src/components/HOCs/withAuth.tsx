import React, {useEffect} from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { RootState } from '../../_reducers'

interface Props {

}
export default function withAuth(AuthComponent: any) {
    return (props: Props) => {
        const router = useRouter()
        const auth = useSelector((state: RootState) => state.authentication)
        useEffect(() => {
            if (!auth.loggedIn) {
                router.push('/')
            }
        }, [auth])
        if (auth.loggedIn && auth.user){
            return <AuthComponent/>
        } else {
            return <h1>Please Log in</h1>
        }
    }
}

