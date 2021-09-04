import React from 'react';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Link,
  Slide,
  Typography,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Layout from '../components/Layout';
import getCommerce from '../utils/commerce';
import { useStyles } from '../utils/styles';
import Carousel from 'react-material-ui-carousel';
import NextLink from 'next/link';

export default function Home(props) {
  const { products } = props;
  const classes = useStyles();
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
              <h3 align="center"> Enjoy a 10% discount on all oders.</h3>
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
