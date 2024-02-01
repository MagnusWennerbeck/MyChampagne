// server.js
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
const app = express();

app.use(cors()); // FRÅGA GPT OM VAD DENNA GÖR

// Använd bodyParser middleware för att hantera JSON i förfrågningskroppen
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "myChampagne",
});

// Db connection setup and listen to port
connection.connect();
const port = 3000;
app.listen(port, () => {
  console.log(`server.js:listen() Server is running on port ${port}`);
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


// =============================================================================
// SELECT
// =============================================================================
// Generisk endpoint för att hämta alla rader från en specifik tabell
app.get('/api/tables/:tableName', (req, res) => {
  const tableName = req.params.tableName;
  const query = `SELECT * FROM ${tableName}`;
  fetchData(query, res);
  console.log(query);
});
// general method to get data by query
function fetchData(query, res) {
  console.log(`server.js:fetchData() - enter sql = `, query);
  connection.query(query, (error, results, fields) => {
    if (error) {
      res.status(500).send(error);
      return;
    }
    res.json(results);
  });
}
// app.get("/api/Wines", (req, res) => {
//   console.log(`server:get() - Wines`);
//   const query =
//     "SELECT Id, Producer, Wine, PN, PM, CH, IsRose, IsVintage, Vintage, Bought, Consumed, Saldo, PriceEUR, PriceSEK, BoughtWhen, BoughtWhere, Comment, LastUpdated FROM Wines";
//   fetchData(query, res);
// });
// app.get("/api/Producers", (req, res) => {
//   console.log(`server:get() - Producers`);
//   const query =
//     "SELECT Id, Producer, Village, Region, Email, Web FROM Producers";
//   fetchData(query, res);
// });
// app.get("/api/Notes", (req, res) => {
//   console.log(`server:get() - Notes`);
//   const query =
//     "SELECT Id, Datum, Location, Company, Producer, Wine, TastingNote, Comment, Score, BuyMore, LastUpdated FROM Notes";
//   fetchData(query, res);
// });
// Generisk endpoint för att hämta alla rader från en specifik tabell


// =============================================================================
// UPDATE
// =============================================================================
// Generisk endpoint för att uppdatera en rad i en specifik tabell

app.put('/api/tables/:tableName/updateCell/:id', (req, res) => {
  let tableName = req.params.tableName;
  let wineId = req.params.id;
  let columnName = req.body.columnName; // Ange kolumnnamnet för den cell som ska uppdateras
  let newValue = req.body.newValue; // Det nya värdet för cellen
  
  // Använd parameterisering för att skicka värden till SQL-frågan + hantera att vissa värden ska vara utan fnuttar
  if (typeof newValue === "string" || newValue instanceof Date) {
    updateQuery = `UPDATE ${tableName} SET ${columnName} = ? WHERE Id = ?`;
    queryParams = [newValue, wineId];
  } else if (typeof newValue === "number") {
    updateQuery = `UPDATE ${tableName} SET ${columnName} = ? WHERE Id = ?`;
    queryParams = [newValue, wineId];
  } else {
    // Hantera andra typer av värden här om det behövs
    // har jag några andra typer???
    console.error("Unsupported value type:", typeof newValue);
    return; // Avsluta eller kasta fel beroende på hur du vill hantera det
  }
  
  console.log('query= ', updateQuery,' params= ', queryParams );

  connection.query(updateQuery, queryParams,  (error, results, fields) => {
      if (error) {
        res
          .status(500)
          .json({ success: false, message: "Error updating cell" });
        return;
      }

      // Kontrollera antalet påverkade rader för att avgöra om uppdateringen lyckades
      if (results.affectedRows > 0) {
        res.json({ success: true, message: "Cell updated successfully" });
      } else {
        res.json({
          success: false,
          message: "Cell not found or no changes made",
        });
      }
    }
  );
});

// =============================================================================
// ADD
// =============================================================================
// Generisk endpoint för att lägga till en rad i en specifik tabell
app.post('/api/tables/:tableName/addRow', (req, res) => {
 
  console.log('Server AddRow =====> #1');

  const tableName = req.params.tableName;
  let id = req.body.id;

  console.log('Server AddRow =====> #2   tableName=', tableName, 'id=', id);

  const insertQuery = 'INSERT INTO ' + tableName + ' (Id) VALUES (?)';

  console.log('Server AddRow =====> #3   ', insertQuery);

  connection.query(insertQuery, [id], function (err) {
    if (err) {
      console.error(err.message);
      res.status(500).json('Internal Server Error');
      return;
    }
    res.status(200).json({ message: 'Row created successfully' });
  });

});


// =============================================================================
// DELETE
// =============================================================================
// Generisk endpoint för att ta bort en rad från en specifik tabell
app.delete('/api/tables/:tableName/deleteRow/:id', (req, res) => {
  
  console.log('Server DeleteRow =====> ');

  const tableName = req.params.tableName;
  const id = req.params.id;

  // Skapa en parameteriserad DELETE-query
  const deleteQuery = 'DELETE FROM ' + tableName + ' WHERE Id = ?';
  
  console.log('query= ', deleteQuery,' Id= ', id );

  // Utför frågan med användning av parameter
  connection.query(deleteQuery, [id], function (err) {
    if (err) {
      console.error(err.message);
      res.status(500).json('Internal Server Error');
      return;
    };
  
    // Kontrollera antalet rader som påverkades för att avgöra om det fanns en matchande rad
    if (this.changes === 0) {
      res.status(404).send('Row not found');
    } else {
      res.status(200).json({ message: 'Row deleted successfully' });
    }
  });
});