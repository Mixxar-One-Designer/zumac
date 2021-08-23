import { 
  Box, 
  Card, 
  CardActionArea, 
  CardContent, 
  CardMedia, 
  Grid, 
  Link, 
  Slide, 
  Typography
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Layout from '../components/Layout';
import getCommerce from '../utils/commerce';

export default function Home(props) {
  const { products } = props;
  return (
    <Layout title="Home" commercePublicKey={props.commercePublicKey}>
      {products.lenght === 0 && <Alert>No Products Found.</Alert>}
      <Grid container spacing={1}>
      {products.map((product) => (
          <Grid key={product.id} item md={3}>
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
};