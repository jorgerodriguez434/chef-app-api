const express = require('express');
const app = express();
const Dish = require('./models');
const PORT = process.env.PORT || 8080;
const cors = require('cors');
const {CLIENT_ORIGIN} = require('./config');

app.get('/test', (req, res) => {
  res.json({status: "success!"});
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = {app};


//https://infinite-cove-16211.herokuapp.com/
//http://cocky-lumiere-0ee1f1.netlify.com/
