import React, {useState, useEffect} from 'react'
import styles from './TopicList.module.scss'
import TopicBox from '../TopicBox/TopicBox'
import Topic from '../../_types/Topic'
import ReactModal from 'react-modal'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../_reducers'
import CreateTopicForm from '../CreateTopicForm/CreateTopicForm'
import {useRouter} from 'next/router'
import useSWR from 'swr'
import axios from '../../_helpers/axios'
interface Props {

}

const TopicList = (props: Props) => {
    const topicsFetcher = (key: string) => axios.get(key).then((response: any) => response.data)
    const dispatch = useDispatch()
    const {data: topicsData, error, mutate} = useSWR<Array<Topic>>(`/topics`, topicsFetcher)


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
                {/* {topics.loading ? <h2>Loading</h2> : topics.topics.map((topicData, index) => <TopicBox key={index} topic={topicData} topicIdx={index} />)} */}
                {error ? 
                <h2>Error loading topics</h2> :
                topicsData ?
                topicsData.map((topicData, index) => <TopicBox key={index} topic={topicData} topicIdx={index} />) : <h2>Loading</h2>}
            </div>
            <ReactModal
                onRequestClose={closeCreateTopic}
                shouldCloseOnEsc
                shouldCloseOnOverlayClick
                ariaHideApp={false}
                style={{content: {
                    backgroundColor: "#e3e3e3",
                    margin: "0 auto",
                    display: "inline",
                    maxWidth: "900px",
                    width: "90%",
                }}}
                isOpen={createTopicIsOpen}>
                <button className={styles.closeButton} onClick={closeCreateTopic}>x</button>
                <CreateTopicForm/>
            </ReactModal>
        </>
    )
}

export default TopicList
