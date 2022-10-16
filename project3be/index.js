const cors = require("cors");
const express = require("express");
const { auth } = require("express-oauth2-jwt-bearer");
require("dotenv").config();

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

// importing Routers
const navHistoryRouter = require("./routers/navhistoryRouter");

// importing Controllers
const navhistoryController = require("./controllers/navhistoryController");

// importing DB
const db = require("./db/models/index");
const { navhists } = db;

// initializing Controllers -> note the lowercase for the first word
const navHistoryCon = new navhistoryController(navhists);

// inittializing Routers
const navhistoryRouter = new navHistoryRouter(navHistoryCon, checkJwt).routes();

const PORT = 4000;
const app = express();

// Enable CORS access to this server
app.use(cors());

// Enable reading JSON request bodies
app.use(express.json());

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use("/navhistory", navhistoryRouter);

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});

// server.js
