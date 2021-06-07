require('dotenv').config();
const express = require('express');
const router = require('./routes/server');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

app.get('/', (req, res) => {
  res.send('Hello from Waterme-Backend Engine!');
});

app.use(bodyParser.json());
app.use(router);

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}..., DB-USER: ${process.env.DB_USER}`);
});
