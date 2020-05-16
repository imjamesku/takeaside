import { EAlertActionTypes } from '../_actionTypes/alert';

export const alertActions = {
    success,
    error,
    clear
};

function success(message:string) {
    return { type: EAlertActionTypes.SUCCESS, message };
}

function error(message: string) {
    return { type: EAlertActionTypes.ERROR, message };
}

function clear() {
    return { type: EAlertActionTypes.CLEAR };
}