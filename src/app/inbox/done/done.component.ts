import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Message} from '../../message.model';

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.css']
})
export class DoneComponent implements OnInit {

  messages: Message[];
  loading = false;

  constructor(private store: AngularFirestore) { }

  ngOnInit() {
    this.loading = true;
    this.store.collection<Message>('messages', ref =>
      ref.where('done', '==', true)
        .orderBy('date', 'desc')
    ).valueChanges().subscribe(value => {
        this.loading = false;
        this.messages = value;
    });
  }

}
