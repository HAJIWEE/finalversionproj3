import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { BACKEND_URL } from "../constants";
import "./cssfiles/Payment.css";
import axios from "axios";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Row from "react-bootstrap/Row";
import divider from "./images/NavBar Divider.svg";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const PaymentMethod = () => {
  const [cart_value, setCartValue] = useState(0.0);
  const [instalment_period, setInstalmentPeriod] = useState(0);
  const [monthlyAmount, setMonthlyAmount] = useState(0.0);
  const [userEmail, setUserEmail] = useState("");
  const [full_payment, setFull_payment] = useState(false);
  const [cart_id, setCart_id] = useState(0);
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userCartItems, setUserCartItems] = useState();
  const [redirect, setRedirectState] = useState(false);

  const calculateMonth = (a, b) => {
    let monthPay = a / b;
    return monthPay.toFixed(2);
  };

  const handleChange = (event) => {
    setInstalmentPeriod(event.target.value);
  };

  useEffect(() => {
    if (userCartItems !== undefined) {
      var newsum = 0.0;
      var cart_id = 0;
      userCartItems.forEach((item) => {
        console.log(item);
        const { itemPrice, cartID } = item;
        cart_id = cartID;
        newsum += parseFloat(itemPrice);
      });
      setCart_id(cart_id);
      setCartValue(newsum);
    }
  }, [userCartItems]);

  async function getListings() {
    if (user !== undefined) {
      const accessToken = await getAccessTokenSilently({
        audience: `https://Proj3/api`,
        scope: "read:current_user",
      });
      const buyerID = user.email;
      const { data } = await axios.get(`${BACKEND_URL}/Add2Cart/${buyerID}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      await setUserCartItems(data);
    }
  }

  useEffect(() => {
    getListings();
  }, []);

  /* const monthlyPayment = useCallback(
    (a) => {
      if (a !== 0) {
        let payMonth = calculateMonth(cart_value, instalment_period + 1);
        return payMonth;
      } else {
        return cart_value;
      }
    },
    [cart_value, instalment_period]
  ); */

  /* const monthlyPayment = (a) => {
    if (a !== 0) {
      let payMonth = calculateMonth(cart_value, instalment_period + 1);
      return payMonth;
    } else {
      return cart_value;
    }
  }; */

  useEffect(() => {
    if (instalment_period !== 0) {
      setMonthlyAmount(calculateMonth(cart_value, instalment_period));
    } else {
      return setMonthlyAmount(cart_value);
    }
  }, [instalment_period]);

  console.log(instalment_period);
  console.log(monthlyAmount);

  /*  useEffect(() => {
    const monthlyFinal = monthlyPayment(instalment_period);
    setMonthlyAmount(monthlyFinal.toFixed(2));
  }, [monthlyPayment, instalment_period]);
  console.log(monthlyAmount); */

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const accessToken = await getAccessTokenSilently({
        audience: `https://Proj3/api`,
        scope: "read:current_user",
      });
      await axios
        .post(
          `${BACKEND_URL}/payment`,
          {
            userEmail,
            cart_id,
            instalment_period,
            cart_value,
            monthlyAmount,
            full_payment,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(async () => {
          await axios
            .post(
              `${BACKEND_URL}/Add2Cart/clear`,
              { cart_id },
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            )
            .then(() => {
              setRedirectState(true);
            });
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getuserInfo = async () => {
    const accessToken = await getAccessTokenSilently({
      audience: `https://Proj3/api`,
      scope: "read:current_user",
    });
    const email = user.email;
    console.log(email);
    const transaction = await axios.get(`${BACKEND_URL}/User/${email}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const { data } = transaction;

    const { user_id } = data;
    setUserEmail(user_id);
  };

  if (user !== undefined) {
    getuserInfo();
  }

  /*   async function getCartId() {
    const accessToken = await getAccessTokenSilently({
      audience: `https://Proj3/api`,
      scope: "read:current_user",
    });
    const { data } = await axios.get(`${BACKEND_URL}/cart`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(data);
    await setCart_id(data);
  }

  useEffect(() => {
    getCartId();
  }, []); */

  return (
    <div>
      {redirect == true ? (
        <div>
          <Navigate to="/newsfeed" />
        </div>
      ) : (
        <Box className="PaymentPage">
          <Row className="paymentTitleBar">
            <Link to="/cart">
              <ChevronLeftIcon fontSize="large" color="success" />
            </Link>
            <label className="paymentTitle">Payment Method</label>
          </Row>
          <Row className="paymentDivider">
            <img src={divider} alt="divider" />
          </Row>
          <form>
            <div className="Paymentbox">
              <label className="titleLabel">
                What do you want to split your payment?
              </label>
              <Box sx={{ pl: 5 }}>
                <Box sx={{ pt: 4, pb: 2 }}>
                  <TextField
                    className="textField"
                    style={{ width: 240, color: "purple" }}
                    id="outlined-read-only-input"
                    label="User"
                    variant="filled"
                    value={userEmail}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Box>
                <Box sx={{ pb: 2 }}>
                  <TextField
                    className="textField"
                    style={{ width: 240 }}
                    id="outlined-read-only-input"
                    label="Cart Amount"
                    variant="filled"
                    value={cart_value}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Box>
                <Box sx={{ pb: 2 }}>
                  <FormControl
                    style={{ width: 240 }}
                    variant="filled"
                    className="textField"
                  >
                    <InputLabel id="demo-simple-select-filled-label">
                      Installment Period
                    </InputLabel>
                    <Select
                      labelId="Instalment Period"
                      id="Period"
                      variant="filled"
                      value={instalment_period}
                      label="Instalment Period"
                      onChange={handleChange}
                    >
                      <MenuItem value={0}>0</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                      <MenuItem value={5}>5</MenuItem>
                      <MenuItem value={6}>6</MenuItem>
                      <MenuItem value={7}>7</MenuItem>
                      <MenuItem value={8}>8</MenuItem>
                      <MenuItem value={9}>9</MenuItem>
                      <MenuItem value={10}>10</MenuItem>
                      <MenuItem value={11}>11</MenuItem>
                      <MenuItem value={12}>12</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ pb: 2 }}>
                  <TextField
                    className="textField"
                    style={{ width: 240 }}
                    id="outlined-read-only-input"
                    label="Monthly Payment"
                    variant="filled"
                    value={monthlyAmount}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Box>
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ mt: 2 }}
              >
                <Button
                  style={{ width: 100 }}
                  variant="contained"
                  onClick={handleSubmit}
                >
                  Pay now
                </Button>
              </Box>
            </div>
          </form>
        </Box>
      )}
    </div>
  );
};
//};

export { PaymentMethod };
