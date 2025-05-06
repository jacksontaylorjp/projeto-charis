import { Timestamp } from "firebase-admin/firestore";

export interface IEvent {
    id?: string;
    title: string;
    description?: string;
    value: number;
    vacancies: number;
    // startDate: Timestamp;
    // endDate: Timestamp;
    registrationOpen: boolean;   
    createdBy: string;
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
}