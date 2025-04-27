import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import Loading from "./components/Loading";
import { toast } from "react-toastify"; // Importa o toast
import { AuthService } from "./services/AuthService";

const allowedEmails = [
    "antoniomarquesfilhosdoreijc@gmail.com",
    "analuciapereirasantos40@gmail.com",
    "lemuselucas@gmail.com",
    "jacksontaylorjp@gmail.com",
];

const ProtectedRoute: React.FC = () => {
    const { user, loading } = useAuth();
    const authService = new AuthService();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && user && !allowedEmails.includes(user.email!.trim())) {
            toast.error('Você não tem permissão para acessar esta área. Você será desconectado.', {
                position: "top-center",
                autoClose: 3000,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });

            setTimeout(async () => {
                await authService.logoutWithGoogle();
                navigate('/adm/login', { replace: true });
            }, 4000);
        }
    }, [user, loading, navigate, authService]);

    if (loading) {
        return <Loading />;
    }

    if (!user) {
        return <Navigate to="/adm/login" replace />;
    }

    if (allowedEmails.includes(user.email!.trim())) {
        return <Outlet />;
    }

    return null;
};

export default ProtectedRoute;
