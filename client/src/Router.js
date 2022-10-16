import { Navigate, useRoutes, useSearchParams, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Records from './pages/Records';
import Doctors from './pages/Doctors';
import Analyze from './pages/Analyze';
import PrivateRoute from './privateRoute';
import PublicRoute from './publicRoute';

export default function Router() {

  const routes = [
    {
      path: '/',
      children: [
        { path: '/', element: <PrivateRoute><Home /></PrivateRoute> },
        { path: '/records', element: <PrivateRoute><Records /></PrivateRoute> },
        { path: '/doctors', element: <PrivateRoute><Doctors /></PrivateRoute> },
        { path: '/login', element: <PublicRoute><Login /></PublicRoute>},
        { path: '/register', element: <PublicRoute><Register /></PublicRoute> },
        { path: '/analyze', element: <PrivateRoute><Analyze /></PrivateRoute> },
      ],
    },
    { path: '*', element: <Navigate to="/login" replace /> },
  ]

  return useRoutes(routes);
}