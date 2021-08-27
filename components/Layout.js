import  React, { useContext, useEffect } from "react";
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
    Badge
 } from "@material-ui/core";
import { theme, useStyles } from "../utils/styles";
import Head from "next/head";
import NextLink from 'next/link';
import getCommerce from "../utils/commerce";
import { CART_RETRIEVE_REQUEST, CART_RETRIEVE_SUCCES } from "../utils/constants";
import { Store } from "./Store";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@material-ui/core';
import Home from '@material-ui/icons/Home';
import { InputBase } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

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
            const cartData = await
            commerce.cart.retrieve();
            dispatch({ type: CART_RETRIEVE_SUCCES, payload: cartData });
        };
        fetchCart();
    }, []);

    return (
        <React.Fragment>
            <Head>
                <meta charSet='utf-8' />
                <title>{`${title} - Zuma `}</title>
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
                                Zuma
                            </Link>
                        </NextLink>
                        <div className={classes.searchSection}>
                        <form className={classes.searchForm}>
                            <InputBase
                            name="query"
                            className={classes.searchInput}
                            placeholder="Search products"
                            />
                            <IconButton
                            type="submit"
                            className={classes.iconButton}
                            aria-label="search"
                            >
                            <SearchIcon />
                            </IconButton>
                        </form>
                        </div>
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
                        &copy; Copyright Zuma.com, inc. 2021 All right reserved
                        {'.'}
                    </Typography>
                </Box>
                </Container>
            </ThemeProvider>
        </React.Fragment>
    );
}