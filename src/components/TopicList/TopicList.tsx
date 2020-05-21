import React, {useState, useEffect} from 'react'
import styles from './TopicList.module.scss'
import TopicBox from '../TopicBox/TopicBox'
import { Topic } from '../../types/Topics'
import ReactModal from 'react-modal'
import Comments from '../Comments/Comments'
import { topicService } from '../../_services/topic_service'
import { topicActions } from '../../_actions/topic.actions'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../_reducers'
import CreateTopicForm from '../CreateTopicForm/CreateTopicForm'
interface Props {

}

const TopicList = (props: Props) => {
    const dispatch = useDispatch()

    function openComments() {
        setCommentsSectionIsOpen(true)
    }

    function closeComments() {
        setCommentsSectionIsOpen(false)
    }

    function openCreateTopic() {
        setCreateTopicIsOpen(true)
    }

    function closeCreateTopic() {
        setCreateTopicIsOpen(false)
    }
    const [commentsSectionIsOpen, setCommentsSectionIsOpen] = useState(false)
    const [createTopicIsOpen, setCreateTopicIsOpen] = useState(false)

    useEffect(() => {
        if (topics.topics.length === 0){
            dispatch(topicActions.getAll())
        }
    }, [])

    const topics = useSelector((state: RootState) => state.topics)
    
    return (
        <>
            <button
                className={styles.createButton}
                onClick={openCreateTopic}>Create Topic</button>
            <div className={styles.topicList}>
                {topics.loading ? <h2>Loading</h2> : topics.topics.map((topicData, index) => <TopicBox key={index} topic={topicData} topicIdx={index} />)}
            </div>
            <ReactModal
                ariaHideApp={false}
                style={{content: {
                    backgroundColor: "#ecf0f3",
                    margin: "0 auto",
                    display: "inline"
                }}}
                isOpen={createTopicIsOpen}>
                <button className={styles.closeButton} onClick={closeCreateTopic}>x</button>
                <CreateTopicForm/>
            </ReactModal>
            {/* <ReactModal
            isOpen={commentsSectionIsOpen}
            ariaHideApp={false}>
                <button className={styles.closeButton} onClick={closeComments}>x</button>
                <div className={styles.commentsContainer}>
                    <h1>Comments</h1>
                    <Comments />
                </div>
            </ReactModal> */}
        </>
    )
}

export default TopicList
