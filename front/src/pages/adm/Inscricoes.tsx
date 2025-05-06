import { useEffect, useState } from "react";
import { EventService } from "../../services/EventService";
import { Content } from "antd/es/layout/layout";
import { Badge, Card, Col, Flex, Row, Empty } from "antd";
import { LogIn, RotateCw } from "lucide-react";
import Loading from "../../components/Loading";
import { IEvent } from "../../interfaces/Event";
import { useNavigate } from "react-router-dom";
import EventModal from "../../components/EventModal";

const Inscricoes = () => {
    const eventService = new EventService();
    const [events, setEvents] = useState<IEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshKey, setRefreshKey] = useState(0);
    const navigate = useNavigate();

    const fetchEvents = async () => {
        setLoading(true);
        const res = await eventService.findAll();
        //@ts-ignore
        setEvents(res);
        setLoading(false);
    };

    useEffect(() => {
        fetchEvents();
    }, [refreshKey]);

    return (
        <Content style={{ padding: "16px" }}>
            <EventModal />
            <Flex justify="flex-end" align="center" style={{ marginBottom: "15px" }}>
                <RotateCw
                    color="#3a89c9"
                    size={20}
                    onClick={() => setRefreshKey(prevKey => prevKey + 1)}
                    style={{ cursor: "pointer" }}
                />
            </Flex>

            {loading ? (
                <Flex justify="center" align="center" style={{ height: "60vh" }}>
                    <Loading />
                </Flex>
            ) : events.length === 0 ? (
                <Flex justify="center" align="center" style={{ height: "60vh" }}>
                    <Empty
                        description={<span>Nenhum evento encontrado.</span>}
                    />
                </Flex>
            ) : (
                <Row gutter={[16, 16]} justify="center" style={{ width: "100%" }}>
                    {events.map((item, index) => (
                        <Col key={index} xs={24} sm={12} md={8} lg={6} xl={6}>
                            <Badge.Ribbon
                                text={String(item.registrationOpen ? "Aberto" : "Encerrado")}
                                color={item.registrationOpen ? "#3a89c9" : "#f26c4f"}
                            >
                                <Card
                                    hoverable
                                    style={{ border: '1px solid', borderColor: "#3a89c9" }}
                                    actions={[
                                        <LogIn
                                            key="enter"
                                            color="#3a89c9"
                                            onClick={() => navigate(`categorias/${item.id}`)}
                                        />,
                                    ]}
                                >
                                    <p>
                                        <strong>Título:</strong> {item.title}
                                    </p>
                                    <p>
                                        <strong>Descrição:</strong> {item.description}
                                    </p>
                                    <p><strong>Vagas:</strong> {item.vacancies}</p>
                                </Card>
                            </Badge.Ribbon>
                        </Col>
                    ))}
                </Row>
            )}
        </Content>
    );
}

export default Inscricoes;
