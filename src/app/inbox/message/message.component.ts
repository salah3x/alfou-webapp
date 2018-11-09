import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {MatDialog, MatSnackBar} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {NewMessageComponent} from '../new-message/new-message.component';
import {MessageWithId, Reply} from '../../message.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, OnDestroy {

  opened = false;
  viewed = false;
  @Input() message: MessageWithId;
  replies: Reply[];

  constructor(private store: AngularFirestore,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private sanitizer: DomSanitizer) { }

  ngOnInit() {
    if (this.message.id) {
      this.store.collection<Reply>(`/messages/${this.message.id}/replies`, ref =>
      ref.orderBy('date', 'desc'))
      .valueChanges()
      .subscribe((value: Reply[]) => this.replies = value);
    }
  }

  onDone() {
    this.store.collection('messages').doc(this.message.id).update({new: false, done: true}).then(() => {
      this.snackBar.open('Message marqué comme vue.', 'Fermer', {duration: 3000});
    }).catch(() => this.snackBar.open('Operation échouée, veuillez réessayer.', 'Fermer', {duration: 3000}));
  }

  onReply() {
    this.dialog.open(NewMessageComponent, {
      width: '75%',
      data: this.message
    });
  }

  getDate(aDate) {
    let hour, min;
    const date = new Date(aDate.seconds * 1000);
    if (date.getHours() < 10) {
      hour = '0' + date.getHours();
    } else {
      hour = date.getHours();
    }
    if (date.getMinutes() < 10) {
      min = '0' + date.getMinutes();
    } else {
      min = date.getMinutes();
    }
    return date.getDay() + '/' + date.getMonth() + '/' +
      date.getFullYear() + ' ' + hour + ':' + min;
  }

  getHtml(body: string) {
    return this.sanitizer.bypassSecurityTrustHtml(body.replace(/\n/g, '<br>'));
  }

  ngOnDestroy(): void {
    if (this.viewed && this.message.new) {
      this.store.collection('messages').doc(this.message.id).update({new: false});
    }
  }
}
