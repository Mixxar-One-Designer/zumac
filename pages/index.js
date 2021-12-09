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

export default function HomePage(props) {
  const { products, categories } = props;
  const classes = useStyles();

  return (
    <Layout title="HomePage" commercePublicKey={props.commercePublicKey}>
      <Carousel className={classes.mt1} animation="slide">
        <CardActionArea>
          <CardMedia
            className={classes.banner}
            component="img"
            align="center"
            alt="Banner"
            image="/images/banner.jpg"
          />
        </CardActionArea>
      </Carousel>

      {products.length === 0 && <Alert>No Products Found.</Alert>}
      <Grid container spacing={2}>
        {categories.map((category) => (
          <Slide key={category.id} item md={2} className={classes.mid}>
            <Link href={`/categories/${category.permalink}`}>
              <CardActionArea>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="body2"
                    color="textPrimary"
                    component="p"
                  >
                    {category.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Link>
          </Slide>
        ))}
      </Grid>
      <Link href={`/categories/`}>{categories.name}</Link>
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
