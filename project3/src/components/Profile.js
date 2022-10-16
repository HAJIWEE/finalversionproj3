import React from "react";
import { useEffect, useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import "./cssfiles/Profile.css";
import divider from "./images/NavBar Divider.svg";
import { Button } from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";

const Profile = (props) => {
  const { isAuthenticated, isLoading, logout } = useAuth0();
  const { user, getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);

  useEffect(() => {
    const getUserMetadata = async () => {
      try {
        const domain = "dev-oa1xn--2.us.auth0.com";
        const accessToken = await getAccessTokenSilently({
          audience: `https://Proj3/api`,
          scope: "read:current_user",
        });

        const userDetailsByIdUrl = `https://Proj3/api/v2/users/${user.sub}`;

        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const { user_metadata } = await metadataResponse.json();

        setUserMetadata(user_metadata);
      } catch (e) {
        console.log(e.message);
      }
    };

    getUserMetadata();
  }, [getAccessTokenSilently, user?.sub]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  // if (!props.info.userIsLoggedIn) {
  //   return <Navigate path="/login" replace={true} />;
  // }

  if (isAuthenticated) {
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
                  {isAuthenticated && userMetadata !== null ? (
                    <img
                      className="CircleBorder"
                      src={props.info.profilePicURL}
                      alt="lolz"
                    />
                  ) : (
                    <div className="CircleBorder">
                      {<FaceIcon className="svg_icons" />}
                    </div>
                  )}
                </li>
                <li className="changeDisplayPic">
                  <Link to="uploadpicture"> Upload New Picture</Link>
                </li>
                <li>
                  <ul className="UserDetails">
                    <li className="info">{user.name}</li>
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
