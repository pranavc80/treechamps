import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { readCsv } from "../src/csv.js";

const trainingPath = "data/fia_training/native_tree_growth.csv";
const modelPath = "models/fia_native_growth_model.json";

test("FIA native tree growth training data is prepared from official tables", { skip: !existsSync(trainingPath) }, async () => {
  const rows = await readCsv(trainingPath);
  const species = new Set(rows.map((row) => row.scientific_name));
  const counties = new Set(rows.map((row) => row.county));
  const growthValues = rows.map((row) => Number(row.annual_dbh_growth_cm));

  assert.ok(rows.length > 90000);
  assert.ok(species.has("Pinus ponderosa"));
  assert.ok(species.has("Picea pungens"));
  assert.ok(counties.has("Boulder"));
  assert.ok(growthValues.every(Number.isFinite));
});

test("FIA growth model is trained from prepared growth rows", { skip: !existsSync(modelPath) }, async () => {
  const model = JSON.parse(await readFile(modelPath, "utf8"));

  assert.equal(model.source, "USDA Forest Service FIA Colorado FIADB bulk CSV");
  assert.ok(model.sourceRows > 90000);
  assert.ok(model.trainingRows > 75000);
  assert.ok(model.speciesMedian["Pinus ponderosa"] > 0);
  assert.ok(model.countyMedian.Boulder > 0);
  assert.equal(model.target, "annual_dbh_growth_cm");
  assert.equal(model.neuralNetwork.enabled, true);
  assert.ok(model.neuralNetwork.holdoutMetrics.neuralResidual.maeCm < model.neuralNetwork.holdoutMetrics.median.maeCm);
});
