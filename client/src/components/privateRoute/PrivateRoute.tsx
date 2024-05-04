import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';

export const PrivateRoute = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
  const location = useLocation();

  console.log("isLoggedIn:", isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
