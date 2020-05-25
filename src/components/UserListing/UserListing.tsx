import React from 'react'
import UserResource from '../../_types/UserResource'
import Link from 'next/link'

interface Props {
    userData: UserResource
}

const UserListing = ({ userData }: Props) => {
    return (
        <Link href={`/users/${userData.id}`}>
            <div>
                <h2>{userData.username}</h2>
                <span>Name: {userData.firstName} {userData.lastName}</span>
            </div>
        </Link>
    )
}

export default UserListing
