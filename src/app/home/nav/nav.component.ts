import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AngularFireAuth } from '@angular/fire/auth';
import { SigninComponent } from '../signin/signin.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  isAuthenticated: boolean;

  constructor(private dialog: MatDialog,
              public auth: AngularFireAuth,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.auth.authState.subscribe(value => this.isAuthenticated = value != null);
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

}
