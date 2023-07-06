import React, { useEffect } from 'react';
import { createContext, useReducer } from 'react';
import { LoginRequest, LoginResponse, RegisterData, RegisterResponse, Usuario } from './contextTypes';
import { authReducer } from './AuthReducer';
import apiCafe from '../../api/cafeApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

export enum status {
  CHECKING = 'checking',
  NOT_AUTHENTICATED = 'not-authenticated',
  AUTHENTICATED = 'authenticated'
}

export type AuthContextState = {
  errorMessage: string ;
  token: string | null;
  user: Usuario | null;
  status: status,
  signIn: ({correo,nombre,password }: RegisterData) => void;
  signUp: ({ correo, password }: LoginRequest) => void;
  signOut: () => void;
  clearErrorMessage: () => void;
}
export type AuthState = {
  errorMessage: string ;
  token: string | null;
  user: Usuario | null;
  status: status,
}

const initialState: AuthState = {
  status: status.CHECKING,
  token: null,
  user: null,
  errorMessage: '',

};

export const AuthContext = createContext<AuthContextState>({} as AuthContextState);


export const AuthProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {

  const [state, dispatch] = useReducer(authReducer, initialState);

  const signUp = async ({correo, password} : LoginRequest ) => {
    try {
      const { data } = await apiCafe.post<LoginResponse>('/auth/login', { correo, password });
      dispatch({ type: 'signUp', payload: { token: data.token, user: data.usuario } });

      await AsyncStorage.setItem('token', data.token);
    } catch (error) {
      dispatch({ type: 'addError', payload: error.response.data.msg || 'Informacion incorrecta' });
    }

  };
  const signIn = async ({ correo, nombre, password }: RegisterData) => {

    try {
      const { data } = await apiCafe.post<RegisterResponse>('/usuarios', { correo, nombre, password });
      dispatch({ type: 'signUp', payload: { token: data.token, user: data.usuario } });
    } catch (error) {
      dispatch({type: 'addError', payload: error.response.data.errors[0].msg || 'Redise la información'});
    }

  };

  const signOut = async () => {
    await AsyncStorage.removeItem('token');
    dispatch({type: 'logOut'});
  };
  const clearErrorMessage = () => {
    dispatch({ type: 'removeError' });
  };

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('token');
    //! NO HAY TOKEN
    if (!token) { return dispatch({ type: 'failAuthentication' }); }

    const resp = await apiCafe.get<LoginResponse>('/auth');
    const { data } = resp;
    if ( resp.status !== 200 ) { return dispatch({ type: 'failAuthentication' }); }

    //* SÍ HAY TOKEN
    //Se actualiza el token en el AsyncStorage
    await AsyncStorage.setItem('token', resp.data.token);

    dispatch({ type: 'signUp', payload: { token: data.token, user: data.usuario } });
  };

  useEffect(() => {
    checkToken();
  }, []);




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

