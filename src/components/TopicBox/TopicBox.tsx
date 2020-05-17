import React from 'react'
import { Topic } from '../../types/Topics'
import styles from './TopicBox.module.scss'
import router from 'next/router'

interface Props {
    topic: Topic;
    openComments: () => void;
}

const TopicBox = ({topic, openComments}: Props) => {
    const leftLength = topic.firstOption.users.length
    const rightLength = topic.secondOption.users.length
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
                        <p>{topic.firstOption.name}</p>
                    </div>
                    <div className={styles.right}>
                        <p>{topic.secondOption.name}</p>
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
                <span>{topic.firstOption.users.length + topic.secondOption.users.length} votes</span>
            </div>
        </div>
    )
}

export default TopicBox
