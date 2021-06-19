import Expense from "./Expense";
import expensesStore from "../../stores/expenses.store";

function ExpensesList() {
  return (
    <>
      {expensesStore.expenses.map((expense) => {
        return <Expense key={expense.id} expense={expense} />;
      })}
    </>
  );
}

export default ExpensesList;
