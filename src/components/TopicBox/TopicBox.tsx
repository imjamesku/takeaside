import React from 'react'
import { Topic } from '../../types/Topics'
import styles from './TopicBox.module.scss'

const TopicBox = (props: Topic) => {
    return (
        <div className={styles.trendBox}>
            <h3>{props.question}</h3>
            <p>{props.firstOption.name}, {props.firstOption.users.length}</p>
            <p>{props.secondOption.name}, {props.secondOption.users.length}</p>
        </div>
    )
}

export default TopicBox
