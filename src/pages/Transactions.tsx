
import { TransactionList } from "@/components/TransactionList";
import { transactions } from "@/lib/mockData";

const Transactions = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <h1 className="text-2xl font-bold">Transaction History</h1>
      <TransactionList transactions={transactions} />
    </div>
  );
};

export default Transactions;
