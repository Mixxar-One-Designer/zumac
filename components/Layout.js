import React, { useContext, useEffect } from 'react';
import {
  ThemeProvider,
  CssBaseline,
  AppBar,
  Toolbar,
  Link,
  Container,
  Typography,
  Box,
  CircularProgress,
  Badge,
} from '@material-ui/core';
import { theme, useStyles } from '../utils/styles';
import Head from 'next/head';
import NextLink from 'next/link';
import getCommerce from '../utils/commerce';
import {
  CART_RETRIEVE_REQUEST,
  CART_RETRIEVE_SUCCES,
} from '../utils/constants';
import { Store } from './Store';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import InstagramIcon from '@material-ui/icons/Instagram';
import { YouTube } from '@material-ui/icons';
import FacebookIcon from '@material-ui/icons/Facebook';
import CallIcon from '@material-ui/icons/Call';
import MailIcon from '@material-ui/icons/Mail';

export default function Layout({
  children,
  commercePublicKey,
  title = 'Zuma',
}) {
  const classes = useStyles();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  useEffect(() => {
    const fetchCart = async () => {
      const commerce = getCommerce(commercePublicKey);
      dispatch({ type: CART_RETRIEVE_REQUEST });
      const cartData = await commerce.cart.retrieve();
      dispatch({ type: CART_RETRIEVE_SUCCES, payload: cartData });
    };
    fetchCart();
  }, []);

  return (
    <React.Fragment>
      <Head>
        <meta charSet="utf-8" />
        <title>{`${title} - Zuma Express `}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar
          position="static"
          color="default"
          elevation={0}
          className={classes.appBar}
        >
          <Toolbar className={classes.toolbar}>
            <NextLink href="/">
              <Link
                variant="h6"
                color="inherit"
                noWrap
                href="/"
                className={classes.toolbarTitle}
              >
                ZumaExpress
              </Link>
            </NextLink>
            <nav>
              <NextLink href="/cart">
                <Link
                  variant="button"
                  color="textPrimary"
                  href="/cart"
                  className={classes.link}
                >
                  {cart.loading ? (
                    <CircularProgress />
                  ) : cart.data.total_items > 0 ? (
                    <Badge badgeContent={cart.data.total_items} color="primary">
                      <ShoppingCartIcon>Cart</ShoppingCartIcon>
                    </Badge>
                  ) : (
                    'Cart'
                  )}
                </Link>
              </NextLink>
            </nav>
          </Toolbar>
        </AppBar>
        <Container component="main" className={classes.main}>
          {children}
        </Container>
        <Container maxWidth="md" component="footer">
          <Box mt={5}>
            <Typography variant="body2" color="default" align="center">
              <h3>Contact Us</h3>
              <CallIcon>Call</CallIcon>
              <Typography>0704-6768-448</Typography>
              <MailIcon>Mail</MailIcon>
              <Typography>zumainc@gmail.com</Typography>
              <Link
                href="https://web.facebook.com/Zumacom-Inc-101002112030988"
                variant="button"
                color="textPrimary"
                className={classes.link}
              >
                <FacebookIcon>Facebook</FacebookIcon>
              </Link>
              <Link
                href="https://www.instagram.com/zuma_inc/"
                variant="button"
                color="textPrimary"
                className={classes.link}
              >
                <InstagramIcon>Instagram</InstagramIcon>
              </Link>
              <Link
                href="https://www.youtube.com/channel/UCqp9U3x5p0efx_ObtIqmtww"
                variant="button"
                color="textPrimary"
                className={classes.link}
              >
                <YouTube>YouTube</YouTube>
              </Link>
              <Typography>
                &copy; Copyright Zuma Inc. 2021 All right reserved
                {'.'}
              </Typography>
            </Typography>
          </Box>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}
