import React, { useState } from 'react'
// import { Topic } from '../../types/Topics'
import Topic from '../../_types/Topic'
import styles from './TopicBox.module.scss'
import { topicService } from '../../_services/topic_service'
import { topicActions } from '../../_actions/topic.actions'
import { useDispatch } from 'react-redux'
import ReactModal from 'react-modal'
import Comments from '../Comments/Comments'

interface Props {
    topic: Topic;
    topicIdx: number;
}

const TopicBox = ({ topic, topicIdx }: Props) => {
    const leftLength = topic.left.count
    const rightLength = topic.right.count
    const leftPercentTage = leftLength / (leftLength + rightLength) * 100
    const rightPercentTage = rightLength / (leftLength + rightLength) * 100
    const dispatch = useDispatch()
    // const auth = useSelector((state: RootState) => state.firebase.auth)
    function vote(optionId: number) {
        dispatch(topicActions.vote(optionId));
        // topicService.vote(optionId)
        //     .then(data => console.log('data', data))
        //     .catch(error => {
        //         if (error.response) {
        //             console.log('response', error.response.statusText)
        //         }
        //     })
    }
    const [commentsSectionIsOpen, setCommentsSectionIsOpen] = useState(false)
    function openComments() {
        if (topic.commentCount != topic.comments.length) {
            dispatch(topicActions.loadComments(topic.id, topicIdx))
        }
        setCommentsSectionIsOpen(true)
    }

    return (
        <>
            <div className={styles.topicBox}>

                <h2>{topic.question}</h2>
                <div className={styles.content}>
                    <div className={styles.contentTextAndButtons}>
                        <div className={styles.left}>
                            <button className={styles.vote} onClick={() => vote(topic.left.id)}>VOTE</button>
                            <p>{topic.left.name}</p>
                        </div>
                        <div className={styles.right}>
                            <p>{topic.right.name}</p>
                            <button className={styles.vote} onClick={() => vote(topic.right.id)}>VOTE</button>
                        </div>
                    </div>
                    <div className={styles.bar}>
                        {leftLength + rightLength > 0 &&
                            <>
                                <div className={styles.leftSide} style={{ width: `${leftPercentTage}%` }}>
                                    <span className={styles.percentage}>{Math.trunc(leftPercentTage)}%</span>
                                </div>
                                <div className={styles.rightSide} style={{ width: `${rightPercentTage}%` }}>
                                    <span className={styles.percentage}>{Math.trunc(rightPercentTage)}%</span>
                                </div>
                            </>

                        }
                    </div>
                </div>
                <div className={styles.bottom}>
                    <span onClick={openComments} style={{ cursor: 'pointer' }}>{topic.commentCount} comments</span>
                    <span>{topic.left.count + topic.right.count} votes</span>
                </div>
            </div>
            <ReactModal
                isOpen={commentsSectionIsOpen}
                ariaHideApp={false}>
                <button className={styles.closeButton} onClick={() => setCommentsSectionIsOpen(false)}>x</button>
                <div className={styles.commentsContainer}>
                    <h1>Comments</h1>
                    <Comments comments={topic.comments} />
                </div>
            </ReactModal>
        </>
    )
}

export default TopicBox
