import { createTheme, makeStyles } from '@material-ui/core';

export const theme = createTheme({
  typography: {
    h1: {
      fontSize: '2.2rem',
      fontWeight: 400,
      margin: '2rem 0',
    },
    h2: {
      fontSize: '1.8rem',
      fontWeight: 400,
      margin: '1rem 0',
    },
    h3: {
      fontSize: '1.4rem',
      fontWeight: 400,
      margin: '1rem 0',
    },
  },
  palette: {
    primary: {
      main: '#f0c000',
    },
    secondry: {
      main: '#208080',
    },
    tertiary: {
      main: '#ffffff',
    },
    error: {
      main: '#f04000',
    },
    background: {
      default: '#ffffff',
    },
  },
});

export const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: '#203050',
    '& a': {
      color: '#ffffff',
      marginLeft: 10,
    },
  },
  appBar: {
    backgroundColor: '#203050',
    '& a': {
      color: '#ffffff',
      marginLeft: 10,
    },
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: '1rem',
  },
  main: {
    padding: '1rem',
  },
  largeImage: {
    maxWidth: '50rem',
    width: '100%',
  },
  smallImage: {
    maxWidth: '30rem',
    width: '100%',
  },
  small: {
    maxWidth: '30rem',
    width: '100%',
  },
  mt1: {
    marginTop: '1rem !important',
  },
  banner: {
    maxWidth: '30rem',
    width: '100%',
  },
  p1: {
    padding: '1rem !important',
  },
  btn: {
    maxWidth: '5rem',
    width: '100%',
  },
  cardMedium: {
    maxWidth: '10rem',
    width: '100%',
  },
  section: {
    marginTop: 10,
    marginBottom: 10,
  },
  form: {
    width: '100%',
    maxWidth: 800,
    margin: '0 auto',
  },
  navbarButton: {
    color: '#ffffff',
    textTransform: 'initial',
  },
  transparentBackgroud: {
    backgroundColor: 'transparent',
  },
  error: {
    color: '#f04040',
  },
  fullWidth: {
    width: '100%',
  },
  reviewForm: {
    maxWidth: 800,
    width: '100%',
  },
}));
