import React, { useContext, useEffect } from "react";
import { UserContext } from "../src/providers/UserProvider"
import { auth } from "../src/config/firebase"
import Router from 'next/router'

const ProfilePage = () => {
    const user = useContext(UserContext)
    useEffect(() => {
        console.log(user?.email)
        console.log(user?.displayName)
        console.log()
        if (!user) {
            console.log('not logged in')
            // Router.push('/signin')
        } else {
            console.log('logged in!')
        }
    })

    return (
        <div className="mx-auto w-11/12 md:w-2/4 py-8 px-4 md:px-8">
            <div className="flex border flex-col items-center md:flex-row md:items-start border-blue-400 px-3 py-4">
                <div
                    style={{
                        backgroundImage: `url(${user?.photoURL || 'https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png'})`,
                        backgroundSize: "cover",
                        height: "200px",
                        width: "200px"
                    }}
                    className="border border-blue-300"
                ></div>
                <div className="md:pl-4">
                    <h2 className="text-2xl font-semibold">{user?.displayName}</h2>
                    <h3 className="italic">{user?.email}</h3>
                </div>
            </div>
            <button onClick={auth.signOut} className="w-full py-3 bg-red-600 mt-4 text-white">Sign out</button>
        </div>
    )
};
export default ProfilePage;