import { useEffect, useState } from "react";
import { RegistrationService } from "../../services/RegistrationService";
import { useParams, useNavigate } from "react-router-dom";
import { IRegistration } from "../../interfaces/Registration";
import { Table, Tag, Tooltip, Flex, Button } from "antd";
import { Check, ChevronLeft, X } from "lucide-react";

const Registration = () => {
    const registrationService = new RegistrationService();
    const { eventId } = useParams();
    const navigate = useNavigate();
    const [registrations, setRegistrations] = useState<IRegistration[]>([]);

    const fetchRegistration = async () => {
        if (!eventId) {
            console.log("eventId não encontrado");
            return;
        }
        const res = await registrationService.getByEvent(eventId);
        //@ts-ignore
        const sorted = [...res].sort((a, b) => a.name.localeCompare(b.name));
        setRegistrations(sorted);
    };

    const handleTogglePaid = async (id: string, paid: boolean) => {
        if (!eventId) return;
        await registrationService.updatePaidStatus(eventId, id, !paid);
        fetchRegistration();
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
                <Tag color="blue" style={{ fontSize: 16, padding: "2px 12px" }}>
                    {registrations.length} inscrito{registrations.length === 1 ? "" : "s"}
                </Tag>
            </Flex>
            <Table
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
                        render: (paid: boolean) =>
                            paid ? (
                                <Tag color="green">Pago</Tag>
                            ) : (
                                <Tag color="red">Não Pago</Tag>
                            ),
                    },
                    {
                        title: "Ações",
                        key: "actions",
                        width: "15%",
                        render: (_: any, record: IRegistration) => (
                            <Tooltip title={record.paid ? "Marcar como não pago" : "Marcar como pago"}>
                                <span
                                    style={{ cursor: "pointer" }}
                                    //@ts-ignore
                                    onClick={() => handleTogglePaid(record.id, record.paid)}
                                >
                                    {record.paid ? <X color="red" /> : <Check color="green" />}
                                </span>
                            </Tooltip>
                        ),
                    },
                ]}
                scroll={{ x: 800 }}
            />
        </Flex>
    );
};

export default Registration;