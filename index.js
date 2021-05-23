const express = require("express");
const app = express();
const pool = require("./postgres-database/db");

app.use(express.json());

app.get("/waterme", async (req, res) => {
  try {
    //await
    const alldata = await pool.query("select * from sensordata, zuordnung");
;    res.json(alldata.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/waterme/sensordata/:id", async (req, res) => {
  const { id } = req.params;
  try {
    //await
    const getById = await pool.query("select * from sensordata where id = $1", [id]);
    res.json(getById.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/waterme/zuordnung", async (req, res) => {
  try {
    //await
    const alldata = await pool.query("select * from zuordnung");
;    res.json(alldata.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/waterme/plants/:name", async (req, res) => {
  const { name } = req.params;
  try {
    //await
    const getByplants = await pool.query("select * from plants where name = $1", [name]);
    res.json(getByplants.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/waterme/sensordata", async (req, res) => {
  try {
    const {id, ts, waterlevel} = req.body;
    const sensordata = await pool.query(
      "INSERT INTO sensordata (id, ts, waterlevel) VALUES ($1, $2, $3) RETURNING *",
    [id, ts, waterlevel]);
    res.json(sensordata);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/waterme/plants", async (req, res) => {
  try {
    const {name, demand, picture} = req.body;
    const plants = await pool.query(
      "INSERT INTO sensordata (name, demand, picture) VALUES ($1, $2, $3) RETURNING *",
    [name, demand, picture]);
    res.json(plants);
  } catch (err) {
    console.error(err.message);
  }
});


app.post("/waterme/zuordnung", async (req, res) => {
  try {
    const {users, pflanze, sensor, gegossen_am} = req.body;
    const zuordnung = await pool.query(
      "INSERT INTO zuordnung(users, pflanze, sensor, gegossen_am) VALUES ($1, $2, $3, $4) RETURNING *",
    [users, pflanze, sensor, gegossen_am]);
    res.json(zuordnung);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(3000);
