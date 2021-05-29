import { inject, observer } from "mobx-react";
import React from "react";
import { IUser, UsersStore } from "../../stores/users.store";
import { GroupsStore } from "../../stores/groups.store";
import { Dialog, RadioGroup } from "@headlessui/react";
import UserName from "../UI/UserName";
import AddExpense from "../Expenses/AddExpense";
import AddTransaction from "../Transactions/AddTransaction";
import firebase from "firebase/app";
import Button from "../UI/Button";

interface Props {
  usersStore?: UsersStore;
  groupsStore?: GroupsStore;
  user: IUser;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

interface State {
  expenseType: "expense" | "transaction";
  amount: number;
  toUser: IUser;
}

@inject("usersStore", "groupsStore")
@observer
class NewExpenseModal extends React.Component<Props, State> {
  filteredUsers: IUser[];

  constructor(props) {
    super(props);

    this.state = {
      expenseType: "expense",
      amount: undefined,
      toUser: {} as IUser,
    };
  }

  private addNewExpense = () => {
    const { groupsStore, user, setIsOpen } = this.props;
    const { amount, expenseType, toUser } = this.state;

    if (expenseType === "expense") {
      firebase
        .firestore()
        .collection("groups")
        .doc(groupsStore.group.id)
        .collection("expenses")
        .add({ amount, userId: user.id })
        .then(() => setIsOpen(false))
        .catch(console.error);
    } else {
      firebase
        .firestore()
        .collection("groups")
        .doc(groupsStore.group.id)
        .collection("manualTransactions")
        .add({ amount, fromUserId: user.id, toUserId: toUser.id })
        .then(() => setIsOpen(false))
        .catch(console.error);
    }
  };

  render() {
    const { isOpen, setIsOpen, user, usersStore } = this.props;
    const { amount, toUser } = this.state;

    const options = [
      { value: "expense", title: "Покупка" },
      { value: "transaction", title: "Перевод" },
    ];

    return (
      <Dialog className="dialog" open={isOpen} onClose={() => setIsOpen(false)}>
        <Dialog.Overlay className="dialog-overlay" />

        <div className="dialog-content flex flex-col w-200 ">
          <Dialog.Title className="text-center">
            Добавить трату для <UserName userName={user.name} />
          </Dialog.Title>

          <RadioGroup
            className="flex"
            value={this.state.expenseType}
            onChange={(expenseType) => this.setState({ expenseType })}
          >
            {options.map(({ value, title }) => (
              <RadioGroup.Option
                key={value}
                className={({ checked }) =>
                  "duration-75 p-1.5 flex-grow text-center  " + (checked ? "bg-green-300" : "bg-gray-100")
                }
                value={value}
              >
                {title}
              </RadioGroup.Option>
            ))}
          </RadioGroup>

          <div className="w-full">
            {this.state.expenseType === "expense" ? (
              <AddExpense amount={amount} setAmount={(amount) => this.setState({ amount })} />
            ) : (
              <AddTransaction
                users={usersStore.users.filter(({ id }) => id !== user.id)}
                amount={amount}
                setAmount={(amount) => this.setState({ amount })}
                toUser={toUser}
                setToUser={(toUser) => this.setState({ toUser })}
              />
            )}
          </div>

          <div className="float-right">
            <Button className="mr-2" onClick={() => setIsOpen(false)}>
              Отмена
            </Button>
            <Button className="bg-green-400" onClick={this.addNewExpense}>
              Сохранить
            </Button>
          </div>
        </div>
      </Dialog>
    );
  }
}

export default NewExpenseModal;
