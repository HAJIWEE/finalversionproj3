import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import "./cssfiles/Newsfeed.css";
import { Outlet, Link } from "react-router-dom";
import FaceIcon from "@mui/icons-material/Face";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { BACKEND_URL } from "../constants";

const Newsfeed = (props) => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [newsfeedItems, setNewsfeedItems] = useState();
  const [dpurl, setdisplayURL] = useState("");
  const [userName, setCurrUser] = useState("");

  async function getListings() {
    const { data } = await axios.get(`${BACKEND_URL}/list`);
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
          <div key={item.key}>
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
  if (user !== undefined) {
    async function profilePic() {
      const accessToken = await getAccessTokenSilently({
        audience: `https://Proj3/api`,
        scope: "read:current_user",
      });

      const UUID = user.email;
      const transaction = await axios.get(`${BACKEND_URL}/User/${UUID}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const { data } = transaction;
      const { dpurl, username } = data;
      setdisplayURL(dpurl);
      setCurrUser(username);
    }
    profilePic();
  }

  return (
    <div>
      <ul className="TitleCard">
        {dpurl === "" ? (
          <li>
            <div className="smallpp">
              <FaceIcon className="svg_icons_small" />
            </div>
          </li>
        ) : (
          <li>
            <div className="smallpp">
              <img className="smallpp" src={dpurl} alt="lolz" />
            </div>
          </li>
        )}
        <li>
          <h2 className="Banner">
            {user !== undefined ? `Welcome back!` : "Welcome"}
          </h2>
          <h2 className="Banner2">{userName !== "" && `${userName}`}</h2>
        </li>
      </ul>
      <div>{newsfeedCards(newsfeedItems)}</div>
      <div className="extraSpace"></div>
    </div>
  );
};
export { Newsfeed };
