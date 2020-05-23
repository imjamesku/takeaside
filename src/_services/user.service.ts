import {authHeader} from '../_helpers/authHeader'
import UserRegisterFormData from '../_types/UserRegisterFormData';
import axios from '../_helpers/axios';

export const userService = {
    login,
    logout,
    register
}

function login(username: string, password: string) {
    return axios.post('/users/authenticate', {username, password})
        .then((response: any) => {return response.data})
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function register(user: UserRegisterFormData) {
    return axios.post('/users/register', user)
    .then((response: any) => {return response.data})
};


function handleResponse(response: any) {
    return response.text().then((text: string) => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

