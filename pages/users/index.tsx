import { GetStaticProps } from 'next'
import Link from 'next/link'

import { User } from '../../interfaces'
import { sampleUserData } from '../../utils/sample-data'
import Layout from '../../src/components/Layout/Layout'
import List from '../../src/components/List'

import React, { ReactElement } from 'react'
import useSWR from 'swr'
import axios from '../../src/_helpers/axios'
import UserResource from '../../src/_types/UserResource'
import UserListing from '../../src/components/UserListing/UserListing'
interface Props {
  
}

function index({}: Props): ReactElement {
  const fetcher = (key: string) => axios.get(key).then((res: any) => res.data)
  const {data, error} = useSWR<Array<UserResource>>(`/users`, fetcher)
  return (
    <Layout title="Users | imbiased">
      <h1>Users</h1>
      {data ? data.map(user => <UserListing userData={user}/>) : <h2>Loading</h2>}
    </Layout>
  )
}

export default index
