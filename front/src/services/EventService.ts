import apiFetch from "../api/apiConfig";
import { IEvent } from "../interfaces/Event";

export class EventService {
    async create(event: IEvent) {
        try {
            const res = await apiFetch("/events", "POST", event);
            return res;
        } catch (error) {
            console.error("Erro ao criar evento:", error);
        }
    }
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