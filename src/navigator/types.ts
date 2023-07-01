import { StackScreenProps } from '@react-navigation/stack';

/** AUTH SCREENS & PARAM LIST **/
// * Screens declaration
enum AuthStackScreens {
  LOGIN = 'Login',
  SIGNIN = 'SignIn',
}

// * Screen params declaration
type AuthStackParamList = {
  [AuthStackScreens.LOGIN]: {};
  [AuthStackScreens.SIGNIN]: {};
}

/** MAIN STACK SCREENS & PARAM LIST **/

// * Screens declaration
enum MainStackScreens {
  HOMESCREEN = 'HomeScreen',

}

// * Screen params declaration
type MainStackParamList = {
  [MainStackScreens.HOMESCREEN]: {};

}


/** SCREEN PROPS UTILITY TYPE */

/**
 * Representa el tipo de las props de un componente de pantalla. -
 * Uso:
 *
 *  - Si queremos inferir el tipo de las props de la pantalla CommunityScreen: ScreenProps<MainStackScreens.COMMUNITY>
 *
 *  - Si queremos inferir el tipo de las props de la pantalla LoginScreen: ScreenProps<AuthStackScreens.LOGIN>
 *
 *  Devuelve el tipo de las props de la pantalla correspondiente al nombre de la pantalla que se le pasa como parámetro.
 *  @param {RouteProp} route - Objeto route de la pantalla
 *  @param {NavigationProp} navigation - Objeto navigation de la pantalla
 */
type ScreenProps<T extends string> =
  T extends keyof MainStackParamList
  ? StackScreenProps<MainStackParamList, T>
  : T extends keyof AuthStackParamList
  ? StackScreenProps<AuthStackParamList, T>
  : never

export {
  AuthStackScreens, MainStackScreens, type AuthStackParamList, type MainStackParamList, type ScreenProps,
};
