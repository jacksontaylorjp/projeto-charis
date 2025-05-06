import { useEffect, useState } from "react";
import { EventService } from "../../services/EventService";
import { Content } from "antd/es/layout/layout";
import { Badge, Card, Col, Flex, Row, Empty, Tooltip } from "antd";
import { LogIn, RotateCw, Lock, Unlock } from "lucide-react";
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
            <EventModal setEvents={setEvents} />
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
                    {events.map((item: IEvent, index) => (
                        <Col
                            key={index}
                            xs={24}
                            sm={12}
                            md={8}
                            lg={8}
                            xl={8}
                            style={{ display: "flex", width: "100%", maxWidth: 300 }}
                        >
                            <Badge.Ribbon
                                text={String(item.registrationOpen ? "Aberto" : "Encerrado")}
                                color={item.registrationOpen ? "#3a89c9" : "#f26c4f"}
                            >
                                <Card
                                    style={{
                                        border: '1px solid',
                                        borderColor: "#3a89c9",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between"
                                    }}
                                    actions={[
                                        <Tooltip title="Ver categorias" key="enter-tip">
                                            <LogIn
                                                key="enter"
                                                color="#3a89c9"
                                                onClick={() => navigate(`categorias/${item.id}`)}
                                            />
                                        </Tooltip>,
                                        item.registrationOpen ? (
                                            <Tooltip title="Fechar inscrições" key="lock-tip">
                                                <Lock
                                                    key="toggle"
                                                    color="#f26c4f"
                                                    style={{ cursor: "pointer" }}
                                                    onClick={async () => {
                                                        //@ts-ignore
                                                        const updated = await eventService.updateStatus(item.id, false);
                                                        if (updated) {
                                                            setEvents(prev =>
                                                                prev.map(ev =>
                                                                    ev.id === item.id
                                                                        ? { ...ev, registrationOpen: false }
                                                                        : ev
                                                                )
                                                            );
                                                        }
                                                    }}
                                                />
                                            </Tooltip>
                                        ) : (
                                            <Tooltip title="Abrir inscrições" key="unlock-tip">
                                                <Unlock
                                                    key="toggle"
                                                    color="#3a89c9"
                                                    style={{ cursor: "pointer" }}
                                                    onClick={async () => {
                                                        //@ts-ignore
                                                        const updated = await eventService.updateStatus(item.id, true);
                                                        if (updated) {
                                                            setEvents(prev =>
                                                                prev.map(ev =>
                                                                    ev.id === item.id
                                                                        ? { ...ev, registrationOpen: true }
                                                                        : ev
                                                                )
                                                            );
                                                        }
                                                    }}
                                                />
                                            </Tooltip>
                                        )
                                    ]}
                                >
                                    <div style={{ flex: 1 }}>
                                        <p>
                                            <strong>Título:</strong> {item.title}
                                        </p>
                                        <p style={{ wordBreak: "break-word" }}>
                                            <strong>Descrição:</strong> {item.description}
                                        </p>
                                        <p><strong>Vagas:</strong> {item.vacancies}</p>
                                    </div>
                                    <div>
                                        <p>
                                            <strong>Valor:</strong> {item.value !== undefined && item.value !== null
                                                ? `R$ ${Number(item.value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                                                : ''}
                                        </p>
                                    </div>
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
