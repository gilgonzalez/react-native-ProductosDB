import { Theme } from '@react-navigation/native';

type themeAction =
  | { type: 'set_dark_theme' }
  | { type: 'set_light_theme' }

export interface ThemeState extends Theme {
  currentTheme: 'light' | 'dark' | 'custom',
  dividerColor: string;
  aditionalColors: {
    button: string,
    pressable: string,
    activeSwitch: string,
    inactiveSwitch: string,
    code: string,
    title: string,
    subtitle: string,
    text: string,
    icon: string
    backgroundCode: string
    inactiveButtonSwitch: string,
    backgroundModal: string,
    backgroundSlide: string,
    tabBarBottom: string
  }
}

export const lightTheme: ThemeState = {
  currentTheme: 'light',
  dividerColor: 'green',
  dark: false,
  colors: {
    primary: '#007700',
    background: 'white',
    card: 'yellow',
    text: 'black',
    border: 'gray',
    notification: 'teal',
  },
  aditionalColors: {
    button: '#3DA5FF',
    pressable: '#3DA5FF',
    activeSwitch: '#007700',
    inactiveSwitch: '#B7C4CF',
    code: '#3DA5FF',
    title: '#41444B',
    subtitle: '#52575D',
    text: '#f1f1f1',
    icon: '#0079FF',
    backgroundCode: '#d4d4d4',
    inactiveButtonSwitch: '#121212',
    backgroundModal: '#F5F5F5',
    backgroundSlide: '#3DddFF',
    tabBarBottom: '#9CF196',
  },
};
export const darkTheme: ThemeState = {
  currentTheme: 'dark',
  dividerColor: '#D9DADB',
  dark: true,
  colors: {
    primary: 'white',
    background: '#212121',
    card: 'yellow',
    text: 'black',
    border: 'gray',
    notification: 'teal',
  },
  aditionalColors: {
    backgroundCode: '#F5F5F5',
    button: '#3DA5FF',
    pressable: '#F69906',
    activeSwitch: '#F69906',
    inactiveSwitch: '#B7C4CF',
    code: '#3DA5FF',
    title: '#f1f1f1',
    subtitle: '#B7C4CF',
    text: '#f1f1f1',
    icon: '#0079AA',
    inactiveButtonSwitch: '#121212',
    backgroundModal: '#454545',
    backgroundSlide: '#1C2E4A',
    tabBarBottom: '#11F311',
  },
};



export const themeReducer = (state: ThemeState, action: themeAction): ThemeState => {


  switch (action.type) {
    case 'set_light_theme':
      return {
        ...lightTheme,
      };
    case 'set_dark_theme':
      return {
        ...darkTheme,
      };
    default:
      return state;
  }
};
