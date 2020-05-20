import React from 'react'
// import { Topic } from '../../types/Topics'
import Topic from '../../_types/Topic'
import styles from './TopicBox.module.scss'

interface Props {
    topic: Topic;
    openComments: () => void;
}

const TopicBox = ({topic, openComments}: Props) => {
    const leftLength = topic.left.count
    const rightLength = topic.right.count
    const leftPercentTage = leftLength / (leftLength + rightLength) * 100
    const rightPercentTage = rightLength / (leftLength + rightLength) * 100
    // const auth = useSelector((state: RootState) => state.firebase.auth)
    const voteLeft = () => {
        // if (isLoaded(auth) && !isEmpty(auth)) {
        //     console.log("logged in")
        // } else {
        //     console.log("not logged in")
        //     router.push('/signin')
        // }
    }
    return (
        <div className={styles.trendBox}>
            <h3>{topic.question}</h3>
            <div className={styles.content}>
                <div className={styles.contentTextAndButtons}>
                    <div className={styles.left}>
                        <button className={styles.vote} onClick={voteLeft}>VOTE</button>
                        <p>{topic.left.name}</p>
                    </div>
                    <div className={styles.right}>
                        <p>{topic.right.name}</p>
                        <button className={styles.vote}>VOTE</button>
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
