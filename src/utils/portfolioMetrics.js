import * as XLSX from "xlsx";

export function parseExcel(arrayBuffer) {
  const workbook = XLSX.read(arrayBuffer, { type: "array" });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];

  const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

  // Find the header row dynamically
  const headerIndex = rows.findIndex(
    (r) => r.includes("NAV Date") && r.includes("NAV (Rs)")
  );
  const headers = rows[headerIndex];
  const dataRows = rows.slice(headerIndex + 1);

  const jsonData = dataRows.map((row) => {
    const rowObj = {};
    headers.forEach((h, i) => {
      rowObj[h] = row[i];
    });
    return rowObj;
  });

  const parsed = jsonData
    .map((row) => {
      let rawDate = row["NAV Date"];
      let nav = parseFloat(row["NAV (Rs)"]);

      if (typeof rawDate === "number") {
        const excelDate = XLSX.SSF.parse_date_code(rawDate);
        rawDate = new Date(excelDate.y, excelDate.m - 1, excelDate.d);
      } else {
        rawDate = new Date(rawDate);
      }

      if (isNaN(nav) || isNaN(rawDate.getTime())) return null;
      return { date: rawDate, nav };
    })
    .filter(Boolean);
  return parsed;
}

// utils/portfolioMetrics.js
export function calculateMetrics(data) {
  if (!data || data.length === 0) return {};

  // sort ascending by date
  data = data.sort((a, b) => a.date - b.date);

  const latest = data[data.length - 1];
  const start = data[0];

  // helper to find return since nearest past NAV
  const findReturn = (days) => {
    const targetDate = new Date(latest.date);
    targetDate.setDate(targetDate.getDate() - days);

    // find nearest past NAV (not just exact match)
    let past = null;
    for (let i = data.length - 1; i >= 0; i--) {
      if (data[i].date <= targetDate) {
        past = data[i];
        break;
      }
    }

    if (!past) return 0;
    return ((latest.nav - past.nav) / past.nav) * 100;
  };

  // YTD = since first NAV of this year
  const ytdStart = data.find(
    (d) => d.date.getFullYear() === latest.date.getFullYear()
  );
  const ytd =
    ytdStart && ytdStart.nav
      ? ((latest.nav - ytdStart.nav) / ytdStart.nav) * 100
      : 0;

  // max drawdown calculation
  let peak = -Infinity;
  let maxDD = 0;
  data.forEach((d) => {
    peak = Math.max(peak, d.nav);
    const dd = ((d.nav - peak) / peak) * 100;
    maxDD = Math.min(maxDD, dd);
  });

  return {
    YTD: ytd,
    "1D": findReturn(1),
    "1W": findReturn(7),
    "1M": findReturn(30),
    "3M": findReturn(90),
    "6M": findReturn(180),
    "1Y": findReturn(365),
    "3Y": findReturn(365 * 3),
    SI: ((latest.nav - start.nav) / start.nav) * 100,
    DD: ((latest.nav - peak) / peak) * 100,
    MAXDD: maxDD,
  };
}
