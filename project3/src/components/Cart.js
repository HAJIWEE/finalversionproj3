import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import "./cssfiles/Cart.css";
//***imports from images folder***
import divider from "./images/NavBar Divider.svg";
import deletesvg from "./images/Delete.svg";
import walletsvg from "./images/Wallet.svg";
//***imports from react-bootstrap***
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useAuth0 } from "@auth0/auth0-react";
import { BACKEND_URL } from "../constants";

const Cart = (props) => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userCartItems, setUserCartItems] = useState();
  const [totalSum, setTotalSum] = useState(0.0);

  useEffect(() => {
    if (userCartItems !== undefined) {
      var newsum = 0.0;
      userCartItems.forEach((item) => {
        console.log(item);
        const { itemPrice } = item;
        console.log(itemPrice);
        newsum += parseInt(itemPrice);
      });
      setTotalSum(newsum);
    }
  }, [userCartItems]);

  const handleDelete = async (itemName, event) => {
    const accessToken = await getAccessTokenSilently({
      audience: `https://Proj3/api`,
      scope: "read:current_user",
    });
    const { data } = await axios.put(`${BACKEND_URL}/Add2Cart/`, itemName, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    getListings();
  };

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

  const renderCard = () => {
    if (userCartItems !== undefined) {
      const card = userCartItems.map((item) => {
        const { cartID, itemName, itemPrice, sellerUserName, buyerUserName } =
          item;
        return (
          <Card className="cardBox" key={itemName}>
            <Card.Body>
              <Card.Title style={{ margin: 10 }}>{itemName}</Card.Title>
              <Card.Subtitle style={{ margin: 10 }}>${itemPrice}</Card.Subtitle>
              <Card.Text style={{ margin: 10 }}>
                Seller Email: {sellerUserName}
              </Card.Text>
              <Button
                className="btnBox"
                variant="primary"
                onClick={() => handleDelete(item)}
              >
                <img src={deletesvg} alt="Delete svg" /> Delete
              </Button>
            </Card.Body>
          </Card>
        );
      });
      return card;
    }
  };

  useEffect(() => {
    getListings();
  }, []);

  return (
    <div>
      <Container className="pageBody">
        <div className="pageTitleBar">
          <Link to="/newsfeed">
            {<ChevronLeftIcon fontSize="large" color="success" />}
          </Link>
          <label className="pageTitle">Cart</label>
        </div>
        <Row className="pageDivider">
          <img src={divider} alt="divider" />
        </Row>
        <div className="CheckOut">
          <div className="TotalSum">Cart Total: ${totalSum}</div>
          <Link to="/cart/paymentmethod">
            <Button className="btnBox" variant="primary">
              <img src={walletsvg} alt="Wallet svg" /> Check Out
            </Button>
          </Link>
        </div>

        <div className="cardCenterViewBox">{renderCard()}</div>

        <div className="extraSpace"></div>
      </Container>
    </div>
  );
};

export { Cart };

// // what to display in cart?
// // - Items added by user with intention to buy (Display as Card objects)
// // - Items added are retrieved from user object
// // what is displayed in each Item Card?
// // - Seller Name, Item Image, Item Name, Item Price, Item Quantity (Add & Minus option), Delete button
