# Tree Champs Hybrid Carbon Estimator

This repo is focused on one workflow:

```text
native Colorado tree species + county/ZIP + optional DBH -> annual CO2 estimate
```

The estimator is hybrid:

1. A FIA-trained neural residual model estimates annual DBH growth from official USDA Forest Service remeasurement data.
2. A USDA Jenkins-style biomass formula converts current DBH and next-year DBH into annual added CO2.

It is a planning estimator, not a certified carbon-credit calculator.

## Run

PowerShell blocks `npm.ps1` on this machine, so use `npm.cmd`.

```powershell
npm.cmd test
npm.cmd run serve
```

Open:

```text
http://localhost:5173
```

## Inputs

- Native Colorado tree species.
- County name or Colorado ZIP code.
- Number of trees.
- Optional DBH in centimeters.
- Tree stage fallback when DBH is blank.

## Hybrid Method

The HTML page loads:

```text
models/fia_native_growth_model.json
```

Growth prediction:

1. Neural residual model.
2. FIA species-county median annual DBH growth.
3. FIA species median.
4. FIA county median.
5. FIA overall native-tree median.
6. Growth-class fallback if no FIA model is available.

The neural layer only enables itself when holdout MAE beats the median baseline.

Current holdout metrics:

- FIA median MAE: 0.08599 cm/year.
- Neural residual MAE: 0.08486 cm/year.
- Neural network: enabled.

Carbon formula:

1. Map species to a Jenkins biomass group.
2. Estimate current dry biomass from DBH.
3. Add belowground biomass with a root-to-shoot ratio.
4. Convert biomass to stored CO2.
5. Add the FIA-modeled annual DBH growth.
6. Annual offset is next-year stored CO2 minus current stored CO2.

## FIA Training

Source data:

- `data/fia_raw/CO_CSV/CO_TREE.csv`
- `data/fia_raw/CO_CSV/CO_COUNTY.csv`
- `data/fia_raw/REF_SPECIES.csv`

`CO_TREE.csv` is larger than GitHub's normal file limit, so it is intentionally ignored. To recreate it locally:

```powershell
npm.cmd run download:fia
Expand-Archive data\fia_raw\CO_CSV.zip data\fia_raw\CO_CSV -Force
```

Prepare and train:

```powershell
npm.cmd run prepare:fia
npm.cmd run train:growth:nn
```

Prepared data:

```text
data/fia_training/native_tree_growth.csv
```

Model:

```text
models/fia_native_growth_model.json
```

Current prepared dataset:

- 94,393 live native Colorado tree remeasurement rows.
- 19 native species with repeated FIA measurements.
- 49 Colorado counties.
- 470 species-county growth groups.

## Validation

The estimator uses real FIA growth data and published biomass equations, but it is not carbon-credit validated.

Carbon-credit validation would require an approved protocol, baseline/additionality/permanence/leakage accounting, monitoring, and third-party verification.

Sources:

- USDA FIA DataMart: https://apps.fs.usda.gov/fia/datamart/
- FIA Colorado bulk CSV: https://apps.fs.usda.gov/fia/datamart/CSV/CO_CSV.zip
- FIA species reference: https://apps.fs.usda.gov/fia/datamart/CSV/REF_SPECIES.csv
- i-Tree tools: https://www.itreetools.org/
- USDA Jenkins biomass equations: https://www.fs.usda.gov/ne/newtown_square/publications/technical_reports/pdfs/2004/ne_gtr319.pdf
