import { AuthState, status } from './AuthContext';
import { Usuario } from './contextTypes';

type AuthAction =
  | { type: 'signUp', payload: { token: string, user: Usuario } }
  | { type: 'addError', payload: string }
  | { type: 'removeError' }
  | { type: 'failAuthentication' }
  | { type: 'logOut' }



export const authReducer = (state: AuthState, action: AuthAction): AuthState => {

  switch (action.type) {

    case 'signUp':
      return {
        ...state,
        status: status.AUTHENTICATED,
        errorMessage: '',
        token: action.payload.token,
        user: action.payload.user,
      };
    case 'addError':
      return {
        ...state,
        user: null,
        status: status.NOT_AUTHENTICATED,
        token: null,
        errorMessage: action.payload,
      };
    case 'removeError':
      return {
        ...state,
        errorMessage: '',
      };
    case 'logOut': //AL REALIZAR LA MISMA FUNCIONALIDAD QUE FAILAUTHENTICATION, LO PONGO ASI Y ENTRARA EN EL SIGUIENTE CASE
    case 'failAuthentication':
      return {
        ...state,
        status: status.NOT_AUTHENTICATED,
        token: null,
        user: null,
      };

    default:
      return state;
  }
};
