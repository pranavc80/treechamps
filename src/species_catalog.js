import { readCsv } from "./csv.js";

const DEFAULT_CATALOG_PATH = new URL("../data/species_catalog.csv", import.meta.url);

export async function loadSpeciesCatalog(path = DEFAULT_CATALOG_PATH) {
  const rows = await readCsv(path);
  const labels = new Map();

  for (const row of rows) {
    const scientific = cleanLabel(row.scientific_name);
    const common = cleanLabel(row.common_name);
    if (!scientific) continue;
    labels.set(scientific.toLowerCase(), { scientificName: scientific, commonName: common });
    if (common) labels.set(common.toLowerCase(), { scientificName: scientific, commonName: common });
  }

  const scientificNames = [...new Set([...labels.values()].map((entry) => entry.scientificName))].sort();
  return {
    size: scientificNames.length,
    scientificNames,
    has(label) {
      return labels.has(cleanLabel(label).toLowerCase());
    },
    normalize(label) {
      const cleaned = cleanLabel(label);
      return labels.get(cleaned.toLowerCase())?.scientificName ?? cleaned;
    }
  };
}

export function cleanLabel(value) {
  return String(value ?? "").trim().replace(/\s+/g, " ");
}
