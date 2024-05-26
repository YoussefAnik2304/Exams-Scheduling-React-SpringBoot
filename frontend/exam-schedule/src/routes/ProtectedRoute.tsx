import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import {useAuth} from "@/context/AuthContext.tsx";
import {GetDecodedToken} from "@/helpers/Helpers.tsx";

type Props = { children: React.ReactNode, allowedRoles: string[] };

const ProtectedRoute = ({ children, allowedRoles }: Props) => {
    const location = useLocation();
    const { isLoggedIn } = useAuth();
    const decodedToken = GetDecodedToken();
    const isAuthorized = isLoggedIn() &&  allowedRoles.includes(decodedToken.role);
    return isAuthorized ? (
        <>{children}</>
    ) : (
        <Navigate to="/unauthorized" state={{ from: location }} replace />
    );
};

export default ProtectedRoute;