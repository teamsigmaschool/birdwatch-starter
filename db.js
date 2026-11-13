const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function createRun(run) {
  const result = await pool.query("INSERT INTO birdwatch_runs (state) VALUES ($1) RETURNING id", [JSON.stringify(run)]);
  return result.rows[0].id;
}

async function saveRun(id, run) {
  await pool.query("UPDATE birdwatch_runs SET state = $1, updated_at = NOW() WHERE id = $2", [JSON.stringify(run), id]);
}

async function loadRun(id) {
  const result = await pool.query("SELECT state FROM birdwatch_runs WHERE id = $1", [id]);
  if (result.rows.length === 0) return null;
  return result.rows[0].state;
}

async function log(id, turn, event, detail) {
  await pool.query("INSERT INTO birdwatch_log (run_id, turn, event, detail) VALUES ($1, $2, $3, $4)", [id, turn, event, JSON.stringify(detail)]);
}

module.exports = { pool, createRun, saveRun, loadRun, log };
