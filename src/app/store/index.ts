import { createSelector } from '@ngrx/store';
import { IAuthState } from './auth';

export interface IAppState {
  auth: IAuthState;
}

const selectAuthState = (state: IAppState) => state.auth;

export const selectAuthUser = createSelector(selectAuthState, (state) => state.user);

export const selectAuthError = createSelector(selectAuthState, (state) => state.error);

export const selectIsLoggedIn = createSelector(selectAuthUser, (user) => !!user);


