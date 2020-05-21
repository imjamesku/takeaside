import React from 'react'
import Comment from './Comment/Comment'
import styles from './Comments.module.scss'
import CommentType from '../../_types/Comment'

interface Props {
    comments: Array<CommentType>
}

const Comments = (props: Props) => {
    const comments = [
        "Cats all the way",
        "Dogs for life",
        "Boring",
        "whatever",
        "Cats all the way",
        "Dogs for life",
        "Boring",
        "whatever",
        "Cats all the way",
        "Dogs for life",
        "Boring",
        "whatever",
        "Cats all the way",
        "Dogs for life",
        "Boring",
        "whatever",
        "Cats all the way",
        "Dogs for life",
        "Boring",
        "whatever",
    ]
    return (
        <div className={styles.commentList}>
            {props.comments.map((comment, idx) => <Comment key={idx} content={comment.content}/>)}
        </div>
    )
}

export default Comments
