import {Component, Inject, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.css']
})
export class NewMessageComponent implements OnInit {
  loading = false;

  constructor(@Inject(MAT_DIALOG_DATA) public message: MessageWithId,
              private store: AngularFirestore,
              private snackBar: MatSnackBar,
              private dialogRef: MatDialogRef<NewMessageComponent> ) { }

  ngOnInit() {
  }

  onSubmit(f: NgForm) {
    this.loading = true;
    if (this.message) {
      if (!this.message.replies) {
        this.message.replies = [];
      }
      // todo get date from server
      const copy = {...this.message};
      delete copy.id;
      this.message.replies.push({body: f.value.body, date: new Date(), me: true});
      this.store.collection('/messages').doc(this.message.id).set(copy).then(() => {
        this.loading = false;
        this.snackBar.open('Réponse envoyé avec succés.', 'Fermer', {duration: 3000});
        this.dialogRef.close();
      }).catch(() => {
        this.snackBar.open('Envoie de la réponse a échoué.', 'Fermer', {duration: 3000});
        this.loading = false;
      });
    } else {
      const email: Email = {
        to: f.value.email,
        subject: f.value.subject,
        // todo replace \n with <br>
        body: f.value.body,
        date: new Date(),
        delivered: false
      };
      this.store.collection('emails').add(email).then(() => {
        this.loading = false;
        this.snackBar.open('Message envoyé avec succés.', 'Fermer', {duration: 3000});
        this.dialogRef.close();
      }).catch(() => {
        this.snackBar.open('Envoie du message a échoué.', 'Fermer', {duration: 3000});
        this.loading = false;
      });
    }
  }
}
