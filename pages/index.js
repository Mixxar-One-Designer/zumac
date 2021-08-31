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
import algoliasearch from 'algoliasearch';
import {
  InstantSearch,
  Hits,
  ToggleRefinement,
  RefinementList,
} from 'react-instantsearch-dom';
import Carousel from 'react-material-ui-carousel';
import NextLink from 'next/link';

const client = algoliasearch(
  // eslint-disable-next-line no-undef
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  // eslint-disable-next-line no-undef
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY
);

function Product({ hit }) {
  return <pre>{JSON.stringify(hit, null, 2)}</pre>;
}

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
              <h1>Stock Products</h1>
              <img
                src={product.media.source}
                alt={product.name}
                className={classes.small}
              ></img>
              <Typography
                gutterBottom
                variant="body2"
                color="textPrimary"
                component="p"
              >
                {product.name}
              </Typography>
            </Link>
          </NextLink>
        ))}
      </Carousel>
      {products.length === 0 && <Alert>No Products Found.</Alert>}
      <>
        <h1>Categories</h1>

        <InstantSearch searchClient={client} indexName="products">
          <ToggleRefinement
            attribute="has degital delivery"
            label="Ebooks"
            value={true}
          />

          <RefinementList atrribute="categories.name" />

          <Hits hitComponent={Product} />
        </InstantSearch>
      </>
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
  return {
    props: {
      products,
    },
  };
}
