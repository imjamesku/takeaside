import { ETopicActionTypes } from "../_actionTypes/topics"
import Topic from "../_types/Topic"
import update from 'immutability-helper'


const initialState: ITopicState = { loading: false, error: '', topics: [] }


export type ITopicRequestAction = {
    type: ETopicActionTypes.TOPICS_REQUEST;
}

export type IGetTopicsSuccessAction = {
    type: ETopicActionTypes.TOPICS_REQUEST_SUCCESS;
    topics: Array<Topic>;
}

export type IGetTopicsFailureAction = {
    type: ETopicActionTypes.TOPICS_REQUEST_FAILURE;
    error: string;
}

export type ICreateTopicRequestAction = {
    type: ETopicActionTypes.CREATE_TOPIC_REQUEST;
}

export type ICreateTopicSuccessAction = {
    type: ETopicActionTypes.CREATE_TOPIC_SUCCESS;
    topic: Topic;
}

export type ICreateTopicFailureAction = {
    type: ETopicActionTypes.CREATE_TOPIC_FAILURE;
    error: string;
}

export type IVoteSuccessAction = {
    type: ETopicActionTypes.VOTE_SUCCESS;
    optionId: number;
}

export type ITopicAction = ITopicRequestAction | IGetTopicsSuccessAction | IGetTopicsFailureAction | ICreateTopicRequestAction | ICreateTopicSuccessAction | ICreateTopicFailureAction | IVoteSuccessAction

export type ITopicState = {
    loading: boolean;
    error: string;
    topics: Array<Topic>;
}

export function topics(state: ITopicState = initialState, action: ITopicAction): ITopicState {
    switch (action.type) {
        case ETopicActionTypes.TOPICS_REQUEST:
        case ETopicActionTypes.CREATE_TOPIC_REQUEST:
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
        case ETopicActionTypes.CREATE_TOPIC_SUCCESS:
            return {
                loading: false,
                error: '',
                topics: [...state.topics, action.topic]
            }
        case ETopicActionTypes.CREATE_TOPIC_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            }
        case ETopicActionTypes.VOTE_SUCCESS:
            const idx = state.topics.findIndex(topic => topic.left.id === action.optionId || topic.right.id === action.optionId)
            if (state.topics[idx].left.id === action.optionId) {
                //update left side
                console.log('idx', idx)
                const count = state.topics[idx].left.count
                return {
                    ...state,
                    topics: update(state.topics, {
                        [idx]: {left: {count: {$set: count+1}}}
                    })
                }

            } else {
                //update right side
                const count = state.topics[idx].right.count
                return {
                    ...state,
                    topics: update(state.topics, {
                        [idx]: {right: {count: {$set: count+1}}}
                    })
                }
            }
        default:
            return state
    }
}