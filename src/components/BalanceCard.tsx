
import { accountBalance } from "@/lib/mockData";
import { Wallet } from "lucide-react";

export function BalanceCard() {
  return (
    <div className="glass-card w-full overflow-hidden rounded-xl">
      <div className="p-6">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-lg font-medium text-muted-foreground">Current Balance</h2>
          <Wallet className="h-5 w-5 text-primary" />
        </div>
        <div className="flex items-baseline">
          <span className="text-3xl font-bold">₹{accountBalance.toLocaleString()}</span>
          <span className="ml-2 text-sm text-muted-foreground">.00</span>
        </div>
        <div className="mt-2 text-xs text-muted-foreground">
          Updated on {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
