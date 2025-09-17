import { AuthService } from '../services/auth/auth';
import LoginForm from '../components/login/LoginForm';
import { Route } from '../routes/routes';


export interface ILoginProps {
    auth: AuthService;
    navigate: (nextRoute: Route) => void
};

function Login({ auth, navigate }: ILoginProps) {

    return (
        <>
            <div className="header">
                <h2>Login</h2>
            </div>
            <LoginForm auth={auth} navigate={navigate} />
        </>
    );
};


export default Login;