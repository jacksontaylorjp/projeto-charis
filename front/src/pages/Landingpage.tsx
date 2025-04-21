import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../services/AuthService";

const Landingpage = () => {
    const { user } = useAuth();
    const authService = new AuthService();
    const navigate = useNavigate();
    const handleLoginWithGoogle = async () => {
        await authService.loginWithGoogle();
    }

    useEffect(() => {
        if (user) {
            navigate("/home");
        }
    }, [user]);
    return (
        <>
            <h1>Landingpage</h1>
            <button onClick={handleLoginWithGoogle}>Login</button>
        </>
    );
}
export default Landingpage;