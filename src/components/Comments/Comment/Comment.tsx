import React from 'react'
import styles from './Comment.module.scss'

interface Props {
    content: string;
}

const Comment = ({content}: Props) => {
    return (
        <div className={styles.comment}>
            <p>
                {content}
            </p>
        </div>
    )
}

export default Comment
