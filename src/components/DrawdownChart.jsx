import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function DrawdownChart({ data }) {
  return (
    <div className="bg-white shadow-xl hover:shadow-2xl py-10 px-4 rounded-xl w-full h-[400px] transition-shadow duration-200">
      <h3 className="text-lg font-semibold mb-3">Drawdown</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          {/* ✅ Only horizontal grid lines */}
          <CartesianGrid strokeDasharray="3 3" vertical={false} />

          <XAxis
            dataKey="Date"
            tickFormatter={(str) => str.slice(0, 7)} // show YYYY-MM
            interval="preserveStartEnd"
            minTickGap={50}
          />

          <YAxis />
          <Tooltip />

          {/* ✅ Red drawdown line */}
          <Line
            type="monotone"
            dataKey="Drawdown"
            stroke="#dc2626" // Tailwind's red-600
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
