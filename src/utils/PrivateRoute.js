import { Navigate } from 'react-router-dom';
import { AuthState } from '../contexts/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user } = AuthState();
  return user ? children : <Navigate to="/" />;
};

export default PrivateRoute;
