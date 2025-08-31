export default function TradingReturnsTable({ metrics }) {
  if (!metrics) return null;

  const keys = [
    "YTD",
    "1D",
    "1W",
    "1M",
    "3M",
    "6M",
    "1Y",
    "3Y",
    "SI",
    "DD",
    "MAXDD",
  ];

  return (
    <div className="bg-white shadow rounded p-4">
      <h3 className="text-lg font-semibold mb-4">Trading Returns</h3>
      <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-11 gap-4">
        {keys.map((k) => (
          <div
            key={k}
            className="flex flex-col items-center bg-gray-100 p-3 rounded shadow-sm"
          >
            <span className="font-semibold">{k}</span>
            <span
              className={`${
                metrics[k] >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {metrics[k].toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
