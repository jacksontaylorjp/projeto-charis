import { useEffect, useState } from "react";
import { Typography, Card, Row, Col, Statistic, Spin, Divider } from "antd";
import { Content } from "antd/es/layout/layout";
import { useAuth } from "../../contexts/AuthContext";
import { EventService } from "../../services/EventService";
import { RegistrationService } from "../../services/RegistrationService";
import { Calendar, Users, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "react-toastify";

const Home = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [eventCount, setEventCount] = useState(0);
    const [registrationCount, setRegistrationCount] = useState(0);
    const [paidCount, setPaidCount] = useState(0);
    const [unpaidCount, setUnpaidCount] = useState(0);
    const eventsService = new EventService();
    const registrationService = new RegistrationService();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {

                // Buscar eventos
                const events = await eventsService.findAll();
                //@ts-ignore
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

    return (
        <Content style={{ padding: "16px" }}>
            <Typography.Title level={3}>
                {`Bem vindo, ${user?.displayName?.split(" ")[0]}.`}
            </Typography.Title>
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
                                prefix={<Calendar color="#3a89c9" />}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Card>
                            <Statistic
                                title="Total de Inscritos"
                                value={registrationCount}
                                prefix={<Users color="#52c41a" />}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Card>
                            <Statistic
                                title="Pagos"
                                value={paidCount}
                                prefix={<CheckCircle color="#52c41a" />}
                                valueStyle={{ color: "#52c41a" }}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Card>
                            <Statistic
                                title="Não Pagos"
                                value={unpaidCount}
                                prefix={<AlertCircle color="#cf1322" />}
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