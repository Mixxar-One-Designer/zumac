import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Grid,
  List,
  ListItem,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';
import dynamic from 'next/dynamic';
import { Alert } from '@material-ui/lab';
import { useContext } from 'react';
import Layout from '../components/Layout';
import { Store } from '../components/Store';
import getCommerce from '../utils/commerce';
import { CART_RETRIEVE_SUCCES, ORDER_SET } from '../utils/constants';
import { useStyles } from '../utils/styles';
import router from 'next/router';
import { Stepper } from '@material-ui/core';
import { Step, StepLabel, TextField } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import {
  InputLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@material-ui/core';
import process from 'process';

const dev = process.env.NODE_ENV === 'development';
function Checkout(props) {
  const classes = useStyles();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  useEffect(() => {
    if (!cart.loading) {
      generateCheckoutToken();
    }
  }, [cart.loading]);

  const generateCheckoutToken = async () => {
    if (cart.data.line_items.length) {
      const commerce = getCommerce(props.commercePublicKey);
      const token = await commerce.checkout.generateToken(cart.data.id, {
        type: 'cart',
      });
      setCheckoutToken(token);
      fetchShippingCountries(token.id);
    } else {
      router.push('/cart');
    }
  };

  // Customer details
  const [firstName, setFirstName] = useState(dev ? 'Ibrahim' : '');
  const [lastName, setLastName] = useState(dev ? 'Murtala' : '');
  const [email, setEmail] = useState(dev ? 'ibrahimmurtala@email.com' : '');

  // Shipping Details
  const [shippingName, setShippingName] = useState(
    dev ? 'Ibrahim Murtala' : ''
  );
  const [shippingStreet, setShippingStreet] = useState(
    dev ? '123 Fake st' : ''
  );
  const [shippingPostalZipCode, setShippingPostalZipCode] = useState(
    dev ? '94107' : ''
  );
  const [shippingCity, setShippingCity] = useState(dev ? 'Los Angeles' : '');
  const [shippingStateProvince, setShippingStateProvince] = useState(
    dev ? 'AR' : ''
  );
  const [shippingCountry, setShippingCountry] = useState(dev ? 'GB' : '');
  const [shippingOption, setShippingOption] = useState({});

  // Shipping and fullfilment data
  const [shippingCountries, setShippingCountries] = useState({});
  const [shippingSubdivisions, setShippingSubdivisions] = useState({});
  const [shippingOptions, setShippingOptions] = useState([]);

  // Stepper
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = ['Customer information', 'Shipping details', 'Payment options'];
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

    if (activeStep === steps.length - 1) {
      handleCaptureCheckout();
    }
  };
  const handleCaptureCheckout = async () => {
    const orderData = {
      line_items: checkoutToken.live.line_items,
      customer: {
        firstname: firstName,
        lastname: lastName,
        email: email,
      },
      shipping: {
        name: shippingName,
        street: shippingStreet,
        town_city: shippingCity,
        country_state: shippingStateProvince,
        postal_zip_code: shippingPostalZipCode,
        country: shippingCountry,
      },
      fulfillment: {
        shipping_method: shippingOption,
      },
      payment: {
        gateway: 'manual',
        manual: {
          id: 'gway_KwbeE20E6p8xl3',
        },
      },
    };
    const commerce = getCommerce(props.commercePublicKey);
    try {
      const order = await commerce.checkout.capture(
        checkoutToken.id,
        orderData
      );
      dispatch({ type: ORDER_SET, payload: order });
      localStorage.setItem('order receipt', JSON.stringify(order));
      await refreshCart();
      router.push('/confirmation');
    } catch (err) {
      const errList = [err.data.error.message];
      const errs = err.data.error.errors;
      for (const index in errs) {
        errList.push(`${index}: ${errs[index]}`);
      }
      setErrors(errList);
    }
  };
  const refreshCart = async () => {
    const commerce = getCommerce(props.commercePublicKey);
    const newCart = await commerce.cart.refresh();
    dispatch({ type: CART_RETRIEVE_SUCCES, payload: newCart });
  };

  const [errors, setErrors] = useState([]);
  const [checkoutToken, setCheckoutToken] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleBack = () => {
    setErrors([]);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleShippingCountryChange = (e) => {
    const currentValue = e.target.value;
    setShippingCountry(e.target.value);
    fetchSubdivisions(currentValue);
  };

  const fetchShippingCountries = async (CheckoutTokenId) => {
    const commerce = getCommerce(props.commercePublicKey);
    const countries = await commerce.services.localeListShippingCountries(
      CheckoutTokenId
    );
    setShippingCountries(countries.countries);
  };

  const fetchSubdivisions = async (countryCode) => {
    const commerce = getCommerce(props.commercePublicKey);
    const subdivisions = await commerce.services.localeListSubdivisions(
      countryCode
    );
    setShippingSubdivisions(subdivisions.subdivisions);
  };

  const handleSubdivisionChange = (e) => {
    const currentValue = e.target.value;
    setShippingStateProvince(currentValue);
    fetchShippingOptions(checkoutToken.id, shippingCountry, currentValue);
  };

  const handleShippingOptionChange = (e) => {
    const currentValue = e.target.value;
    setShippingOption(currentValue);
    console.log(currentValue);
  };

  const fetchShippingOptions = async (
    CheckoutTokenId,
    country,
    stateProvince = null
  ) => {
    const commerce = getCommerce(props.commercePublicKey);
    const options = await commerce.checkout.getShippingOptions(
      CheckoutTokenId,
      {
        country: country,
        region: stateProvince,
      }
    );
    setShippingOptions(options);
    const shippingOption = options[0] ? options[0].id : null;
    setShippingOption(shippingOption);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="Full Name"
              name={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Mobile"
              name={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </>
        );
      case 1:
        return (
          <>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="shippingName"
              label="Full Name"
              name="name"
              value={shippingName}
              onChange={(e) => setShippingName(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="shippingStreet"
              label="Street"
              name="address"
              value={shippingStreet}
              onChange={(e) => setShippingStreet(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="shippingCity"
              label="City"
              name="city"
              value={shippingCity}
              onChange={(e) => setShippingCity(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="shippingPostalZipCode"
              label="Postal/Zip Code"
              name="postalCode"
              value={shippingPostalZipCode}
              onChange={(e) => setShippingPostalZipCode(e.target.value)}
            />
            <FormControl className={classes.formControl}>
              <InputLabel id="shippingCountry-label">Country</InputLabel>
              <Select
                labelId="shippingCountry-label"
                id="shppingCountry"
                label="Country"
                fullWidth
                onChange={handleShippingCountryChange}
                value={shippingCountry}
              >
                {Object.keys(shippingCountries).map((index) => (
                  <MenuItem value={index} key={index}>
                    {shippingCountries[index]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="shippingStateProvince-label">
                State / Province
              </InputLabel>
              <Select
                labelId="shippingStateProvince-label"
                id="shppingStateProvince"
                label="State/Province"
                fullWidth
                onChange={handleSubdivisionChange}
                value={shippingStateProvince}
                required
                className={classes.mt1}
              >
                {Object.keys(shippingSubdivisions).map((index) => (
                  <MenuItem value={index} key={index}>
                    {shippingSubdivisions[index]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="shippingOption-label">Shipping Option</InputLabel>

              <Select
                labelId="shippingOption-label"
                id="shippingOption"
                label="Shipping Option"
                fullWidth
                onChange={handleShippingOptionChange}
                value={shippingOption}
                required
                className={classes.mt1}
              >
                {shippingOptions.map((method, index) => (
                  <MenuItem value={method.id} key={index}>
                    {`${method.description} - $${method.price.formatted_with_code}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </>
        );
      case 2:
        return (
          <>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="Payment Method"
                name="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel
                  label="Pay Cash or Bank Transfer"
                  value="Cash"
                  control={<Radio />}
                ></FormControlLabel>
              </RadioGroup>
            </FormControl>
          </>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Layout title="Home" commercePublicKey={props.commercePublicKey}>
      <Typography gutterBottom variant="h6" color="textPrimary" component="h1">
        Checkout
      </Typography>
      {cart.loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2}>
          <Grid item md={8}>
            <Card className={classes.p1}>
              <form>
                <Stepper activeStep={activeStep} alternativeLabel>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
                <Box>
                  {activeStep === steps.length ? (
                    errors && errors.length > 0 ? (
                      <Box>
                        <List>
                          {errors.map((error) => (
                            <ListItem key={error}>
                              <Alert severity="error">{error}</Alert>
                            </ListItem>
                          ))}
                        </List>
                        <Box className={classes.mt1}>
                          <Button
                            onClick={handleBack}
                            className={classes.button}
                          >
                            Back
                          </Button>
                        </Box>
                      </Box>
                    ) : (
                      <Box>
                        <CircularProgress />
                        <Typography className={classes.instructions}>
                          Confirming Order...
                        </Typography>
                      </Box>
                    )
                  ) : (
                    <Box>
                      {getStepContent(activeStep)}
                      <Box className={classes.mt1}>
                        <Button
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          className={classes.button}
                        >
                          Back
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleNext}
                          className={classes.button}
                        >
                          {activeStep === steps.length - 1
                            ? 'Confirm Order'
                            : 'Next'}
                        </Button>
                      </Box>
                    </Box>
                  )}
                </Box>
              </form>
            </Card>
          </Grid>
          <Grid item md={4}>
            <Card>
              <List>
                <ListItem>
                  <Typography variant="h2">Order summary</Typography>
                </ListItem>
                {cart.data.line_items.map((lineItem) => (
                  <ListItem key={lineItem.id}>
                    <Grid container>
                      <Grid xs={6} item>
                        {lineItem.inventory_managed} x {lineItem.name}
                      </Grid>
                      <Grid xs={6} item>
                        <Typography align="right">
                          {lineItem.line_total.formatted_with_symbol}
                        </Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                ))}
                <ListItem>
                  <Grid container>
                    <Grid xs={6} item>
                      Subtotal
                    </Grid>
                    <Grid xs={6} item>
                      <Typography align="right">
                        {cart.data.subtotal.formatted_with_symbol}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      )}
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(Checkout), {
  ssr: false,
});
