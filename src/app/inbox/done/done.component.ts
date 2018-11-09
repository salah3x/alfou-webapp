import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {Message, MessageWithId} from '../../message.model';

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.css']
})
export class DoneComponent implements OnInit {

  messages: MessageWithId[];
  loading = false;

  constructor(private store: AngularFirestore) { }

  ngOnInit() {
    this.loading = true;
    this.store.collection<Message>('messages', ref =>
      ref.where('done', '==', true)
        .orderBy('date', 'desc')
    ).snapshotChanges().pipe(
      map(value => (<any>value).map(value1 => {
          const data = value1.payload.doc.data() as Message;
          const id = value1.payload.doc.id;
          return { id, ...data };
        })
      )).subscribe(value => {
        this.loading = false;
        this.messages = value;
    });
  }

}
