import apiFetch from "../api/apiConfig";

export class EventService {
    async findOn() {
        try {
            const res = await apiFetch("/events");
            return res;
        } catch (error) {
            console.error("Erro ao buscar evento:", error);
        }
    };
}