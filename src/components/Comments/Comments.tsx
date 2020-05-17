import React from 'react'
import Comment from './Comment/Comment'
import styles from './Comments.module.scss'

interface Props {
    
}

const Comments = (props: Props) => {
    const comments = [
        "Cats all the way",
        "Dogs for life",
        "Boring",
        "whatever"
    ]
    return (
        <div className={styles.commentList}>
            {comments.map(comment => <Comment content={comment}/>)}
        </div>
    )
}

export default Comments
