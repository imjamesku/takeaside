import Axios from "axios";
import axios from "../components/helpers/axios";

export const topicService = {
    getTopics,
    handleError
}

function getTopics() {
    return axios.get('/topics').then(response => response.data)
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