import React from "react"
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import { Spin, Flex } from "antd";

const ProtectedRoute: React.FC = () => {
    const { user, loading } = useAuth();
    if (loading) {
        return (
            <Flex justify="center" align="center" style={{ minHeight: "100vh" }}>
                <Spin tip="Carregando..." size="large" />
            </Flex>
        );
    }
    return user ? <Outlet /> : <Navigate to="/adm" replace />;
};
export default ProtectedRoute;