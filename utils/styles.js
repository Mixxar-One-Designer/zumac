import { createTheme, makeStyles } from "@material-ui/core";

export const theme = createTheme({
    typography: {
        h1: {
            fontSize: '2.2rem',
            fontWeight:  400,
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
        maxWidth: '40rem',
        width: '100%',
    },
    mt1: {
        marginTop: '1rem !important',
    },
    p1: {
        padding: '1rem !important',
    },
    cardMedium: {
        maxWidth: '10rem',
        width: '100%',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        width: '100%',
    },
    searchSection: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
          display: 'flex',
        },
      },
      searchForm: {
        border: '1px solid #ffffff',
        backgroundColor: '#ffffff',
        borderRadius: 5,
        width: '100%',
      },
      searchInput: {
        paddingLeft: 5,
        color: '#000000',
        '& ::placeholder': {
          color: '#606060',
        },
      },
      iconButton: {
        backgroundColor: '#f8c040',
        padding: 5,
        borderRadius: '0 5px 5px 0',
        '& span': {
          color: '#000000',
        },
      },
}))


