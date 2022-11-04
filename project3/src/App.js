import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Auth0Provider } from "@auth0/auth0-react";

import { Nav } from "./components/NavBar";
import { AllOrders } from "./components/AllOrders.js";
import { Cart } from "./components/Cart.js";
import { LikedProducts } from "./components/LikedProducts.js";
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
  return (
    <Auth0Provider
      domain={"dev-oa1xn--2.us.auth0.com"}
      clientId={"r1hyr9OFqf6CnWGu0AviG3FwBLgtHX7V"}
      redirectUri={"http://localhost:3000/createaccount"}
      audience="https://Proj3/api"
      scope="read:current_user update:current_user_metadata"
    >
      <Routes>
        <Route path="/" element={<Nav />}>
          <Route path="newsfeed" element={<Newsfeed />} />
          <Route path="createaccount" element={<Create />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/uploadpicture" element={<UploadPicture />} />
          <Route path="profile/likedproduct" element={<LikedProducts />} />
          <Route path="profile/allorders" element={<AllOrders />} />
          <Route
            path="profile/allorders/trackorderstatus"
            element={<TrackOrderStatus />}
          />
          <Route path="profile/orderhistory" element={<OrderHistory />} />
          {/*           <Route path="profile/paymentmethod" element={<PaymentMethod />} /> */}
          <Route path="search" element={<Search />} />
          <Route path="upload" element={<Upload />} />
          <Route path="cart" element={<Cart />} />
          <Route path="cart/paymentmethod" element={<PaymentMethod />} />
          <Route path="orders" element={<Orders />} />
          <Route path="sales" element={<Sales />} />
        </Route>
      </Routes>
    </Auth0Provider>
  );
};

export default App;
