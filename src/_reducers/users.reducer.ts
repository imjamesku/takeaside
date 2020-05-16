import { EUserActionTypes } from '../_actionTypes/user'

const initialState =  { loggedIn: false, user: null, items: [] }

export interface IUserBaseAction {
    type: EUserActionTypes,
    [x: string]: any
}

export interface IUserState {
    loggedIn: boolean;
    items: Array<any>;
}

export function authentication(state: IUserState = initialState, action: IUserBaseAction) {
    switch (action.type) {
        case EUserActionTypes.GETALL_REQUEST:
            return {
                ...state, loading: true
            }
        case EUserActionTypes.GETALL_SUCCESS:
            return {
                ...state, items: action.users
            }
        case EUserActionTypes.LOGIN_FAILURE:
            return {
                ...state, error: action.error
            }
        case EUserActionTypes.DELETE_REQUEST:
            // add 'deleting:true' property to user being deleted
            return {
                ...state,
                items: state.items.map(user => user.id === action.id ? { ...user, deleting: true } : user)
            }
        case EUserActionTypes.DELETE_SUCCESS:
            // remove deleted user from state
            return {
                ...state,
                items: state.items.filter(user => user.id !== action.id)
            }
        case EUserActionTypes.DELETE_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
            return {
                ...state,
                items: state.items.map(user => {
                    if (user.id === action.id) {
                        // make copy of user without 'deleting:true' property
                        const { deleting, ...userCopy } = user;
                        // return copy of user with 'deleteError:[error]' property
                        return { ...userCopy, deleteError: action.error };
                    }

                    return user;
                })
            };
        default:
            return state
    }
}