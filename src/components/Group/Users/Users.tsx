import AddUser from "./AddUser";
import User from "./User";
import { IUser } from "../../../stores/users.store";
import { IExpense } from "../../../stores/expenses.store";

interface Props {
  users: IUser[];
  groupId: string;
  expenses: IExpense[];
}

function Users({ users, groupId, expenses }: Props) {
  return (
    <div>
      <div className="divide-y-1 divide-black">
        {users.map((user) => {
          const userExpenses = expenses.filter(({ userId }) => userId === user.id);

          return <User key={user.id} user={user} groupId={groupId} expenses={userExpenses} users={users} />;
        })}
      </div>

      <AddUser groupId={groupId} users={users} />
    </div>
  );
}

export default Users;
