const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

// App
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// dotenv
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.API_KEY;

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/fun-fact/:limit?", async (req, res) => {
  try {
    const limit = req.params.limit || 1;
    const url = `https://api.api-ninjas.com/v1/facts?limit=${limit}`;
    const options = {
      headers: {
        "X-Api-Key": API_KEY,
      },
    };

    const result = await fetch(url, options).then((res) => res.json());

    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Listen
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
