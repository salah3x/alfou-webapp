import {Component, OnInit} from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import {SigninComponent} from './signin/signin.component';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isAuthenticated: boolean;

  constructor(private dialog: MatDialog,
              private auth: AngularFireAuth,
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
