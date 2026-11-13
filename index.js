require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { pool } = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/runs/:id/log", async (req, res) => {
  const result = await pool.query("SELECT turn, event, detail, created_at FROM birdwatch_log WHERE run_id = $1 ORDER BY id", [req.params.id]);
  res.json(result.rows);
});

app.listen(3000, () => console.log("Birdwatch on port 3000"));
