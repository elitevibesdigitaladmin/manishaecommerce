import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Plants", value: 400 },
  { name: "Pots", value: 300 },
  { name: "Terrarium", value: 200 },
//   { name: "Accessories", value: 100 },
];

const COLORS = ["#2e7d32", "#66bb6a", "#a5d6a7"];

const SalesPieChart = () => (
  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        outerRadius={90}
        dataKey="value"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  </ResponsiveContainer>
);

export default SalesPieChart;
