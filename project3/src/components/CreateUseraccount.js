import React, { useState } from "react";
import { Link } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import Button from "@mui/material/Button";
import { BACKEND_URL } from "../constants";
import { useAuth0 } from "@auth0/auth0-react";
import "./cssfiles/login.css";
import axios from "axios";

const Create = (props) => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [file, setfile] = useState(null);

  async function handleSubmit() {
    const accessToken = await getAccessTokenSilently({
      audience: `https://Proj3/api`,
      scope: "read:current_user",
    });
    console.log(file);
    const formData = new FormData();
    formData.append("file", file[0]);
    const imageurl = await axios.post(`${BACKEND_URL}/uploadimage`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const { data } = imageurl;
    const { url } = data;
    console.log(url);
  }

  const handleInput = (event) => {};

  const onFileUpload = (event) => {
    setfile(event.target.files);
  };

  return (
    <div>
      <h1 style={{ top: 100 }}>Create Account</h1>
      <div className="userAuthBox">
        <ul className="AuthDetailsHolder">
          <li>
            <EmailIcon sx={{ fontSize: 50 }} />
          </li>
          <li>
            <form className="userform">
              <label className="label2">Username :</label>
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
      <div className="passwordAuthBox" style={{ marginTop: 100 }}>
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
