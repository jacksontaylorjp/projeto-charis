import { Modal, Form, Input, DatePicker, Button } from 'antd';
import { useState } from 'react';

interface InscricoesModalProps {
    eventId: string;
}

const InscricoesModal = ({ eventId }: InscricoesModalProps) => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);


    const handleFinish = (values: any) => {
        console.log(values);
        form.resetFields(); // Reseta os campos do formulário
    };

    const showModal = () => {
        setIsModalOpen(true);
    }
    const closeModal = () => {
        setIsModalOpen(false);
    }



    return (
        <>
            <Button
                type="primary"
                size="large"
                onClick={showModal}
                style={{
                    width: "100%",
                }}

            >
                Inscreva-se Agora
            </Button>
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
                        label="CPF"
                        name="cpf"
                        rules={[{ required: true, message: 'Por favor, insira o CPF!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Nome"
                        name="name"
                        rules={[{ required: true, message: 'Por favor, insira o nome!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Telefone"
                        name="phone"
                        rules={[{ required: true, message: 'Por favor, insira o telefone!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Data de Nascimento"
                        name="birthDate"
                        rules={[{ required: true, message: 'Por favor, insira a data de nascimento!' }]}
                    >
                        <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        label="Congregação"
                        name="congregacao"
                        rules={[{ required: true, message: 'Por favor, insira a congregação!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Função na Igreja"
                        name="funcaoIgreja"
                        rules={[{ required: true, message: 'Por favor, insira a função na igreja!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Profissão"
                        name="profession"
                        rules={[{ required: true, message: 'Por favor, insira a profissão!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Nome do Pastor"
                        name="namePastor"
                        rules={[{ required: true, message: 'Por favor, insira o nome do pastor!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                            Enviar
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default InscricoesModal;