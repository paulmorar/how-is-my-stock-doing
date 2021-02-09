const express = require("express");
const cors = require('cors');
const serverless = require("serverless-http");
const yahooFinance = require("yahoo-finance");

var allowedOrigins = ['http://localhost:3000',
                      'https://www.howisgmedoing.com/'];

const app = express();
app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

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
