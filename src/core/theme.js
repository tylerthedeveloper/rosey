import { DefaultTheme, PaperDarkTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  // ...PaperDarkTheme,
  colors: {
    // ...PaperDarkTheme.colors,
    ...DefaultTheme.colors,
    primary: '#600EE6',
    secondary: '#414757',
    error: '#f13a59',
  },
};
