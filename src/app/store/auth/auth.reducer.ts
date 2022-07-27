import { createReducer, on } from '@ngrx/store';
import { UserModel } from '@app/models';

import {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  setAuthUser,
  signOut
} from './auth.actions';

export interface IAuthState {
  user: UserModel | null;
  error: Error | null;
}

const initialState: IAuthState = {
  user: null,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(
    signInSuccess,
    setAuthUser,
    (state, action) => ({ ...state, user: action.user })
  ),
  on(
    signUpFailure,
    signInFailure,
    (state, action) => ({ ...state, error: action.error })
  ),
  on(
    signOut,
    (state) => ({ ...state, user: null })
  ),
);
