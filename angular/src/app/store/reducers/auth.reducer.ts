import { createReducer, on, Action } from '@ngrx/store';
import { login, logout } from '../actions/auth.actions';

export interface AuthState {
  user: any;
}

export const initialState: AuthState = {
  user: null,
};

const _authReducer = createReducer(
  initialState,
  on(login, (state, { user }) => ({ ...state, user })),
  on(logout, (state) => ({ ...state, user: null }))
);

export function authReducer(
  state: AuthState | undefined,
  action: Action
): AuthState {
  return _authReducer(state, action);
}
