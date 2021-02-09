const express = require("express");
const cors = require('cors');
const serverless = require("serverless-http");
const yahooFinance = require("yahoo-finance");

const app = express();
app.use(cors());

const router = express.Router();

router.get("/", (req, res) => {
  yahooFinance.quote({
    symbol: 'GME',
    modules: [ 'price' ]
  }, (_err, quotes) => {
    res.json({
      quotes
    });
  })
});

app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);
