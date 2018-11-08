import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {Email, Message} from '../../message.model';

@Component({
  selector: 'app-sent',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.css']
})
export class SentComponent implements OnInit {

  messages: Message[];
  loading = false;

  constructor(private store: AngularFirestore) { }

  ngOnInit() {
    this.loading = true;
    this.store.collection<Email>('emails', ref =>
      ref.orderBy('date', 'desc')
    ).valueChanges().pipe(
      map((value: Email[]) =>
        value.map((e: Email) =>
          ({name: e.to, from: e.to, subject: e.subject, body: e.body, date: e.date, done: e.delivered} as Message)))
    ).subscribe(value => {
      this.loading = false;
      this.messages = value;
    });
  }

}
