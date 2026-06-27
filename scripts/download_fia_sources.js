import { createWriteStream, mkdirSync } from "node:fs";
import { pipeline } from "node:stream/promises";

const sources = [
  {
    url: "https://apps.fs.usda.gov/fia/datamart/CSV/REF_SPECIES.csv",
    path: "data/fia_raw/REF_SPECIES.csv"
  },
  {
    url: "https://apps.fs.usda.gov/fia/datamart/CSV/CO_CSV.zip",
    path: "data/fia_raw/CO_CSV.zip"
  }
];

mkdirSync("data/fia_raw", { recursive: true });

for (const source of sources) {
  const response = await fetch(source.url);
  if (!response.ok) {
    throw new Error(`Download failed for ${source.url}: ${response.status} ${response.statusText}`);
  }
  await pipeline(response.body, createWriteStream(source.path));
  console.log(source.path);
}
