import React, { useContext, useEffect } from "react";
import Router from 'next/router'
import Layout from "../src/components/Layout";

const ProfilePage = () => {

    return (
        <Layout>
            <div className="mx-auto w-11/12 md:w-2/4 py-8 px-4 md:px-8">
                <div className="flex border flex-col items-center md:flex-row md:items-start border-blue-400 px-3 py-4">
                    <div
                        style={{
                            backgroundImage: `url('https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png'})`,
                            backgroundSize: "cover",
                            height: "200px",
                            width: "200px"
                        }}
                        className="border border-blue-300"
                    ></div>
                    <div className="md:pl-4">
                        <h2 className="text-2xl font-semibold">"my name"</h2>
                        <h3 className="italic">"123.dasd.com"</h3>
                    </div>
                </div>
                {/* <button onClick={() => auth.signOut()} className="w-full py-3 bg-red-600 mt-4 text-white">Sign out</button> */}
            </div>
        </Layout>
    )
};
export default ProfilePage;