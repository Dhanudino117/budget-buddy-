
import { PiggyBank, Plus, AlertTriangle } from "lucide-react";
import { BudgetProgress } from "@/components/BudgetProgress";
import { budgets } from "@/lib/mockData";

const Budget = () => {
  // Calculate total budget
  const totalAllocated = budgets.reduce((sum, budget) => sum + budget.allocated, 0);
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);
  const totalPercentage = Math.round((totalSpent / totalAllocated) * 100);

  // Check if any budget is over or near limit
  const hasOverBudget = budgets.some(budget => (budget.spent / budget.allocated) * 100 >= 100);
  const hasNearBudget = budgets.some(
    budget => (budget.spent / budget.allocated) * 100 >= 80 && (budget.spent / budget.allocated) * 100 < 100
  );

  return (
    <div className="space-y-4 animate-fadeIn">
      <h1 className="text-xl font-bold">Budget Management</h1>
      
      <div className="glass-card rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <PiggyBank className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-base font-medium">Monthly Budget</h2>
              <p className="text-xs text-muted-foreground">May 2023</p>
            </div>
          </div>
          <button className="flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground">
            <Plus className="h-3.5 w-3.5" />
            <span>Add</span>
          </button>
        </div>
        
        {(hasOverBudget || hasNearBudget) && (
          <div className={`p-3 rounded-lg mb-4 flex items-start gap-2 ${
            hasOverBudget ? "bg-destructive/10" : "bg-amber-500/10"
          }`}>
            <AlertTriangle className={`h-4 w-4 mt-0.5 ${
              hasOverBudget ? "text-destructive" : "text-amber-500"
            }`} />
            <div>
              <p className="text-sm font-medium">
                {hasOverBudget 
                  ? "Budget exceeded in some categories!"
                  : "Getting close to budget limit!"}
              </p>
              <p className="text-xs text-muted-foreground">
                Adjust spending for this month.
              </p>
            </div>
          </div>
        )}
        
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <h3 className="text-sm font-medium">Total Budget</h3>
            <span className={`text-xs font-medium ${
              totalPercentage >= 100 ? 'text-destructive' : 
              totalPercentage >= 80 ? 'text-amber-500' : 
              'text-green-500'
            }`}>
              {totalPercentage}%
            </span>
          </div>
          
          <div className="mb-2 flex items-end justify-between text-xs">
            <span>₹{totalSpent.toLocaleString()}</span>
            <span className="text-muted-foreground">of ₹{totalAllocated.toLocaleString()}</span>
          </div>
          
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className={`h-full rounded-full transition-all duration-500 ease-in-out ${
                totalPercentage >= 100
                  ? "bg-destructive"
                  : totalPercentage >= 80
                  ? "bg-amber-500"
                  : "bg-green-500"
              }`}
              style={{ width: `${Math.min(100, totalPercentage)}%` }}
            />
          </div>
        </div>
        
        <div className="space-y-3">
          {budgets.map((budget) => (
            <BudgetProgress key={budget.id} budget={budget} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Budget;
