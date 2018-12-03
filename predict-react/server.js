const express = require('express');
const path = require('path');
const app = express();

// npm install express
// can be run like
// PORT=8080 node server.js
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 80);
