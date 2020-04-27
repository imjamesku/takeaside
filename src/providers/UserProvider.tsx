import React, { createContext, useState, useEffect } from "react";
import { auth } from '../config/firebase'

export const UserContext = createContext<firebase.User | null>(null)

const UserProvider = (props: any) => {
    //state
    const [userAuthState, setuserAuthState] = useState<firebase.User | null>(null)
    useEffect(() => {
        auth.onAuthStateChanged(userAuth => {
            setuserAuthState(userAuth)
        })
        // return () => {
        //     cleanup
        // }
    }, [])
    return (
        <div>
            <UserContext.Provider value={userAuthState}>
                {props.children}
            </UserContext.Provider>
        </div>
    )
}

export default UserProvider
