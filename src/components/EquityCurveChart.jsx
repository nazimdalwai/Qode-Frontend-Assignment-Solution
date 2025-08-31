import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function EquityCurveChart({ data }) {
  return (
    <div className="bg-white shadow-xl hover:shadow-2xl py-10 px-4 rounded-xl w-full h-[400px] transition-shadow">
      <h3 className="text-lg font-semibold mb-3">Equity Curve</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="Date"
            tickFormatter={(str) => str.slice(0, 7)}
            interval="preserveStartEnd"
            minTickGap={50}
          />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="Equity"
            stroke="#16a34a"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
