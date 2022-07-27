import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IAppState, selectIsLoggedIn } from '@app/store';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {

  private isLoggedIn$ = this.store.select(selectIsLoggedIn);

  constructor(
    private router: Router,
    private store: Store<IAppState>
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.isLoggedIn$.pipe(
      map((isLoggedIn) => {
        if (!isLoggedIn) {
          return true;
        }
        return this.router.createUrlTree(['/todos']);
      })
    );
  }
  
}
