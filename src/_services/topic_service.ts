import Axios from "axios";
import axios from "../_helpers/axios";
import CreateTopicFrom from "../_types/CreateTopicForm";

export const topicService = {
    getTopics,
    handleError,
    vote,
    createTopic
}

function createTopic(formData: CreateTopicFrom){
    return axios.post('/topics', formData).then(response => ({...response.data, comments: []}))
}

function getTopics() {
    return axios.get('/topics').then(response => response.data.map(topic => ({...topic, comments: []})))
}

function vote(optionId: number) {
    return axios.post('/vote', {optionId}).then(response => response.data)
}

function handleError(error: any) {
    if (error.response) {
        console.log(error.response)
    } else if (error.request) {
        console.log(error.request)
    } else {
        console.log('Error', error.message)
    }
    console.log(error.config)
}