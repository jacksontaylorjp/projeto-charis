import { Modal, Form, Input, Button, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { RegistrationService } from '../services/RegistrationService';
import { IRegistration } from '../interfaces/Registration';
import { Eye } from 'lucide-react';

interface InscricoesModalProps {
    eventId: string;
    registrationData?: IRegistration;
}

const InscricoesModal = ({ eventId, registrationData }: InscricoesModalProps) => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const registrationService = new RegistrationService();

    const handleFinish = async (values: IRegistration) => {
        const data: IRegistration = {
            ...values,
            eventId
        }
        await registrationService.create(data);
        form.resetFields(); // Reseta os campos do formulário
        closeModal();
    };

    const formatCPF = (value: string) => {
        return value
            .replace(/\D/g, '') // Remove caracteres não numéricos
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{2})$/, '$1-$2');
    };

    const formatPhone = (value: string) => {
        return value
            .replace(/\D/g, '') // Remove caracteres não numéricos
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{5})(\d)/, '$1-$2');
    };

    const formatBirthDate = (value: string) => {
        return value
            .replace(/\D/g, '') // Remove caracteres não numéricos
            .replace(/(\d{2})(\d)/, '$1/$2')
            .replace(/(\d{2})(\d)/, '$1/$2');
    };

    const showModal = () => {
        setIsModalOpen(true);
    }
    const closeModal = () => {
        setIsModalOpen(false);
        form.resetFields();
    }

    useEffect(() => {
        if (registrationData) {
            form.setFieldsValue(registrationData)
        }
    }, [eventId])

    const isReadOnly = !!registrationData;

    return (
        <>
            {registrationData ?
                <Tooltip title="Ver todos os dados">
                    <Eye
                        onClick={showModal}
                        style={{
                            cursor: "pointer",
                            color: "#3a89c9"
                        }}
                    />
                </Tooltip>
                : <Button
                    type="primary"
                    size="large"
                    onClick={showModal}
                    style={{
                        width: "100%",
                        marginTop: "18px",
                        marginBottom: "18px",
                    }}
                >
                    Inscreva-se Agora
                </Button>}
            <Modal
                title="Inscrição"
                open={isModalOpen}
                onCancel={closeModal}
                footer={null} // Remove os botões padrão do modal
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleFinish}
                >
                    <Form.Item
                        label="Nome completo"
                        name="name"
                        rules={[{ required: true, message: 'Por favor, insira o nome!' }]}
                    >
                        <Input readOnly={isReadOnly} />
                    </Form.Item>

                    <Form.Item>
                        <Form.Item
                            label="CPF"
                            name="cpf"
                            rules={[
                                { required: true, message: 'Por favor, insira o CPF!' },
                                { pattern: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/, message: 'CPF inválido!' }
                            ]}
                            style={{ display: 'inline-block', width: 'calc(50% - 8px)', marginRight: '8px' }}
                        >
                            <Input
                                placeholder="000.000.000-00"
                                onChange={(e) => form.setFieldsValue({ cpf: formatCPF(e.target.value) })}
                                readOnly={isReadOnly}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Telefone"
                            name="phone"
                            rules={[
                                { required: true, message: 'Por favor, insira o telefone!' },
                                { pattern: /^\(\d{2}\) \d{5}-\d{4}$/, message: 'Telefone inválido!' }
                            ]}
                            style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                        >
                            <Input
                                placeholder="(00) 00000-0000"
                                onChange={(e) => form.setFieldsValue({ phone: formatPhone(e.target.value) })}
                                readOnly={isReadOnly}
                            />
                        </Form.Item>
                    </Form.Item>

                    <Form.Item>
                        <Form.Item
                            label="Data de Nascimento"
                            name="birthDate"
                            rules={[
                                { required: true, message: 'Por favor, insira a data de nascimento!' },
                                { pattern: /^\d{2}\/\d{2}\/\d{4}$/, message: 'Data de nascimento inválida!' }
                            ]}
                            style={{ display: 'inline-block', width: 'calc(50% - 8px)', marginRight: '8px' }}
                        >
                            <Input
                                placeholder="DD/MM/AAAA"
                                onChange={(e) => form.setFieldsValue({ birthDate: formatBirthDate(e.target.value) })}
                                readOnly={isReadOnly}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Profissão"
                            name="profession"
                            rules={[{ required: true, message: 'Por favor, insira a profissão!' }]}
                            style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                        >
                            <Input readOnly={isReadOnly} />
                        </Form.Item>
                    </Form.Item>

                    <Form.Item
                        label="Congregação/Denominação"
                        name="congregacao"
                        rules={[{ required: true, message: 'Por favor, insira a congregação!' }]}
                    >
                        <Input readOnly={isReadOnly} />
                    </Form.Item>

                    <Form.Item
                        label="Função na Igreja"
                        name="funcaoIgreja"
                        rules={[{ required: true, message: 'Por favor, insira a função na igreja!' }]}
                    >
                        <Input readOnly={isReadOnly} />
                    </Form.Item>

                    <Form.Item
                        label="Nome do Pastor"
                        name="namePastor"
                        rules={[{ required: true, message: 'Por favor, insira o nome do pastor!' }]}
                    >
                        <Input readOnly={isReadOnly} />
                    </Form.Item>

                    <Form.Item>
                        {registrationData ? "" :
                            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                                Enviar
                            </Button>
                        }
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default InscricoesModal;