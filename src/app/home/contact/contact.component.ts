import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  options: string[] = [];
  messagesRef: AngularFirestoreCollection<Message>;

  constructor(db: AngularFirestore, private snackBar: MatSnackBar) {
    this.messagesRef = db.collection('messages');
  }

  ngOnInit() {
    this.options.push('Option1');
    this.options.push('Option2');
  }

  onSubmit(f: NgForm) {
    const obj: Message = f.control.value;
    this.messagesRef.add(obj).then(value => {
      this.snackBar.open('Message envoyé avec succes.', 'Fermer', {duration: 3000});
      f.resetForm();
    }).catch(reason => {
      this.snackBar.open('Echec d\'envoie du message, veuillez réessayer.', 'Fermer', {duration: 3000});
    });
  }
}
