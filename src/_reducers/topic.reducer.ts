import { ETopicActionTypes } from "../_actionTypes/topics"
import Topic from "../_types/Topic"


const initialState: ITopicState = { loading: false, error: '', topics: []}

export type ITopicBaseAction = {
}

export type ITopicRequestAction = ITopicBaseAction & {
    type: ETopicActionTypes.TOPICS_REQUEST;
}

export type IGetTopicsSuccessAction = ITopicBaseAction & {
    type: ETopicActionTypes.TOPICS_REQUEST_SUCCESS;
    topics: Array<Topic>;
}

export type IGetTopicsFailureAction = ITopicBaseAction & {
    type: ETopicActionTypes.TOPICS_REQUEST_FAILURE;
    error: string;
}

export type ITopicAction = ITopicRequestAction | IGetTopicsSuccessAction | IGetTopicsFailureAction

export type ITopicState = {
    loading: boolean;
    error: string;
    topics: Array<Topic>;
}

export function topics(state: ITopicState = initialState, action: ITopicAction): ITopicState {
    switch (action.type) {
        case ETopicActionTypes.TOPICS_REQUEST:
            return {
                ...state, loading: true, error: ''
            }
        case ETopicActionTypes.TOPICS_REQUEST_SUCCESS:
            return {
                topics: action.topics, loading: false, error: ''
            }
        case ETopicActionTypes.TOPICS_REQUEST_FAILURE:
            return {
                ...state, error: action.error, loading: false
            }
        default:
            return state
    }
}