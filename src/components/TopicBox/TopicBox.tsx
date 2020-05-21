import React from 'react'
// import { Topic } from '../../types/Topics'
import Topic from '../../_types/Topic'
import styles from './TopicBox.module.scss'
import { topicService } from '../../_services/topic_service'
import { topicActions } from '../../_actions/topic.actions'
import { useDispatch } from 'react-redux'

interface Props {
    topic: Topic;
    openComments: () => void;
}

const TopicBox = ({topic, openComments}: Props) => {
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
    return (
        <div className={styles.trendBox}>
            <h3>{topic.question}</h3>
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
                            <div className={styles.leftSide} style={{ width: `${leftPercentTage}%`}}>
                                <span className={styles.percentage}>{Math.trunc(leftPercentTage)}%</span>
                            </div>
                            <div className={styles.rightSide} style={{ width: `${rightPercentTage}%`}}>
                                <span className={styles.percentage}>{Math.trunc(rightPercentTage)}%</span>
                            </div>
                        </>

                    }
                </div>
            </div>
            <div className={styles.bottom}>
                <span onClick={openComments} style={{cursor: 'pointer'}}>0 comments</span>
                <span>{topic.left.count + topic.right.count} votes</span>
            </div>
        </div>
    )
}

export default TopicBox
