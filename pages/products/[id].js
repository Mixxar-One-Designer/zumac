import React from 'react';
import { 
    Box, 
    Button, 
    Card,  
    Grid, 
    Link, 
    List, 
    ListItem, 
    Slide, 
    Typography
} from '@material-ui/core';
import { useContext } from 'react';
import Layout from '../../components/Layout';
import { Store } from '../../components/Store';
import getCommerce from '../../utils/commerce';
import { CART_RETRIEVE_SUCCES } from '../../utils/constants';
import { useStyles } from '../../utils/styles';
import Router from 'next/router';
import NextLink from 'next/link';
  
  export default function Product(props) {
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
    }

    return (
      <Layout title={product.name} commercePublicKey={props.commercePublicKey}>
          <div className={classes.section}>
              <NextLink href="/" passHref>
                  <Link>
                  <Typography> Back to store </Typography>
                  </Link>
              </NextLink>
          </div>
          <Slide direction="up" in={true}>
              <Grid container spacing={1}>
                  <Grid item md={6}>
                      <img 
                      src={product.media.source}
                      alt={product.name}
                      className={classes.largeImage} 
                      />
                  </Grid>
                  <Grid item md={3} xs={12}>
                      <List>
                          <ListItem>
                              <Typography 
                              gutterBottom
                              variant="h6"
                              color="textPrimary"
                              component="h1"
                              >
                                {product.name}
                              </Typography>
                          </ListItem>
                          <ListItem>
                              <Box 
                              dangerouslySetInnerHTML={{ __html: product.description }}
                              ></Box>
                          </ListItem>
                      </List>
                  </Grid>
                  <Grid item md={3} xs={12}>
                      <Card>
                          <List>
                              <ListItem>
                                  <Grid container>
                                      <Grid item xs={6}>
                                          Price
                                      </Grid>
                                      <Grid item xs={6}>
                                          {product.price.formatted_with_symbol}
                                      </Grid>
                                  </Grid>
                              </ListItem>
                                  <>
                                  <ListItem>
                                      <Button 
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
                          </List>
                      </Card>
                  </Grid>
              </Grid>
          </Slide>
      </Layout>
    );
  }
  
  export async function getServerSideProps({ params }) {
    const { id } = params;
    const commerce = getCommerce();
    const product = await commerce.products.retrieve(id, {
        type: 'permalink',
    });
    return {
      props: {
        product,
      },
    };
  }