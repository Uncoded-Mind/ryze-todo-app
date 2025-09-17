import { useEffect, useRef, useState } from 'react';
import { AuthService,  VALID_PASSWORD, VALID_USERNAME  } from '../auth/auth';
import { Route } from '../routes/routes';

interface ILoginProps { auth: AuthService; navigate: (nextRoute: Route) => void };

function Login({ auth, navigate }: ILoginProps) {

    const [fieldType, setFieldType] = useState("password")
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const submitRef = useRef<() => void>(() => { });

    const onSubmit = () => {
        const isAuthenticated = auth.login({ username, password });
        if (!isAuthenticated) {
            setErrorMessage('Invalid credentials');
            return;
        }
        navigate(Route.Detail);
    };

    submitRef.current = onSubmit;

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

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Enter") {
                submitRef.current();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <div className="container">
            <div className="header">
                <h2>Login</h2>
            </div>
            <div className="form-container">

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
                    <div className="password-container">
                        <input
                            type={fieldType}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button disabled={password.length === 0} className="btn" type='button' onClick={togglePasswordVisibility}>{fieldType === "password" ? "Show" : "Hide"}</button>

                    </div>


                </div>
                {errorMessage && (<p className="error">{errorMessage}</p>)}

                <div className="btn-container">
                    <button className='btn' type="button" onClick={cheat}>
                        Cheat
                    </button>
                    <button className='submit-btn' type="button" onClick={onSubmit}>
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};


export default Login;