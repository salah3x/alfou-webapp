import {NgModule} from '@angular/core';
import {InboxComponent} from './inbox.component';
import {InboxRoutingModule} from './inbox-routing.module';

@NgModule({
  declarations: [InboxComponent],
  imports: [InboxRoutingModule]
})
export class InboxModule { }
