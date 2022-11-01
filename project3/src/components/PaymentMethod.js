import React, { useState } from "react";
// import { Outlet, Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { BACKEND_URL } from "../constants";
import axios from "axios";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const PaymentMethod = () => {
  const [cart_value, setCartValue] = useState(0);
  //get cartValue from frontend
  const [instalment_period, setInstalmentPeriod] = useState();
  const [monthlyAmount, setMonthlyAmount] = useState(0);
  const [userEmail, setUserEmail] = useState("");
  //get userEmail from frontend - passing of props
  const [full_payment, setFull_payment] = useState(false);
  const [cart_id, setCart_id] = useState("");
  //const { user, getAccessTokenSilently } = useAuth0();

  /* const valueText = (value: number) => {
    return `${value}`;
  };
 */
  const handleChange = (event) => {
    setInstalmentPeriod(event.target.value);
    console.log(instalment_period);
  };
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

  //get cart_id from cart page after clicking on checkout.
  /*  const getData = async (event) => {
    try {
      const getResponse = await axios.get(`${BACKEND_URL}/Payment/:cart_id`);
      const returnedData = getResponse.data;
      setMonthlyAmount(returnedData.instalAmount);
    } catch (error) {
      console.log(error);
    }
  }; */

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <Box sx={{ width: 300 }}>
            <span>Cart ID: {cart_id}</span>
            <br />
            <TextField
              id="outlined-read-only-input"
              label="UserEmail"
              defaultValue={userEmail}
              InputProps={{
                readOnly: true,
              }}
            />

            <TextField
              id="outlined-read-only-input"
              label="Total Amount"
              defaultValue={cart_value}
              InputProps={{
                readOnly: true,
              }}
            />
            <Box sx={{ width: 300, mx: 10 }}>
              <span>Installment Duration</span>
              <Slider
                aria-label="Installment Period"
                defaultValue={0}
                getAriaValueText={instalment_period}
                valueLabelDisplay="auto"
                name="instalment_period"
                onChange={handleChange}
                step={1}
                marks
                min={1}
                max={12}
              />
            </Box>
            <TextField
              id="outlined-read-only-input"
              defaultValue={instalment_period}
              InputProps={{
                readOnly: true,
              }}
            />
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

export { PaymentMethod };
