import Store, { IFirestoreEntity } from "./_store";
import { action, makeObservable, observable } from "mobx";
import firebase from "firebase/app";
import groupsStore from "./groups.store";

export interface IExpenseSettings extends IFirestoreEntity {
  expenseId: string;
  userId: string;
  proportion?: number;
  personal?: number;
}

class ExpensesSettingsStore extends Store {
  @observable expensesSettings: IExpenseSettings[] | undefined;
  @observable expensesSettingsMap: Record<string, IExpenseSettings[]> = {};

  private expensesSettingsUnsub = () => {};

  constructor() {
    super();
    makeObservable(this);
  }

  @action resetExpensesSettings(): void {
    this.expensesSettingsUnsub();
    this.expensesSettings = [];
    this.expensesSettingsMap = {};
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
            ref: doc.ref,
            ...doc.data(),
          })) as IExpenseSettings[];

          this.expensesSettings.forEach((e) =>
            this.expensesSettingsMap[e.expenseId]
              ? this.expensesSettingsMap[e.expenseId].push(e)
              : (this.expensesSettingsMap[e.expenseId] = [e])
          );
        } else {
          this.expensesSettings = [];
          this.expensesSettingsMap = {};
        }
      });
  };

  editExpenseSettings = (settings: Record<string, IExpenseSettings>, expenseId: string) => {
    const groupId = groupsStore.group.id;

    const batch = firebase.firestore().batch();

    Object.values(settings).forEach((s) => {
      if (s.id == null) {
        const newDoc = firebase.firestore().collection("groups").doc(groupId).collection("expensesSettings").doc();
        batch.set(newDoc, { ...s, expenseId });
      } else {
        batch.update(s.ref, s);
      }
    });

    return batch;
  };
}

const expensesSettingsStore = new ExpensesSettingsStore();

export default expensesSettingsStore;
export { ExpensesSettingsStore };
