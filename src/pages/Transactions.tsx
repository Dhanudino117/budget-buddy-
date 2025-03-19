
import { useState } from "react";
import { TransactionList } from "@/components/TransactionList";
import { transactions } from "@/lib/mockData";
import { Filter } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const Transactions = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredTransactions = transactions.filter((transaction) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "upi") return transaction.paymentMethod === "UPI";
    if (activeFilter === "direct") return transaction.paymentMethod === "Card" || transaction.paymentMethod === "ATM";
    return true;
  });

  const filterButtons = [
    { id: "all", label: "All" },
    { id: "upi", label: "UPI" },
    { id: "direct", label: "Card/ATM" },
  ];

  return (
    <div className="space-y-4 animate-fadeIn">
      <h1 className="text-xl font-bold">Transaction History</h1>
      
      {/* Transaction Filters - Mobile Drawer */}
      <Drawer>
        <DrawerTrigger className="w-full glass-card p-3 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">
              Filter: {activeFilter === "all" ? "All" : activeFilter === "upi" ? "UPI" : "Card/ATM"}
            </span>
          </div>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="text-center">Filter Transactions</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-6 space-y-2">
            {filterButtons.map((button) => (
              <button
                key={button.id}
                onClick={() => setActiveFilter(button.id)}
                className={`w-full py-3 rounded-md text-sm ${
                  activeFilter === button.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary hover:bg-secondary/80"
                }`}
              >
                {button.label}
              </button>
            ))}
          </div>
        </DrawerContent>
      </Drawer>
      
      <TransactionList transactions={filteredTransactions} />
    </div>
  );
};

export default Transactions;
