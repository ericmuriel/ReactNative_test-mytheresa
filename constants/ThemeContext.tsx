import React, { createContext, useContext, ReactNode } from 'react';
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

type Theme = {
  primary: string;
  background: string;
  text: string;
  styles: {
    container: ViewStyle;
    title: TextStyle;
    text: TextStyle;
    button: ViewStyle;
  };
};

export const lightTheme: Theme = {
  primary: '#6200ea',
  background: '#ffffff',
  text: '#000000',
  styles: StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: '#ffffff',
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
      color: '#000000',
    },
    text: {
      fontSize: 16,
      color: '#000000',
    },
    button: {
      backgroundColor: '#6200ea',
    },
  }),
};

export const ThemeContext = createContext<Theme>(lightTheme);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeContext.Provider value={lightTheme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
