import type React from "react";
import { useAppSelector } from "../store/hooks";
import { Navigate } from "react-router-dom";

interface PublicRouteProps {
    children: React.ReactNode;
    redirectTo?: string;
}

export default function PublicRoute({
    children,
    redirectTo = "/",
}: PublicRouteProps) {
    const { isAuthenticated } = useAppSelector((state) => state.auth);

    if (isAuthenticated) {
        return <Navigate to={redirectTo} replace />;
    }

    return <>{children}</>;
}
