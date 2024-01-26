// server.js
const express = require('express');
const mysql = require('mysql');
const cors = require('cors'); 
const app = express();

app.use(cors());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'myChampagne'
});

connection.connect();

const port = 3000;

app.listen(port, () => {
  console.log(`server.js:listen() Server is running on port ${port}`);

});

function fetchData(query, res) {
    console.log(`server.js:fetchData() - enter sql = `, query);
    connection.query(query, (error, results, fields) => {
      if (error) {
        res.status(500).send(error);
        return;
      }
      res.json(results);
      console.log(`server.js:fetchData() - exit results = `, results);
    });
  }

// Endpoint för vinedata
app.get('/api/Wines', (req, res) => {
    console.log(`server:get() - Wines`);
    const query = 'SELECT Id, Wine, PN, PM, CH, BoughtWhere FROM Wines';
    fetchData(query, res);
});

// Endpoint för producentdata
app.get('/api/Producers', (req, res) => {
    console.log(`server:get() - Producers`);
    const query = 'SELECT Id, Producer, Village, Region, Email, Web FROM Producers';
    fetchData(query, res);
});

// Endpoint för notes
app.get('/api/Notes', (req, res) => {
    console.log(`server:get() - Notes`);
    const query = 'SELECT Id, Date, Company, TastingNote FROM Notes';
    fetchData(query, res);
  });




