export const NATIVE_SPECIES = [
  { scientificName: "Abies concolor", commonName: "White fir", growth: "medium", matureSize: "large" },
  { scientificName: "Abies lasiocarpa", commonName: "Subalpine fir", growth: "slow", matureSize: "medium" },
  { scientificName: "Acer glabrum", commonName: "Rocky Mountain maple", growth: "medium", matureSize: "small" },
  { scientificName: "Acer grandidentatum", commonName: "Bigtooth maple", growth: "medium", matureSize: "medium" },
  { scientificName: "Acer negundo", commonName: "Boxelder", growth: "fast", matureSize: "medium" },
  { scientificName: "Alnus incana", commonName: "Thinleaf alder", growth: "fast", matureSize: "medium" },
  { scientificName: "Amelanchier alnifolia", commonName: "Saskatoon serviceberry", growth: "slow", matureSize: "small" },
  { scientificName: "Amelanchier utahensis", commonName: "Utah serviceberry", growth: "slow", matureSize: "small" },
  { scientificName: "Betula occidentalis", commonName: "Water birch", growth: "medium", matureSize: "small" },
  { scientificName: "Celtis occidentalis", commonName: "Common hackberry", growth: "medium", matureSize: "large" },
  { scientificName: "Celtis reticulata", commonName: "Netleaf hackberry", growth: "slow", matureSize: "medium" },
  { scientificName: "Chilopsis linearis", commonName: "Desert willow", growth: "medium", matureSize: "small" },
  { scientificName: "Crataegus chrysocarpa", commonName: "Fireberry hawthorn", growth: "slow", matureSize: "small" },
  { scientificName: "Crataegus douglasii", commonName: "Black hawthorn", growth: "slow", matureSize: "small" },
  { scientificName: "Crataegus erythropoda", commonName: "Cerro hawthorn", growth: "slow", matureSize: "small" },
  { scientificName: "Crataegus macracantha", commonName: "Large-thorn hawthorn", growth: "slow", matureSize: "small" },
  { scientificName: "Forestiera pubescens", commonName: "New Mexico privet", growth: "slow", matureSize: "small" },
  { scientificName: "Fraxinus anomala", commonName: "Singleleaf ash", growth: "slow", matureSize: "small" },
  { scientificName: "Fraxinus pennsylvanica", commonName: "Green ash", growth: "fast", matureSize: "large" },
  { scientificName: "Gleditsia triacanthos", commonName: "Honeylocust", growth: "fast", matureSize: "large" },
  { scientificName: "Juglans major", commonName: "Arizona walnut", growth: "medium", matureSize: "medium" },
  { scientificName: "Juniperus communis", commonName: "Common juniper", growth: "slow", matureSize: "small" },
  { scientificName: "Juniperus monosperma", commonName: "One-seed juniper", growth: "slow", matureSize: "small" },
  { scientificName: "Juniperus osteosperma", commonName: "Utah juniper", growth: "slow", matureSize: "small" },
  { scientificName: "Juniperus scopulorum", commonName: "Rocky Mountain juniper", growth: "slow", matureSize: "medium" },
  { scientificName: "Picea engelmannii", commonName: "Engelmann spruce", growth: "slow", matureSize: "large" },
  { scientificName: "Picea pungens", commonName: "Colorado blue spruce", growth: "medium", matureSize: "large" },
  { scientificName: "Pinus aristata", commonName: "Bristlecone pine", growth: "slow", matureSize: "medium" },
  { scientificName: "Pinus contorta", commonName: "Lodgepole pine", growth: "medium", matureSize: "large" },
  { scientificName: "Pinus edulis", commonName: "Pinyon pine", growth: "slow", matureSize: "small" },
  { scientificName: "Pinus flexilis", commonName: "Limber pine", growth: "slow", matureSize: "large" },
  { scientificName: "Pinus ponderosa", commonName: "Ponderosa pine", growth: "medium", matureSize: "large" },
  { scientificName: "Populus angustifolia", commonName: "Narrowleaf cottonwood", growth: "fast", matureSize: "large" },
  { scientificName: "Populus balsamifera", commonName: "Balsam poplar", growth: "fast", matureSize: "large" },
  { scientificName: "Populus deltoides", commonName: "Eastern cottonwood", growth: "fast", matureSize: "large" },
  { scientificName: "Populus tremuloides", commonName: "Quaking aspen", growth: "fast", matureSize: "medium" },
  { scientificName: "Prunus americana", commonName: "American plum", growth: "medium", matureSize: "small" },
  { scientificName: "Prunus pensylvanica", commonName: "Pin cherry", growth: "fast", matureSize: "small" },
  { scientificName: "Prunus virginiana", commonName: "Chokecherry", growth: "medium", matureSize: "small" },
  { scientificName: "Pseudotsuga menziesii", commonName: "Douglas-fir", growth: "medium", matureSize: "large" },
  { scientificName: "Quercus gambelii", commonName: "Gambel oak", growth: "slow", matureSize: "small" },
  { scientificName: "Robinia neomexicana", commonName: "New Mexico locust", growth: "medium", matureSize: "small" },
  { scientificName: "Salix amygdaloides", commonName: "Peachleaf willow", growth: "fast", matureSize: "medium" },
  { scientificName: "Salix bebbiana", commonName: "Bebb willow", growth: "medium", matureSize: "small" },
  { scientificName: "Salix drummondiana", commonName: "Drummond willow", growth: "medium", matureSize: "small" },
  { scientificName: "Salix exigua", commonName: "Coyote willow", growth: "fast", matureSize: "small" },
  { scientificName: "Salix geyeriana", commonName: "Geyer willow", growth: "medium", matureSize: "small" },
  { scientificName: "Salix gooddingii", commonName: "Goodding willow", growth: "fast", matureSize: "medium" },
  { scientificName: "Salix lucida", commonName: "Shining willow", growth: "fast", matureSize: "medium" },
  { scientificName: "Salix monticola", commonName: "Mountain willow", growth: "medium", matureSize: "small" },
  { scientificName: "Salix scouleriana", commonName: "Scouler willow", growth: "medium", matureSize: "small" }
];

export const COLORADO_COUNTY_FACTORS = {
  adams: 0.92, alamosa: 0.72, arapahoe: 0.93, archuleta: 0.88, baca: 0.70, bent: 0.72,
  boulder: 1.00, broomfield: 0.98, chaffee: 0.84, cheyenne: 0.70, clearcreek: 0.82,
  "clear creek": 0.82, conejos: 0.76, costilla: 0.74, crowley: 0.70, custer: 0.80,
  delta: 0.86, denver: 0.96, dolores: 0.78, douglas: 0.94, eagle: 0.84, elbert: 0.86,
  elpaso: 0.88, "el paso": 0.88, fremont: 0.82, garfield: 0.86, gilpin: 0.80,
  grand: 0.78, gunnison: 0.76, hinsdale: 0.72, huerfano: 0.78, jackson: 0.74,
  jefferson: 0.98, kiowa: 0.68, kitcarson: 0.70, "kit carson": 0.70, laplata: 0.88,
  "la plata": 0.88, lake: 0.70, larimer: 0.96, lasanimas: 0.76, "las animas": 0.76,
  lincoln: 0.72, logan: 0.78, mesa: 0.84, mineral: 0.78, moffat: 0.76,
  montezuma: 0.80, montrose: 0.84, morgan: 0.82, otero: 0.74, ouray: 0.82,
  park: 0.74, phillips: 0.78, pitkin: 0.82, prowers: 0.70, pueblo: 0.78,
  rioblanco: 0.78, "rio blanco": 0.78, riogrande: 0.76, "rio grande": 0.76,
  routt: 0.82, saguache: 0.74, sanjuan: 0.70, "san juan": 0.70, sanmiguel: 0.80,
  "san miguel": 0.80, sedgwick: 0.78, summit: 0.72, teller: 0.82, washington: 0.74,
  weld: 0.88, yuma: 0.76
};

export const LOCAL_GROWTH_CALIBRATION = {
  source: "Experimental Colorado county/ZIP growth adjustment. Not carbon-credit validated.",
  status: "experimental_unvalidated",
  carbonCreditValidated: false
};

export const COLORADO_COUNTIES = [
  "Adams", "Alamosa", "Arapahoe", "Archuleta", "Baca", "Bent", "Boulder", "Broomfield",
  "Chaffee", "Cheyenne", "Clear Creek", "Conejos", "Costilla", "Crowley", "Custer",
  "Delta", "Denver", "Dolores", "Douglas", "Eagle", "El Paso", "Elbert", "Fremont",
  "Garfield", "Gilpin", "Grand", "Gunnison", "Hinsdale", "Huerfano", "Jackson",
  "Jefferson", "Kiowa", "Kit Carson", "La Plata", "Lake", "Larimer", "Las Animas",
  "Lincoln", "Logan", "Mesa", "Mineral", "Moffat", "Montezuma", "Montrose", "Morgan",
  "Otero", "Ouray", "Park", "Phillips", "Pitkin", "Prowers", "Pueblo", "Rio Blanco",
  "Rio Grande", "Routt", "Saguache", "San Juan", "San Miguel", "Sedgwick", "Summit",
  "Teller", "Washington", "Weld", "Yuma"
];

const AGE_FACTORS = {
  seedling: 2.5,
  young: 8,
  established: 20,
  mature: 45
};

const JENKINS_ABOVEGROUND_BIOMASS = {
  aspenAlderCottonwoodWillow: { beta0: -2.2094, beta1: 2.3867 },
  softMapleBirch: { beta0: -1.9123, beta1: 2.3651 },
  mixedHardwood: { beta0: -2.48, beta1: 2.4835 },
  hardMapleOakHickoryBeech: { beta0: -2.0127, beta1: 2.4342 },
  cedarLarch: { beta0: -2.0336, beta1: 2.2592 },
  douglasFir: { beta0: -2.2304, beta1: 2.4435 },
  trueFirHemlock: { beta0: -2.5384, beta1: 2.4814 },
  pine: { beta0: -2.5356, beta1: 2.4349 },
  spruce: { beta0: -2.0773, beta1: 2.3323 },
  woodland: { beta0: -0.7152, beta1: 1.7029 }
};

const ANNUAL_DBH_GROWTH_CM = {
  slow: 0.25,
  medium: 0.45,
  fast: 0.7
};

const ROOT_TO_SHOOT_RATIO = 0.26;
const CARBON_FRACTION_OF_DRY_BIOMASS = 0.5;
const CO2_PER_CARBON = 44 / 12;

const ZIP_PREFIX_FACTORS = {
  "800": 0.94, "801": 0.92, "802": 0.96, "803": 1.00, "804": 0.84, "805": 0.94,
  "806": 0.86, "807": 0.78, "808": 0.82, "809": 0.88, "810": 0.74, "811": 0.78,
  "812": 0.80, "813": 0.82, "814": 0.84, "815": 0.84, "816": 0.84
};

export function estimateAnnualCarbonOffset({ species, location, treeCount = 1, ageClass = "established", diameterCm, growthModel }) {
  const speciesRecord = findSpecies(species);
  if (!speciesRecord) {
    throw new Error(`Unknown native species: ${species}`);
  }

  const locationMatch = resolveLocationFactor(location);
  const count = clampNumber(treeCount, 1, 100000);
  const dbhCm = clampNumber(diameterCm || AGE_FACTORS[ageClass] || AGE_FACTORS.established, 2.5, 250);
  const growthEstimate = resolveAnnualDbhGrowth(speciesRecord, locationMatch, growthModel, dbhCm);
  const annualGrowthCm = growthEstimate.annualGrowthCm;
  const group = biomassGroupForSpecies(speciesRecord);
  const currentKgCO2 = treeCO2StorageKg(dbhCm, group);
  const nextYearKgCO2 = treeCO2StorageKg(dbhCm + annualGrowthCm, group);
  const annualKgPerTree = Math.max(nextYearKgCO2 - currentKgCO2, 0);
  const annualKg = annualKgPerTree * count;

  return {
    species: speciesRecord,
    location: locationMatch,
    treeCount: count,
    ageClass,
    diameterCm: round(dbhCm, 1),
    annualDbhGrowthCm: round(annualGrowthCm, 2),
    growthEstimate,
    biomassGroup: group,
    currentKgCO2: round(currentKgCO2 * count, 1),
    annualPoundsCO2: round(annualKg * 2.20462262, 1),
    annualKgCO2: round(annualKg, 1),
    annualMetricTonsCO2: round(annualKg / 1000, 3),
    method: "Jenkins generalized DBH biomass regression with annual DBH increment",
    carbonCreditValidated: false,
    validationStatus: "Not certified. Requires approved protocol, monitoring plan, baseline/additionality/permanence/leakage accounting, and third-party verification."
  };
}

export function findSpecies(value) {
  const normalized = normalize(value);
  return NATIVE_SPECIES.find((species) => (
    normalize(species.scientificName) === normalized || normalize(species.commonName) === normalized
  ));
}

export function resolveLocationFactor(value) {
  const raw = String(value ?? "").trim();
  const zip = raw.match(/\b8\d{4}\b/)?.[0];
  if (zip) {
    const prefix = zip.slice(0, 3);
    const factor = ZIP_PREFIX_FACTORS[prefix] ?? 0.86;
    return {
      input: raw,
      matchedUnit: `ZIP ${zip}`,
      factor,
      confidence: ZIP_PREFIX_FACTORS[prefix] ? "zip-prefix-experimental" : "colorado-default-experimental",
      zip,
      countyName: "",
      source: LOCAL_GROWTH_CALIBRATION.source
    };
  }

  const county = normalize(raw.replace(/\bcounty\b/gi, ""));
  const compactCounty = county.replace(/\s+/g, "");
  const factor = COLORADO_COUNTY_FACTORS[county] ?? COLORADO_COUNTY_FACTORS[compactCounty];
  return {
    input: raw,
    matchedUnit: factor ? `${toTitleCase(county)} County` : "Colorado default",
    factor: factor ?? 0.86,
    confidence: factor ? "county-experimental" : "colorado-default-experimental",
    zip: "",
    countyName: factor ? toTitleCase(county) : "",
    source: LOCAL_GROWTH_CALIBRATION.source
  };
}

export function resolveAnnualDbhGrowth(speciesRecord, locationMatch, growthModel, dbhCm) {
  const fallbackGrowth = ANNUAL_DBH_GROWTH_CM[speciesRecord.growth] * locationMatch.factor;
  if (!growthModel) {
    return {
      annualGrowthCm: fallbackGrowth,
      source: "growth-class-fallback",
      detail: "No FIA growth model loaded; using growth class and local factor."
    };
  }

  const countyName = locationMatch.countyName;
  if (growthModel.neuralNetwork?.enabled) {
    const neuralGrowth = predictNeuralAnnualGrowth(speciesRecord, countyName, locationMatch, growthModel, dbhCm);
    if (Number.isFinite(neuralGrowth)) {
      return {
        annualGrowthCm: neuralGrowth,
        source: "fia-neural-residual-growth",
        detail: growthModel.neuralNetwork.reason
      };
    }
  }

  if (countyName) {
    const speciesCountyKey = `${speciesRecord.scientificName}__${countyName}`;
    const speciesCountyGrowth = Number(growthModel.speciesCountyMedian?.[speciesCountyKey]);
    if (Number.isFinite(speciesCountyGrowth)) {
      return {
        annualGrowthCm: speciesCountyGrowth,
        source: "fia-species-county-median",
        detail: `FIA median for ${speciesRecord.scientificName} in ${countyName} County.`
      };
    }
  }

  const speciesGrowth = Number(growthModel.speciesMedian?.[speciesRecord.scientificName]);
  if (Number.isFinite(speciesGrowth)) {
    return {
      annualGrowthCm: speciesGrowth * (locationMatch.zip ? locationMatch.factor : 1),
      source: locationMatch.zip ? "fia-species-median-with-zip-factor" : "fia-species-median",
      detail: locationMatch.zip
        ? `FIA species median adjusted by experimental ZIP factor ${locationMatch.factor}.`
        : `FIA species median for ${speciesRecord.scientificName}.`
    };
  }

  if (countyName) {
    const countyGrowth = Number(growthModel.countyMedian?.[countyName]);
    if (Number.isFinite(countyGrowth)) {
      return {
        annualGrowthCm: countyGrowth,
        source: "fia-county-median",
        detail: `FIA county median for ${countyName} County.`
      };
    }
  }

  const overallGrowth = Number(growthModel.overallMedian);
  if (Number.isFinite(overallGrowth)) {
    return {
      annualGrowthCm: overallGrowth * (locationMatch.zip ? locationMatch.factor : 1),
      source: locationMatch.zip ? "fia-overall-median-with-zip-factor" : "fia-overall-median",
      detail: "FIA overall native-tree median growth."
    };
  }

  return {
    annualGrowthCm: fallbackGrowth,
    source: "growth-class-fallback",
    detail: "FIA growth model had no usable fallback; using growth class and local factor."
  };
}

function predictNeuralAnnualGrowth(speciesRecord, countyName, locationMatch, growthModel, dbhCm) {
  const nn = growthModel.neuralNetwork;
  const speciesList = nn.speciesList ?? [];
  const countyList = nn.countyList ?? [];
  const inputSize = speciesList.length + countyList.length + 3;
  const input = new Array(inputSize).fill(0);
  const speciesIndex = speciesList.indexOf(speciesRecord.scientificName);
  const countyIndex = countyName ? countyList.indexOf(countyName) : -1;
  if (speciesIndex >= 0) input[speciesIndex] = 1;
  if (countyIndex >= 0) input[speciesList.length + countyIndex] = 1;

  const baselineGrowth = baselineGrowthForNeural(speciesRecord, countyName, locationMatch, growthModel);
  const numericOffset = speciesList.length + countyList.length;
  input[numericOffset] = standardize(dbhCm, nn.numericStats.dbhCm);
  input[numericOffset + 1] = 0;
  input[numericOffset + 2] = standardize(baselineGrowth, nn.numericStats.baselineGrowth);

  const residual = unstandardize(forwardNeural(nn.weights, input), nn.residualStats.residual);
  return clampNumber(baselineGrowth + residual, -0.25, 5);
}

function baselineGrowthForNeural(speciesRecord, countyName, locationMatch, growthModel) {
  if (countyName) {
    const speciesCounty = Number(growthModel.speciesCountyMedian?.[`${speciesRecord.scientificName}__${countyName}`]);
    if (Number.isFinite(speciesCounty)) return speciesCounty;
  }
  const species = Number(growthModel.speciesMedian?.[speciesRecord.scientificName]);
  if (Number.isFinite(species)) return species * (locationMatch.zip ? locationMatch.factor : 1);
  if (countyName) {
    const county = Number(growthModel.countyMedian?.[countyName]);
    if (Number.isFinite(county)) return county;
  }
  const overall = Number(growthModel.overallMedian);
  if (Number.isFinite(overall)) return overall * (locationMatch.zip ? locationMatch.factor : 1);
  return ANNUAL_DBH_GROWTH_CM[speciesRecord.growth] * locationMatch.factor;
}

function forwardNeural(weights, input) {
  const hidden = new Array(weights.w1.length);
  for (let h = 0; h < weights.w1.length; h += 1) {
    let sum = weights.b1[h];
    for (let i = 0; i < input.length; i += 1) sum += weights.w1[h][i] * input[i];
    hidden[h] = Math.tanh(sum);
  }
  let output = weights.b2;
  for (let h = 0; h < hidden.length; h += 1) output += weights.w2[h] * hidden[h];
  return output;
}

function standardize(value, stat) {
  return (Number(value) - stat.mean) / stat.std;
}

function unstandardize(value, stat) {
  return value * stat.std + stat.mean;
}

function normalize(value) {
  return String(value ?? "").trim().toLowerCase().replace(/[^a-z0-9]+/g, " ").trim().replace(/\s+/g, " ");
}

function biomassGroupForSpecies(species) {
  const name = species.scientificName;
  const genus = name.split(" ")[0];
  if (genus === "Populus" || genus === "Salix" || genus === "Alnus") return "aspenAlderCottonwoodWillow";
  if (genus === "Acer" || genus === "Betula") return "softMapleBirch";
  if (genus === "Quercus") return name === "Quercus gambelii" ? "woodland" : "hardMapleOakHickoryBeech";
  if (genus === "Juniperus") return "woodland";
  if (genus === "Pseudotsuga") return "douglasFir";
  if (genus === "Abies") return "trueFirHemlock";
  if (genus === "Picea") return "spruce";
  if (genus === "Pinus") return name === "Pinus edulis" ? "woodland" : "pine";
  if (genus === "Celtis" || genus === "Fraxinus" || genus === "Juglans" || genus === "Gleditsia") return "mixedHardwood";
  return "mixedHardwood";
}

function treeCO2StorageKg(dbhCm, group) {
  const coefficients = JENKINS_ABOVEGROUND_BIOMASS[group] ?? JENKINS_ABOVEGROUND_BIOMASS.mixedHardwood;
  const abovegroundKg = Math.exp(coefficients.beta0 + coefficients.beta1 * Math.log(dbhCm));
  const totalDryBiomassKg = abovegroundKg * (1 + ROOT_TO_SHOOT_RATIO);
  return totalDryBiomassKg * CARBON_FRACTION_OF_DRY_BIOMASS * CO2_PER_CARBON;
}

function toTitleCase(value) {
  return value.split(" ").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}

function clampNumber(value, min, max) {
  const number = Number(value);
  if (!Number.isFinite(number)) return min;
  return Math.min(Math.max(number, min), max);
}

function round(value, decimals) {
  const scale = 10 ** decimals;
  return Math.round(value * scale) / scale;
}
