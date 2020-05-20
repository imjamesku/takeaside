import { ETopicActionTypes } from "../_actionTypes/topics"
import { IGetTopicsSuccessAction, ITopicRequestAction, IGetTopicsFailureAction } from "../_reducers/topic.reducer"
import Topic from "../_types/Topic"
import { topicService } from "../_services/topic_service"
import { alertActions } from "./alert.actions"

export const topicActions = {
    getAll
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
    function request(): ITopicRequestAction {return {type: ETopicActionTypes.TOPICS_REQUEST}}

    function success(topics: Array<Topic>): IGetTopicsSuccessAction {
        return {type: ETopicActionTypes.TOPICS_REQUEST_SUCCESS, topics: topics}
    }

    function failure(error: string): IGetTopicsFailureAction {
        return {type: ETopicActionTypes.TOPICS_REQUEST_FAILURE, error: error}
    }
}