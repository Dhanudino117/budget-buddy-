
import { BalanceCard } from "@/components/BalanceCard";
import { ExpenditureChart } from "@/components/ExpenditureChart";
import { BudgetProgress } from "@/components/BudgetProgress";
import { TransactionList } from "@/components/TransactionList";
import { budgets, dailyExpenditures, transactions } from "@/lib/mockData";

const Index = () => {
  // Get only the most recent transactions
  const recentTransactions = [...transactions].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  ).slice(0, 5);

  // Get budgets that are near limit
  const criticalBudgets = budgets.filter(
    budget => (budget.spent / budget.allocated) * 100 >= 80
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-6">
        <BalanceCard />
        
        <ExpenditureChart data={dailyExpenditures} />
        
        <div>
          <h2 className="text-lg font-medium mb-4">Budget Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {criticalBudgets.length > 0 ? (
              criticalBudgets.map(budget => (
                <BudgetProgress key={budget.id} budget={budget} />
              ))
            ) : (
              <p className="text-muted-foreground col-span-full">No budgets near limit!</p>
            )}
          </div>
        </div>
        
        <TransactionList transactions={recentTransactions} />
      </div>
    </div>
  );
};

export default Index;
