import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { map, tap } from 'rxjs';

import { AuthService } from '@app/api/auth.service';
import {
  initAuthUser, setAuthUser,
  signIn,
  signInFailure,
  signInSuccess,
  signUp,
  signUpFailure,
  signUpSuccess,
  signOut
} from './auth.actions';

@Injectable()
export class AuthEffects implements OnInitEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  ngrxOnInitEffects(): Action {
    return initAuthUser();
  }

  initAuthUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initAuthUser),
      map(() => {
        const user = this.authService.getUser();
        return setAuthUser({ user });
      })
    )
  );

  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signUp),
      map((action) => {
        const user = this.authService.register(action.user);

        if (user) {
          return signUpSuccess({ user });
        }

        return signUpFailure({ error: new Error(`User with email ${action.user.email} already exists!`) });
      })
    )
  );

  signUpSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signUpSuccess),
      tap(() => {
        this.router.navigate(['/sign-in']);
      }),
    ),
    { dispatch: false }
  );

  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signIn),
      map((action) => {
        const user = this.authService.login(action.user);

        if (user) {
          return signInSuccess({ user });
        }

        return signInFailure({ error: new Error('User Not Found!') });
      })
    )
  );

  signInSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signInSuccess),
        tap(() => {
          this.router.navigate(['/todos']);
        }),
      ),
    { dispatch: false }
  );

  signOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signOut),
      tap(() => {
        this.authService.logout();
        this.router.navigate(['/sign-in']);
      }),
    ),
    { dispatch: false }
  );

}
