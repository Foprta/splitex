import Store, { IFirestoreEntity } from "./_store";
import { action, makeObservable, observable } from "mobx";
import firebase from "firebase/app";
import { ExpenseType } from "../models/enums";

export interface IExpense extends IFirestoreEntity {
  userId: string;
  amount: number;
}

class ExpensesStore extends Store {
  @observable expenses: IExpense[] = [];

  private expensesUnsub = () => {};

  constructor() {
    super();
    makeObservable(this);
  }

  @action resetExpenses(): void {
    this.expensesUnsub();
    this.expenses = [];
  }

  @action expensesListener = (id: string): void => {
    this.expensesUnsub = firebase
      .firestore()
      .collection("groups")
      .doc(id)
      .collection("expenses")
      .onSnapshot((snapshot) => {
        if (snapshot.docs.length) {
          this.expenses = snapshot.docs.map((doc) => ({
            id: doc.id,
            ref: doc.ref,
            ...doc.data(),
          })) as IExpense[];
        } else {
          this.expenses = [];
        }
      });
  };

  addExpense = (groupId: string, amount: number, userId: string) =>
    firebase.firestore().collection("groups").doc(groupId).collection(ExpenseType.EXPENSE).add({ amount, userId });

  editExpense = (groupId: string, expenseId: string, amount: number) =>
    firebase
      .firestore()
      .collection("groups")
      .doc(groupId)
      .collection(ExpenseType.EXPENSE)
      .doc(expenseId)
      .update({ amount });
}

const expensesStore = new ExpensesStore();

export default expensesStore;
export { ExpensesStore };
