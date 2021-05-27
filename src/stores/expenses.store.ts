import Store, { IFirestoreEntity } from "./_store";
import { action, makeObservable, observable } from "mobx";
import firebase from "firebase/app";

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

  @action expensesSub = (id: string): void => {
    this.expensesUnsub = firebase
      .firestore()
      .collection("groups")
      .doc(id)
      .collection("expenses")
      .onSnapshot((snapshot) => {
        if (snapshot.docs.length) {
          this.expenses = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as IExpense[];
        } else {
          this.expenses = [];
        }
      });
  };

  editExpense = (groupId: string, expenseId: string, amount: number) =>
    firebase.firestore().collection("groups").doc(groupId).collection("expenses").doc(expenseId).update({ amount });

  deleteExpense = (groupId: string, expenseId: string) =>
    firebase.firestore().collection("groups").doc(groupId).collection("expenses").doc(expenseId).delete();
}

const expensesStore = new ExpensesStore();

export default expensesStore;
export { ExpensesStore };
