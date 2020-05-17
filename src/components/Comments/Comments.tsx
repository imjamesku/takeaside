import React, {useEffect} from 'react'
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
    useEffect(() => {
        console.log("comments opned")
    }, [])
    return (
        <div className={styles.commentList}>
            {comments.map((comment, idx) => <Comment key={idx} content={comment}/>)}
        </div>
    )
}

export default Comments
