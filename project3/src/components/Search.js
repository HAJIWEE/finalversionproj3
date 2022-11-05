import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import "./cssfiles/Newsfeed.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TextField from "@mui/material/TextField";

import { BACKEND_URL } from "../constants";

const Search = (props) => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [newsfeedItems, setNewsfeedItems] = useState();
  const [Param, setsearchTerm] = useState("");

  async function getListings() {
    const { data } = await axios.get(`${BACKEND_URL}/list/search/${Param}`);
    setNewsfeedItems(data);
  }
  const handleChange = (event) => {
    event.preventDefault();
    setsearchTerm(event.target.value);
  };

  useEffect(() => {
    getListings();
  }, [Param]);

  const handleAddToCart = async (itemAddedToCart, event) => {
    event.preventDefault();
    const { id, itemName, itemPrice, sellerUserID } = itemAddedToCart;
    const accessToken = await getAccessTokenSilently({
      audience: `https://Proj3/api`,
      scope: "read:current_user",
    });
    const buyerUserID = user.email;
    const res = await axios.post(
      `${BACKEND_URL}/Add2Cart`,
      { id, itemName, itemPrice, sellerUserID, buyerUserID },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  };

  //   //   // newsfeed rendering function
  const newsfeedCards = (items) => {
    if (newsfeedItems !== undefined && newsfeedItems != null) {
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
                    {user !== undefined ? (
                      <button
                        className="CartAdd"
                        onClick={(event) => handleAddToCart(item, event)}
                      >
                        Add to cart
                      </button>
                    ) : (
                      <div></div>
                    )}
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
          onChange={handleChange}
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
