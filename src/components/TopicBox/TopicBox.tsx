import React from 'react'
import { Topic } from '../../types/Topics'
import styles from './TopicBox.module.scss'

const TopicBox = (props: Topic) => {
    const leftLength = props.firstOption.users.length
    const rightLength = props.secondOption.users.length
    return (
        <div className={styles.trendBox}>
            <h3>{props.question}</h3>
            <div className={styles.content}>
                <div className={styles.contentTextAndButtons}>
                    <div className={styles.left}>
                        <button className={styles.vote}>VOTE</button>
                        <p>{props.firstOption.name}</p>
                    </div>
                    <div className={styles.right}>
                        <p>{props.secondOption.name}</p>
                        <button className={styles.vote}>VOTE</button>
                    </div>
                </div>
                <div className={styles.bar}>
                    {leftLength + rightLength > 0 &&
                        <>
                            <div className={styles.leftSide} style={{ width: `${leftLength / (leftLength + rightLength) * 100}%` }}>
                                <p className={styles.percentage}>50%</p>
                            </div>
                            <div className={styles.rightSide} style={{ width: `${rightLength / (leftLength + rightLength) * 100}%` }}>
                                <span className={styles.percentage}>50%</span>
                            </div>
                        </>

                    }
                </div>
            </div>
            <div className={styles.bottom}>
                <span>0 comments</span>
                <span>{props.firstOption.users.length + props.secondOption.users.length} votes</span>
            </div>
        </div>
    )
}

export default TopicBox
