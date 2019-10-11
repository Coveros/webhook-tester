require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const PORT = process.env.PORT || 8080;

const app = express();

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} request received at ${Date.now()}`);
  next();
});

app.get('/healthcheck', (req, res) => {
  console.log('Health Check request');
  res.status(200).send('OK');
});

app.post('/json-hook', jsonParser, (req, res) => {
  console.log('Webhook Request Body:');
  console.log(JSON.stringify(req.body, null, 2));
  res.status(200).send();
});

app.all('*', (req, res) => {
  console.log('Route not found');
  res.status(404).send('Route not found');
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
