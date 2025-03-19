
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
    <div className="space-y-6 animate-fadeIn">
      <h1 className="text-2xl font-bold">Budget Management</h1>
      
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <PiggyBank className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-medium">Monthly Budget</h2>
              <p className="text-sm text-muted-foreground">May 2023</p>
            </div>
          </div>
          <button className="flex items-center gap-1 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
            <Plus className="h-4 w-4" />
            <span>Add Budget</span>
          </button>
        </div>
        
        {(hasOverBudget || hasNearBudget) && (
          <div className={`p-4 rounded-lg mb-6 flex items-start gap-3 ${
            hasOverBudget ? "bg-destructive/10" : "bg-amber-500/10"
          }`}>
            <AlertTriangle className={`h-5 w-5 mt-0.5 ${
              hasOverBudget ? "text-destructive" : "text-amber-500"
            }`} />
            <div>
              <p className="font-medium">
                {hasOverBudget 
                  ? "You've exceeded budget in some categories!"
                  : "You're getting close to your budget limit!"}
              </p>
              <p className="text-sm text-muted-foreground">
                Consider adjusting your spending for the rest of the month.
              </p>
            </div>
          </div>
        )}
        
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <h3 className="font-medium">Total Budget</h3>
            <span className={`text-sm font-medium ${
              totalPercentage >= 100 ? 'text-destructive' : 
              totalPercentage >= 80 ? 'text-amber-500' : 
              'text-green-500'
            }`}>
              {totalPercentage}%
            </span>
          </div>
          
          <div className="mb-2 flex items-end justify-between text-sm">
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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {budgets.map((budget) => (
            <BudgetProgress key={budget.id} budget={budget} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Budget;
