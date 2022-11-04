import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import "./cssfiles/Newsfeed.css";
import sample from "./images/Gendou card.png";
import { Outlet, Link } from "react-router-dom";
import FaceIcon from "@mui/icons-material/Face";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { color } from "@mui/system";
import { green } from "@mui/material/colors";
import TextField from "@mui/material/TextField";

import { BACKEND_URL } from "../constants";
import { Margin } from "@mui/icons-material";

const Search = (props) => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [newsfeedItems, setNewsfeedItems] = useState();
  const [dpurl, setdisplayURL] = useState("");
  const [userName, setCurrUser] = useState("");

  async function getListings() {
    const accessToken = await getAccessTokenSilently({
      audience: `https://Proj3/api`,
      scope: "read:current_user",
    });
    const { data } = await axios.get(`${BACKEND_URL}/list`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(data);
    await setNewsfeedItems(data);
  }

  useEffect(() => {
    getListings();
  }, []);

  const handleAddToCart = async (itemAddedToCart, event) => {
    event.preventDefault();
    const { id, itemName, itemPrice, sellerUserID } = itemAddedToCart;
    const accessToken = await getAccessTokenSilently({
      audience: `https://Proj3/api`,
      scope: "read:current_user",
    });
    const buyerUserID = user.email;
    console.log({ id, itemName, itemPrice, sellerUserID, buyerUserID });
    const res = await axios.post(
      `${BACKEND_URL}/Add2Cart`,
      { id, itemName, itemPrice, sellerUserID, buyerUserID },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log(res);
  };

  //   //   // newsfeed rendering function
  const newsfeedCards = (items) => {
    if (newsfeedItems !== undefined) {
      const card = items.map((item) => {
        const {
          itemName,
          itemPrice,
          itemImageUrl,
          itemDescription,
          sellerdpURL,
          sellerUserName,
        } = item;

        return (
          <div>
            <ul className="InstaCard">
              <li>
                <ul className="ItemTitleBanner">
                  <li>
                    <img className="smallerpp" src={sellerdpURL} alt="lolz" />
                  </li>
                  <li style={{ marginTop: 5, color: "lime" }}>
                    {sellerUserName}
                  </li>
                </ul>
              </li>
              <li className="productpic">
                <img className="pic" src={itemImageUrl} alt="opps" />
                <div className="likebtn">
                  <FavoriteIcon fontSize="Large" />
                </div>
              </li>
              <li className="ItemTitle">{itemName}</li>
              <li className="ItemDescrip">{itemDescription}</li>
              <li>
                <ul className="pricetable">
                  <li>
                    <button
                      className="CartAdd"
                      onClick={(event) => handleAddToCart(item, event)}
                    >
                      Add to cart
                    </button>
                  </li>
                  <li style={{ marginRight: 170, color: "lime" }}>
                    $${itemPrice}
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        );
      });

      return card.reverse();
    }
  };

  return (
    <div style={{ Margin: 0 }}>
      <div style={{ Margin: 0 }}>
        <TextField
          id="outlined-read-only-input"
          label="Search"
          defaultValue=""
          InputProps={{
            readOnly: false,
          }}
          color="success"
          style={{
            width: 390,
            fontSize: 30,
            fontWeight: 400,
            Margin: 0,
          }}
        />
      </div>
      <div>{newsfeedCards(newsfeedItems)}</div>
      <div className="extraSpace"></div>
    </div>
  );
};
export { Search };
