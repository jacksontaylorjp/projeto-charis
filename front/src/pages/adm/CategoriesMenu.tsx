import { User, Bus, Users, ClipboardList, Utensils, CalendarClock, ChevronLeft } from "lucide-react";
import { Button, Flex, Row, Col } from "antd";
import { useNavigate, useParams } from "react-router-dom";


const CategoriesMenu = () => {
    const navigate = useNavigate();
    const { eventId } = useParams();
    const categories = [
        { label: "Inscritos", icon: <User size={22} />, onClick: () => navigate(`/adm/inscritos/${eventId}`) },
        { label: "Ônibus", icon: <Bus size={22} />, onClick: () => { alert("Em construção") } },
        { label: "Equipe Evangelismo", icon: <Users size={22} />, onClick: () => { alert("Em construção") } },
        { label: "Escala de Serviço", icon: <ClipboardList size={22} />, onClick: () => { alert("Em construção") } },
        { label: "Controle Refeições", icon: <Utensils size={22} />, onClick: () => { alert("Em construção") } },
        { label: "Programação e Horários", icon: <CalendarClock size={22} />, onClick: () => { alert("Em construção") } },
    ];

    return (
        <Flex vertical gap={20}>
            <Flex justify="flex-start" align="center">
                <Button type="link" onClick={() => navigate(-1)} style={{ padding: 0, fontSize: 16 }}>
                    <ChevronLeft />
                </Button>
            </Flex>
            <Row gutter={[24, 24]} justify="center" style={{padding: 18}}>
                {categories.map((cat, idx) => (
                    <Col key={cat.label} xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Flex
                            onClick={!idx ? cat.onClick : undefined}
                            style={{
                                width: "100%",
                                height: 70,
                                borderRadius: 10,
                                cursor: !idx ? "pointer" : "not-allowed",
                                background: "#3a89c9",
                                color: "#fff",
                                fontSize: 18,
                                opacity: !idx ? 1 : 0.5,
                                transition: "border 0.2s, background 0.2s",
                                padding: 10
                            }}
                        >
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                {cat.icon}
                                <span style={{ fontSize: 16 }}>{cat.label}</span>
                            </div>
                        </Flex>
                    </Col>
                ))}
            </Row>
        </Flex >
    );
};

export default CategoriesMenu;