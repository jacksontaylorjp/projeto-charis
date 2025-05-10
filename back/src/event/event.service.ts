import { Injectable } from '@nestjs/common';
import { firestore } from 'src/config/firebase.config';
import { IEvent } from './event.interface';
import { Timestamp } from 'firebase-admin/firestore';

@Injectable()
export class EventService {
    private collection = firestore.collection('events');
    async create(
        eventData: Omit<IEvent, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'registrationOpen'>,
        userId: string,
    ): Promise<IEvent> {
        const now = Timestamp.now();
        const eventRef = await this.collection.add({
            ...eventData,
            createdBy: userId,
            createdAt: now,
            updatedAt: now,
            registrationOpen: false,
        });

        return { id: eventRef.id, ...eventData, createdBy: userId, createdAt: now, updatedAt: now, registrationOpen: false };
    }
    async update(eventId: string, event: Partial<IEvent>): Promise<boolean> {
        try {
            const now = Timestamp.now();
            await this.collection.doc(eventId).update({
                ...event,
                updatedAt: now,
            });
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async findOn(): Promise<IEvent[]> {
        const snapshot = await this.collection.where('registrationOpen', '==', true).get();
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as IEvent[];
    }
    async findOne(id: string): Promise<IEvent | null> {
        const doc = await this.collection.doc(id).get();
        if (!doc.exists) return null;
        return { id: doc.id, ...doc.data() } as IEvent;
    }
    async findAll(): Promise<IEvent[]> {
        const snapshot = await this.collection.get();
        console.log(snapshot.size);
        
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as IEvent[];
    }
}
