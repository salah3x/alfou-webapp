import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NewMessageComponent} from './new-message/new-message.component';
import {MatDialog} from '@angular/material';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog,
              private auth: AngularFireAuth) { }

  ngOnInit() {
  }

  onNewMessage() {
    this.dialog.open(NewMessageComponent, {
      width: '75%',
    });
  }


  onSignOut() {
    this.router.navigate(['']);
    this.auth.auth.signOut();
  }
}
