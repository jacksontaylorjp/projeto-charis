import { Button, Modal } from "antd";
import { useState } from "react";

interface InscritosModalTempProps {
    event: any;
}

const InscritosModalTemp = ({ event }: InscritosModalTempProps) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
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
                    marginTop: "18px",
                    marginBottom: "18px",
                }}

            >
                Ver inscritos
            </Button>
            <Modal
                title="Inscritos"
                open={isModalOpen}
                onCancel={closeModal}
                footer={null} // Remove os botões padrão do modal
            >
                {event?.registrations && Object.keys(event.registrations).length > 0 ? (
                    <ul>
                        {Object.values(event.registrations).map((reg: any) => (
                            <li key={reg.id}>{reg.congregacao} - {reg.name}- {reg.phone}</li>
                        ))}
                    </ul>
                ) : (
                    <p>Nenhum inscrito.</p>
                )}
            </Modal>
        </>
    );
}
export default InscritosModalTemp;