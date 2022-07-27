import { Action, createAction, props } from '@ngrx/store';
import { UserModel } from '@app/models';

// Sign In Actions
export const signIn = createAction('[Auth]: Sign In', props<{
  user: Pick<UserModel, 'username' | 'password'>
}>());

export const signInSuccess = createAction('[Auth]: Sign In Success', props<{
  user: UserModel
}>());

export const signInFailure = createAction('[Auth]: Sign In Failure', props<{
  error: Error;
}>());

// Sign Up Actions
export const signUp = createAction('[Auth]: Sign Up', props<{
  user: Omit<UserModel, 'id'>;
}>());

export const signUpSuccess = createAction('[Auth]: Sign Up Success', props<{
  user: UserModel;
}>());

export const signUpFailure = createAction('[Auth]: Sign Up Failure', props<{
  error: Error;
}>());

// Sign Out Actions
export const signOut = createAction('[Auth]: Sign out');

// Auth System Actions
export const initAuthUser = createAction('[Auth]: Init Auth User');

  export const setAuthUser = createAction('[Auth]: Set Auth User', props<{
  user: UserModel | null
}>());
