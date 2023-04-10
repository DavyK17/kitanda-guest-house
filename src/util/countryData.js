// Import country data
import iso3311a2 from "iso-3166-1-alpha-2";
const data = iso3311a2.getData();

// Repackage data as array
const countryData = [];
for (const code in data) countryData.push({ code, name: data[code] });

// Export
export default countryData;