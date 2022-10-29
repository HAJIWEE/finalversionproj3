import React, { useState } from "react";
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
import { BACKEND_URL } from "../constants";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

// const UPLOAD_IMAGES_FOLDER_NAME = "ItemStorage";
// const USERS_FOLDER_NAME = "users";
// const ITEMS_FOLDER_NAME = "items";
// const USER_SALES_FOLDER_NAME = "sales";

const Upload = (props) => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [itemName, setItemName] = useState("");
  const [itemPrice, setPrice] = useState(0);
  const [itemDescription, setDes] = useState("");
  const [imageUpload, setImageUpload] = useState(null);

  async function uploadimage() {
    const accessToken = await getAccessTokenSilently({
      audience: `https://Proj3/api`,
      scope: "read:current_user",
    });
    if (imageUpload != null) {
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
      return url;
    }
  }

  const handleSubmit = async (event) => {
    const accessToken = await getAccessTokenSilently({
      audience: `https://Proj3/api`,
      scope: "read:current_user",
    });
    event.preventDefault();
    const itemImageURL = await uploadimage();
    console.log(itemImageURL);
    const UUID = user.email;
    if (itemImageURL !== undefined) {
      await axios.post(
        `${BACKEND_URL}/list`,
        { itemName, itemPrice, itemImageURL, itemDescription, UUID },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    }
  };

  return (
    <div>
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
          <label className="titleLabel">What do you want to sell today?</label>
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
                onChange={(event) => setItemName(event.target.value)}
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
                  onChange={(event) => setPrice(event.target.value)}
                  required
                />
              </div>

              <label for="itemImage" className="uploadLabel">
                Item Image
              </label>
              <input
                className="textBox"
                type="file"
                id="itemImage"
                name="itemImage"
                onChange={(event) => setImageUpload(event.target.value)}
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
    </div>
  );
};

export { Upload };
