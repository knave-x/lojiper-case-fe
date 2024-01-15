import { useContext, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { message } from "antd";
import unauthorizedPage from "../images/unauthorized.jpeg";
import { useTranslation } from "react-i18next";
import React from "react";
import { UserContext } from "../context/user.context";

const PrivateRoute = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const redirectLoginUrl = `/login?redirectTo=${encodeURI(location.pathname)}`;
  const token = localStorage.getItem("token");
  const { user, fetchUser } = useContext(UserContext);

  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token]);

  return !token ? <Navigate to={redirectLoginUrl} /> : <Outlet />;
};

export default PrivateRoute;
