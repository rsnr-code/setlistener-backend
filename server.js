const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require('path');

require("dotenv").config({ path: "./.env" });

const app = express();

app.use(cors());

app.use(express.static(path.join(__dirname + "/public")))


app.get("/setlist", (req, res) => {
  const artist = req.query.artistName;

  const options = {
    method: "GET",
    url: `https://api.setlist.fm/rest//1.0/search/setlists?`,
    params: { artistName: artist },
    headers: {
      "x-api-key": '9bpLkkMMmV7NHKWsOG0Rwc_FNaSsMSJlipwb',
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
