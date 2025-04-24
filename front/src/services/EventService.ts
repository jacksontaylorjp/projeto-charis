import apiFetch from "../api/apiConfig";

export class EventService {
    async findOn() {
        try {
            const res = await apiFetch("/events/on");
            return res;
        } catch (error) {
            console.error("Erro ao buscar evento:", error);
        }
    };
    async findAll() {
        try {
            const res = await apiFetch("/events/all");
            return res;
        } catch (error) {
            console.error("Erro ao buscar eventos:", error);
        }
    };
}