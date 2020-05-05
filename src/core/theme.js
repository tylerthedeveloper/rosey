import { DefaultTheme, PaperDarkTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  // ...PaperDarkTheme,
  colors: {
    // ...PaperDarkTheme.colors,
    ...DefaultTheme.colors,
    // primary: '#600EE6',
    // secondary: '#414757',
    // error: '#f13a59',
    primary: '#4633AF',
    secondary: '#00C9DB',
    error: '#f13a59',
  },
};
