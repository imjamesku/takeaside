import { EUserActionTypes } from "../_actionTypes/user";

export interface IRegistrationState {
    registering: boolean;
}

interface IRegistrationBaseAction {
    type: EUserActionTypes.REGISTER_REQUEST | EUserActionTypes.REGISTER_SUCCESS | EUserActionTypes.REGISTER_FAILURE
  }
export function registration(state: IRegistrationState = {registering: false}, action: IRegistrationBaseAction): IRegistrationState {
    switch (action.type) {
        case EUserActionTypes.REGISTER_REQUEST:
            return {registering: true}
        case EUserActionTypes.REGISTER_SUCCESS:
        case EUserActionTypes.REGISTER_FAILURE:
        default:
            return {registering:false}
    }
}