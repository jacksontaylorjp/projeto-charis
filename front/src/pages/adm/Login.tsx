import { Button, Flex, Divider, Image } from "antd";
import logo from "../../../public/logocharis.png"
import { GoogleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { AuthService } from "../../services/AuthService";

const Login = () => {
    const authService = new AuthService();
    const { user } = useAuth();
    const navigate = useNavigate();
    const handleLoginWithGoogle = async () => {
        await authService.loginWithGoogle();
    };

    useEffect(() => {
        if (user) {
            navigate("/adm/home");
        }
    }, [user, navigate]);

    return (
        <Flex align="center" justify="center" style={{ height: "100vh" }} vertical>
            <Image src={logo} alt='logo' preview={false} width={200} style={{ marginTop: -200 }} />
            <Divider style={{ borderColor: "#1677ff" }}>Login </Divider>
            <Button
                icon={<GoogleOutlined />}
                onClick={handleLoginWithGoogle}
                style={{
                    width: "20rem",
                    height: "5%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                Entrar com Google
            </Button>
        </Flex>

    );
}
export default Login;