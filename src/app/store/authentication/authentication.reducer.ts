import { createReducer, on } from '@ngrx/store'
import {
  login,
  loginFailure,
  loginSuccess,
  logout,
} from './authentication.actions'
import type { User } from './auth.model'

export type AuthenticationState = {
  isLoggedIn: boolean
  user: User | null
  error: string | null
}

const initialState: AuthenticationState = {
  isLoggedIn: false,
  user: null,
  error: null,
}
export const authenticationReducer = createReducer(
  initialState,

  // Lorsqu'on lance le login, on nettoie les erreurs
  on(login, (state) => ({
    ...state,
    error: null,
    isLoggedIn: false, // optionnel : reset au cas où
  })),
/*  on(loginSuccess, (state, { data }) => ({
    ...state,
    token: data,
    isLoggedIn: true,
    error: null
  })),*/
  // Si succès
  on(loginSuccess, (state, { user }) => ({
    ...state,
    isLoggedIn: true,
    user,
    error: null,
  })),

  // Si échec
  on(loginFailure, (state, { error }) => ({
    ...state,
    isLoggedIn: false,
    error, // contient "Utilisateur non trouvé"
  })),

  // Lorsqu'on logout
  on(logout, (state) => ({
    ...state,
    isLoggedIn: false,
    user: null,
    error: null,
  }))
);
/*export const authenticationReducer = createReducer(
  initialState,
  on(login, (state) => ({ ...state, error: null })),
  on(loginSuccess, (state, { user }) => ({
    ...state,
    isLoggedIn: true,
    user,
    error: null,
  })),
  on(loginFailure, (state, { error }) => ({ ...state, error })),

  on(logout, (state) => ({ ...state, user: null }))
)*/
