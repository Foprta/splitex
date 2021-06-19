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
  @observable expensesSettings: IExpenseSettings[] = [];
  @observable expensesSettingsMap: Record<string, IExpenseSettings[]> = {};

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

          this.expensesSettings.forEach((e) =>
            this.expensesSettingsMap[e.expenseId]
              ? this.expensesSettingsMap[e.expenseId].push(e)
              : (this.expensesSettingsMap[e.expenseId] = [e])
          );
        } else {
          this.expensesSettings = [];
        }
      });
  };

  editExpenseSettings = (settings: Record<string, IExpenseSettings>, expenseId: string) => {
    const groupId = groupsStore.group.id;

    Object.entries(settings).forEach(([userId, setting]: any) => {
      firebase
        .firestore()
        .collection("groups")
        .doc(groupId)
        .collection("expensesSettings")
        .where("expenseId", "==", expenseId)
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
                .add({ ...setting, userId, expenseId });
            }
          }
        )
        .catch(console.error);
    });
  };
}

const expensesSettingsStore = new ExpensesSettingsStore();

export default expensesSettingsStore;
export { ExpensesSettingsStore };
