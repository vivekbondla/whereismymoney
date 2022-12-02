import React from "react";
import "./ExpenseChart.css";
import { Pie, PieChart, Cell, Legend, Tooltip } from "recharts";

const ExpenseChart = (props) => {
  console.log(props);
  const COLORS = [
    "#8884d8",
    "#82ca9d",
    "#FFBB28",
    "#FF8042",
    "#AF19FF",
    "#FF0000",
  ];
  const pieData = [
    {
      category: "Home",
      expense: props.homeValue,
    },
    {
      category: "Food",
      expense: props.foodValue,
    },
    {
      category: "Shopping",
      expense: props.shoppingValue,
    },
    {
      category: "Investments",
      expense: props.investmentValue,
    },
    {
      category: "Beverages",
      expense: props.beveragesValue,
    },
    {
      category: "Others",
      expense: props.othersValue,
    },
  ];

  return (
    <div className="chart">
      <p> Graphical representation of Total Expenses in this month</p>

      <PieChart width={400} height={350}>
        <Pie
          data={pieData}
          dataKey="expense"
          nameKey="category"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend
          layout="vertical"
          verticalAlign="bottom"
          align="center"
          payload={pieData.map((item, index) => ({
            id: item.category,
            type: "circle",
            value: `${item.category} (${item.expense}) `,
            color: COLORS[index % COLORS.length],
          }))}
        />
      </PieChart>
    </div>
  );
};
export default ExpenseChart;
