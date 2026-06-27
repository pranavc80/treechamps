import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { estimateAnnualCarbonOffset, findSpecies, NATIVE_SPECIES, resolveLocationFactor } from "../src/carbon.js";

test("carbon catalog stays aligned to roughly 50 native tree species", () => {
  assert.equal(NATIVE_SPECIES.length, 51);
  assert.equal(findSpecies("Colorado blue spruce")?.scientificName, "Picea pungens");
  assert.equal(findSpecies("Acer palmatum"), undefined);
});

test("annual carbon estimate uses native species and county location", () => {
  const estimate = estimateAnnualCarbonOffset({
    species: "Picea pungens",
    location: "Denver County",
    treeCount: 10,
    ageClass: "established",
    diameterCm: 20
  });

  assert.equal(estimate.location.matchedUnit, "Denver County");
  assert.equal(estimate.location.factor, 0.96);
  assert.equal(estimate.location.confidence, "county-experimental");
  assert.equal(estimate.treeCount, 10);
  assert.equal(estimate.carbonCreditValidated, false);
  assert.equal(estimate.biomassGroup, "spruce");
  assert.ok(estimate.currentKgCO2 > 1000);
  assert.ok(estimate.annualPoundsCO2 > 100);
  assert.ok(estimate.annualMetricTonsCO2 > 0);
});

test("zip code input resolves to an experimental local multiplier", () => {
  const location = resolveLocationFactor("80205");
  assert.equal(location.matchedUnit, "ZIP 80205");
  assert.equal(location.factor, 0.96);
  assert.equal(location.confidence, "zip-prefix-experimental");
});

test("county and zip can change estimates but remain not credit validated", () => {
  const baseInput = {
    species: "Picea pungens",
    treeCount: 1,
    ageClass: "established",
    diameterCm: 20
  };
  const county = estimateAnnualCarbonOffset({ ...baseInput, location: "Boulder County" });
  const zip = estimateAnnualCarbonOffset({ ...baseInput, location: "81001" });

  assert.notEqual(county.annualKgCO2, zip.annualKgCO2);
  assert.equal(county.location.factor, 1);
  assert.equal(zip.location.factor, 0.74);
  assert.equal(county.carbonCreditValidated, false);
  assert.equal(zip.carbonCreditValidated, false);
});

test("hybrid estimate uses the neural residual growth model when it beats the median baseline", async () => {
  const growthModel = JSON.parse(await readFile("models/fia_native_growth_model.json", "utf8"));
  const estimate = estimateAnnualCarbonOffset({
    species: "Pinus ponderosa",
    location: "Boulder County",
    treeCount: 1,
    ageClass: "established",
    diameterCm: 25,
    growthModel
  });

  assert.equal(estimate.growthEstimate.source, "fia-neural-residual-growth");
  assert.equal(growthModel.neuralNetwork.enabled, true);
  assert.ok(growthModel.neuralNetwork.holdoutMetrics.neuralResidual.maeCm < growthModel.neuralNetwork.holdoutMetrics.median.maeCm);
  assert.equal(estimate.carbonCreditValidated, false);
});
