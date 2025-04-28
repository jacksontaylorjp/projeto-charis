import { Modal, Tooltip, Button } from "antd";
import { Trash2 } from "lucide-react";
import { useState } from "react";

const DeleteModal = ({ onConfirm }: { onConfirm: () => void }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const showModal = () => {
        setIsModalOpen(true);
    }
    const closeModal = () => {
        setIsModalOpen(false);
    }
    const handleDelete = () => {
        onConfirm();
        closeModal();
    }
    return (
        <>
            <Tooltip title="Excluir">
                <span
                    style={{ cursor: "pointer" }}
                    onClick={showModal}
                >
                    <Trash2 color="#cf1322" />
                </span>
            </Tooltip>
            <Modal
                title="Exclusão"
                open={isModalOpen}
                onCancel={closeModal}
                footer={null}
                width={340}
            >
                <p>Tem certeza que deseja excluir este registro?</p>
                <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                    <Button onClick={closeModal}>Cancelar</Button>
                    <Button danger type="primary" onClick={handleDelete}>
                        Excluir
                    </Button>
                </div>
            </Modal>
        </>
    );
}
export default DeleteModal;