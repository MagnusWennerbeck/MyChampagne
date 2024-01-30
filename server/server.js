// server.js
const express = require("express");
const bodyParser = require('body-parser');
const mysql = require("mysql");
const cors = require("cors");
const app = express();

app.use(cors());
// Använd bodyParser middleware för att hantera JSON i förfrågningskroppen
app.use(bodyParser.json());

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
    res.json(results);
    // res.json({ data: results });
    // console.log(`server.js:fetchData() - exit results = `, results);
  });

  // connection.query(query, (error, results, fields) => {
  //   if (error) {
  //     console.error(`server.js:fetchData() - error: `, error);
  //     res.status(500).json({ success: false, message: 'Internal Server Error' });
  //     return;
  //   }

  //   // Om resultaten är tomma eller undefined, kan du skicka ett meddelande om att ingen data hittades
  //   if (!results || results.length === 0) {
  //     res.status(404).json({ success: false, message: 'No data found' });
  //     return;
  //   }

  //   res.json({ success: true, data: results });
  //   console.log(`server.js:fetchData() - exit results = `, results);
  // });
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
  let wineId = req.params.id;
  let columnName = req.body.columnName; // Ange kolumnnamnet för den cell som ska uppdateras
  let newValue = req.body.newValue; // Det nya värdet för cellen

  // // Skapa din SQL-uppdateringsfråga baserat på de ingående värdena
  // let updateQuery = `UPDATE Wines SET ${columnName} = ? WHERE Id = ?`;


    // Använd parameterisering för att skicka värden till SQL-frågan
    if (typeof newValue === 'string' || newValue instanceof Date) {
      updateQuery = `UPDATE Wines SET ${columnName} = ? WHERE Id = ?`;
      queryParams = [newValue, wineId];
    } else if (typeof newValue === 'number') {
      updateQuery = `UPDATE Wines SET ${columnName} = ? WHERE Id = ?`;
      queryParams = [newValue, wineId];
    } else {
      // Hantera andra typer av värden här om det behövs
      console.error('Unsupported value type:', typeof newValue);
      return; // Avsluta eller kasta fel beroende på hur du vill hantera det
    }

  connection.query(
    updateQuery,
    [newValue, wineId],
    (error, results, fields) => {
      if (error) {
        res.status(500).json({ success: false, message: "Error updating cell" });
        return;
      }

      // Kontrollera antalet påverkade rader för att avgöra om uppdateringen lyckades
      if (results.affectedRows > 0) {
        res.json({ success: true, message: "Cell updated successfully" });
      } else {
        res.json({ success: false, message: "Cell not found or no changes made" });
      }
    }
  );
});
