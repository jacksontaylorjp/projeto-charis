import apiFetch from "../api/apiConfig";
import { IRegistration } from "../interfaces/Registration";

export class RegistrationService {
    async create(data: IRegistration) {
        try {
            const res = await apiFetch("/registrations", "POST", data);
            alert("Inscrição criada com sucesso!")
            window.location.reload();
            return res;
        } catch (error) {
            console.error("Erro ao fazer inscricão:", error);
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
            return res;
        } catch (error) {
            console.error("Erro ao atualizar status do pagamento", error);
        }
    }
}