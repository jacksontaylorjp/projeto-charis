import { Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import { useAuth } from "../../contexts/AuthContext";

const Home = () => {
    const { user } = useAuth();
    return (
        <Content style={{ padding: "16px" }}>
            <Typography.Title>
                {`Bem vindo, ${user?.displayName?.split(" ")[0]}.`}
            </Typography.Title>
        </Content>
    );
}
export default Home;