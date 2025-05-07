import { useState } from "react";
import { IEvent } from "../interfaces/Event";
import { useAuth } from "../contexts/AuthContext";
import { Button, ConfigProvider, Flex, FloatButton, Form, FormProps, Input, InputNumber, Modal, Tooltip } from "antd";
import { EventService } from "../services/EventService";
import { FilePenLine, Plus } from "lucide-react";

interface EventModalProps {
    data?: IEvent;
    setEvents: React.Dispatch<React.SetStateAction<IEvent[]>>;
}
const EventModal = ({ data, setEvents }: EventModalProps) => {
    const { user } = useAuth();
    const eventService = new EventService();
    const [form] = Form.useForm();
    const [isloading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onFinish: FormProps<IEvent>['onFinish'] = (values) => {
        const newEvent: IEvent = {
            ...values
        };
        // const editData: IEvent = {
        // }

        if (!data && !user) return;
        // if (data) {
        //     edit();
        //     return;
        // }
        create(newEvent);
    };

    const onFinishFailed: FormProps<IEvent>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const create = async (event: IEvent) => {
        try {
            setIsLoading(true);
            const res = await eventService.create(event);
            if (res) {
                setIsLoading(false);
                //@ts-ignore
                setEvents(prev => [...prev, res]);
                form.resetFields();
                setIsModalOpen(false);
            }

        } catch (error) {
            console.log('Failed:', error);
        }
    };
    // const edit = async (userId: string, registroId: string, newData: Partial<ColetaInvestidor>) => {
    //     try {
    //         setIsLoading(true);
    //         const res = await coletaService.editData(userId, registroId, newData);

    //         if (res) {
    //             setIsLoading(false);
    //             // @ts-ignore
    //             setData((prev) =>
    //                 // @ts-ignore
    //                 prev.map((item) => (item.id === registroId ? { ...item, ...res } : item))
    //             );
    //             form.resetFields();
    //             setIsModalOpen(false);
    //         }

    //     } catch (error) {
    //         console.log('Failed:', error);
    //     }
    // };


    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        form.resetFields();
        setIsModalOpen(false);
    };

    return (
        <>  {data ?
            <Tooltip title="Editar evento">
                <FilePenLine onClick={showModal} style={{ cursor: "pointer", color: "#3a89c9" }} />
            </Tooltip>
            :
            //refatorar e criar um thema global
            <ConfigProvider
                theme={{
                    components: {
                        FloatButton: {
                            colorPrimary: "#3a89c9",
                            colorPrimaryHover: "#1b325f",
                        },
                    },
                }}
            >
                <Tooltip title="Novo evento">
                    <FloatButton
                        type="primary"
                        shape="circle"
                        icon={<Plus size={18} />}
                        onClick={showModal}
                    />
                </Tooltip>
            </ConfigProvider>
        }
            <Modal
                title="Novo evento"
                open={isModalOpen}
                onCancel={handleCancel}

                footer={null}
            >
                <Form form={form}
                    name="basic"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    style={{
                        overflow: "auto",
                        boxSizing: "content-box",
                    }}
                >
                    <Form.Item
                        label="Título"
                        name="title"
                        rules={[
                            { required: true, message: 'Campo obrigatório!' },
                        ]}
                    >
                        <Input
                            maxLength={50}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Descrição"
                        name="description"
                    >
                        <Input.TextArea maxLength={500}/>
                    </Form.Item>
                    <Flex justify="space-between">
                        <Form.Item
                            label="Qtd vagas"
                            name="vacancies"
                            rules={[
                                { required: true, message: 'Campo obrigatório!' },
                            ]}
                        >
                            <InputNumber />
                        </Form.Item>
                        <Form.Item
                            label="Valor"
                            name="value"
                            rules={[
                                { required: true, message: 'Campo obrigatório!' },
                            ]}
                        >
                            <InputNumber
                                style={{ width: "100%" }}
                                min={0}
                                step={0.01}
                                formatter={value =>
                                    //@ts-ignore
                                    value !== undefined && value !== null && value !== ''
                                        ? `R$ ${Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                                        : ''
                                }
                                //@ts-ignore
                                parser={value => {
                                    if (!value) return 0;
                                    // Remove R$ e espaços, mantém pontos (milhar) e vírgula (decimal)
                                    const cleaned = value.replace(/[R$\s]/g, '');
                                    // Remove pontos de milhar e troca vírgula por ponto decimal
                                    const normalized = cleaned.replace(/\./g, '').replace(',', '.');
                                    const num = parseFloat(normalized);
                                    return isNaN(num) ? 0 : num;
                                }}
                            />
                        </Form.Item>
                    </Flex>
                    <Form.Item style={{ textAlign: "end" }}>
                        <Button onClick={handleCancel} style={{ marginRight: 10}}>Cancelar</Button>
                        <Button type="primary" htmlType="submit" loading={isloading}>Salvar</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}
export default EventModal;