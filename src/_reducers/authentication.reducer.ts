import { EUserActionTypes } from '../_actionTypes/user'
import User from '../_types/User';

const initialState: IAuthenticationState = { loggedIn: false, user: null, loggingIn: false };

type IAuthenticationLoginRequestAcion = {
  type: EUserActionTypes.LOGIN_REQUEST;
}
type IAuthenticationLoginSuccessAction = {
  type: EUserActionTypes.LOGIN_SUCCESS;
  user: User;
}

type IAuthenticationLoginFailureAction = {
  type: EUserActionTypes.LOGIN_FAILURE;
}

type IAuthenticationLogoutAcion = {
  type: EUserActionTypes.LOGOUT;
}

type IAuthenticationAcion = IAuthenticationLoginRequestAcion | IAuthenticationLoginSuccessAction | IAuthenticationLoginFailureAction | IAuthenticationLogoutAcion



export interface IAuthenticationState {
  loggedIn: boolean;
  loggingIn: boolean;
  user: User | null;
}
export function authentication(state = initialState, action: IAuthenticationAcion): IAuthenticationState {
  switch (action.type) {
    case EUserActionTypes.LOGIN_REQUEST:
      return {
        loggedIn: false,
        loggingIn: true,
        user: null
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