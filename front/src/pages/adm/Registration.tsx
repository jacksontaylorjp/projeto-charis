import { useEffect, useState } from "react";
import { RegistrationService } from "../../services/RegistrationService";
import { useParams, useNavigate } from "react-router-dom";
import { IRegistration } from "../../interfaces/Registration";
import { Table, Tag, Flex, Button, Empty, Space, Switch } from "antd";
import { ChevronLeft, Printer } from "lucide-react";
import DeleteModal from "../../components/DeleteModal";
import InscricoesModal from "../../components/InscricoesModal";

const Registration = () => {
    const registrationService = new RegistrationService();
    const { eventId } = useParams();
    const navigate = useNavigate();
    const [registrations, setRegistrations] = useState<IRegistration[]>([]);
    const [loading, setLoading] = useState(true);
    const [switchLoadingId, setSwitchLoadingId] = useState<string | null>(null);

    const fetchRegistration = async () => {
        if (!eventId) {
            console.log("eventId não encontrado");
            return;
        }
        setLoading(true);
        try {
            const res = await registrationService.getByEvent(eventId);
            //@ts-ignore
            const sorted = [...res].sort((a, b) => a.name.localeCompare(b.name));
            setRegistrations(sorted);
        } catch (error) {
            console.error("Erro ao buscar registros:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleTogglePaid = async (id: string, paid: boolean) => {
        if (!eventId) return;
        setSwitchLoadingId(id);
        await registrationService.updatePaidStatus(eventId, id, !paid);
        await fetchRegistration();
        setSwitchLoadingId(null);
    };

    const handleDelete = async (id: string) => {
        if (!eventId) return;
        await registrationService.delete(eventId, id);
        fetchRegistration();
    };

    // Função para imprimir a tabela de inscrições
    const handlePrint = () => {
        const printContent = document.getElementById("registration-table-print");
        if (printContent) {
            const printWindow = window.open("", "", "width=900,height=700");
            if (printWindow) {
                printWindow.document.write(`
                    <html>
                        <head>
                            <title>Imprimir Inscrições</title>
                            <style>
                                body { font-family: Arial, sans-serif; padding: 24px; }
                                table { border-collapse: collapse; width: 100%; }
                                th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
                                th { background: #f5f5f5; }
                            </style>
                        </head>
                        <body>
                            <h2>Lista de Inscrições</h2>
                            ${printContent.innerHTML}
                        </body>
                    </html>
                `);
                printWindow.document.close();
                printWindow.focus();
                printWindow.print();
            }
        }
    };

    useEffect(() => {
        fetchRegistration();
    }, [eventId]);

    return (
        <Flex gap={10} vertical>
            <Flex align="center" justify="space-between">
                <Button type="link" onClick={() => navigate(-1)} style={{ padding: 0, fontSize: 16 }}>
                    <ChevronLeft />
                </Button>
                <Flex align="center" gap={8}>
                    <Tag color="#3a89c9" style={{ fontSize: 16, padding: "2px 12px" }}>
                        {registrations.length} inscrito{registrations.length === 1 ? "" : "s"}
                    </Tag>
                    <Button
                        type="text"
                        icon={<Printer size={20} />}
                        onClick={handlePrint}
                        style={{ color: "#3a89c9" }}
                    />
                </Flex>
            </Flex>

            <div style={{ display: "none" }}>
                <div id="registration-table-print" style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 900 }}>
                        <thead>
                            <tr>
                                <th style={{ border: "1px solid #ccc", padding: 8 }}>Nome</th>
                                <th style={{ border: "1px solid #ccc", padding: 8 }}>CPF</th>
                                <th style={{ border: "1px solid #ccc", padding: 8 }}>Telefone</th>
                                <th style={{ border: "1px solid #ccc", padding: 8 }}>Data de Nascimento</th>
                                <th style={{ border: "1px solid #ccc", padding: 8 }}>Profissão</th>
                                <th style={{ border: "1px solid #ccc", padding: 8 }}>Congregação</th>
                                <th style={{ border: "1px solid #ccc", padding: 8 }}>Função na Igreja</th>
                                <th style={{ border: "1px solid #ccc", padding: 8 }}>Nome do Pastor</th>
                                <th style={{ border: "1px solid #ccc", padding: 8 }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {registrations.map((reg) => (
                                <tr key={reg.id}>
                                    <td style={{ border: "1px solid #ccc", padding: 8 }}>{reg.name}</td>
                                    <td style={{ border: "1px solid #ccc", padding: 8 }}>{reg.cpf}</td>
                                    <td style={{ border: "1px solid #ccc", padding: 8 }}>{reg.phone}</td>
                                    <td style={{ border: "1px solid #ccc", padding: 8 }}>{reg.birthDate}</td>
                                    <td style={{ border: "1px solid #ccc", padding: 8 }}>{reg.profession}</td>
                                    <td style={{ border: "1px solid #ccc", padding: 8 }}>{reg.congregacao}</td>
                                    <td style={{ border: "1px solid #ccc", padding: 8 }}>{reg.funcaoIgreja}</td>
                                    <td style={{ border: "1px solid #ccc", padding: 8 }}>{reg.namePastor}</td>
                                    <td style={{ border: "1px solid #ccc", padding: 8 }}>{reg.paid ? "Pago" : "Não Pago"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Table
                loading={loading}
                dataSource={registrations}
                rowKey="id"
                pagination={{ pageSize: 5 }}
                columns={[
                    { title: "Nome", dataIndex: "name", key: "name", width: "25%" },
                    { title: "Telefone", dataIndex: "phone", key: "phone", width: "15%" },
                    { title: "Congregação", dataIndex: "congregacao", key: "congregacao", width: "20%" },
                    {
                        title: "Status",
                        dataIndex: "paid",
                        key: "status",
                        width: "15%",
                        render: (paid: boolean, record: IRegistration) => (
                            <Switch
                                checked={paid}
                                checkedChildren="Pago"
                                unCheckedChildren="Não Pago"
                                onChange={() => handleTogglePaid(record.id!, paid)}
                                style={{ backgroundColor: paid ? "#52c41a" : "#cf1322" }}
                                loading={switchLoadingId === record.id}
                            />
                        ),
                    },
                    {
                        title: "Ações",
                        key: "actions",
                        width: "15%",
                        render: (_: any, record: IRegistration) => (
                            <Space size={10}>
                                <InscricoesModal eventId={record.id!} registrationData={record} />
                                <DeleteModal onConfirm={() => handleDelete(record.id!)} />
                            </Space>
                        ),
                    },
                ]}
                locale={{
                    emptyText: !loading ? (
                        <Empty description="Nenhuma inscrição encontrada." />
                    ) : undefined,
                }}
                scroll={{ x: 800 }}
            />
        </Flex>
    );
};

export default Registration;
