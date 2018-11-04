import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './home/home.component';
import {AuthGuard} from './Auth-guard.service';

const routes: Routes = [
  { path: '', component: HomeComponent},
  {path: 'inbox', loadChildren: './inbox/inbox.module#InboxModule', canLoad: [AuthGuard], canActivate: [AuthGuard]},
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
