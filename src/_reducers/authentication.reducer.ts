import { EUserActionTypes } from '../_actionTypes/user'

// let user = JSON.parse(window.localStorage.getItem('user') ?? '');
let user = null
const initialState = user ? { loggedIn: true, user, loggingIn: false } : {loggedIn: false, user: null, loggingIn: false};

interface IAuthenticationBaseAction {
  type: EUserActionTypes.LOGIN_REQUEST | EUserActionTypes.LOGIN_SUCCESS | EUserActionTypes.LOGIN_FAILURE | EUserActionTypes.LOGOUT,
  [x: string]: any
}


export interface IAuthenticationState {
  loggedIn: boolean;
  loggingIn: boolean;
  user: any;
}
export function authentication(state = initialState, action: IAuthenticationBaseAction): IAuthenticationState {
  switch (action.type) {
    case EUserActionTypes.LOGIN_REQUEST:
      return {
        loggedIn: false,
        loggingIn: true,
        user: {}
      };
    case EUserActionTypes.LOGIN_SUCCESS:
      return {
        loggingIn: false,
        loggedIn: true,
        user: action.user
      };
    case EUserActionTypes.LOGIN_FAILURE:
    case EUserActionTypes.LOGOUT:
      return {
        loggedIn: false,
        loggingIn: false,
        user: null
      };
    default:
      return state
  }
}