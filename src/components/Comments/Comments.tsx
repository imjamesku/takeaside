import React, { useState, FormEvent } from 'react'
import Comment from './Comment/Comment'
import styles from './Comments.module.scss'
import CommentType from '../../_types/Comment'
import { topicActions } from '../../_actions/topic.actions'
import { useDispatch } from 'react-redux'

interface Props {
    topicId: number;
    topicIdx: number;
    comments: Array<CommentType>
}



const Comments = (props: Props) => {
    const dispatch = useDispatch()
    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        // console.log(props.topicIdx, newComment)
        dispatch(topicActions.createComment(props.topicId, props.topicIdx, newComment))
    }
    const [newComment, setNewComment] = useState('')
    return (
        <div className={styles.commentList}>
            <form className={styles.commentForm} onSubmit={handleSubmit}>
                {/* <input type="textArea" placeholder="Leave a comment"/> */}
                <textarea placeholder="Leave a comment" value={newComment} onChange={e => setNewComment(e.target.value)} required/>
                <br/>
                <button>Submit</button>
            </form>
            {props.comments.map((comment, idx) => <Comment key={idx} content={comment.content}/>)}
        </div>
    )
}

export default Comments
