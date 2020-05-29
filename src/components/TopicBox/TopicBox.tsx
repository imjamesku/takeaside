import React, { useState } from 'react'
// import { Topic } from '../../types/Topics'
import Topic from '../../_types/Topic'
import styles from './TopicBox.module.scss'
import { topicService } from '../../_services/topic_service'
import { useSelector } from 'react-redux'
import ReactModal from 'react-modal'
import Comments from '../Comments/Comments'
import { RootState } from '../../_reducers'
import { useRouter } from 'next/router'
import Link from 'next/link'
import PercentageBar from '../PercentageBar/PercentageBar'
import CopyToClipboard from 'react-copy-to-clipboard'

interface Props {
    topic: Topic;
    topicIdx: number;
    mutateCommentCount: (addend: number) => void;
    mutateVoteCount: (optionId: number) => void;
}

const TopicBox = ({ topic, topicIdx, mutateCommentCount, mutateVoteCount }: Props) => {
    const [copied, setCopied] = useState(false)
    const leftLength = topic.left.count
    const rightLength = topic.right.count
    const auth = useSelector((state: RootState) => state.authentication)
    const router = useRouter()
    function vote(optionId: number) {
        if (auth.loggedIn && auth.user) {
            topicService.vote(optionId)
                .then(data => {
                    mutateVoteCount(optionId)
                })
                .catch(error => {
                    if (error.response) {
                        alert(error.response.data.message)
                    } else {
                        alert("Something went wrong")
                    }
                })

            // dispatch(topicActions.vote(optionId));
        } else {
            router.push('/signin')
        }
    }
    const [commentsSectionIsOpen, setCommentsSectionIsOpen] = useState(false)
    function openComments() {
        setCommentsSectionIsOpen(true)
    }

    return (
        <>
            <div className={styles
                .topicBox}>
                <div className={styles.title}>
                    <Link href="/topic/[id]" as={`/topic/${topic.id}`}>
                        <h2>{topic.question}</h2>
                    </Link>
                </div>

                <div className={styles.content}>
                    <div className={styles.contentTextAndButtons}>
                        <div className={styles.left}>
                            <button className={styles.vote} onClick={() => vote(topic.left.id)}>VOTE</button>
                            <p>{topic.left.name}</p>
                        </div>
                        <div className={styles.right}>
                            <p>{topic.right.name}</p>
                            <button className={styles.vote} onClick={() => vote(topic.right.id)}>VOTE</button>
                        </div>
                    </div>
                    <PercentageBar leftVotes={leftLength} rightVotes={rightLength} />
                </div>
                <div className={styles.bottom}>
                    <span onClick={openComments} style={{ cursor: 'pointer' }}>{topic.commentCount} comments</span>
                    
                        <CopyToClipboard text={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/topic/${topic.id}`} onCopy={() => {
                            setCopied(true)
                            alert("copied")
                        }}>
                            <span className={styles.shareButton}>Copy URL</span>
                        </CopyToClipboard>


                    <span>{topic.left.count + topic.right.count} votes</span>
                </div>
            </div>
            <ReactModal
                onRequestClose={() => setCommentsSectionIsOpen(false)}
                shouldCloseOnEsc
                shouldCloseOnOverlayClick
                closeTimeoutMS={50}
                style={{ content: { backgroundColor: '#f5f5f5', maxWidth: "900px", width: "90%", margin: "0 auto" } }}
                isOpen={commentsSectionIsOpen}
                ariaHideApp={false}>
                <button className={styles.closeButton} onClick={() => setCommentsSectionIsOpen(false)}>x</button>
                <div className={styles.commentsContainer}>
                    <Comments centered topicId={topic.id} topicIdx={topicIdx} mutateCommentCount={mutateCommentCount}/>
                </div>

            </ReactModal>
        </>
    )
}

export default TopicBox
