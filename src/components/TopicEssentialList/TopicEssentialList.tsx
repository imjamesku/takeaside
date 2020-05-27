import React from 'react'
import {TopicEssentialData} from '../../_types/UserResource'
import styles from './TopicEssentialList.module.scss'
import Link from 'next/link'


interface Props {
    topics: Array<TopicEssentialData>
}

const TopicEssentialList = ({topics}: Props) => {
    return (
        <div>
            {topics.map(topic => (
                <Link href="/topic/[id]" as={`/topic/${topic.id}`}>
                <div className={styles.listing}>
                    <h3>{topic.question}</h3>
                </div>
                </Link>
            ))}
        </div>
    )
}

export default TopicEssentialList
