import { Timestamp } from 'firebase-admin/firestore';

export interface Registration {
  id?: string;
  event: string;
  cpf: string;
  name: string;
  phone: string;
  birthDate: string;
  congregacao: string;
  funcaoIgreja: string;
  profession: string;
  namePastor: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
