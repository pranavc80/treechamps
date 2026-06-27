import { createReadStream, createWriteStream } from "node:fs";
import { mkdir } from "node:fs/promises";
import { createInterface } from "node:readline";
import { readCsv } from "../src/csv.js";
import { loadSpeciesCatalog } from "../src/species_catalog.js";

const treePath = process.argv[2] ?? "data/fia_raw/CO_CSV/CO_TREE.csv";
const speciesRefPath = process.argv[3] ?? "data/fia_raw/REF_SPECIES.csv";
const countyPath = process.argv[4] ?? "data/fia_raw/CO_CSV/CO_COUNTY.csv";
const outPath = process.argv[5] ?? "data/fia_training/native_tree_growth.csv";

await mkdir("data/fia_training", { recursive: true });

const catalog = await loadSpeciesCatalog();
const speciesByCode = await loadSpeciesByCode(speciesRefPath, catalog);
const countiesByCode = await loadCountiesByCode(countyPath);
const previousYearsByTreeCn = await indexPreviousYears(treePath);
const stats = await writeTrainingRows(treePath, outPath, speciesByCode, countiesByCode, previousYearsByTreeCn);

console.log(JSON.stringify({ outPath, ...stats }, null, 2));

async function loadSpeciesByCode(path, catalog) {
  const rows = await readCsv(path);
  const byCode = new Map();
  for (const row of rows) {
    const scientificName = row.SCIENTIFIC_NAME;
    if (catalog.has(scientificName)) {
      byCode.set(String(Number(row.SPCD)), {
        scientificName: catalog.normalize(scientificName),
        commonName: row.COMMON_NAME
      });
    }
  }
  return byCode;
}

async function loadCountiesByCode(path) {
  const rows = await readCsv(path);
  return new Map(rows.map((row) => [String(Number(row.COUNTYCD)), row.COUNTYNM]));
}

async function indexPreviousYears(path) {
  const index = new Map();
  for await (const row of streamCsv(path)) {
    if (row.CN && row.INVYR) {
      index.set(row.CN, Number(row.INVYR));
    }
  }
  return index;
}

async function writeTrainingRows(path, outPath, speciesByCode, countiesByCode, previousYearsByTreeCn) {
  const out = createWriteStream(outPath);
  out.write([
    "scientific_name",
    "common_name",
    "county",
    "inventory_year",
    "previous_inventory_year",
    "years_between",
    "dbh_cm",
    "previous_dbh_cm",
    "annual_dbh_growth_cm",
    "height_m",
    "carbon_ag",
    "carbon_bg"
  ].join(",") + "\n");

  let sourceRows = 0;
  let writtenRows = 0;
  let skippedNoSpecies = 0;
  let skippedNoPrevious = 0;
  let skippedNotLiveRemeasurement = 0;

  for await (const row of streamCsv(path)) {
    sourceRows += 1;
    const species = speciesByCode.get(String(Number(row.SPCD)));
    if (!species) {
      skippedNoSpecies += 1;
      continue;
    }

    if (String(Number(row.STATUSCD)) !== "1" || String(Number(row.PREV_STATUS_CD)) !== "1") {
      skippedNotLiveRemeasurement += 1;
      continue;
    }

    const currentYear = Number(row.INVYR);
    const previousYear = previousYearsByTreeCn.get(row.PREV_TRE_CN);
    const dbhCm = inchesToCm(row.DIA);
    const previousDbhCm = inchesToCm(row.PREVDIA);
    const yearsBetween = currentYear - previousYear;

    if (!Number.isFinite(yearsBetween) || yearsBetween <= 0 || !Number.isFinite(dbhCm) || !Number.isFinite(previousDbhCm) || dbhCm <= 0 || previousDbhCm <= 0) {
      skippedNoPrevious += 1;
      continue;
    }

    const annualGrowth = (dbhCm - previousDbhCm) / yearsBetween;
    if (!Number.isFinite(annualGrowth) || annualGrowth < -0.25 || annualGrowth > 5) {
      skippedNoPrevious += 1;
      continue;
    }

    const values = [
      species.scientificName,
      species.commonName,
      countiesByCode.get(String(Number(row.COUNTYCD))) ?? "",
      currentYear,
      previousYear,
      round(yearsBetween, 2),
      round(dbhCm, 3),
      round(previousDbhCm, 3),
      round(annualGrowth, 4),
      round(feetToMeters(row.HT), 3),
      row.CARBON_AG ?? "",
      row.CARBON_BG ?? ""
    ];
    out.write(values.map(csvCell).join(",") + "\n");
    writtenRows += 1;
  }

  await new Promise((resolve) => out.end(resolve));
  return { sourceRows, writtenRows, skippedNoSpecies, skippedNoPrevious, skippedNotLiveRemeasurement, nativeSpeciesCodes: speciesByCode.size };
}

async function* streamCsv(path) {
  const rl = createInterface({ input: createReadStream(path), crlfDelay: Infinity });
  let headers;
  for await (const line of rl) {
    if (!headers) {
      headers = parseCsvLine(line);
      continue;
    }
    if (!line.trim()) continue;
    const values = parseCsvLine(line);
    yield Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""]));
  }
}

function parseCsvLine(line) {
  const values = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    const next = line[i + 1];
    if (char === '"' && inQuotes && next === '"') {
      current += '"';
      i += 1;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      values.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  values.push(current);
  return values;
}

function inchesToCm(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number * 2.54 : Number.NaN;
}

function feetToMeters(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number * 0.3048 : Number.NaN;
}

function round(value, decimals) {
  if (!Number.isFinite(value)) return "";
  const scale = 10 ** decimals;
  return Math.round(value * scale) / scale;
}

function csvCell(value) {
  const text = String(value ?? "");
  return /[",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}
