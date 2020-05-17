import { EUserActionTypes } from '../_actionTypes/user';
import { userService } from '../_services/user.service';
import { alertActions } from './alert.actions';
// import { history } from '../_helpers/history';
import User from '../_types/User';

export const userActions = {
    loadUser,
    login,
    logout,
};

function loadUser() {
    // console.log(123)
    const success = (user: User) => {
        return {
            type: EUserActionTypes.LOGIN_SUCCESS,
            user: user
        }
    }
    return (dispatch: any) => {
        const storedData = localStorage.getItem('user')
        if (storedData){
            const user = JSON.parse(storedData)
            if (user) {
                console.log(success(user))
                // console.log(user)
                dispatch(success(user))
            }
        }
       
    }
    
}

function login(username: string, password: string) {
    return (dispatch: any) => {
        // console.log("login")
        dispatch(request());

        userService.login(username, password)
            .then(
                (user: any) => { 
                    dispatch(success(user));
                    //TODO: redirect after login
                },
                (error: any) => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: EUserActionTypes.LOGIN_REQUEST } }
    function success(user: User) { return { type: EUserActionTypes.LOGIN_SUCCESS, user } }
    function failure(error: string) { return { type: EUserActionTypes.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: EUserActionTypes.LOGOUT };
}