import { useEffect, useState } from "react";
import { EventService } from "../../services/EventService";
import { Content } from "antd/es/layout/layout";
import { Badge, Card, Col, Flex, Row, Select, Space, Typography } from "antd";
import { CircleCheck, CirclePlay, Edit, Eye, Play, RotateCw, X } from "lucide-react";
import Loading from "../../components/Loading";

const Inscricoes = () => {
    // const navigate = useNavigate();
    const eventService = new EventService();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshKey, setRefreshKey] = useState(0);

    const fetchEvents = async () => {
        setLoading(true);
        const res = await eventService.findAll();
        //@ts-ignore
        setEvents(res);
        setLoading(false);
    }

    useEffect(() => {
        fetchEvents()
    }, [refreshKey])

    if (loading) return <Loading />

    return (
        <Content style={{ padding: "16px" }}>
            <Flex justify="space-between" align="center" style={{ marginBottom: "15px" }}>
                <Space align="center">
                    <Typography >Filtro:</Typography>
                    <Select
                        defaultValue="todos"
                        style={{ width: 140 }}
                        // onChange={(value) => setStatusFiltro(value)}
                        options={[
                            { value: 'todos', label: 'Todos' },
                            { value: 'em andamento', label: 'Em andamento' },
                            { value: 'encerrado', label: 'Encerrado' },
                        ]}
                    />
                </Space>
                <RotateCw
                    color="#3a89c9"
                    size={20}
                    onClick={() => setRefreshKey(prevKey => prevKey + 1)}
                    style={{ cursor: "pointer" }}
                />
            </Flex>

            <Row gutter={[16, 16]} justify="center" style={{ width: "100%" }}>
                {events && events.map((item, index) => (
                    <Col key={index} xs={24} sm={12} md={8} lg={6} xl={6}>
                        <Badge.Ribbon text={String(item.registrationOpen ? "Aberto" : "Encerrado")}
                            color={item.registrationOpen ? "#3a89c9" : "#f26c4f"}
                        >
                            <Card
                                title={item.title}
                                hoverable
                                style={{ border: '1px solid', borderColor: "#3a89c9" }}
                                actions={[
                                    <Play
                                        color="#3a89c9"
                                    // onClick={() => handleStatus(item.idUser!, item.idRegistro!, "Em andamento")}
                                    />,
                                    <Edit
                                        color="green"
                                    // onClick={() => handleStatus(item.idUser!, item.idRegistro!, "Finalizado")}
                                    />,
                                    <Eye
                                        color="#f26c4f"
                                    // onClick={() => handleStatus(item.idUser!, item.idRegistro!, "Cancelado")}
                                    />,
                                ]}
                            >
                                <p><strong>Descrição:</strong> {item.description}</p>
                                <p><strong>Vagas:</strong> {item.vacancies}</p>
                                <p><strong>Quantidade de inscritos</strong> {}</p>
                            </Card>
                        </Badge.Ribbon>
                    </Col>
                ))}
            </Row>
        </Content>
    );
}
export default Inscricoes;