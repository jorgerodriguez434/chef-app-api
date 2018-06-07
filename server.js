const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080;

app.get('/*', (req, res) => {
  res.json({ok: true});
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = {app};


//https://thawing-ravine-79238.herokuapp.com/ | https://git.heroku.com/thawing-ravine-79238.git
