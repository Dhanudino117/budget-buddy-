
import { useState } from "react";
import { TransactionList } from "@/components/TransactionList";
import { transactions } from "@/lib/mockData";
import { Filter } from "lucide-react";

const Transactions = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredTransactions = transactions.filter((transaction) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "upi") return transaction.method === "UPI";
    if (activeFilter === "direct") return transaction.method === "Card" || transaction.method === "ATM";
    return true;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      <h1 className="text-2xl font-bold">Transaction History</h1>
      
      {/* Transaction Filters */}
      <div className="glass-card p-4 rounded-lg">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Filter Transactions</span>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-4 py-2 rounded-md text-sm ${
              activeFilter === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary hover:bg-secondary/80"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveFilter("upi")}
            className={`px-4 py-2 rounded-md text-sm ${
              activeFilter === "upi"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary hover:bg-secondary/80"
            }`}
          >
            UPI
          </button>
          <button
            onClick={() => setActiveFilter("direct")}
            className={`px-4 py-2 rounded-md text-sm ${
              activeFilter === "direct"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary hover:bg-secondary/80"
            }`}
          >
            Card/ATM
          </button>
        </div>
      </div>
      
      <TransactionList transactions={filteredTransactions} />
    </div>
  );
};

export default Transactions;
