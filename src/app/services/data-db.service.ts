import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { MessageI } from '../models/message.interface';

@Injectable({
  providedIn: 'root'
})
export class DataDbService {

  private contactCollection: AngularFirestoreCollection<MessageI>;

  constructor(private aFirestore: AngularFirestore) { 
    this.contactCollection = aFirestore.collection<MessageI>('contacts');
  }

  saveMessage(newContact: MessageI): void {
    this.contactCollection.add(newContact);
  }
}
