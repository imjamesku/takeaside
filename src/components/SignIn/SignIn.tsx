import React, { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux'
import Link from 'next/link'
import {RootState} from '../../_reducers'
import {useRouter} from 'next/router'

import {userActions} from '../../_actions/user.actions'




const SignIn = () => {
    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    });
    const router = useRouter()
    const [submitted, setSubmitted] = useState(false);
    const { username, password } = inputs;
    const loggingIn = useSelector((state: RootState) => state.authentication.loggingIn);
    const loggedIn = useSelector((state: RootState) => state.authentication.loggedIn)
    const dispatch = useDispatch();

    // reset login status
    useEffect(() => {
        if (loggedIn) {
            router.push('/')
        }
        // dispatch(userActions.logout()); 
    }, [loggedIn]);

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    function handleSubmit(e: React.FormEvent<EventTarget>) {
        e.preventDefault();

        setSubmitted(true);
        if (username && password) {
            dispatch(userActions.login(username, password));
        }
    }

    return (
        <div className="col-lg-8 offset-lg-2">
            <h2>Login</h2>
            <form name="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" name="username" value={username} onChange={handleChange} className={'form-control' + (submitted && !username ? ' is-invalid' : '')} />
                    {submitted && !username &&
                        <div className="invalid-feedback">Username is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" value={password} onChange={handleChange} className={'form-control' + (submitted && !password ? ' is-invalid' : '')} />
                    {submitted && !password &&
                        <div className="invalid-feedback">Password is required</div>
                    }
                </div>
                <div className="form-group">
                    <button className="btn btn-primary">
                        {loggingIn && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Login
                    </button>
                    <Link href="/signup"><a>Register</a></Link>
                </div>
            </form>
        </div>
    )
};
export default SignIn;