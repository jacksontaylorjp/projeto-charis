import { Menu, Layout, Card, Row, Col, Typography, Button, Spin } from "antd";
import { AppstoreOutlined, LogoutOutlined } from "@ant-design/icons";
import { AuthService } from "../services/AuthService";
import { EventService } from "../services/EventService";
import { useEffect, useState } from "react";
import InscritosModalTemp from "../components/InscritosModalTemp";

const { Header, Content } = Layout;

const HomeAdm = () => {
    // const navigate = useNavigate();
    const authService = new AuthService();
    const eventService = new EventService();

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleLogout = async () => {
        await authService.logoutWithGoogle();
    };

    const fetchEvents = async () => {
        setLoading(true);
        const res = await eventService.findAll();
        //@ts-ignore
        setEvents(res);
        setLoading(false);
    }

    useEffect(() => {
        fetchEvents()
    }, [])

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Header style={{ background: "#fff", padding: 0, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Menu
                    mode="horizontal"
                    defaultSelectedKeys={["inscricoes"]}
                    style={{ borderBottom: 0, flex: 1 }}
                    items={[
                        {
                            key: "inscricoes",
                            icon: <AppstoreOutlined />,
                            label: "Inscrições",
                            // onClick: () => navigate("/inscricoes")
                        }
                    ]}
                />
                <Button
                    type="primary"
                    icon={<LogoutOutlined />}
                    style={{ marginRight: 16 }}
                    onClick={handleLogout}
                >
                    Sair
                </Button>
            </Header>
            <Content style={{ padding: "2rem" }}>
                {loading ? (
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 200 }}>
                        <Spin size="large" />
                    </div>
                ) : (
                    <Row gutter={[24, 24]}>
                        {events && events.map((item) => (
                            //@ts-ignore
                            <Col xs={24} sm={12} md={8} key={item.id}>

                                <Card
                                    title={
                                        //@ts-ignore
                                        item.title}
                                    style={{ borderRadius: 12, minHeight: 180 }}
                                    actions={[
                                        // <Button
                                        //     type="link"
                                        //     // onClick={() => navigate("/inscricoes")}
                                        //     key="acessar"
                                        // >
                                        //     Encerrar
                                        // </Button>
                                        // ,
                                        <InscritosModalTemp event={item}/>
                                    ]}
                                >
                                    <Typography.Text>
                                        {
                                            //@ts-ignore
                                            item.description}
                                    </Typography.Text>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}
            </Content>
        </Layout>
    );
}
export default HomeAdm;