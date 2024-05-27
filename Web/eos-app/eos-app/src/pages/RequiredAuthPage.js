import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequiredAuthPage = ({ allowPermissions = [] }) => {
  const { user } = useSelector((state) => state.auth);

  const userPermissions = user?.role?.name;
  const location = useLocation();
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return (userPermissions && allowPermissions.includes(userPermissions)) ||
    allowPermissions.length <= 0 ? (
    <Outlet></Outlet>
  ) : user && user.id ? (
    <Navigate to="/unauthorize" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequiredAuthPage;
