import { toast } from "react-toastify";
import apiFetch from "../api/apiConfig";
import { IRegistration } from "../interfaces/Registration";

export class RegistrationService {
    async create(data: IRegistration) {
        try {
            const res = await apiFetch("/registrations", "POST", data);
            if (res) {
                toast.success("Inscrição criada com sucesso!");
                setTimeout(() => {
                    window.location.reload();
                }, 5000);
            }
            return res;
        } catch (error) {
            console.error("Erro ao fazer inscrição:", error);
            toast.error("Erro ao criar inscrição.");
        }
    };
    async getByEvent(eventId: string) {
        try {
            const res = await apiFetch(`/registrations/${eventId}`);
            return res;
        } catch (error) {
            console.error("Erro ao buscar inscrições:", error);
        }
    }
    async updatePaidStatus(eventId: string, registrationId: string, paid: boolean) {
        try {
            const res = await apiFetch(
                `/registrations/${eventId}/${registrationId}`,
                "PUT",
                { paid }
            );
            if (res) {
                toast.success("Inscrição atualizado com sucesso.")
            }
            return res;
        } catch (error) {
            toast.error("Erro ao atualizado.")
            console.error("Erro ao atualizar status do pagamento", error);
        }
    }
    async delete(eventId: string, registrationId: string) {
        try {
            const res = await apiFetch(
                `/registrations/${eventId}/${registrationId}`, "DELETE",);
            if (res) {
                toast.success("Inscrição excluído com sucesso.")
            }
        } catch (error) {
            toast.error("Erro ao excluir.")
            console.error("Erro ao excluir", error);
        }
    }
}