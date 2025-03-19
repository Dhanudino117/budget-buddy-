
export type Transaction = {
  id: string;
  date: string;
  amount: number;
  description: string;
  category: string;
  type: "expense" | "income";
  paymentMethod: "UPI" | "Card" | "ATM" | "Bank Transfer";
};

export type DailyExpenditure = {
  date: string;
  amount: number;
};

export type Budget = {
  id: string;
  category: string;
  allocated: number;
  spent: number;
};

// Mock transactions data
export const transactions: Transaction[] = [
  {
    id: "t1",
    date: "2023-05-01",
    amount: 120,
    description: "Groceries",
    category: "Food",
    type: "expense",
    paymentMethod: "UPI",
  },
  {
    id: "t2",
    date: "2023-05-02",
    amount: 45,
    description: "Uber Ride",
    category: "Transportation",
    type: "expense",
    paymentMethod: "UPI",
  },
  {
    id: "t3",
    date: "2023-05-02",
    amount: 500,
    description: "ATM Withdrawal",
    category: "Cash",
    type: "expense",
    paymentMethod: "ATM",
  },
  {
    id: "t4",
    date: "2023-05-03",
    amount: 3500,
    description: "Salary",
    category: "Income",
    type: "income",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "t5",
    date: "2023-05-04",
    amount: 250,
    description: "Restaurant",
    category: "Food",
    type: "expense",
    paymentMethod: "Card",
  },
  {
    id: "t6",
    date: "2023-05-05",
    amount: 100,
    description: "Phone Bill",
    category: "Utilities",
    type: "expense",
    paymentMethod: "UPI",
  },
  {
    id: "t7",
    date: "2023-05-05",
    amount: 1200,
    description: "Rent",
    category: "Housing",
    type: "expense",
    paymentMethod: "Bank Transfer",
  },
];

// Generate daily expenditure data for the last 7 days
const today = new Date();
export const dailyExpenditures: DailyExpenditure[] = Array.from({ length: 7 }, (_, i) => {
  const date = new Date();
  date.setDate(today.getDate() - (6 - i));
  return {
    date: date.toISOString().split("T")[0],
    amount: Math.floor(Math.random() * 1000) + 100,
  };
});

// Budget data
export const budgets: Budget[] = [
  {
    id: "b1",
    category: "Food",
    allocated: 5000,
    spent: 3200,
  },
  {
    id: "b2",
    category: "Transportation",
    allocated: 2000,
    spent: 1500,
  },
  {
    id: "b3",
    category: "Entertainment",
    allocated: 1500,
    spent: 1000,
  },
  {
    id: "b4",
    category: "Shopping",
    allocated: 3000,
    spent: 2800,
  },
];

// Account balance
export const accountBalance = 25750;
