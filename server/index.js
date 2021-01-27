const express = require('express');
const cors = require('cors');
const path = require('path');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors({ origin: 'http://localhost:3000'}));

app.use(express.static(path.join(__dirname, './data')));

app.get('/companies', (req, res) => {
  res.sendFile(path.join(__dirname, './data/companies.json'));
});

app.get('/employees', (req, res) => {
  res.sendFile(path.join(__dirname, './data/employees.json'));
});

app.get('/projects', (req, res) => {
  res.sendFile(path.join(__dirname, './data/projects.json'));
});

app.get('/company-addresses', (req, res) => {
  res.sendFile(path.join(__dirname, './data/company-addresses.json'));
});

app.listen(PORT);
console.log('Server listening on port:', PORT);