const cors = require("cors");
const express = require("express");
require("dotenv").config();

// importing Routers
const navHistoryRouter = require("./routers/navhistoryRouter");

// importing Controllers
const navhistoryController = require("./controllers/navhistoryController");

// importing DB
const db = require("./db/models/index");
const { comment, navhists } = db;
console.log(navhists);
// initializing Controllers -> note the lowercase for the first word
const navHistoryCon = new navhistoryController(navhists, comment);

// inittializing Routers
const navhistoryRouter = new navHistoryRouter(navHistoryCon).routes();

const PORT = 5000;
const app = express();

// Enable CORS access to this server
app.use(cors());

// Enable reading JSON request bodies
app.use(express.json());

app.use("/navhistory", navhistoryRouter);

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
