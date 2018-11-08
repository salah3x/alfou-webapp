import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-inbox-home',
  templateUrl: './inbox-home.component.html',
  styleUrls: ['./inbox-home.component.css']
})
export class InboxHomeComponent implements OnInit {

  messages: MessageWithId[];
  loading = false;

  constructor(private store: AngularFirestore) { }

  ngOnInit() {
    this.loading = true;
    this.store.collection<Message>('messages', ref =>
      ref.where('done', '==', false)
        .orderBy('new', 'desc')
        .orderBy('date', 'desc')
    ).snapshotChanges().pipe(
      map(value => (<any>value).map(value1 => {
          const data = value1.payload.doc.data() as Message;
          const id = value1.payload.doc.id;
          return { id, ...data };
        })
      )
    ).subscribe(value => {
      this.loading = false;
      this.messages = value;
    });
  }

}
