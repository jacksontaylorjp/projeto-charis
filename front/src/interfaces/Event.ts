import { Timestamp } from "firebase/firestore";
export interface IEvent {
    id?: string;
    title: string;
    description: string;
    value: string;
    vacancies: number;
    // startDate: Timestamp;
    // endDate: Timestamp;
    registrationOpen: boolean;
    createdBy: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}