import React, { useState, useEffect } from 'react'
import styles from './TopicList.module.scss'
import TopicBox from '../TopicBox/TopicBox'
import Topic from '../../_types/Topic'
import ReactModal from 'react-modal'
import { useSelector } from 'react-redux'
import { RootState } from '../../_reducers'
import CreateTopicForm from '../CreateTopicForm/CreateTopicForm'
import { useRouter } from 'next/router'
import useSWR, { useSWRPages } from 'swr'
import axios from '../../_helpers/axios'
import update from 'immutability-helper'
import TopicPageResponse from '../../_types/TopicPageResponse'
interface Props {

}

const TopicList = (props: Props) => {
    const topicsFetcher = (key: string) => axios.get(key).then((response: any) => response.data)
    // const {data: topicsData, error, mutate} = useSWR<Array<Topic>>(`/topics`, topicsFetcher)
    const { pages,
        isLoadingMore,
        isReachingEnd,
        loadMore } = useSWRPages<number | null, TopicPageResponse>('/topics', ({ offset, withSWR }) => {
            // Page component
            const { data, mutate } = withSWR(
                useSWR(`/topics?offset=${offset ?? 0}`, topicsFetcher)
            )
            if (!data) {
                return <h1>Loading</h1>
            }


            return data.topicResourceList.map((topicData, index) => {
                function mutateCommentCount(addend: number) {
                    if (!data) {
                        return
                    }
                    mutate({ nextOffset: data.nextOffset, topicResourceList: update(data.topicResourceList, { [index]: { commentCount: { $set: data.topicResourceList[index].commentCount + addend } } }) })
                }
                function mutateVoteCount(optionId: number) {
                    if (!data) {
                        return
                    }
                    if (topicData.left.id === optionId) {
                        mutate({ nextOffset: data.nextOffset, topicResourceList: update(data.topicResourceList, { [index]: { left: { count: { $set: topicData.left.count + 1 } } } }) })
                    } else if (topicData.right.id == optionId) {
                        mutate({ nextOffset: data.nextOffset, topicResourceList: update(data.topicResourceList, { [index]: { right: { count: { $set: topicData.right.count + 1 } } } }) })
                    }
                }
                return <TopicBox key={index} topic={topicData} topicIdx={index} mutateCommentCount={mutateCommentCount} mutateVoteCount={mutateVoteCount} />
            })

        },
            (swr) => {
                // return nextoffset
                const { data } = swr
                if (data && data.topicResourceList.length !== 0) {
                    return data.nextOffset
                }
                return null
            },
            [])


    function openCreateTopic() {
        if (auth.loggedIn && auth.user) {
            setCreateTopicIsOpen(true)
        } else {
            router.push('/signin')
        }
    }

    function closeCreateTopic() {
        setCreateTopicIsOpen(false)
    }
    const [createTopicIsOpen, setCreateTopicIsOpen] = useState(false)
    const router = useRouter()

    const auth = useSelector((state: RootState) => state.authentication)

    return (
        <>
            <button
                className={styles.createButton}
                onClick={openCreateTopic}>Create Topic
            </button>
            <div className={styles.topicList}>
                {pages}
                <button className={styles.loadMoreButton} onClick={loadMore} disabled={isReachingEnd || isLoadingMore}>
                {isLoadingMore ? '. . .' : isReachingEnd ? 'no more data' : 'load more...'}
            </button>
            </div>
            
            <ReactModal
                onRequestClose={closeCreateTopic}
                shouldCloseOnEsc
                shouldCloseOnOverlayClick
                ariaHideApp={false}
                style={{
                    content: {
                        backgroundColor: "#e3e3e3",
                        margin: "0 auto",
                        display: "inline",
                        maxWidth: "900px",
                        width: "90%",
                    }
                }}
                isOpen={createTopicIsOpen}>
                <button className={styles.closeButton} onClick={closeCreateTopic}>x</button>
                <CreateTopicForm />
            </ReactModal>
        </>
    )
}

export default TopicList
