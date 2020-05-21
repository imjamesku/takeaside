import React, { useState, SyntheticEvent, FormEvent } from 'react'
import styles from './CreateTopicForm.module.scss'
import { topicActions } from '../../_actions/topic.actions';
import { useDispatch } from 'react-redux';

interface Props {
    
}

const CreateTopicForm = (props: Props) => {

    const dispatch = useDispatch()

    const [formData, setFormData] = useState({
        question: '',
        left: '',
        right: ''
    })

    const [alert, setAlert] = useState('')

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setFormData(inputs => ({ ...inputs, [name]: value }));
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        setAlert('')
        e.preventDefault()
        dispatch(topicActions.createTopic(formData, () => {
            setFormData({question: '', left: '', right: ''})
            setAlert('Topic created!')
        }))
    }
    return (
        <div className={styles.createTopic}>
            <h1>Create Topic</h1>
            {alert && <span className={styles.alert}>{alert}</span>}
            <form action="" className={styles.form} onSubmit={handleSubmit}>
                <input type="text" name="question" value={formData.question} onChange={handleChange} placeholder="Question" required />
                <input type="text" name="left" placeholder="First Option" value={formData.left} onChange={handleChange} required/>
                <input type="text" name="right" placeholder="Second Option" value={formData.right} onChange={handleChange} required/>
                <button>Create</button>
            </form>
        </div>
    )
}

export default CreateTopicForm
