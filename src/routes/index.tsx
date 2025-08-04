import { createBrowserRouter } from "react-router-dom"; // 👈 FIX: tambah -dom
import PublicRoute from "./PublicRoute";
import LoginPage from "../pages/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import DashboardPage from "../pages/DashboardPage";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: (
            <PublicRoute>
                <LoginPage />
            </PublicRoute>
        ),
    },
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <DashboardPage />
            </ProtectedRoute>
        ),
    },
]);
