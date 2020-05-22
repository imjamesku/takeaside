import React from 'react'
import styles from './Comment.module.scss'
import CommentData from '../../../_types/Comment'
import moment from 'moment'

interface Props {
    comment: CommentData;
}

const Comment = ({comment}: Props) => {
    return (
        <div className={styles.comment}>
            <div className={styles.top}>
                <span className={styles.username}>{comment.user.username}</span>
                <span className={styles.date}>{moment(comment.createdAt).fromNow()}</span>
            </div>
            <p>
                {comment.content}
            </p>
        </div>
    )
}

export default Comment
