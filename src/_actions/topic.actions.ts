import { ETopicActionTypes } from "../_actionTypes/topics"
import { IGetTopicsSuccessAction, ITopicRequestAction, IGetTopicsFailureAction, topics } from "../_reducers/topic.reducer"
import Topic from "../_types/Topic"
import { topicService } from "../_services/topic_service"
import { alertActions } from "./alert.actions"
import CreateTopicFrom from "../_types/CreateTopicForm"
import update from 'immutability-helper'
import { commentService } from "../_services/comment._service"
import Comment from '../_types/Comment'

export const topicActions = {
    getAll,
    createTopic,
    vote,
    loadComments
}

function vote(optionId: number) {
    // Update state count + 1
    return (dispatch: any) => {
        // dispatch({type: ETopicActionTypes.VOTE_SUCCESS, optionId})
        topicService.vote(optionId)
            .then(data => {
                dispatch({type: ETopicActionTypes.VOTE_SUCCESS, optionId})
            })
            .catch(error => {
                // Todo: display error message
                if (error.response) {
                    alert(error.response.data.message)
                } else {
                    alert("Something went wrong")
                }
                // console.log('error', error.response)
            })
    }
}

function createTopic(formData: CreateTopicFrom, callback: () => void) {
    return (dispatch: any) => {
        topicService.createTopic(formData)
            .then((data: CreateTopicFrom) => {
                console.log('topic', data)
                dispatch({ type: ETopicActionTypes.CREATE_TOPIC_SUCCESS, topic: data })
                callback()
            })
            .catch(error => {
                dispatch({type: ETopicActionTypes.CREATE_TOPIC_FAILURE, error: error.toString()})
                if (error.response) {
                    dispatch(alertActions.error(error.response.statusText))
                } else if (error.request) {
                    dispatch(alertActions.error(error.request))
                } else {
                    dispatch(alertActions.error(error.toString()))
                }
            })
    }
}

function getAll() {
    return (dispatch: any) => {
        dispatch(request())
        topicService.getTopics()
            .then(data => {
                const topics: Array<Topic> = data.map((item: any) => ({...item, comments: []}))
                dispatch(success(topics))
            })
            .catch(error => {
                dispatch(failure(error.toString()))
                if (error.response) {
                    dispatch(alertActions.error(error.response.statusText))
                } else if (error.request) {
                    dispatch(alertActions.error(error.request))
                } else {
                    dispatch(alertActions.error(error.toString()));
                }
            })

    }
    function request(): ITopicRequestAction { return { type: ETopicActionTypes.TOPICS_REQUEST } }

    function success(topics: Array<Topic>): IGetTopicsSuccessAction {
        return { type: ETopicActionTypes.TOPICS_REQUEST_SUCCESS, topics: topics }
    }

    function failure(error: string): IGetTopicsFailureAction {
        return { type: ETopicActionTypes.TOPICS_REQUEST_FAILURE, error: error }
    }
}

function loadComments(topicId: number, topicIdx: number) {
    return (dispatch: any) => {
        commentService.getCommentsByTopicId(topicId)
            .then(data => {
                dispatch(success(data))
            })
            .catch(error => {
                console.log(error.toString())
            })
    }
    function success(comments: Array<Comment>) {
        return {
            type: ETopicActionTypes.LOAD_COMMENTS_SUCCESS,
            topicIdx,
            comments}
    }
}