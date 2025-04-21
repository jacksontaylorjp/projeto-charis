import React from "react"
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

const ProtectedRoute: React.FC = () => {
    const { user, loading } = useAuth();
    if (loading) {
        return (
            <div>
                Carregando...
            </div>
        );
    }
    return user ? <Outlet /> : <Navigate to="/" replace />;
};
export default ProtectedRoute;