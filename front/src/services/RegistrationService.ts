import apiFetch from "../api/apiConfig";
import { Registration } from "../interfaces/Registration";

export class RegistrationService {
    async create(data: Registration) {
        try {
            const res = await apiFetch("/registrations", "POST", data);
            alert("Inscrição criada com sucesso!")
            window.location.reload();
            return res;
        } catch (error) {
            console.error("Erro ao fazer inscricão:", error);
        }
    };
}