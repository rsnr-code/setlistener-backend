const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path");

const app = express();

require("dotenv").config(".env");

app.use(cors());

app.use(express.static(path.join(__dirname + "/public")));

app.get("/setlist", (req, res) => {
  const artist = req.query.artistName;

  const options = {
    method: "GET",
    url: `https://api.setlist.fm/rest//1.0/search/setlists?`,
    params: { artistName: artist },
    headers: {
      "x-api-key": process.env.REACT_APP_API_KEY,
      Accept: "application/json",
    },
  };

  axios
    .request(options)
    .then((response) => {
      res.json(response.data);
    })
    .catch((err) => {
      console.error(err);
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});
