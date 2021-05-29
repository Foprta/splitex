import Money from "../UI/Money";
import { useState } from "react";
import EditExpense from "./EditExpense";
import expensesStore, { IExpense } from "../../stores/expenses.store";
import { IUser } from "../../stores/users.store";
import firebase from "../../config/firebase.config";
import { IExpenseSettings } from "../../stores/expenses-settings.store";
import UserName from "../UI/UserName";

interface Props {
  groupId: string;
  expense: IExpense;
  userName: string;
  users: IUser[];
  expenseSettings: IExpenseSettings[];
}

function Expense({ groupId, expense, userName, users, expenseSettings }: Props) {
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const mappedExpenseSettings = {};
  expenseSettings.forEach(
    ({ userId, proportion, personal }) => (mappedExpenseSettings[userId] = { proportion, personal })
  );

  const editExpense = (amount, expensesSettings) => {
    Object.entries(expensesSettings).forEach(([userId, setting]: any) => {
      firebase
        .firestore()
        .collection("groups")
        .doc(groupId)
        .collection("expensesSettings")
        .where("expenseId", "==", expense.id)
        .where("userId", "==", userId)
        .get()
        .then(
          ({ docs }): Promise<any> => {
            if (docs.length) {
              return docs[0].ref.set(setting, { merge: true });
            } else {
              return firebase
                .firestore()
                .collection("groups")
                .doc(groupId)
                .collection("expensesSettings")
                .add({ ...setting, userId, expenseId: expense.id });
            }
          }
        )
        .catch(console.error);
    });

    expensesStore
      .editExpense(groupId, expense.id, amount)
      .then(() => setIsEditorOpen(false))
      .catch(console.error);
  };

  const deleteExpense = () => expensesStore.deleteExpense(groupId, expense.id).catch(console.error);

  return (
    <div className="flex justify-between items-center py-1.5">
      <UserName userName={userName} />

      <button className="clickable text-red-600" onClick={() => setIsEditorOpen(true)}>
        <Money amount={expense.amount} />
      </button>

      {isEditorOpen && (
        <EditExpense
          users={users}
          expense={expense}
          setIsOpen={setIsEditorOpen}
          userName={userName}
          mappedExpenseSettings={mappedExpenseSettings}
          onRemove={deleteExpense}
          onEdit={editExpense}
        />
      )}
    </div>
  );
}

export default Expense;
