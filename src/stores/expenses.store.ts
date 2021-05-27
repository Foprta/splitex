import Store from "./_store";
import { action, makeObservable, observable } from "mobx";
import { IExpense } from "../lib/splitex";
import firebase from "firebase/app";

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
}

const expensesStore = new ExpensesStore();

export default expensesStore;
export { ExpensesStore };
