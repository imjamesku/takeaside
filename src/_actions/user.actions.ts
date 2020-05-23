import { EUserActionTypes } from '../_actionTypes/user';
import { userService } from '../_services/user.service';
import { alertActions } from './alert.actions';
// import { history } from '../_helpers/history';
import User from '../_types/User';
import UserRegisterFormData from '../_types/UserRegisterFormData';
import parseJSON from '../_helpers/parseJSON';

export const userActions = {
    loadUser,
    login,
    logout,
    register
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
            const user = parseJSON(storedData)
            if (user) {
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
                    localStorage.setItem('user', JSON.stringify(user))
                    dispatch(success(user));
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

function register(user: UserRegisterFormData, setSubmitted: React.Dispatch<React.SetStateAction<boolean>>) {
    return async (dispatch:any) => {
        dispatch(request());

        try {
            await userService.register(user)
            dispatch(success());
            dispatch(alertActions.success('Registration successful. Please Log in'));
            setSubmitted(false)
        } catch (error) {
            dispatch(failure(error.toString()));
            dispatch(alertActions.error(error.toString()));
        }
    };

    function request() { return { type: EUserActionTypes.REGISTER_REQUEST } }
    function success() { return { type: EUserActionTypes.REGISTER_SUCCESS } }
    function failure(error: string) { return { type: EUserActionTypes.REGISTER_FAILURE, error } }
}