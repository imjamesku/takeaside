import React, {useState, useEffect} from 'react'
import styles from './TopicList.module.scss'
import TopicBox from '../TopicBox/TopicBox'
import { Topic } from '../../types/Topics'
import ReactModal from 'react-modal'
import Comments from '../Comments/Comments'
import MyApp from '../../../pages/_app'

interface Props {

}

const TopicList = (props: Props) => {

    function openComments() {
        setCommentsSectionIsOpen(true)
    }

    function closeComments() {
        setCommentsSectionIsOpen(false)
    }
    const [commentsSectionIsOpen, setCommentsSectionIsOpen] = useState(false)

    const dummyData: Topic[] = [
        {
            question: "Cat or dog?",
            firstOption: {
                name: "Dogs are the best!",
                users: ["kevin"]
            },
            secondOption: {
                name: "Cats are cool",
                users: ["james", "tide"]
            }
        },
        {
            question: "Cat or dog?",
            firstOption: {
                name: "dog",
                users: ["james", "tide", "kevin"]
            },
            secondOption: {
                name: "cat",
                users: []
            }
        },
        {
            question: "Cat or dog?",
            firstOption: {
                name: "dog",
                users: []
            },
            secondOption: {
                name: "cat",
                users: ["james", "tide", "kevin"]
            }
        },
        {
            question: "Cat or dog?",
            firstOption: {
                name: "dog",
                users: ["kevin"]
            },
            secondOption: {
                name: "cat",
                users: ["james", "tide"]
            }
        },
        {
            question: "Cat or dog?",
            firstOption: {
                name: "dog",
                users: []
            },
            secondOption: {
                name: "cat",
                users: []
            }
        }
    ]
    

    return (
        <>
            <div className={styles.topicList}>
                {dummyData.map((topicData, index) => <TopicBox key={index} topic={topicData} openComments={openComments} />)}
            </div>
            <ReactModal
            isOpen={commentsSectionIsOpen}
            ariaHideApp={false}>
                <button className={styles.closeButton} onClick={closeComments}>x</button>
                <div className={styles.commentsContainer}>
                    <h1>Comments</h1>
                    <Comments />
                </div>
            </ReactModal>
        </>
    )
}

export default TopicList
