import { Injectable } from '@nestjs/common';
import { Patient } from './patient.interface';
import { firestore } from 'src/config/firebase.config';

@Injectable()
export class PatientService {
  private collection = firestore.collection('patients');

  async create(patientData: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>): Promise<Patient> {
    const now = new Date().toISOString();
    const patientRef = await this.collection.add({
      ...patientData,
      createdAt: now,
      updatedAt: now,
    });

    return { id: patientRef.id, ...patientData, createdAt: now, updatedAt: now };
  }

  async findAll(): Promise<Patient[]> {
    const snapshot = await this.collection.get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Patient[];
  }

  async findOne(id: string): Promise<Patient | null> {
    const doc = await this.collection.doc(id).get();
    return doc.exists ? ({ id, ...doc.data() } as Patient) : null;
  }

  async update(id: string, patientData: Partial<Patient>): Promise<boolean> {
    const docRef = this.collection.doc(id);
    const doc = await docRef.get();

    if (!doc.exists) return false;

    await docRef.update({ ...patientData, updatedAt: new Date().toISOString() });
    return true;
  }

  async delete(id: string): Promise<boolean> {
    const docRef = this.collection.doc(id);
    const doc = await docRef.get();

    if (!doc.exists) return false;

    await docRef.delete();
    return true;
  }
}
