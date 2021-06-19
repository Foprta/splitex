import ExpensesList from "./ExpensesList";
import TransactionsList from "./TransactionsList";

function Expenses() {
  return (
    <div className="flex flex-col divide-y-[1px] divide-gray-300">
      <ExpensesList />
      <TransactionsList />
    </div>
  );
}

export default Expenses;
