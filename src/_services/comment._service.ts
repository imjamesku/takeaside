import axios from '../_helpers/axios'
export const commentService = {
    getCommentsByTopicId
}

function getCommentsByTopicId(topicId: number) {
    return axios.get(`/comment/${topicId}`).then(response => response.data)
}