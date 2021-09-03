import { createTheme } from '@material-ui/core';

export const theme = createTheme({
 palette: {
  primary: {
   main: '#F4A300',
   light: '#f4b700',
   contrastText: '#ffffff',
  },
  secondary: {
   main: '#3B7CAD',
  },
  text: {
   secondary: '#A5A5A5',
  },
 },
 typography: {
  h6: {
   fontWeight: 600,
  },
  h5: {
   fontWeight: 600,
  },
  subtitle2: {
   color: '#757575',
  },
  body2: {
   fontSize: 15,
  },
 },
 props: {
  MuiTextField: {
   variant: 'outlined',
  },
  MuiFormControl: {
   variant: 'outlined',
  },
  MuiButton: {
      disableElevation: true
  }
 },
 overrides: {
  MuiButton: {
   label: {
    textTransform: 'capitalize',
    fontWeight: 600,
   },
  },
 },
});
