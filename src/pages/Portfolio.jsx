import React, { useEffect, useState } from "react";
import { parseExcel, calculateMetrics } from "../utils/portfolioMetrics";
import TradingReturnTable from "../components/TradingReturnTable";
import EquityCurveChart from "../components/EquityCurveChart";
import DrawdownChart from "../components/DrawdownChart";
import Layout from "../components/Layout";

export default function Portfolio() {
  const [equityCurve, setEquityCurve] = useState([]);
  const [drawdown, setDrawdown] = useState([]);
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    const fetchExcel = async () => {
      const response = await fetch("/portfolio_nav.xlsx");
      const arrayBuffer = await response.arrayBuffer();
      const parsed = parseExcel(arrayBuffer);

      // Equity curve
      setEquityCurve(
        parsed.map((d) => ({
          Date: d.date.toISOString().split("T")[0],
          Equity: d.nav,
        }))
      );

      // Drawdown
      let peak = -Infinity;
      const dd = parsed.map((d) => {
        peak = Math.max(peak, d.nav);
        const draw = ((d.nav - peak) / peak) * 100;
        return { Date: d.date.toISOString().split("T")[0], Drawdown: draw };
      });
      setDrawdown(dd);

      // Metrics
      setMetrics(calculateMetrics(parsed));
    };

    fetchExcel();
  }, []);

  return (
    <Layout>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6 my-6 ">Portfolio Statistics</h2>

        {/* Performance Metrics */}
        {metrics && (
          <div className="mb-8">
            <TradingReturnTable metrics={metrics} />
          </div>
        )}

        {/* Charts */}
        <div className="grid sm:grid-cols-1 gap-6">
          {equityCurve.length > 0 && <EquityCurveChart data={equityCurve} />}
          {drawdown.length > 0 && <DrawdownChart data={drawdown} />}
        </div>
      </div>
    </Layout>
  );
}
