import React, { useState } from "react";
// import axios from "axios";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import { Nav } from "./components/NavBar";
import { AllOrders } from "./components/AllOrders.js";
import { Cart } from "./components/Cart.js";
import { LikedProducts } from "./components/LikedProducts.js";
import { Login } from "./components/Login.js";
import { Create } from "./components/CreateUseraccount.js";
import { Newsfeed } from "./components/Newsfeed";
import { OrderHistory } from "./components/OrderHistory.js";
import { PaymentMethod } from "./components/PaymentMethod.js";
import { Profile } from "./components/Profile.js";
import { Search } from "./components/Search.js";
import { TrackOrderStatus } from "./components/TrackOrderStatus.js";
import { Upload } from "./components/Upload.js";
import { UploadPicture } from "./components/uploadpicture.js";
import { Orders } from "./components/Orders";
import { Sales } from "./components/Sales";

const App = () => {
  const [userInfo, setuserInfo] = useState({
    userIsLoggedIn: false,
    userID: "",
    userdpname: "",
    profilePicURL: "",
  });

  // useEffect(() => {}, []); //Insert Auth related code here.

  return (
    <div>
      <Routes>
        <Route path="/" element={<Nav info={userInfo} />}>
          <Route path="newsfeed" element={<Newsfeed info={userInfo} />} />
          <Route path="login" element={<Login info={userInfo} />} />
          <Route path="createaccount" element={<Create info={userInfo} />} />
          <Route path="profile" element={<Profile info={userInfo} />} />
          <Route
            path="profile/uploadpicture"
            element={<UploadPicture info={userInfo} setter={setuserInfo} />}
          />
          <Route
            path="profile/likedproduct"
            element={<LikedProducts info={userInfo} />}
          />
          <Route
            path="profile/allorders"
            element={<AllOrders info={userInfo} />}
          />
          <Route
            path="profile/allorders/trackorderstatus"
            element={<TrackOrderStatus info={userInfo} />}
          />
          <Route
            path="profile/orderhistory"
            element={<OrderHistory info={userInfo} />}
          />
          <Route path="profile/paymentmethod" element={<PaymentMethod />} />
          <Route path="search" element={<Search />} />
          <Route path="upload" element={<Upload info={userInfo} />} />
          <Route path="cart" element={<Cart info={userInfo} />} />
          <Route path="orders" element={<Orders info={userInfo} />} />
          <Route path="sales" element={<Sales info={userInfo} />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
