import * as React from "react";
import { useState } from "react";
import { BACKEND_URL } from "../constants";
import axios from "axios";
import { Outlet, Link } from "react-router-dom";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FeedIcon from "@mui/icons-material/Feed";
import SearchIcon from "@mui/icons-material/Search";
import UploadIcon from "@mui/icons-material/Upload";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAuth0 } from "@auth0/auth0-react";

export function Nav(props) {
  const [value, setValue] = useState("recents");
  const { loginWithRedirect } = useAuth0();
  const { user, getAccessTokenSilently } = useAuth0();

  const handleChange = async (event, newValue) => {
    const accessToken = await getAccessTokenSilently({
      audience: `https://Proj3/api`,
      scope: "read:current_user",
    });
    setValue(newValue);
    const timenow = new Date().toLocaleDateString();
    var value = newValue.toString();
    await axios
      .post(
        `${BACKEND_URL}/navhistory`,
        {
          timenow,
          value,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((res) => {
        console.log(res);
      });
  };

  return (
    <>
      <Outlet />
      <BottomNavigation
        sx={{
          width: "100%",
          position: "fixed",
          bottom: 0,
          background: "lightgray",
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        }}
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction
          component={Link}
          to="/newsfeed"
          label="NewsFeed"
          value="NewsFeed"
          icon={<FeedIcon />}
        />
        <BottomNavigationAction
          component={Link}
          to="/search"
          label="Search"
          value="Search"
          icon={<SearchIcon />}
        />
        <BottomNavigationAction
          component={Link}
          to="/upload"
          label="Upload"
          value="Upload"
          icon={<UploadIcon />}
        />
        <BottomNavigationAction
          component={Link}
          to="/cart"
          label="Cart"
          value="Cart"
          icon={<ShoppingCartIcon />}
        />
        {user !== undefined ? (
          <BottomNavigationAction
            component={Link}
            to="/profile"
            label="Profile"
            value="Profile"
            icon={<AccountCircleIcon />}
          />
        ) : (
          <BottomNavigationAction
            label="Login"
            value="Login"
            showLabel={true}
            onClick={() =>
              loginWithRedirect({
                redirectUri: "http://localhost:3000/createaccount",
              })
            }
            icon={<AccountCircleIcon />}
          />
        )}
      </BottomNavigation>
    </>
  );
}

// // import { Home, Search, Plus, Buy, User } from "react-iconly";
// import { Outlet, Link, useLocation } from "react-router-dom";
// import "./cssfiles/NavBar.css";

// // Whole thing to replace with MUI
// const Nav = (props) => {
//   const location = useLocation();
//   return (
//     <>
//       <Outlet />
//       <div className="btmbar">
//         <ul className="btmbar li">
//           <li>
//             <Link to="/newsfeed">
//               {/* <Home
//                 set="bold"
//                 primaryColor={
//                   location.pathname === "/newsfeed" ? "black" : "#878D98"
//                 }
//               /> */}
//             </Link>
//           </li>
//           <li>
//             <Link to="/search">
//               {/* <Search
//                 set="Light-Outline"
//                 primaryColor={
//                   location.pathname === "/search" ? "black" : "#878D98"
//                 }
//               /> */}
//             </Link>
//           </li>
//           <li>
//             <Link to="/upload">
//               {/* <Plus
//                 set="Light-Outline"
//                 primaryColor={
//                   location.pathname === "/upload" ? "black" : "#878D98"
//                 }
//               /> */}
//             </Link>
//           </li>
//           <li>
//             <Link to="/cart">
//               {/* <Buy
//                 set="Light-Outline"
//                 primaryColor={
//                   location.pathname === "/cart" ? "black" : "#878D98"
//                 }
//               /> */}
//             </Link>
//           </li>
//           <li>
//             {props.info.userIsLoggedIn ? (
//               <Link to="/profile">
//                 <div className="profile">
//                   {/* <User
//                     set="bold"
//                     primaryColor={
//                       location.pathname === "/profile" ? "black" : "#878D98"
//                     }
//                   /> */}
//                 </div>
//               </Link>
//             ) : (
//               <Link to="/login">
//                 {" "}
//                 <div className="profile">
//                   {/* <User
//                     set="bold"
//                     primaryColor={
//                       location.pathname === "/login" ? "black" : "#878D98"
//                     }
//                   /> */}
//                 </div>
//               </Link>
//             )}
//           </li>
//         </ul>
//       </div>
//     </>
//   );
// };

//export { Nav };
