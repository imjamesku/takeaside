import React, { useState } from 'react'
// import { Topic } from '../../types/Topics'
import Topic from '../../_types/Topic'
import styles from './TopicBox.module.scss'
import { topicService } from '../../_services/topic_service'
import { useSelector } from 'react-redux'
import ReactModal from 'react-modal'
import Comments from '../Comments/Comments'
import { RootState } from '../../_reducers'
import { useRouter } from 'next/router'
import {mutate} from 'swr'
import update from 'immutability-helper'

interface Props {
    topic: Topic;
    topicIdx: number;
}

const TopicBox = ({ topic, topicIdx }: Props) => {
    const leftLength = topic.left.count
    const rightLength = topic.right.count
    const leftPercentTage = leftLength / (leftLength + rightLength) * 100
    const rightPercentTage = rightLength / (leftLength + rightLength) * 100
    const auth = useSelector((state: RootState) => state.authentication)
    const router = useRouter()
    function vote(optionId: number) {
        if (auth.loggedIn && auth.user) {
            topicService.vote(optionId)
                .then(data => {
                    if (optionId === topic.left.id) {
                        mutate('/topics', (topics: Array<Topic>) => update(topics, {[topicIdx]: {left: {count: {$set: topic.left.count+1}}}}))
                    } else if (optionId === topic.right.id) {
                        mutate('/topics', (topics: Array<Topic>) => update(topics, {[topicIdx]: {right: {count: {$set: topic.right.count+1}}}}))
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
    const [commentsSectionIsOpen, setCommentsSectionIsOpen] = useState(false)
    function openComments() {
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
                onRequestClose={() => setCommentsSectionIsOpen(false)}
                shouldCloseOnEsc
                shouldCloseOnOverlayClick
                closeTimeoutMS={50}
                style={{content: {backgroundColor: '#f5f5f5', maxWidth: "900px", width: "90%", margin: "0 auto"}}}
                isOpen={commentsSectionIsOpen}
                ariaHideApp={false}>
                <button className={styles.closeButton} onClick={() => setCommentsSectionIsOpen(false)}>x</button>
                <Comments comments={topic.comments} topicId={topic.id} topicIdx={topicIdx} />
                
            </ReactModal>
        </>
    )
}

export default TopicBox
