import React, { useState } from 'react';
import { AuthService } from '../auth/auth';
import { VALID_PASSWORD, VALID_USERNAME } from '../auth/auth';
import { Route } from '../routes/routes';
type Props = { auth: AuthService; navigate: (r: Route) => void };


const Login: React.FC<Props> = ({ auth, navigate }) => {

    const [fieldType, setFieldType] = useState("password")

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    const togglePasswordVisibility = () => {
        if (fieldType === "password") {
            setFieldType("text")
        } else {
            setFieldType("password")
        }
    }

    const cheat = () => {
        auth.login({ username: VALID_USERNAME, password: VALID_PASSWORD })
        navigate(Route.Detail);
    }


    const onSubmit = () => {

        const isAuthenticated = auth.login({ username, password });
        if (!isAuthenticated) {
            setErrorMessage('Invalid credentials');
            return;
        }
        navigate(Route.Detail);
    };


    return (
        <div className="container">
            <h2>Login</h2>

            <div className="form-field">
                <p>Username</p>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div className="form-field">
                <p>Password</p>
                <input
                    type={fieldType}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {
                    password.length > 0 && (<button className="btn" type='button' onClick={togglePasswordVisibility}>{fieldType === "password" ? "Anzeigen" : "Ausblenden"}</button>)
                }

            </div>

            {errorMessage && (<p className="error">{errorMessage}</p>)}
            <button className='submit-btn' type="button" onClick={onSubmit}>
                Login
            </button>
            <button className='btn' type="button" onClick={cheat}>
                Cheat
            </button>
        </div>
    );
};


export default Login;