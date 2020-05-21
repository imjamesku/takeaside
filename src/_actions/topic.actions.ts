import { ETopicActionTypes } from "../_actionTypes/topics"
import { IGetTopicsSuccessAction, ITopicRequestAction, IGetTopicsFailureAction } from "../_reducers/topic.reducer"
import Topic from "../_types/Topic"
import { topicService } from "../_services/topic_service"
import { alertActions } from "./alert.actions"
import CreateTopicFrom from "../_types/CreateTopicForm"
import update from 'immutability-helper'

export const topicActions = {
    getAll,
    createTopic,
    vote
}

function vote(optionId: number) {
    // Update state count + 1
    return (dispatch: any) => {
        // dispatch({type: ETopicActionTypes.VOTE_SUCCESS, optionId})
        topicService.vote(optionId)
            .then(data => {
                console.log('voted')
                dispatch({type: ETopicActionTypes.VOTE_SUCCESS, optionId})
            })
            .catch(error => {
                console.log('error', error.response)
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
                dispatch(success(data))
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