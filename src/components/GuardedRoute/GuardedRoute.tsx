import { Navigate, Outlet } from 'react-router-dom';

interface GuardedRouteProps {
  isRouteAccessible?: boolean;
  redirectRoute?: string;
}

export const GuardedRoute = ({
  isRouteAccessible = false,
  redirectRoute = '/',
}: GuardedRouteProps): JSX.Element => {
  return (
    <>
      {isRouteAccessible ? (
        <Outlet />
      ) : (
        <Navigate to={redirectRoute} />
      )}
    </>
  );
};