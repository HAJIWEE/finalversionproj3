import React, { useCallback, useEffect, useState } from "react";
// import { Outlet, Link } from "react-router-dom";
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

const PaymentMethod = () => {
  const [cart_value, setCartValue] = useState(100);
  //get cartValue from frontend
  const [instalment_period, setInstalmentPeriod] = useState(0);
  const [monthlyAmount, setMonthlyAmount] = useState(0);
  const [userEmail, setUserEmail] = useState("");
  const [full_payment, setFull_payment] = useState(false);
  const [cart_id, setCart_id] = useState("");
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const calculateMonth = (a, b) => {
    let monthPay = a / b;
    return monthPay.toFixed(2);
  };

  const handleChange = (event) => {
    setInstalmentPeriod(event.target.value);
  };

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
      const postResponse = await axios.post(`${BACKEND_URL}/Payment`, {
        userEmail,
        cart_id,
        instalment_period,
        cart_value,
        monthlyAmount,
        full_payment,
      });
      console.log(postResponse);
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
    const transaction = await axios.get(`${BACKEND_URL}/User/${email}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const { data } = transaction;
    const { UUID } = data;
    setUserEmail(UUID);
  };

  useEffect(() => {
    getuserInfo();
  }, []);

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
    <div className="Paymentbox">
      <form onSubmit={handleSubmit}>
        <div>
          <Box sx={{ maxWidth: 300 }}>
            <Box>
              <TextField
                id="outlined-read-only-input"
                label="UserEmail"
                defaultValue={userEmail}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Box>
            <Box>
              <TextField
                id="outlined-read-only-input"
                label="Total Amount"
                defaultValue={cart_value}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Box>
            <Box sx={{ Width: 200 }}>
              <FormControl>
                <InputLabel id="demo-simple-select-label">
                  Installment Period
                </InputLabel>
                <Select
                  labelId="Instalment Period"
                  id="Period"
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
            <Box>
              <TextField
                id="outlined-read-only-input"
                label="Monthly Payment"
                defaultValue={monthlyAmount}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Box>
          </Box>
        </div>
        <br />
        <br />
        <div>
          <Box sx={{ mx: 23 }}>
            <Button style={{ width: 100 }} variant="contained">
              Pay now
            </Button>
          </Box>
        </div>
      </form>
    </div>
  );
};
//};

export { PaymentMethod };
