import React from 'react';
import { createContext, useReducer } from 'react';
import { Usuario } from './contextTypes';
import { authReducer } from './AuthReducer';

export enum status {
  CHECKING = 'checking',
  NOT_AUTHENTICATED = 'not-authenticated',
  AUTHENTICATED = 'authenticated'
}

export type AuthContextState = {
  errorMessage: string;
  token: string | null;
  user: Usuario | null;
  status: status,
  signUp: () => void;
  signIn: () => void;
  signOut: () => void;
  clearErrorMessage: () => void;
}
export type AuthState = Partial<AuthContextState>

const initialState: AuthState = {
  status: status.CHECKING,
  token: null,
  user: null,
  errorMessage: '',

};

export const AuthContext = createContext<AuthContextState>({} as AuthContextState);


export const AuthProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {

  const [state, dispatch] = useReducer(authReducer, initialState);

  const signUp = () => {};
  const signIn = () => {};
  const signOut = () => {};
  const clearErrorMessage = () => {};



  return (
    <AuthContext.Provider value={{
      ...state,
      signIn,
      signUp,
      signOut,
      clearErrorMessage,
    }}>
      {children}
    </AuthContext.Provider>
  );

};

