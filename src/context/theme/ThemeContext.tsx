import { createContext, useEffect, useReducer } from 'react';
import React from 'react';
import { ThemeState, darkTheme, lightTheme, themeReducer } from '../../reducer/Theme/ThemeReducer';
import { useColorScheme } from 'react-native';

interface ThemeContextProps {
  theme: ThemeState;
  setDarkTheme: () => void;
  setLightTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({} as ThemeContextProps);

export const ThemeProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const colorScheme = useColorScheme();
  const [theme, dispatch] = useReducer(themeReducer, (colorScheme === 'dark' ? darkTheme : lightTheme));

  //* POR LO QUE SE VE, ESTO YA FUNCIONA EN ANDRIOD
  useEffect(() => {
    (colorScheme === 'dark') ? setDarkTheme() : setLightTheme();
  }, [colorScheme]);
  //! ESTO ES OTRA FORMA DE CAMBIAR EL TEMA, ADEMAS ASÍ ES COMO SE VE EL ESTADO DE LA APLICACIÓN
  // useEffect(() => {
  //   AppState.addEventListener('change', (status : AppStateStatus) => {
  //     if (status === 'active') {
  //       (Appearance.getColorScheme() === 'dark')
  //         ? setDarkTheme()
  //         : setLightTheme();
  //     }
  //   });
  // }, []);

  const setDarkTheme = () => { dispatch({type: 'set_dark_theme'});};
  const setLightTheme = () => { dispatch({type: 'set_light_theme'});};

  return (
    <ThemeContext.Provider value={{
      theme,
      setDarkTheme,
      setLightTheme,
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
