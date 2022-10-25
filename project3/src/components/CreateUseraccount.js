import React, { Component, useState } from "react";
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

const Create = (props) => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [username, setUsername] = useState("");
  const [file, setfile] = useState(null);
  const [imageUrl, setURL] = useState("");
  const [UUID, setUUID] = useState("");
  const [Role, setRole] = useState("");
  const [userExists, setUserExisting] = useState(undefined);

  async function checkExistingUser() {
    const accessToken = await getAccessTokenSilently({
      audience: `https://Proj3/api`,
      scope: "read:current_user",
    });
    if (user !== undefined) {
      setUUID(user.email);
    }
    console.log("THIS IS" + UUID);
    if (UUID !== "" && UUID !== undefined) {
      await axios
        .get(`${BACKEND_URL}/User/${UUID}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          const { data } = res;
          const { dpurl } = data;
          console.log(dpurl);
          if (data !== null) {
            setUserExisting(true);
          } else {
            setUserExisting(false);
          }
        })
        .catch((err) => {});
    }
  }
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
      console.log(url);
      return setURL(url);
    }
  }
  async function handleSubmit() {
    const accessToken = await getAccessTokenSilently({
      audience: `https://Proj3/api`,
      scope: "read:current_user",
    });

    await axios
      .post(
        `${BACKEND_URL}/User`,
        { username, imageUrl, UUID, Role },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(() => {
        console.log(imageUrl);
        setUserExisting(true);
      })
      .catch((err) => {
        window.alert(err);
      });
  }
  async function onFileUpload(event) {
    setfile(event.target.files);
  }

  const handleInput = (event) => {
    setUsername(event.target.value);
  };

  if (userExists === undefined) {
    checkExistingUser();
    return <div>Loading ...</div>;
  } else if (userExists === true) {
    return <Navigate to="/newsfeed" />;
  } else if (userExists === false) {
    return (
      <div>
        <h1>Create Account</h1>
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
  }
};
export { Create };

// import React, { useState } from "react";
// import "./cssfiles/login.css";
// // import { Message, Password, CaretRight } from "react-iconly";

// import divider from "./images/Divider.png";
// import apple from "./images/Apple.png";
// import facebook from "./images/Facebook.png";
// import google from "./images/Google.png";
// import { Link, Navigate } from "react-router-dom";
// // import { auth } from "../firebase";
// // import { createUserWithEmailAndPassword } from "firebase/auth";

// const Create = (props) => {
//   // const [username, setUsername] = useState(null);
//   // const [UserPassword, setPassword] = useState("");

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // FIREBASE AUTH Code
//     // console.log("hi");
//     // createUserWithEmailAndPassword(auth, username, UserPassword)
//     //   .then((user) => {
//     //     setPassword("");
//     //   })
//     //   .catch((err) => {
//     //     window.alert(err);
//     //   });
//   };

//   const handleInput = (event) => {
//     // FIREBASE AUTH Code
//     // if (event.target.id === "username") {
//     //   setUsername(event.target.value);
//     // } else if (event.target.id === "Userpassword") {
//     //   setPassword(event.target.value);
//     // }
//   };

//   return (
//     <div>
//       {props.info.userIsLoggedIn ? (
//         <Navigate to="/profile/uploadpicture" replace={true} />
//       ) : (
//         <div>
//           <h1 style={{ top: 100 }}>Create Account</h1>
//           <h3>Already have an account?</h3>
//           <Link to="/Login">
//             <h5>Sign in</h5>
//           </Link>
//           <div className="userAuthBox">
//             <ul className="AuthDetailsHolder">
//               <li>
//                 {/* <Message set="bold" primaryColor="black" size={50} /> */}
//               </li>
//               <li>
//                 <form className="userform">
//                   <label className="label2">Username :</label>
//                   <input
//                     title="Enter Username here"
//                     className="input"
//                     type="text"
//                     id="username"
//                     onChange={handleInput}
//                   />
//                 </form>
//               </li>
//             </ul>
//           </div>
//           <div className="passwordAuthBox">
//             <ul className="AuthDetailsHolder">
//               <li>
//                 {/* <Password set="bold" primaryColor="black" size={50} /> */}
//               </li>
//               <li>
//                 <form className="userform">
//                   <label className="label2">Password :</label>
//                   <input
//                     title="Enter password here"
//                     className="input"
//                     type="password"
//                     id="Userpassword"
//                     onChange={handleInput}
//                   />
//                   <button onClick={handleSubmit} className="loginBtn">
//                     {/* <CaretRight set="bold" primaryColor="Black" /> */}
//                   </button>
//                 </form>
//               </li>
//             </ul>
//           </div>
//           <img className="cont" src={divider} alt="oops" />
//           <ul className="socialMlogin">
//             <li>
//               <img src={apple} alt="oops" />
//             </li>
//             <li>
//               <img src={facebook} alt="oops" />
//             </li>
//             <li>
//               <img src={google} alt="oops" />
//             </li>
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export { Create };
