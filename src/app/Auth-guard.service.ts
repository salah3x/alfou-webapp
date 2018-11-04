import {CanLoad, Route, UrlSegment} from '@angular/router';
import {Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthGuard implements CanLoad {

  constructor(private afAuth: AngularFireAuth) {}

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.afAuth.authState.pipe(map(value => value !== null));
  }
}
