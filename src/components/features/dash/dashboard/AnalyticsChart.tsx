import { AreaChart, Tooltip, Area, XAxis } from "recharts";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const data = months.map((month) => ({
  name: month,
  uv: Math.floor(Math.random() * 5000),
  pv: Math.floor(Math.random() * 5000),
  amt: Math.floor(Math.random() * 5000),
}));

const AnalyticsChart = () => {
  return (
    <AreaChart
      style={{
        width: "100%",
        height: "100%",
        aspectRatio: 1.618,
      }}
      responsive
      data={data}
      margin={{ top: 0, right: 0, left: 10, bottom: 0 }}
    >
      {/* Define gradients here */}
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#d4af37" stopOpacity={0.2} />
          <stop offset="95%" stopColor="#d4af37" stopOpacity={0} />
        </linearGradient>

        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.2} />
          <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
        </linearGradient>
      </defs>

      <Tooltip />

      {/* ✅ Short month names on X-axis */}
      <XAxis
        dataKey="name"
        tickFormatter={(month) => month.slice(0, 3)} // "January" -> "Jan"
        tickLine={false}
        axisLine={false}
        style={{ fontSize: 11, fill: "#aaa" }}
      />

      {/* Use the gradients here */}
      <Area
        type="monotone"
        dataKey="uv"
        stackId="1"
        stroke="#d4af37"
        fill="url(#colorUv)"
      />
      <Area
        type="monotone"
        dataKey="pv"
        stackId="1"
        stroke="#82ca9d"
        fill="url(#colorPv)"
      />
    </AreaChart>
  );
};

export default AnalyticsChart;
