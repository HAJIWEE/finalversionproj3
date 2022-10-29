import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import EmailIcon from "@mui/icons-material/Email";
import Button from "@mui/material/Button";
import { BACKEND_URL } from "../constants";
import { useAuth0 } from "@auth0/auth0-react";
import "./cssfiles/login.css";
import axios from "axios";

const UploadPicture = (props) => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [username, setUsername] = useState("");
  const [file, setfile] = useState(null);
  const [imageUrl, setURL] = useState("");
  const [Role, setRole] = useState("");

  async function handleRole(event, newValue) {
    setRole(newValue);
    const accessToken = await getAccessTokenSilently({
      audience: `https://Proj3/api`,
      scope: "read:current_user",
    });
    if (file != null) {
      const formData = new FormData();
      formData.append("file", file[0]);
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

      return setURL(url);
    }
  }
  const handleSubmit = async () => {
    const accessToken = await getAccessTokenSilently({
      audience: `https://Proj3/api`,
      scope: "read:current_user",
    });

    await axios
      .put(
        `${BACKEND_URL}/User/update/${user.email}`,
        { username, imageUrl, Role },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(() => {
        console.log(imageUrl);
        Navigate({ to: "/profile", replace: true });
      })
      .catch((err) => {
        window.alert(err);
      });
  };
  async function onFileUpload(event) {
    setfile(event.target.files);
  }

  const handleInput = (event) => {
    setUsername(event.target.value);
  };

  return (
    <div>
      <h1>Update Account</h1>
      <div className="userAuthBox">
        <ul className="AuthDetailsHolder">
          <li>
            <EmailIcon sx={{ fontSize: 50 }} />
          </li>
          <li>
            <form className="userform">
              <label className="label2">Enter Username :</label>
              <input
                title="Enter Username here"
                className="input"
                type="text"
                id="username"
                onChange={handleInput}
              />
            </form>
          </li>
        </ul>
      </div>
      <div className="passwordAuthBox">
        <Button variant="contained" component="label">
          <input
            name="fileUpload"
            hidden
            accept="image/*"
            type="file"
            onChange={onFileUpload}
          />
          Upload Display Picture
        </Button>
      </div>
      <div className="Role">
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Role</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="Buy Only"
            name="radio-buttons-group"
            onChange={handleRole}
          >
            <FormControlLabel
              value="false"
              control={<Radio />}
              label="I'm Buying Only"
            />
            <FormControlLabel
              value="true"
              control={<Radio />}
              label="I'm Selling, Gimme that Money"
            />
          </RadioGroup>
        </FormControl>
      </div>
      <div className="FormSubmit">
        <Button
          variant="contained"
          component="label"
          onClick={handleSubmit}
          color="success"
        >
          Submit Form
        </Button>
      </div>
    </div>
  );
};

export { UploadPicture };
