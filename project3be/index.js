const cors = require("cors");
const express = require("express");
const { auth } = require("express-oauth2-jwt-bearer");
// importing Routers
const navHistoryRouter = require("./routers/navhistoryRouter");
const imageRouter = require("./routers/imageRouter.js");
const userRouter = require("./routers/userRouter.js");
const listingRouter = require("./routers/listingRouter");
const paymentRouter = require("./routers/paymentRouter");
// importing Controllers
const userController = require("./controllers/userController");
const navhistoryController = require("./controllers/navhistoryController");
const listingController = require("./controllers/listingController");
const paymentCon = require("./controllers/paymentController");
// importing DB
const db = require("./db/models/index");
const { literal } = require("sequelize");
const { navhist, Users, listings, itemsforsale, payment } = db;

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
const listingCon = new listingController(listings);
const PaymentCon = new paymentCon(payment);
// inittializing Routers
const navhistoryRouter = new navHistoryRouter(navHistoryCon, checkJwt).routes();
const ImageRouter = new imageRouter(checkJwt).routes();
const UserRouter = new userRouter(userCon).routes();
const ListingRouter = new listingRouter(listingCon, checkJwt).routes();
const PaymentRouter = new paymentRouter(PaymentCon, checkJwt).routes();

const PORT = 4000;
const app = express();

// Enable CORS access to this server
app.use(cors());

// Enable reading JSON request bodies
app.use(express.json());

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use("/navhistory", navhistoryRouter);

app.use("/uploadimage", ImageRouter);

app.use("/User", UserRouter);

app.use("/payment", PaymentRouter);

app.use("/list", ListingRouter);

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});

// server.js
