import React from "react"
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import Loading from "./components/Loading";

const ProtectedRoute: React.FC = () => {
    const { user, loading } = useAuth();
    if (loading) {
        return (
            <Loading />
        );
    }
    return user ? <Outlet /> : <Navigate to="/adm/login" replace />;
};
export default ProtectedRoute;