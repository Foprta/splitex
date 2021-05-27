import Store, { IFirestoreEntity } from "./_store";
import { action, makeObservable, observable } from "mobx";
import firebase from "firebase/app";

export interface IExpenseSettings extends IFirestoreEntity {
  expenseId: string;
  userId: string;
  proportion?: number;
  personal?: number;
}

class ExpensesSettingsStore extends Store {
  @observable expensesSettings: IExpenseSettings[] = [];

  private expensesSettingsUnsub = () => {};

  constructor() {
    super();
    makeObservable(this);
  }

  @action resetExpensesSettings(): void {
    this.expensesSettingsUnsub();
    this.expensesSettings = [];
  }

  @action expensesSettingsSub = (id: string): void => {
    this.expensesSettingsUnsub = firebase
      .firestore()
      .collection("groups")
      .doc(id)
      .collection("expensesSettings")
      .onSnapshot((snapshot) => {
        if (snapshot.docs.length) {
          this.expensesSettings = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as IExpenseSettings[];
        } else {
          this.expensesSettings = [];
        }
      });
  };

  editExpense = (groupId: string, expenseId: string, amount: number) =>
    firebase.firestore().collection("groups").doc(groupId).collection("expenses").doc(expenseId).update({ amount });

  deleteExpense = (groupId: string, expenseId: string) =>
    firebase.firestore().collection("groups").doc(groupId).collection("expenses").doc(expenseId).delete();
}

const expensesSettingsStore = new ExpensesSettingsStore();

export default expensesSettingsStore;
export { ExpensesSettingsStore };
