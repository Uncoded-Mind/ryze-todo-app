
import './App.css'
import { useState } from 'react'
import { Route } from './routes/routes';
import { useAuthService } from './context/AuthServiceContext';
//components
import Login from './pages/Login';
import Detail from './pages/Detail';


function App() {

  const auth = useAuthService();

  const [route, setRoute] = useState<Route>(() => (auth.isLoggedIn() ? Route.Detail : Route.Login));
  const navigate = (route: Route) => setRoute(route);

  if (route === 'login') return <Login auth={auth} navigate={navigate} />;
  return <Detail auth={auth} navigate={navigate} />;
}

export default App
