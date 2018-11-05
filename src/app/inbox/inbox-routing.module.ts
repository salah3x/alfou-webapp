import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DoneComponent} from './done/done.component';
import {SentComponent} from './sent/sent.component';
import {InboxHomeComponent} from './inbox-home/inbox-home.component';
import {InboxComponent} from './inbox.component';

const routes: Routes = [
  {path: '', component: InboxComponent, children: [
      {path: '', redirectTo: 'a'},
      {path: 'a', component: InboxHomeComponent},
      {path: 'done', component: DoneComponent},
      {path: 'sent', component: SentComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InboxRoutingModule { }
