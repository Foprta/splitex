import { IExpense, IUser } from "../../../lib/splitex";
import AddUser from "./AddUser";
import User from "./User";

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
          const userExpenses = expenses.filter(
            ({ userId }) => userId === user.id
          );

          return (
            <User
              key={user.id}
              user={user}
              groupId={groupId}
              expenses={userExpenses}
            />
          );
        })}
      </div>

      <AddUser groupId={groupId} users={users} />
    </div>
  );
}

export default Users;
