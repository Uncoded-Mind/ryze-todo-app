
import './App.css'
import { useState } from 'react'
import { Route } from './routes/routes';
import { useAuthService } from './contexts/AuthServiceContext';
//components
import Login from './pages/Login';
import Detail from './pages/Detail';

function App() {
  
  const auth = useAuthService();
  const [route, setRoute] = useState<Route>(() => (auth.isLoggedIn() ? Route.Detail : Route.Login));
  const navigate = (route: Route) => setRoute(route);

  const handleLogout = () => {
    auth.logout();
    navigate(Route.Login);
  }

  return (
    <>
      {auth.isLoggedIn() &&
        <button className="btn logout" onClick={handleLogout}>Logout</button>
      }
      <h1>Todo App</h1>
      {
        route === 'login' ? <Login auth={auth} navigate={navigate} /> : <Detail />
      }
    </>
  )
}

export default App
