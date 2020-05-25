import React, { useState } from 'react'
import Layout from '../../src/components/Layout/Layout'
import useSWR from 'swr'
import Topic from '../../src/_types/Topic'
import { GetServerSideProps } from 'next'
import axios from '../../src/_helpers/axios.server'
import { topicService } from '../../src/_services/topic_service'
import PercentageBar from '../../src/components/PercentageBar/PercentageBar'
import styles from './[id].module.scss'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { RootState } from '../../src/_reducers'
import { useRouter } from 'next/router'
import instance from '../../src/_helpers/axios.server'
import update from 'immutability-helper'
import Comments from '../../src/components/Comments/Comments'
import CopyToClipboard from 'react-copy-to-clipboard'
import Link from 'next/link'


interface Props {
    serverTopicData: Topic;
    error: string;
}

const TopicDetailPage = ({serverTopicData, error}: Props) => {
    const router = useRouter()
    const {id} = router.query
    const auth = useSelector((state: RootState) => state.authentication)
    const topicFetcher = (key: string) => instance.get(key).then(res =>res.data)
    const {data: topicData, error: swrError, mutate} = useSWR<Topic>(`/topics/${id}`, topicFetcher, {initialData: serverTopicData})
    const [copied, setCopied] = useState(false)
    function vote(optionId: number) {
        if (auth.loggedIn && auth.user) {
            topicService.vote(optionId)
                .then(data => {
                    if (!topicData){
                        return
                    }
                    if (optionId === topicData.left.id) {
                        mutate(update(topicData, {left: {count: {$set: topicData.left.count+1}}}))

                    } else if (optionId === topicData.right.id) {
                        mutate(update(topicData, {right: {count: {$set: topicData.right.count+1}}}))
                    }
                })
                .catch(error => {
                    if (error.response) {
                        alert(error.response.data.message)
                    } else {
                        alert("Something went wrong")
                    }
                })

            // dispatch(topicActions.vote(optionId));
        } else {
            router.push('/signin')
        }
    }
    if (topicData) {
        return (
            <Layout>
                <div className={styles.title}>
                    <h1>{topicData.question}</h1>
                    <span>Created by <Link href={`/users/${topicData.userId}`}><a className={styles.handle}>@{topicData.userName}</a></Link> - {moment.utc(topicData.createdAt).fromNow()}</span>
                </div>
                <span>Share: </span>
                <CopyToClipboard text={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/topic/${id}`} onCopy={() => {
                    setCopied(true)
                    alert("copied")
                }}>
                    <button className={styles.shareButton}>Copy URL</button>
                </CopyToClipboard>
                <div className={styles.bar}>
                    <PercentageBar leftVotes={topicData.left.count} rightVotes={topicData.right.count}/>
                </div>
                <div className={styles.sides}>
                    <div className={styles.left}>
                        <h2>{topicData.left.name}</h2>
                        <p className={styles.voteCount}>{topicData.left.count} votes</p>
                        <button className={styles.vote} onClick={() => vote(topicData.left.id)}>VOTE</button>
                    </div>
                    <div className={styles.right}>
                        <h2>{topicData.right.name}</h2>
                        <p className={styles.voteCount}>{topicData.right.count} votes</p>
                        <button className={styles.vote} onClick={() => vote(topicData.right.id)}>VOTE</button>

                    </div>
                </div>
                <Comments
                    topicId={topicData.id}/>
            </Layout>
        )
    }
    return (
    <Layout>
        <h1>Error</h1>
    </Layout>)
    
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        if (context.params){
            const id = context.params.id
            if (typeof id === "string") {
                const res = await axios.get(`/topics/${id}`)                
                return {props: {serverTopicData: res.data, error: ""}}
            }
        }
        return {props: {serverTopicData: null, error: "Failed to fetch topic data"}}
    } catch(error) {
        return {props: {serverTopicData: null, error: "Failed to fetch topic data"}}
    }
}

export default TopicDetailPage
