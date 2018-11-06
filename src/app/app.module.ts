import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AppMaterialModule} from './app-material.module';
import {HomeComponent} from './home/home.component';
import {ContactComponent} from './home/contact/contact.component';
import {environment} from '../environments/environment';
import {AuthGuard} from './Auth-guard.service';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {SigninComponent} from './home/signin/signin.component';
import { HeaderComponent } from './home/header/header.component';
import { NavComponent } from './home/nav/nav.component';
import { MainComponent } from './home/main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    SigninComponent,
    HeaderComponent,
    NavComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FlexLayoutModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [AuthGuard],
  entryComponents: [SigninComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
