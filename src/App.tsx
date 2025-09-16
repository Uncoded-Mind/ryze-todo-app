
import { useState } from 'react'
import './App.css'
import { AuthService } from './auth/auth';
import { TodoService } from './services/todo';
import Login from './pages/Login';
import Detail from './pages/Detail';
import { Route } from './routes/routes';

function App() {

  const auth = new AuthService();
  const todoService = new TodoService();

  const [route, setRoute] = useState<Route>(() => (auth.isLoggedIn() ? Route.Detail : Route.Login));
  const navigate = (route: Route) => setRoute(route);

  if (route === 'login') return <Login auth={auth} navigate={navigate} />;
  return <Detail auth={auth} todoService={todoService} navigate={navigate} />;
}

export default App
