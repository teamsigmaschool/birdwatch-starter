DROP TABLE IF EXISTS birdwatch_log;
DROP TABLE IF EXISTS birdwatch_plans;
DROP TABLE IF EXISTS birdwatch_runs;

CREATE TABLE birdwatch_runs (
  id SERIAL PRIMARY KEY,
  state JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE birdwatch_plans (
  id SERIAL PRIMARY KEY,
  run_id INTEGER NOT NULL REFERENCES birdwatch_runs(id),
  spots JSONB NOT NULL,
  species_total INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE birdwatch_log (
  id SERIAL PRIMARY KEY,
  run_id INTEGER NOT NULL REFERENCES birdwatch_runs(id),
  turn INTEGER NOT NULL,
  event TEXT NOT NULL,
  detail JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
