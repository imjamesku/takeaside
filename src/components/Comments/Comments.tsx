import React, { useState, FormEvent } from 'react'
import Comment from './Comment/Comment'
import styles from './Comments.module.scss'
import CommentType from '../../_types/Comment'
import { topicActions } from '../../_actions/topic.actions'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../_reducers'
import { useRouter } from 'next/router'

interface Props {
    topicId: number;
    topicIdx: number;
    comments: Array<CommentType>
}



const Comments = (props: Props) => {
    const dispatch = useDispatch()
    const auth = useSelector((state: RootState) => state.authentication)
    const router = useRouter()
    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        // console.log(props.topicIdx, newComment)
        if (auth.loggedIn && auth.user) {
            dispatch(topicActions.createComment(props.topicId, props.topicIdx, newComment, clearNewComment))
        } else {
            router.push('/signin')
        }
    }
    const [newComment, setNewComment] = useState('')
    function clearNewComment() {
        setNewComment('')
    }
    return (
        <div className={styles.commentList}>
            <h1>Comments</h1>
            <form className={styles.commentForm} onSubmit={handleSubmit}>
                {/* <input type="textArea" placeholder="Leave a comment"/> */}
                <textarea placeholder="Leave a comment" value={newComment} onChange={e => setNewComment(e.target.value)} required/>
                <br/>
                <button>Submit</button>
            </form>
            {props.comments.map((comment, idx) => <Comment key={idx} comment={comment}/>)}
        </div>
    )
}

export default Comments
