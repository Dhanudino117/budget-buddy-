
import { useState } from "react";
import { Transaction } from "@/lib/mockData";
import { ArrowUpRight, ArrowDownRight, CreditCard, Wallet, CircleDollarSign, Search } from "lucide-react";

interface TransactionListProps {
  transactions: Transaction[];
}

type FilterType = "Overall" | "UPI" | "Direct";

export function TransactionList({ transactions }: TransactionListProps) {
  const [filter, setFilter] = useState<FilterType>("Overall");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTransactions = transactions
    .filter((transaction) => {
      if (filter === "Overall") return true;
      if (filter === "UPI") return transaction.paymentMethod === "UPI";
      if (filter === "Direct") 
        return transaction.paymentMethod === "Card" || transaction.paymentMethod === "ATM";
      return true;
    })
    .filter((transaction) => 
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <div className="p-6">
        <h2 className="text-lg font-medium mb-4">Transactions</h2>
        
        <div className="mb-4 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-input bg-background pl-10 pr-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {["Overall", "UPI", "Direct"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type as FilterType)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                filter === type
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary hover:bg-secondary/80"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        
        <div className="space-y-4 mt-4">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between rounded-lg transition-colors hover:bg-secondary/40 p-3">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    transaction.type === "expense" ? "bg-red-100 dark:bg-red-900/20" : "bg-green-100 dark:bg-green-900/20"
                  }`}>
                    {transaction.paymentMethod === "UPI" ? (
                      <Wallet className={`h-5 w-5 ${
                        transaction.type === "expense" ? "text-red-500" : "text-green-500"
                      }`} />
                    ) : transaction.paymentMethod === "Card" || transaction.paymentMethod === "ATM" ? (
                      <CreditCard className={`h-5 w-5 ${
                        transaction.type === "expense" ? "text-red-500" : "text-green-500"
                      }`} />
                    ) : (
                      <CircleDollarSign className={`h-5 w-5 ${
                        transaction.type === "expense" ? "text-red-500" : "text-green-500"
                      }`} />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-xs text-muted-foreground">{transaction.category} • {transaction.paymentMethod}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    {transaction.type === "expense" ? (
                      <ArrowUpRight className="h-4 w-4 text-red-500" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-green-500" />
                    )}
                    <p className={`font-medium ${
                      transaction.type === "expense" ? "text-red-500" : "text-green-500"
                    }`}>
                      {transaction.type === "expense" ? "-" : "+"}₹{transaction.amount}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">{new Date(transaction.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No transactions found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
