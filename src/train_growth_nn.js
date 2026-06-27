import { mkdir, writeFile } from "node:fs/promises";
import { readCsv } from "./csv.js";

const args = parseArgs(process.argv.slice(2));
const dataPath = args.data ?? "data/fia_training/native_tree_growth.csv";
const modelPath = args.model ?? "models/fia_native_growth_model.json";
const epochs = Number(args.epochs ?? 12);
const hiddenSize = Number(args.hidden ?? 24);
const learningRate = Number(args.lr ?? 0.006);

const rows = (await readCsv(dataPath))
  .map((row) => ({
    species: row.scientific_name,
    county: row.county,
    annualGrowthCm: Number(row.annual_dbh_growth_cm),
    dbhCm: Number(row.dbh_cm),
    heightM: Number(row.height_m)
  }))
  .filter((row) => (
    row.species &&
    row.county &&
    Number.isFinite(row.annualGrowthCm) &&
    Number.isFinite(row.dbhCm) &&
    Number.isFinite(row.heightM)
  ));

const trainRows = [];
const testRows = [];
for (const row of rows) {
  (hash(`${row.species}|${row.county}|${row.dbhCm}|${row.heightM}|${row.annualGrowthCm}`) % 5 === 0 ? testRows : trainRows).push(row);
}

const baseline = buildMedianModel(trainRows, rows.length);
const speciesList = [...new Set(trainRows.map((row) => row.species))].sort();
const countyList = [...new Set(trainRows.map((row) => row.county))].sort();
const stats = numericStats(trainRows);
const residualStats = numericStats(trainRows.map((row) => ({
  residual: row.annualGrowthCm - predictMedianGrowth(baseline, row)
})), "residual");

const inputSize = speciesList.length + countyList.length + 3;
const network = createNetwork(inputSize, hiddenSize, 1337);
const speciesIndex = new Map(speciesList.map((value, index) => [value, index]));
const countyIndex = new Map(countyList.map((value, index) => [value, index]));

for (let epoch = 0; epoch < epochs; epoch += 1) {
  for (const row of deterministicShuffle(trainRows, epoch + 17)) {
    const baselinePrediction = predictMedianGrowth(baseline, row);
    const target = standardize(row.annualGrowthCm - baselinePrediction, residualStats.residual);
    trainOne(network, vectorize(row, baselinePrediction), target, learningRate);
  }
}

const medianMetrics = evaluate(testRows, (row) => predictMedianGrowth(baseline, row));
const nnMetrics = evaluate(testRows, (row) => predictNeuralGrowth(baseline, network, row));
const useNeuralNetwork = nnMetrics.maeCm < medianMetrics.maeCm;

const model = {
  ...baseline,
  neuralNetwork: {
    enabled: useNeuralNetwork,
    reason: useNeuralNetwork
      ? "Neural residual model improved holdout MAE over FIA median fallback."
      : "Disabled because FIA median fallback had equal or lower holdout MAE.",
    architecture: {
      kind: "one-hidden-layer-residual-mlp",
      inputSize,
      hiddenSize,
      outputSize: 1,
      activation: "tanh"
    },
    features: ["species_one_hot", "county_one_hot", "dbh_cm_z", "height_m_z", "median_growth_z"],
    speciesList,
    countyList,
    numericStats: stats,
    residualStats,
    weights: network,
    holdoutMetrics: {
      median: medianMetrics,
      neuralResidual: nnMetrics
    }
  }
};

await mkdir("models", { recursive: true });
await writeFile(modelPath, JSON.stringify(model, null, 2));

console.log(JSON.stringify({
  modelPath,
  trainRows: trainRows.length,
  testRows: testRows.length,
  epochs,
  hiddenSize,
  medianMaeCm: medianMetrics.maeCm,
  neuralMaeCm: nnMetrics.maeCm,
  neuralEnabled: useNeuralNetwork,
  reason: model.neuralNetwork.reason
}, null, 2));

function buildMedianModel(sourceRows, totalRows) {
  const speciesCounty = groupMedian(sourceRows, (row) => `${row.species}||${row.county}`);
  const species = groupMedian(sourceRows, (row) => row.species);
  const county = groupMedian(sourceRows, (row) => row.county);
  const overall = median(sourceRows.map((row) => row.annualGrowthCm));

  return {
    version: 2,
    trainedAt: new Date().toISOString(),
    source: "USDA Forest Service FIA Colorado FIADB bulk CSV",
    sourceRows: totalRows,
    trainingRows: sourceRows.length,
    target: "annual_dbh_growth_cm",
    features: ["scientific_name", "county", "dbh_cm", "height_m"],
    fallbackOrder: ["neuralNetwork", "speciesCountyMedian", "speciesMedian", "countyMedian", "overallMedian"],
    overallMedian: overall,
    speciesCountyMedian: Object.fromEntries([...speciesCounty.entries()].map(([key, value]) => {
      const [scientificName, countyName] = key.split("||");
      return [`${scientificName}__${countyName}`, value];
    })),
    speciesMedian: Object.fromEntries(species),
    countyMedian: Object.fromEntries(county)
  };
}

function predictMedianGrowth(model, row) {
  const speciesCounty = Number(model.speciesCountyMedian?.[`${row.species}__${row.county}`]);
  if (Number.isFinite(speciesCounty)) return speciesCounty;
  const species = Number(model.speciesMedian?.[row.species]);
  if (Number.isFinite(species)) return species;
  const county = Number(model.countyMedian?.[row.county]);
  if (Number.isFinite(county)) return county;
  return Number(model.overallMedian) || 0;
}

function predictNeuralGrowth(model, network, row) {
  const baselinePrediction = predictMedianGrowth(model, row);
  const output = forward(network, vectorize(row, baselinePrediction)).output;
  return baselinePrediction + unstandardize(output, residualStats.residual);
}

function vectorize(row, baselinePrediction) {
  const vector = new Array(inputSize).fill(0);
  const speciesOffset = 0;
  const countyOffset = speciesList.length;
  const speciesPosition = speciesIndex.get(row.species);
  const countyPosition = countyIndex.get(row.county);
  if (speciesPosition !== undefined) vector[speciesOffset + speciesPosition] = 1;
  if (countyPosition !== undefined) vector[countyOffset + countyPosition] = 1;
  vector[speciesList.length + countyList.length] = standardize(row.dbhCm, stats.dbhCm);
  vector[speciesList.length + countyList.length + 1] = standardize(row.heightM, stats.heightM);
  vector[speciesList.length + countyList.length + 2] = standardize(baselinePrediction, stats.baselineGrowth);
  return vector;
}

function createNetwork(inputSizeValue, hiddenSizeValue, seed) {
  const rand = lcg(seed);
  return {
    w1: Array.from({ length: hiddenSizeValue }, () => (
      Array.from({ length: inputSizeValue }, () => (rand() - 0.5) * 0.12)
    )),
    b1: Array.from({ length: hiddenSizeValue }, () => 0),
    w2: Array.from({ length: hiddenSizeValue }, () => (rand() - 0.5) * 0.12),
    b2: 0
  };
}

function trainOne(network, input, target, lr) {
  const state = forward(network, input);
  const error = state.output - target;
  for (let h = 0; h < network.w1.length; h += 1) {
    const gradW2 = error * state.hidden[h];
    const gradHidden = error * network.w2[h] * (1 - state.hidden[h] ** 2);
    network.w2[h] -= lr * gradW2;
    network.b1[h] -= lr * gradHidden;
    for (let i = 0; i < input.length; i += 1) {
      network.w1[h][i] -= lr * gradHidden * input[i];
    }
  }
  network.b2 -= lr * error;
}

function forward(network, input) {
  const hidden = new Array(network.w1.length);
  for (let h = 0; h < network.w1.length; h += 1) {
    let sum = network.b1[h];
    for (let i = 0; i < input.length; i += 1) sum += network.w1[h][i] * input[i];
    hidden[h] = Math.tanh(sum);
  }
  let output = network.b2;
  for (let h = 0; h < hidden.length; h += 1) output += network.w2[h] * hidden[h];
  return { hidden, output };
}

function evaluate(sourceRows, predict) {
  let absolute = 0;
  let squared = 0;
  let targetSum = 0;
  let targetSquared = 0;
  for (const row of sourceRows) {
    const prediction = predict(row);
    const error = prediction - row.annualGrowthCm;
    absolute += Math.abs(error);
    squared += error ** 2;
    targetSum += row.annualGrowthCm;
    targetSquared += row.annualGrowthCm ** 2;
  }
  const mean = targetSum / sourceRows.length;
  const totalVariance = targetSquared - sourceRows.length * mean ** 2;
  return {
    rows: sourceRows.length,
    maeCm: round(absolute / sourceRows.length, 5),
    rmseCm: round(Math.sqrt(squared / sourceRows.length), 5),
    r2: round(totalVariance <= 0 ? 0 : 1 - squared / totalVariance, 5)
  };
}

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
  return sorted.length % 2 ? sorted[mid] : round((sorted[mid - 1] + sorted[mid]) / 2, 5);
}

function numericStats(sourceRows, key) {
  const keys = key ? [key] : ["dbhCm", "heightM"];
  const result = {};
  for (const currentKey of keys) {
    const values = sourceRows.map((row) => Number(row[currentKey])).filter(Number.isFinite);
    const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
    const variance = values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / Math.max(values.length - 1, 1);
    result[currentKey] = { mean, std: Math.max(Math.sqrt(variance), 1e-6) };
  }
  if (!key) {
    const baselineValues = sourceRows.map((row) => predictMedianGrowth(baseline, row));
    const mean = baselineValues.reduce((sum, value) => sum + value, 0) / baselineValues.length;
    const variance = baselineValues.reduce((sum, value) => sum + (value - mean) ** 2, 0) / Math.max(baselineValues.length - 1, 1);
    result.baselineGrowth = { mean, std: Math.max(Math.sqrt(variance), 1e-6) };
  }
  return result;
}

function standardize(value, stat) {
  return (Number(value) - stat.mean) / stat.std;
}

function unstandardize(value, stat) {
  return value * stat.std + stat.mean;
}

function deterministicShuffle(values, seed) {
  return [...values].sort((a, b) => (
    hash(`${a.species}|${a.county}|${a.dbhCm}|${seed}`) - hash(`${b.species}|${b.county}|${b.dbhCm}|${seed}`)
  ));
}

function hash(value) {
  let h = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function lcg(seed) {
  let state = seed >>> 0;
  return () => {
    state = Math.imul(1664525, state) + 1013904223;
    return (state >>> 0) / 4294967296;
  };
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
