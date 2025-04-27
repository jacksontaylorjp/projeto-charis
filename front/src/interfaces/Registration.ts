export interface IRegistration {
    id?: string;
    eventId: string;
    cpf: string;
    name: string;
    phone: string;
    birthDate: string;
    congregacao: string;
    funcaoIgreja: string;
    profession: string;
    namePastor: string;
    paid: boolean;
    // createdAt?: Timestamp;
    // updatedAt?: Timestamp;
}