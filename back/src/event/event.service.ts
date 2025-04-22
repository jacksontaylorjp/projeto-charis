import { Injectable } from '@nestjs/common';
import { firestore } from 'src/config/firebase.config';
import { IEvent } from './event.interface';
import { Timestamp } from 'firebase-admin/firestore';

@Injectable()
export class EventService {
    private collection = firestore.collection('events');
      async create(
        eventData: Omit<IEvent, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>,
        userId: string,
    ): Promise<IEvent> {
        const now = Timestamp.now();
        const eventRef = await this.collection.add({
            ...eventData,
            createdBy: userId,
            createdAt: now,
            updatedAt: now,
        });

        return { id: eventRef.id, ...eventData, createdBy: userId, createdAt: now, updatedAt: now };
    }
    async findOn(): Promise<IEvent[]> {
        const snapshot = await this.collection.where('registrationOpen', '==', true).get();
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as IEvent[];
      }
}
