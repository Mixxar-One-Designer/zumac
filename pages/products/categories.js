import React from 'react';
import {
  Box,
  Grid,
  Link,
  List,
  ListItem,
  Slide,
  Typography,
} from '@material-ui/core';
import Layout from '../../components/Layout';
import getCommerce from '../../utils/commerce';
import { useStyles } from '../../utils/styles';
import NextLink from 'next/link';
import { Category } from '@material-ui/icons';

export default function CategoryPage(props) {
  const { category } = props;

  const classes = useStyles();

  return (
    <Layout title={category.name} commercePublicKey={props.commercePublicKey}>
      <div className={classes.section}>
        <NextLink href="/" passHref>
          <Link>
            <Typography> Back to store </Typography>
          </Link>
        </NextLink>
      </div>
      <Category>Categories</Category>
      <Slide direction="up" in={true}>
        <Grid container spacing={1}>
          <Grid item md={6}>
            <img
              src={category.media.source}
              alt={category.name}
              className={classes.smallImage}
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
                  {category.name}
                </Typography>
              </ListItem>
              <ListItem>
                <Box
                  dangerouslySetInnerHTML={{ __html: category.description }}
                ></Box>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Slide>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const { id } = params;
  const commerce = getCommerce();
  const category = await commerce.categories.retrieve(id, {
    type: 'permalink',
  });
  return {
    props: {
      category,
    },
  };
}
