import * as React from "react";
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

export function Nav() {
  const [value, setValue] = React.useState("recents");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const timenow = new Date().toLocaleDateString();
    var value = newValue.toString();
    console.log(timenow);
    console.log(value);
    axios
      .post(`${BACKEND_URL}/navhistory`, {
        timenow,
        value,
      })
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
          width: 375,
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
          label="NewsFeed"
          value="NewsFeed"
          icon={<FeedIcon />}
        />
        <Link to="/search">
          <BottomNavigationAction
            label="Search"
            value="Search"
            icon={<SearchIcon />}
          />
        </Link>
        <Link to="/upload">
          <BottomNavigationAction
            label="Upload"
            value="Upload"
            icon={<UploadIcon />}
          />
        </Link>
        <Link to="/cart">
          <BottomNavigationAction
            label="Cart"
            value="Cart"
            icon={<ShoppingCartIcon />}
          />
        </Link>
        <Link to="/profile">
          <BottomNavigationAction
            label="Profile"
            value="Profile"
            icon={<AccountCircleIcon />}
          />
        </Link>
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
