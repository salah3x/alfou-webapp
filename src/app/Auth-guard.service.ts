import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment} from '@angular/router';
import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {Observable} from 'rxjs';
import {map, take, tap} from 'rxjs/operators';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable()
export class AuthGuard implements CanLoad, CanActivate {

  constructor(private afAuth: AngularFireAuth,
              private snackBar: MatSnackBar,
              private router: Router) {}

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.afAuth.authState.pipe(
      map(value => value !== null),
      tap(x => {
        if (!x) {
          this.snackBar.open('Veuillez se connecter d\'abord', 'Fermer', {duration: 3000});
          this.router.navigate(['/']);
        }
      }),
      take(1)
    );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canLoad(null, null);
  }
}
