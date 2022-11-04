import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "./cssfiles/Upload.css";
// //***imports from images folder***
import divider from "./images/NavBar Divider.svg";
// //***imports from react-bootstrap***
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

import { BACKEND_URL } from "../constants";
import { Nav } from "react-bootstrap";

const Upload = (props) => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [itemName, setItemName] = useState("");
  const [itemPrice, setPrice] = useState(0);
  const [itemDescription, setDes] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [dpurl, seturl] = useState("");
  const [usename, setusername] = useState("");
  const [redirect, setRedirectState] = useState(false);

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

  useEffect(() => {
    getuserInfo();
  }, []);

  useEffect(() => {
    uploadimage();
  }, [imageUpload]);

  async function uploadimage() {
    const accessToken = await getAccessTokenSilently({
      audience: `https://Proj3/api`,
      scope: "read:current_user",
    });
    if (imageUpload != null) {
      console.log(imageUpload);
      const formData = new FormData();
      formData.append("file", imageUpload[0]);
      const { data } = await axios.post(
        `${BACKEND_URL}/uploadimage`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const { url } = data;
      setImageUrl(url);
    }
  }

  async function onFileUpload(event) {
    await setImageUpload(event.target.files);
  }

  const handleItemNameChange = (event) => {
    setItemName(event.target.value);
  };

  const handleItemPriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleSubmit = async (event) => {
    const accessToken = await getAccessTokenSilently({
      audience: `https://Proj3/api`,
      scope: "read:current_user",
    });
    event.preventDefault();
    const UUID = user.email;
    if (imageUrl !== undefined) {
      await axios
        .post(
          `${BACKEND_URL}/list`,
          {
            itemName,
            itemPrice,
            imageUrl,
            itemDescription,
            UUID,
            dpurl,
            usename,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(() => {
          setRedirectState(true);
        });
    }
  };

  return (
    <div>
      {redirect == true ? (
        <div>
          <Navigate to="/newsfeed" />
        </div>
      ) : (
        <Container className="uploadPage">
          <Row className="uploadTitleBar">
            <Link to="/newsfeed">
              <ChevronLeftIcon fontSize="large" color="success" />
            </Link>
            <label className="uploadTitle">Upload</label>
          </Row>
          <Row className="uploadDivider">
            <img src={divider} alt="divider" />
          </Row>
          <Row className="bodyBox">
            <label className="titleLabel">
              What do you want to sell today?
            </label>
            <Row className="inputBox">
              <form onSubmit={handleSubmit}>
                <label for="itemName" className="uploadLabel">
                  Item Name
                </label>
                <input
                  className="textBox"
                  type="text"
                  id="itemName"
                  name="itemName"
                  onChange={handleItemNameChange}
                  required
                />

                <label for="itemPrice" className="uploadLabel">
                  Item Price
                </label>
                <div class="currency-wrap">
                  <span class="currency-code">$</span>
                  <input
                    className="textBox"
                    type="number"
                    id="itemPrice"
                    name="itemPrice"
                    min={1}
                    onChange={handleItemPriceChange}
                    required
                  />
                </div>

                <label for="itemImage" className="uploadLabel">
                  Item Image
                </label>
                <input
                  className="textBox"
                  type="file"
                  accept="image/*"
                  onChange={onFileUpload}
                  required
                />

                <label for="itemName" className="uploadLabel">
                  Item Description
                </label>
                <textarea
                  id="itemDescription"
                  name="itemDescription"
                  rows="3"
                  onChange={(event) => setDes(event.target.value)}
                  required
                />
                <Button className="buttonBox" type="submit">
                  Start Selling!
                </Button>
              </form>
            </Row>
          </Row>
        </Container>
      )}
    </div>
  );
};

export { Upload };
