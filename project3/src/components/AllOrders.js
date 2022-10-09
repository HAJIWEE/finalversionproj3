import React from "react";
import { Link } from "react-router-dom";
import "./cssfiles/AllOrders.css";
//***imports from images folder***
import divider from "./images/NavBar Divider.svg";
//***imports from react-bootstrap***
// import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import Nav from "react-bootstrap/Nav";
//***imports from react-iconly***

const AllOrders = (props) => {
  return (
    <Container className="pageBody">
      <Row className="pageTitleBar">
        <Link to="/Profile">
          {/* <CaretLeft set="bold" primaryColor="#2FF522" /> Needs to replace with new logo cos react iconly sucks*/}
        </Link>
        <label className="allOrdersTitle">All Orders</label>
      </Row>
      <Row className="pageDivider">
        <img src={divider} alt="divider" />
      </Row>
      <div className="allOrdersTabContainer">
        <Link to="/Orders">
          <Button className="allOrdersTabBox" variant="primary">
            Orders
          </Button>
        </Link>
        <Link to="/Sales">
          <Button className="allOrdersTabBox" variant="primary">
            Sales
          </Button>
        </Link>
      </div>
      <div></div>
      <div className="cardCenterViewBox"></div>
    </Container>
  );
};

export { AllOrders };

// what to be displayed in all orders?
// - Orders placed (display as Card objects)
// what is displayed in each order Card?
// - Seller Name, Item Image, Item Name, Item Price, Item Quantity, Order Total, Delivery Status (Link to Track Order Status)
