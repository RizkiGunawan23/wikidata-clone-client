import { createBrowserRouter } from "react-router-dom"; // 👈 FIX: tambah -dom
import PublicRoute from "./PublicRoute";
import LoginPage from "../pages/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import SearchPage from "../pages/SearchPage";
import Layout from "../components/layout/Layout";
import HomePage from "../pages/HomePage";

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
            <Layout>
                <HomePage />
            </Layout>
        ),
    },
]);
