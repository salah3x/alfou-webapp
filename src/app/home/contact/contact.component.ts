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
  loading = false;

  constructor(db: AngularFirestore, private snackBar: MatSnackBar) {
    this.messagesRef = db.collection('messages');
  }

  ngOnInit() {
    this.options.push('Sécurité');
    this.options.push('Gardiennage');
    this.options.push('Nettoyage');
  }

  onSubmit(f: NgForm) {
    this.loading = true;
    const obj: Message = {
      name: f.value.name,
      from: f.value.email,
      subject: f.value.subject,
      service: f.value.service,
      // todo change \n to <br>
      body: f.value.comment,
      new: true,
      // todo get date from server
      date: new Date(),
      done: false
    };
    this.messagesRef.add(obj).then(value => {
      this.snackBar.open('Message envoyé avec succes.', 'Fermer', {duration: 3000});
      f.resetForm();
      this.loading = false;
    }).catch(reason => {
      this.snackBar.open('Echec d\'envoie du message, veuillez réessayer.', 'Fermer', {duration: 3000});
      this.loading = false;
    });
  }
}
