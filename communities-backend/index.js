// server.js

import db from "./config/database.js";
import logger from "./src/middleware/logger.js";
import cors from "cors";
import express from "express";
import routes from "./src/routes/route.js";
import bodyParser from "body-parser";
import passportSetup from "./src/utils/Authenticaion/passport-setup.js";
import passport from "passport";

const app = express();
const port = 8080; // You can change this port number if needed

app.use(cors());
passportSetup();

app.use(passport.initialize());
app.use(logger);
app.use(bodyParser.json());

app.use("/", routes);

// establishing a connection to the database
try {
  await db.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database: ", error);
}

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
