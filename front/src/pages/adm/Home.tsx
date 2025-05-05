import { useEffect, useState } from "react";
import { Typography, Card, Row, Col, Statistic, Spin, Divider, Select, Flex } from "antd";
import { Content } from "antd/es/layout/layout";
import { useAuth } from "../../contexts/AuthContext";
import { EventService } from "../../services/EventService";
import { RegistrationService } from "../../services/RegistrationService";
import { Calendar, Users, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "react-toastify";
import { IEvent } from "../../interfaces/Event";

const Home = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [eventCount, setEventCount] = useState(0);
    const [registrationCount, setRegistrationCount] = useState(0);
    const [paidCount, setPaidCount] = useState(0);
    const [unpaidCount, setUnpaidCount] = useState(0);
    const [events, setEvents] = useState<IEvent[]>([]);
    const [selectedEventId, setSelectedEventId] = useState<string>("all");
    const eventsService = new EventService();
    const registrationService = new RegistrationService();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 767);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Buscar eventos
                const events = await eventsService.findAll();
                //@ts-ignore
                setEvents(events);
                setEventCount(events.length);

                // Buscar inscrições de todos os eventos
                let totalRegistrations = 0;
                let totalPaid = 0;
                let totalUnpaid = 0;

                //@ts-ignore
                for (const event of events) {
                    const regs = await registrationService.getByEvent(event.id);
                    if (Array.isArray(regs)) {
                        totalRegistrations += regs.length;
                        totalPaid += regs.filter((r: any) => r.paid).length;
                        totalUnpaid += regs.filter((r: any) => !r.paid).length;
                    }
                }
                setRegistrationCount(totalRegistrations);
                setPaidCount(totalPaid);
                setUnpaidCount(totalUnpaid);
            } catch (e) {
                //@ts-ignore
                toast.error("Erro ao carregar os dados.", e)
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Atualiza os dados ao trocar o filtro
    useEffect(() => {
        const fetchFiltered = async () => {
            if (selectedEventId === "all") {
                // Já carregado no primeiro useEffect
                let totalRegistrations = 0;
                let totalPaid = 0;
                let totalUnpaid = 0;
                for (const event of events) {
                    const regs = await registrationService.getByEvent(event.id);
                    if (Array.isArray(regs)) {
                        totalRegistrations += regs.length;
                        totalPaid += regs.filter((r: any) => r.paid).length;
                        totalUnpaid += regs.filter((r: any) => !r.paid).length;
                    }
                }
                setRegistrationCount(totalRegistrations);
                setPaidCount(totalPaid);
                setUnpaidCount(totalUnpaid);
            } else {
                const event = events.find(e => e.id === selectedEventId);
                if (event) {
                    const regs = await registrationService.getByEvent(event.id);
                    setRegistrationCount(regs.length);
                    setPaidCount(regs.filter((r: any) => r.paid).length);
                    setUnpaidCount(regs.filter((r: any) => !r.paid).length);
                } else {
                    setRegistrationCount(0);
                    setPaidCount(0);
                    setUnpaidCount(0);
                }
            }
        };
        if (events.length) fetchFiltered();
        // eslint-disable-next-line
    }, [selectedEventId]);

    return (
        <Content style={{ padding: "16px" }}>
            <Flex
                align={isMobile ? "stretch" : "center"}
                justify={isMobile ? "flex-start" : "space-between"}
                vertical={isMobile}
                gap={isMobile ? 12 : 0}
            >
                <Typography.Title level={3}>
                    {`Bem vindo, ${user?.displayName?.split(" ")[0]}.`}
                </Typography.Title>
                <Select
                    style={{ width: isMobile ? "100%" : 320 }}
                    value={selectedEventId}
                    onChange={setSelectedEventId}
                    options={[
                        { value: "all", label: "Todas as inscrições" },
                        ...events.map((e: IEvent) => ({
                            value: e.id,
                            label: e.title || e.title || "Evento"
                        }))
                    ]}
                />
            </Flex>
            <Divider />
            {loading ? (
                <Spin size="large" />
            ) : (
                <Row gutter={[24, 24]}>
                    <Col xs={24} sm={12} md={6}>
                        <Card>
                            <Statistic
                                title="Inscrições Criadas"
                                value={eventCount}
                                prefix={<span style={{ verticalAlign: "middle", display: "inline-flex", alignItems: "center" }}><Calendar color="#3a89c9" /></span>}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Card>
                            <Statistic
                                title="Total de Inscritos"
                                value={registrationCount}
                                prefix={<span style={{ verticalAlign: "middle", display: "inline-flex", alignItems: "center" }}><Users color="#52c41a" /></span>}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Card>
                            <Statistic
                                title="Pagos"
                                value={paidCount}
                                prefix={<span style={{ verticalAlign: "middle", display: "inline-flex", alignItems: "center" }}><CheckCircle color="#52c41a" /></span>}
                                valueStyle={{ color: "#52c41a" }}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Card>
                            <Statistic
                                title="Não Pagos"
                                value={unpaidCount}
                                prefix={<span style={{ verticalAlign: "middle", display: "inline-flex", alignItems: "center" }}><AlertCircle color="#cf1322" /></span>}
                                valueStyle={{ color: "#cf1322" }}
                            />
                        </Card>
                    </Col>
                </Row>
            )}
        </Content>
    );
};
export default Home;