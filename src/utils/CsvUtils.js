import papa from 'papaparse';

export async function processCsv(dataPath) {
  const response = await fetch(dataPath);
  const csvText = await response.text();

  const { data } = papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
  });

  return data;
}

export async function extractFilters(data) {
  const regionSet = new Set();
  const ageSet = new Set();
  const typeSet = new Set();
  data.forEach(row => {
    if (row["Region"]) {
      row["Region"].split(',').map(t => t.trim()).forEach(t => regionSet.add(t));
    }
    if (row["Age Eligibility"]) ageSet.add(row["Age Eligibility"]);
    if (row["Type of Funding"]) {
      row["Type of Funding"].split(',').map(t => t.trim()).forEach(t => typeSet.add(t));
    }});
  return {
    regions: Array.from(regionSet),
    ages: Array.from(ageSet),
    types: Array.from(typeSet)
  };
  
}