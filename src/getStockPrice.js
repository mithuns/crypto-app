module.exports = {getStockPrice:getStockPrice};
require("dotenv").config();
var rp = require('request-promise');

async function getStockPrice(stockname){
  var realData =  await getStock(stockname);
  return realData;
};

async function getStock(stockname) {
  var url = process.env.baseurl+stockname;
  var options = {
          method: 'GET',
          uri: url,
          headers: {
              'User-Agent': 'Request-Promise',
              "Authorization": "Bearer "+ process.env.access_token
          },
          json: true // Automatically parses the JSON string in the response
  };
  return rp(options)
    .then(function (data) {
      return data;
    })
  .catch(function (err) {
          console.log('Something bad happened',err);
  }); 
}