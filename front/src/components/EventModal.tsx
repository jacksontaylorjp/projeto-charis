import { useState } from "react";
import { IEvent } from "../interfaces/Event";
import { useAuth } from "../contexts/AuthContext";
import { Button, ConfigProvider, FloatButton, Form, FormProps, Input, Modal } from "antd";
import { EventService } from "../services/EventService";
import { FilePenLine, Plus } from "lucide-react";

interface EventModalProps {
    data?: IEvent;
}
const EventModal = ({ data }: EventModalProps) => {
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
            <FilePenLine onClick={showModal} style={{ cursor: "pointer", color: "#E6AF21" }} /> :
            //refatorar e criar um thema global
            <ConfigProvider
                theme={{
                    components: {
                        FloatButton: {
                            colorPrimary: "#E6AF21",
                            colorPrimaryHover: "#e04e2a",
                        },
                    },
                }}
            >
                <FloatButton
                    type="primary"
                    shape="circle"
                    icon={<Plus size={18} />}
                    onClick={showModal}
                />
            </ConfigProvider>
        }
            <Modal
                title="Criar inscrição"
                open={isModalOpen}
                onCancel={handleCancel}
                width={{
                    xs: '90%',
                    sm: '80%',
                    md: '70%',
                    lg: '60%',
                    xl: '50%',
                    xxl: '40%',
                }}
                footer={null}
            >
                <Form form={form}
                    name="basic"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    style={{
                        width: "100%",
                        maxHeight: "90vh",
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
                                maxLength={15}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Descrição"
                            name="description"
                        >
                            <Input />
                        </Form.Item>
                    <Form.Item style={{ textAlign: "center" }}>
                        <Button type="primary" htmlType="submit" loading={isloading}>Salvar</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}
export default EventModal;