import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AngularFirestore} from '@angular/fire/firestore';
import {MatSnackBar} from '@angular/material';
import {Message} from '../../message.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  options: string[] = [];
  loading = false;

  constructor(private db: AngularFirestore,
              private snackBar: MatSnackBar) {
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
      body: f.value.comment,
      new: true,
      date: new Date(),
      done: false
    };
    this.db.collection('messages').add(obj).then(value => {
      this.snackBar.open('Message envoyé avec succes.', 'Fermer', {duration: 3000});
      f.resetForm();
      this.loading = false;
    }).catch(reason => {
      this.snackBar.open('Echec d\'envoie du message, veuillez réessayer.', 'Fermer', {duration: 3000});
      this.loading = false;
    });
  }
}
