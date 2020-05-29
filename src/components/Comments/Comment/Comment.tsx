import React from 'react'
import styles from './Comment.module.scss'
import CommentData from '../../../_types/Comment'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { RootState } from '../../../_reducers'
import { commentService } from '../../../_services/comment._service'

interface Props {
    comment: CommentData;
    deleteCommentFromCache: (commentId: number) => void;
    topicIdx?: number;
    mutateCommentCount?: (addend: number) => void;
}

const Comment = ({ comment, deleteCommentFromCache, topicIdx, mutateCommentCount }: Props) => {

    function deleteComment(id: number) {
        commentService.deleteComment(id)
            .then(() => {
                deleteCommentFromCache(id)
                if (topicIdx || topicIdx === 0) {
                    mutateCommentCount && mutateCommentCount(-1)
                }
            })
            .catch(error => {
                alert("Failed to delete the comment")
            })
    }
    const auth = useSelector((state: RootState) => state.authentication)
    return (
        <div className={styles.comment}>
            <div className={styles.top}>
                <div>
                    <span className={styles.username}>{comment.user.username}</span>
                    <span className={styles.date}>{moment.utc(comment.createdAt).fromNow()}</span>
                </div>
                {auth.loggedIn && auth.user?.id === comment.user.id &&
                    <button
                        className={styles.closeButton}
                        onClick={() => deleteComment(comment.id)}>X</button>}
            </div>
            <p>
                {comment.content}
            </p>
        </div>
    )
}

export default Comment
