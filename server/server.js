// server.js
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();

app.use(cors());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "myChampagne",
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
    // res.json(results);
    res.json({ data: results, rowCount });
    console.log(`server.js:fetchData() - exit results = `, results);
  });
}

// Endpoint för winedata
app.get("/api/Wines", (req, res) => {
  console.log(`server:get() - Wines`);
  const query =
    "SELECT Id, Producer, Wine, PN, PM, CH, IsRose, IsVintage, Vintage, Bought, Consumed, Saldo, PriceEUR, PriceSEK, BoughtWhen, BoughtWhere, Comment, LastUpdated FROM Wines";
  fetchData(query, res);
});

// Endpoint för producentdata
app.get("/api/Producers", (req, res) => {
  console.log(`server:get() - Producers`);
  const query =
    "SELECT Id, Producer, Village, Region, Email, Web FROM Producers";
  fetchData(query, res);
});

// Endpoint för notes
app.get("/api/Notes", (req, res) => {
  console.log(`server:get() - Notes`);
  const query =
    "SELECT Id, Datum, Location, Company, Producer, Wine, TastingNote, Comment, Score, BuyMore, LastUpdated FROM Notes";
  fetchData(query, res);
});

// Lägg till denna nya endpoint för att uppdatera en specifik cell
app.put("/api/Wines/updateCell/:id", (req, res) => {
  const wineId = req.params.id;
  const columnName = req.body.columnName; // Ange kolumnnamnet för den cell som ska uppdateras
  const newValue = req.body.newValue; // Det nya värdet för cellen

  // Skapa din SQL-uppdateringsfråga baserat på de ingående värdena
  const updateQuery = `UPDATE Wines SET ${columnName} = ? WHERE Id = ?`;

  connection.query(
    updateQuery,
    [newValue, wineId],
    (error, results, fields) => {
      if (error) {
        res.status(500).send(error);
        return;
      }

      res.json({ success: true, message: "Cell updated successfully" });
    }
  );
});
