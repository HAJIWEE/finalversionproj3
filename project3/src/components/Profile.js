import React, { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../constants";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import "./cssfiles/Profile.css";
import divider from "./images/NavBar Divider.svg";
import { Button } from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";

const Profile = (props) => {
  const { isAuthenticated, isLoading, logout, getAccessTokenSilently } =
    useAuth0();
  const { user } = useAuth0();
  const [imageurl, seturl] = useState("");
  const [usename, setusername] = useState("");

  if (user !== undefined) {
  }

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  // if (!props.info.userIsLoggedIn) {
  //   return <Navigate path="/login" replace={true} />;
  // }

  if (isAuthenticated) {
    async function getuserInfo() {
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
      console.log(dpurl);
      seturl(dpurl);
      setusername(username);
    }

    getuserInfo();

    return (
      <div className="profilepage">
        <ul>
          <li>
            <ul className="titlebar">
              <li>
                <Link to="/newsfeed">
                  {<ChevronLeftIcon fontSize="large" color="success" />}
                </Link>
              </li>
              <li>
                <label className="title">Profile</label>
              </li>
            </ul>
          </li>
          <li>
            <img className="divider" src={divider} alt="divider" />
          </li>
          <li className="centerViewBox">
            <div className="Profilebox">
              <ul className="Profilelist">
                <li>
                  {isAuthenticated && user !== null ? (
                    <img className="CircleBorder" src={imageurl} alt="lolz" />
                  ) : (
                    <div className="CircleBorder">
                      {<FaceIcon className="svg_icons" />}
                    </div>
                  )}
                </li>
                <li className="changeDisplayPic">
                  <Link to="uploadpicture">Update Account Details</Link>
                </li>
                <li>
                  <ul className="UserDetails">
                    <li className="info">{usename}</li>
                  </ul>
                </li>

                <li style={{ paddingTop: 5 }}>
                  <Link className="ProductsLink" to="likedproduct">
                    Liked Products
                  </Link>
                </li>
                <li>
                  <Link className="ProductsLink" to="allorders">
                    Track Orders
                  </Link>
                </li>
                <li>
                  <Link className="ProductsLink" to="orderhistory">
                    Order History
                  </Link>
                </li>
                <li>
                  <Link className="ProductsLink" to="paymentmethod">
                    Payment Methods
                  </Link>
                </li>
                <li className="LogoutBtn">
                  <Button
                    variant="contained"
                    onClick={() =>
                      logout({ returnTo: "http://localhost:3000/newsfeed" })
                    }
                    color="success"
                    size="large"
                  >
                    LogOut
                  </Button>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    );
  }
};

export { Profile };
