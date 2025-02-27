import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const token = localStorage.getItem('authToken'); // Vérifie si le token est stocké

  return token ? <Outlet /> : <Navigate to="/hacker/login" replace />; 
};

export default ProtectedRoute;
