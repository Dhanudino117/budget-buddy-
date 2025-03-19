
import { useEffect, useState } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, PieChart, Pie, Cell, Legend } from "recharts";
import { DailyExpenditure, transactions } from "@/lib/mockData";

type CategoryData = {
  name: string;
  value: number;
  color: string;
};

const COLORS = [
  "#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A259FF",
  "#4CAF50", "#F44336", "#2196F3", "#FF5722", "#9C27B0"
];

const Expenditure = () => {
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);

  useEffect(() => {
    // Process transactions to get category data
    const categories = new Map<string, number>();
    
    transactions
      .filter(t => t.type === "expense")
      .forEach(transaction => {
        const current = categories.get(transaction.category) || 0;
        categories.set(transaction.category, current + transaction.amount);
      });
    
    const categoryArray: CategoryData[] = Array.from(categories.entries())
      .map(([name, value], index) => ({
        name,
        value,
        color: COLORS[index % COLORS.length]
      }))
      .sort((a, b) => b.value - a.value);
    
    setCategoryData(categoryArray);
  }, []);

  // Generate last 30 days of spending data
  const generateDailyData = (): DailyExpenditure[] => {
    const today = new Date();
    return Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(today.getDate() - (29 - i));
      return {
        date: date.toISOString().split("T")[0],
        amount: Math.floor(Math.random() * 1000) + 100,
      };
    });
  };

  const dailyData = generateDailyData();
  const formattedData = dailyData.map((item) => ({
    ...item,
    formattedDate: new Date(item.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
  }));

  return (
    <div className="space-y-6 animate-fadeIn">
      <h1 className="text-2xl font-bold">Expenditure Analysis</h1>
      
      <div className="grid gap-6 grid-cols-1">
        <div className="glass-card rounded-xl p-6">
          <h2 className="text-lg font-medium mb-4">Monthly Expenditure Trend</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={formattedData}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="monthlyGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="formattedDate"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                  interval="preserveStartEnd"
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `₹${value}`}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "var(--radius)",
                    border: "1px solid hsl(var(--border))",
                    backgroundColor: "hsl(var(--card))",
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                  }}
                  formatter={(value) => [`₹${value}`, "Amount"]}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#monthlyGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="glass-card rounded-xl p-6">
          <h2 className="text-lg font-medium mb-4">Expenditure by Category</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`₹${value}`, "Amount"]}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expenditure;
