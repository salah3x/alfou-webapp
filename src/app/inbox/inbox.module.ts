import {NgModule} from '@angular/core';
import {InboxComponent} from './inbox.component';
import {InboxRoutingModule} from './inbox-routing.module';
import {AppMaterialModule} from '../app-material.module';
import {InboxHomeComponent} from './inbox-home/inbox-home.component';
import {SentComponent} from './sent/sent.component';
import {DoneComponent} from './done/done.component';
import {NewMessageComponent} from './new-message/new-message.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MessageComponent} from './message/message.component';
import {AngularFirestoreModule} from '@angular/fire/firestore';

@NgModule({
  declarations: [
    InboxComponent,
    InboxHomeComponent,
    SentComponent,
    DoneComponent,
    NewMessageComponent,
    MessageComponent
  ],
  imports: [
    InboxRoutingModule,
    AppMaterialModule,
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    AngularFirestoreModule
  ],
  entryComponents: [NewMessageComponent]
})
export class InboxModule { }
