import { AuthService } from "../services/AuthService";
import { Card, Button, Typography } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";

const LoginAdm = () => {
    const authService = new AuthService();
    const { user } = useAuth();
    const navigate = useNavigate();
    const handleLoginWithGoogle = async () => {
        await authService.loginWithGoogle();
    };

    useEffect(() => {
        if (user) {
            navigate("/home-adm");
        }
    }, [user, navigate]);

    return (
        <>
            <Card
                style={{
                    maxWidth: 350,
                    margin: "2rem auto",
                    textAlign: "center",
                    borderRadius: 16,
                    boxShadow: "0 4px 16px rgba(0,0,0,0.08)"
                }}
            >
                <Typography.Title level={4} style={{ marginBottom: 24 }}>
                    Faça login com Google
                </Typography.Title>
                <Button
                    type="primary"
                    icon={<GoogleOutlined />}
                    onClick={handleLoginWithGoogle}
                    style={{ width: "100%", fontWeight: 600 }}
                >
                    Entrar com Google
                </Button>
            </Card>
        </>
    );
}
export default LoginAdm;