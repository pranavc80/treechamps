import { mkdir, writeFile } from "node:fs/promises";
import { readCsv } from "./csv.js";

const args = parseArgs(process.argv.slice(2));
const dataPath = args.data ?? "data/fia_training/native_tree_growth.csv";
const modelPath = args.model ?? "models/fia_native_growth_model.json";

const rows = await readCsv(dataPath);
const usable = rows
  .map((row) => ({
    species: row.scientific_name,
    county: row.county,
    annualGrowthCm: Number(row.annual_dbh_growth_cm),
    dbhCm: Number(row.dbh_cm),
    heightM: Number(row.height_m)
  }))
  .filter((row) => row.species && row.county && Number.isFinite(row.annualGrowthCm));

const speciesCounty = groupMedian(usable, (row) => `${row.species}||${row.county}`);
const species = groupMedian(usable, (row) => row.species);
const county = groupMedian(usable, (row) => row.county);
const overall = median(usable.map((row) => row.annualGrowthCm));

const model = {
  version: 1,
  trainedAt: new Date().toISOString(),
  source: "USDA Forest Service FIA Colorado FIADB bulk CSV",
  sourceRows: rows.length,
  trainingRows: usable.length,
  target: "annual_dbh_growth_cm",
  features: ["scientific_name", "county", "dbh_cm", "height_m"],
  fallbackOrder: ["speciesCountyMedian", "speciesMedian", "countyMedian", "overallMedian"],
  overallMedian: overall,
  speciesCountyMedian: Object.fromEntries([...speciesCounty.entries()].map(([key, value]) => {
    const [scientificName, countyName] = key.split("||");
    return [`${scientificName}__${countyName}`, value];
  })),
  speciesMedian: Object.fromEntries(species),
  countyMedian: Object.fromEntries(county)
};

await mkdir("models", { recursive: true });
await writeFile(modelPath, JSON.stringify(model, null, 2));

console.log(JSON.stringify({
  modelPath,
  sourceRows: model.sourceRows,
  trainingRows: model.trainingRows,
  speciesCountyGroups: speciesCounty.size,
  speciesGroups: species.size,
  countyGroups: county.size,
  overallMedian: model.overallMedian
}, null, 2));

function groupMedian(rows, keyFn) {
  const groups = new Map();
  for (const row of rows) {
    const key = keyFn(row);
    if (!key) continue;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(row.annualGrowthCm);
  }
  return new Map([...groups.entries()].map(([key, values]) => [key, median(values)]));
}

function median(values) {
  const sorted = values.filter(Number.isFinite).sort((a, b) => a - b);
  if (sorted.length === 0) return 0;
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : round((sorted[mid - 1] + sorted[mid]) / 2, 4);
}

function round(value, decimals) {
  const scale = 10 ** decimals;
  return Math.round(value * scale) / scale;
}

function parseArgs(values) {
  const parsed = {};
  for (let i = 0; i < values.length; i += 1) {
    if (values[i].startsWith("--")) {
      parsed[values[i].slice(2)] = values[i + 1];
      i += 1;
    }
  }
  return parsed;
}
