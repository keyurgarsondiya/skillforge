import React from 'react';
import { Navigate } from 'react-router-dom';
import { Pages } from '../../constants';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({
  children,
}: ProtectedRouteProps): React.ReactElement => {
  const isAuthenticated = Boolean(localStorage.getItem('token'));
  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to={Pages.Login} replace />
  );
};
