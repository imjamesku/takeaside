import axios from '../_helpers/axios'
export const commentService = {
    getCommentsByTopicId,
    createComment,
    deleteComment
}

function getCommentsByTopicId(topicId: number) {
    return axios.get(`/comment/${topicId}`).then(response => response.data)
}

function createComment(topicId: number, content: string) {
    return axios.post(`/comment`, {topicId, content}).then(response => response.data)
}

function deleteComment(commentId: number) {
    return axios.delete(`/comment/${commentId}`).then(response => response.data)
}