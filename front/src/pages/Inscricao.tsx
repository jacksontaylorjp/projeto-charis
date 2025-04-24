import { Card, Flex, Grid, Image, List, Typography } from "antd";
import charis from "../../public/charis.png"
import ceem from "../../public/ceem.png"
import adpb from "../../public/adpb.png"
import semadpb from "../../public/semadpb.png"
import InscricoesModal from "../components/InscricoesModal";
import { useEffect, useState } from "react";
import { EventService } from "../services/EventService";
import { WhatsAppOutlined } from "@ant-design/icons";

const Inscricao = () => {
    const { useBreakpoint } = Grid;
    const screens = useBreakpoint(); // Responsividade aqui
    const isMobile = !screens.md; // Se for menor que md, é mobile
    const [eventOn, setEventOn] = useState([]);
    const eventService = new EventService();

    const findEventsOn = async () => {
        try {
            const res = await eventService.findOn();
            // @ts-ignore
            setEventOn(res)
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };

    useEffect(() => {
        findEventsOn();
    }, []);

    return (
        <>
            {/* Menu */}
            <Flex
                justify="space-between"
                align="center"
                style={{
                    width: "100vw", // Garante que o menu ocupe toda a largura da página
                    padding: "1rem 2rem",
                    backgroundColor: "#fff",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                    position: "fixed",
                    top: 0,
                    left: 0, // Alinha o menu ao início da página
                    zIndex: 1000,
                    boxSizing: "border-box", // Garante que o padding não afete o tamanho do menu
                }}
            >
                <Typography.Title
                    level={4}
                    style={{
                        margin: 0,
                        fontWeight: 600,
                        fontSize: "20px",
                        whiteSpace: "nowrap", // Evita quebra de linha no título
                    }}
                >
                    Projeto Charis - ADPB
                </Typography.Title>
                {/* <Button
                    type="primary"
                    style={{
                        fontWeight: 600,
                        whiteSpace: "nowrap", // Evita quebra de linha no botão
                    }}
                >
                    Entrar
                </Button> */}
            </Flex>

            {/* Conteúdo Principal */}
            <Flex
                vertical
                style={{
                    padding: "7rem 2rem 2rem", // Ajusta o padding para compensar o menu fixo
                    justifyContent: "center", // Centraliza verticalmente
                }}
            >
                <Flex
                    wrap="wrap"
                    justify="center"
                    style={{
                        width: "100%",
                        gap: "2rem",
                    }}
                >
                    {/* Card de Events */}

                    {eventOn.length === 0 ?
                        <Flex align="center" justify="center" vertical>
                            <Typography.Title level={3}>
                                No momento, não há inscrições disponíveis!
                            </Typography.Title>
                            <Typography>
                                Fique atento às nossas redes sociais para novidades e atualizações.
                            </Typography>
                        </Flex>
                        : eventOn.map((event) => (
                            <Card
                                // @ts-ignore
                                key={event.id}
                                title={
                                    <Typography.Title
                                        level={1}
                                        style={{
                                            margin: 0,
                                            textAlign: "center"
                                        }}
                                    >
                                        Inscrição aberta
                                    </Typography.Title>
                                }
                                style={{
                                    width: isMobile ? "100%" : "400px",
                                    maxWidth: "100%",
                                    borderRadius: "16px",
                                    padding: "2rem",
                                    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >

                                <Typography.Title
                                    level={3}
                                    style={{
                                        fontWeight: 600,
                                        fontSize: "24px",
                                        textAlign: "center",
                                    }}
                                >

                                    {
                                        // @ts-ignore
                                        event.title
                                    }
                                </Typography.Title>
                                <Typography>
                                    {
                                        // @ts-ignore
                                        event.description
                                    }
                                </Typography>

                                <InscricoesModal eventId={
                                    // @ts-ignore
                                    event.id
                                } />
                                {/* Texto acima das ações */}
                                <Typography.Text style={{ display: "block", textAlign: "center", marginBottom: 8 }}>
                                    Para mais informações, <b>clique e fale conosco pelo WhatsApp:</b>
                                </Typography.Text>
                                {/* Ações customizadas */}
                                <Flex justify="center" align="center" gap={16} style={{ marginBottom: 16 }} vertical>
                                    <a
                                        href="https://wa.me/5583988855154"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title="Fale conosco no WhatsApp: (83) 98885-5154"
                                        style={{ color: "#25D366", fontSize: 24, display: "flex", alignItems: "center", gap: 6 }}
                                    >
                                        <WhatsAppOutlined />
                                        <span style={{ color: "#222", fontSize: 16 }}>(83) 98885-5154</span>
                                    </a>
                                    <a
                                        href="https://wa.me/5583988858458"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title="Fale conosco no WhatsApp: (83) 98885-8458"
                                        style={{ color: "#25D366", fontSize: 24, display: "flex", alignItems: "center", gap: 6 }}
                                    >
                                        <WhatsAppOutlined />
                                        <span style={{ color: "#222", fontSize: 16 }}>(83) 98885-8458</span>
                                    </a>
                                </Flex>
                            </Card>
                        ))}

                    {/* Ilustração + Benefícios */}
                    <Flex
                        vertical
                        style={{
                            flex: 1,
                            minWidth: isMobile ? "100%" : "400px",
                            maxWidth: "600px",
                            borderRadius: "16px",
                            padding: "2rem",
                            display: "flex",
                            justifyContent: "center", // Centraliza verticalmente
                            alignItems: "center", // Centraliza horizontalmente
                        }}
                    >
                        <Typography.Title
                            level={4}
                            style={{
                                fontWeight: 600,
                                fontSize: "22px",
                                marginBottom: 0,
                            }}
                        >
                            Junte-se a nós nesta missão
                        </Typography.Title>

                        <Typography.Paragraph>
                            Descubra como você pode fazer a diferença:
                        </Typography.Paragraph>

                        <List style={{ lineHeight: 1.5 }}>
                            <List.Item>✔ Compartilhe o amor de Cristo.</List.Item>
                            <List.Item>✔ Impacte vidas com a Palavra de Deus.</List.Item>
                            <List.Item>✔ Experimente crescimento espiritual.</List.Item>
                        </List>

                        <Image
                            src={charis}
                            alt="Ilustração do projeto evangelístico"
                            preview={false}
                            style={{
                                marginTop: "2rem",
                                padding: "1rem",
                                height: "200px",
                                width: "100%",
                                objectFit: "contain",
                                background: "#1677ff",
                                borderRadius: "50%"
                            }}
                        />
                        <Flex
                            style={{
                                marginTop: "1rem",
                                gap: "1rem",
                                padding: "1rem",
                                justifyContent: "center",
                                width: "100%",
                                background: "#1677ff",

                            }}
                        >
                            <Image
                                src={adpb}
                                alt="Imagem pequena 1"
                                preview={false}
                                style={{
                                    height: "80px",
                                    width: "80px",
                                    objectFit: "cover",
                                    borderRadius: "50%",
                                }}
                            />
                            <Image
                                src={semadpb}
                                alt="Imagem pequena 2"
                                preview={false}
                                style={{
                                    height: "80px",
                                    width: "80px",
                                    objectFit: "cover",
                                    borderRadius: "50%",
                                }}
                            />
                            <Image
                                src={ceem}
                                alt="Imagem pequena 3"
                                preview={false}
                                style={{
                                    height: "80px",
                                    width: "80px",
                                    objectFit: "cover",
                                    borderRadius: "50%",
                                }}
                            />
                        </Flex>
                    </Flex>
                </Flex>

                {/* Footer */}
                <Flex
                    justify="center"
                    align="center"
                    style={{
                        position: "fixed", // Fixa o rodapé
                        bottom: 0, // Posiciona no final da página
                        left: 0,
                        width: "100%",
                        padding: "1rem 0",
                        backgroundColor: "#fff", // Fundo branco para contraste
                        boxShadow: "0 -2px 5px rgba(0,0,0,0.1)", // Sombra para destaque
                    }}
                >
                    <Typography.Text type="secondary" style={{ fontSize: "14px" }}>
                        © {new Date().getFullYear()} Projeto Evangelístico Charis - Todos os direitos
                        reservados.
                    </Typography.Text>
                </Flex>
            </Flex>
        </>
    );
}
export default Inscricao;