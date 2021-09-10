import React, { useContext } from 'react';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Link,
  ListItem,
  Slide,
  Typography,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Layout from '../components/Layout';
import getCommerce from '../utils/commerce';
import { useStyles } from '../utils/styles';
import Carousel from 'react-material-ui-carousel';
import NextLink from 'next/link';
import { CART_RETRIEVE_SUCCES } from '../utils/constants';
import { Router } from '@material-ui/icons';
import { Store } from '../components/Store';

export default function Home(props) {
  const { products } = props;
  const { product } = props;
  const classes = useStyles();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async () => {
    const commerce = getCommerce(props.commercePublicKey);
    const lineItem = cart.data.line_items.find(
      (x) => x.product_id === product.id
    );
    if (lineItem) {
      const cartData = await commerce.cart.update(lineItem.id);
      dispatch({ type: CART_RETRIEVE_SUCCES, payload: cartData.cart });
      Router.push('/cart');
    } else {
      const cartData = await commerce.cart.add(product.id);
      dispatch({ type: CART_RETRIEVE_SUCCES, payload: cartData.cart });
      Router.push('/cart');
    }
  };

  return (
    <Layout title="Home" commercePublicKey={props.commercePublicKey}>
      <Carousel className={classes.mt1} animation="slide">
        {products.map((product) => (
          <NextLink
            key={product._id}
            href={`/products/${product.permalink}`}
            passHref
          >
            <Link>
              <h1
                className="font-size-display1 mt-5 text-center mx-auto text-uppercase"
                style={{ maxWidth: '53rem' }}
                align="center"
              >
                Welcome to zuma Express the earth biggest online mobile store.
              </h1>
              <img className={classes.small}></img>
              <Typography
                gutterBottom
                variant="body2"
                color="textPrimary"
                component="p"
              ></Typography>
            </Link>
          </NextLink>
        ))}
      </Carousel>
      {products.length === 0 && <Alert>No Products Found.</Alert>}
      <h1>Stock Products</h1>
      <Grid container spacing={1}>
        {products.map((product) => (
          <Grid key={product.id} item md={2} className={classes.cardMedium}>
            <Slide key={product.id} direction="up" in={true}>
              <Card>
                <Link href={`/products/${product.permalink}`}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt={product.name}
                      image={product.media.source}
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="body2"
                        color="textPrimary"
                        component="p"
                      >
                        {product.name}
                      </Typography>
                      <Box>
                        <Typography
                          variant="body1"
                          color="textPrimary"
                          component="p"
                        >
                          {product.price.formatted_with_symbol}
                        </Typography>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Link>
                <>
                  <ListItem>
                    <Button
                      className={classes.btn}
                      type="button"
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={addToCartHandler}
                    >
                      Add to basket
                    </Button>
                  </ListItem>
                </>
              </Card>
            </Slide>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}

export async function getStaticProps() {
  const commerce = getCommerce();
  const { data: products } = await commerce.products.list();
  const { data: categories } = await commerce.categories.list();
  return {
    props: {
      products,
      categories,
    },
  };
}
