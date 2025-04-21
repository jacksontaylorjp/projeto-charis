import { Injectable } from '@nestjs/common';
import { firestore } from 'src/config/firebase.config';
import { Registration } from './registration.interface';
import { Timestamp } from 'firebase-admin/firestore'; // Importa Timestamp

@Injectable()
export class RegistrationService {
  private getCollection(event: string) {
    return firestore.collection(`events/${event}/registrations`); // Caminho dinâmico com o evento
  }

  async create(registrationData: Omit<Registration, 'id' | 'createdAt' | 'updatedAt'> & { event: string }): Promise<Registration> {
    const now = Timestamp.now(); // Usa Timestamp do Firebase
    const collection = this.getCollection(registrationData.event); // Obtém a coleção com base no evento
    const patientRef = await collection.add({
      ...registrationData,
      createdAt: now,
      updatedAt: now,
    });

    return { id: patientRef.id, ...registrationData, createdAt: now, updatedAt: now };
  }

  async findAll(event: string): Promise<Registration[]> {
    const collection = this.getCollection(event); // Obtém a coleção com base no evento
    const snapshot = await collection.get();
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      if (!data) return null; // Verifica se data é undefined
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate(), // Converte Timestamp para Date
        updatedAt: data.updatedAt?.toDate(), // Converte Timestamp para Date
      } as Registration;
    }).filter((item) => item !== null) as Registration[]; // Filtra valores nulos
  }

  async findOne(event: string, id: string): Promise<Registration | null> {
    const collection = this.getCollection(event); // Obtém a coleção com base no evento
    const doc = await collection.doc(id).get();
    if (!doc.exists) return null;

    const data = doc.data();
    if (!data) return null; // Verifica se data é undefined
    return {
      id,
      ...data,
      createdAt: data.createdAt?.toDate(), // Converte Timestamp para Date
      updatedAt: data.updatedAt?.toDate(), // Converte Timestamp para Date
    } as Registration;
  }

  async update(event: string, id: string, registrationData: Partial<Registration>): Promise<boolean> {
    const collection = this.getCollection(event); // Obtém a coleção com base no evento
    const docRef = collection.doc(id);
    const doc = await docRef.get();

    if (!doc.exists) return false;

    await docRef.update({ ...registrationData, updatedAt: Timestamp.now() }); // Usa Timestamp para updatedAt
    return true;
  }

  async delete(event: string, id: string): Promise<boolean> {
    const collection = this.getCollection(event); // Obtém a coleção com base no evento
    const docRef = collection.doc(id);
    const doc = await docRef.get();

    if (!doc.exists) return false;

    await docRef.delete();
    return true;
  }
}
