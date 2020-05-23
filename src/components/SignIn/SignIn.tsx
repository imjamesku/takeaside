import React, { useState, useEffect, ChangeEvent } from "react";
import {useSelector, useDispatch} from 'react-redux'
import Link from 'next/link'
import {RootState} from '../../_reducers'
import {useRouter} from 'next/router'
import styles from './SignIn.module.scss'
import {userActions} from '../../_actions/user.actions'




const SignIn = () => {
    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    });
    const router = useRouter()
    const [submitted, setSubmitted] = useState(false);
    const { username, password } = inputs;
    const authentication = useSelector((state: RootState) => state.authentication)
    const dispatch = useDispatch();

    // reset login status
    useEffect(() => {
        if (authentication.loggedIn && authentication.user) {
            router.push('/')
        }
        // dispatch(userActions.logout()); 
    }, [authentication]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
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
        <div>
            <h2>Login</h2>
            <form className={styles.form} name="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input placeholder="Username" type="text" name="username" value={username} onChange={handleChange} className={'form-control' + (submitted && !username ? ' is-invalid' : '')} />
                    {submitted && !username &&
                        <div className={styles.invalidFeedback}>Username is required</div>
                    }
                </div>
                <div className="form-group">
                    <input placeholder="Password" type="password" name="password" value={password} onChange={handleChange} className={'form-control' + (submitted && !password ? ' is-invalid' : '')} />
                    {submitted && !password &&
                        <div className={styles.invalidFeedback}>Password is required</div>
                    }
                </div>
                <div className="form-group">
                    <button>
                        Login
                    </button>
                    <p>Don't have an account?</p>
                    <Link href="/signup" passHref><a>Register</a></Link>
                </div>
            </form>
        </div>
    )
};
export default SignIn;