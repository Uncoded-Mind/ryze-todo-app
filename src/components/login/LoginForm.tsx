import { useEffect, useRef, useState } from "react";
import { ILoginProps } from "../../pages/Login";
import { Route } from "../../routes/routes";

function LoginForm({ auth, navigate }: ILoginProps) {

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
        <div className="form-container">
            <div className="form-field">
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    placeholder="Username"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="form-field">
                <label htmlFor="password-input">Password</label>
                <div className="password-container">
                    <input
                        type={fieldType}
                        placeholder="Password"
                        id="password-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button disabled={password.length === 0} className="btn" type='button' onClick={togglePasswordVisibility}>
                        {fieldType === "password" ? "Show" : "Hide"}
                    </button>
                </div>
            </div>
            {errorMessage &&
                <p className="error">{errorMessage}</p>
            }
            <hr className="ruler" />
            <div className="btn-container">
                <button className='login-btn' type="button" onClick={onSubmit}>
                    Login
                </button>
            </div>
        </div>
    )
}

export default LoginForm