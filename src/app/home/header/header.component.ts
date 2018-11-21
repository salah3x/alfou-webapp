import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AngularFireAuth } from '@angular/fire/auth';
import { SigninComponent } from './signin/signin.component';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('header', [
      transition('* <=> *', [
        animate(200, style({
          'opacity': 0.5
        })),
        animate(200, style({
          'opacity': 0.75
        })),
        animate(300)
      ])
    ])
  ]
})
export class HeaderComponent implements OnInit {

  isAuthenticated: boolean;
  background = 'url("/assets/header1.jpg")';
  next = 2;

  constructor(private dialog: MatDialog,
              public auth: AngularFireAuth,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.auth.authState.subscribe(value => this.isAuthenticated = value != null);
    this.changeBackground();
  }

  onSigninOrSignout() {
    if (this.isAuthenticated) {
      this.auth.auth.signOut().then(value => {
        this.snackBar.open('Vous vous êtes déconnecté avec succès.', 'Fermer', {duration: 3000});
      });
    } else {
      this.dialog.open(SigninComponent);
    }
  }

  changeBackground() {
    setTimeout(() => {
      if (this.next === 5) {
        this.next = 1;
      }
      this.background = `url("/assets/header${this.next++}.jpg")`;
      this.changeBackground();
    }, 10000);
  }

}
