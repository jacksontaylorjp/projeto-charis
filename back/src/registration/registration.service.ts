import { Injectable } from '@nestjs/common';
import { firestore } from 'src/config/firebase.config';
import { Registration } from './registration.interface';
import { Timestamp } from 'firebase-admin/firestore'; // Importa Timestamp

@Injectable()
export class RegistrationService {
  private getCollection(eventId: string) {
    return firestore.collection(`events/${eventId}/registrations`); // Caminho dinâmico com o evento
  }

  async create(registrationData: Omit<Registration, 'id' | 'createdAt' | 'updatedAt'> & { eventId: string }): Promise<Registration> {
    const now = Timestamp.now(); // Usa Timestamp do Firebase
    const collection = this.getCollection(registrationData.eventId); // Obtém a coleção com base no evento
    const patientRef = await collection.add({
      ...registrationData,
      createdAt: now,
      updatedAt: now,
      paid: false
    });

    // Conta o total de inscrições após adicionar a nova
    const snapshot = await collection.get();
    const totalRegistration = snapshot.size;

    // Busca o evento para comparar vacancies e registrationOpen
    const eventRef = firestore.collection('events').doc(registrationData.eventId);
    const eventDoc = await eventRef.get();
    if (eventDoc.exists) {
      const eventData = eventDoc.data();
      if (eventData && typeof eventData.vacancies === 'number' && eventData.registrationOpen !== false) {
        if (totalRegistration >= eventData.vacancies) {
          await eventRef.update({ registrationOpen: false });
        }
      }
    }

    return { id: patientRef.id, ...registrationData, createdAt: now, updatedAt: now };
  }

  async findByEvent(event: string): Promise<Registration[]> {
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

  async update(eventId: string, registrationId: string, registration: Partial<Registration>): Promise<boolean> {
    const collection = this.getCollection(eventId); // Obtém a coleção com base no eventId
    const docRef = collection.doc(registrationId);
    const doc = await docRef.get();
    if (!doc.exists) return false;
    await docRef.update({ ...registration, updatedAt: Timestamp.now() }); // Usa Timestamp para updatedAt
    return true;
  }

  async delete(eventId: string, registrationId: string): Promise<boolean> {
    const collection = this.getCollection(eventId);
    const docRef = collection.doc(registrationId);
    const doc = await docRef.get();
    if (!doc.exists) return false;
    await docRef.delete();
    return true;
  }
}
