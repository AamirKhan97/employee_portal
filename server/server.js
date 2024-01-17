const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Config cors
app.use(cors());

dotenv.config({ path: "./config.env" });

// Config json to collect form data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set the host and port
const hostName = process.env.HOST_NAME || "localhost"; // Provide a default value if not set
const port = process.env.PORT_NO || 3000; // Provide a default value if not set

// Config router
// Import the API router file
const apiRouter = require("./api/apiRouter");

// Mount the API router under the '/api' path
app.use("/api", apiRouter);

// Config mongoose
const mongoDBURL = process.env.MONGO_DB_URL;
if (!mongoDBURL) {
  console.error("MONGO_DB_URL is not provided in the environment variables.");
  process.exit(1); // Exit the application if MongoDB URL is not set
}

mongoose
  .connect(mongoDBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Connected to MongoDB server successfully`);
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Get response
app.get("/", (request, response) => {
  response.send(`<h2>Welcome To BigBasket Application</h2>`);
});

app.listen(port, hostName, () => {
  console.log(`Express server is running at http://${hostName}:${port}`);
});
