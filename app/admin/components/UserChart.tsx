"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// داتا وهمية، رح تربطها لاحقاً بـ API
const data = [
  { month: "يناير", users: 20 },
  { month: "فبراير", users: 35 },
  { month: "مارس", users: 50 },
  { month: "أبريل", users: 40 },
  { month: "مايو", users: 60 },
  { month: "يونيو", users: 70 },
];

export default function UserChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="users"
          stroke="#00bcd4"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
