const cors = require("cors");
const express = require("express");
const { auth } = require("express-oauth2-jwt-bearer");
// importing Routers
const navHistoryRouter = require("./routers/navhistoryRouter");
const imageRouter = require("./routers/imageRouter.js");
const userRouter = require("./routers/userRouter.js");
const listingRouter = require("./routers/listingRouter");
const paymentRouter = require("./routers/paymentRouter");
const cartRouter = require("./routers/cartRouter");
// importing Controllers
const userController = require("./controllers/userController");
const navhistoryController = require("./controllers/navhistoryController");
const listingController = require("./controllers/listingController");
const paymentController = require("./controllers/paymentController");
const cartController = require("./controllers/cartController");
// importing DB
const db = require("./db/models/index");
const { literal } = require("sequelize");
const { navhist, Users, listing, cart, payment } = db;

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH_SECRET,
  baseURL: "http://localhost:5000",
  clientID: "ZPkrGIviMJ9K5vMoNIQns7F5hG6pwZFE",
  issuerBaseURL: "https://dev-oa1xn--2.us.auth0.com",
};

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
  audience: "https://Proj3/api",
  issuerBaseURL: `https://dev-oa1xn--2.us.auth0.com/`,
});

// initializing Controllers -> note the lowercase for the first word
const navHistoryCon = new navhistoryController(navhist);
const userCon = new userController(Users);
const listingCon = new listingController(listing);
const paymentCon = new paymentController(payment);
const cartCon = new cartController(cart);
// inittializing Routers
const NavHistoryRouter = new navHistoryRouter(navHistoryCon, checkJwt).routes();
const ImageRouter = new imageRouter(checkJwt).routes();
const UserRouter = new userRouter(userCon, checkJwt).routes();
const ListingRouter = new listingRouter(listingCon, checkJwt).routes();
const PaymentRouter = new paymentRouter(paymentCon).routes();
const CartRouter = new cartRouter(cartCon, checkJwt).routes();

const PORT = process.env.PORT;
const app = express();

// Enable CORS access to this server
app.use(cors());

// Enable reading JSON request bodies
app.use(express.json());

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use("/navhistory", NavHistoryRouter);

app.use("/uploadimage", ImageRouter);

app.use("/User", UserRouter);

app.use("/payment", PaymentRouter);

app.use("/list", ListingRouter);

app.use("/Add2Cart", CartRouter);

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});

// server.js
