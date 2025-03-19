
import { Budget } from "@/lib/mockData";

interface BudgetProgressProps {
  budget: Budget;
}

export function BudgetProgress({ budget }: BudgetProgressProps) {
  const percentage = Math.min(100, Math.round((budget.spent / budget.allocated) * 100));
  const isNearLimit = percentage >= 80;
  const isOverLimit = percentage >= 100;

  return (
    <div className="glass-card rounded-lg p-4">
      <div className="flex justify-between mb-2">
        <h3 className="font-medium">{budget.category}</h3>
        <span className={`text-sm font-medium ${isOverLimit ? 'text-destructive' : isNearLimit ? 'text-amber-500' : 'text-green-500'}`}>
          {percentage}%
        </span>
      </div>
      
      <div className="mb-2 flex items-end justify-between text-sm">
        <span>₹{budget.spent.toLocaleString()}</span>
        <span className="text-muted-foreground">of ₹{budget.allocated.toLocaleString()}</span>
      </div>
      
      <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className={`h-full rounded-full transition-all duration-500 ease-in-out ${
            isOverLimit
              ? "bg-destructive"
              : isNearLimit
              ? "bg-amber-500"
              : "bg-green-500"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
