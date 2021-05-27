import Store from "./_store";
import { action, makeObservable, observable } from "mobx";
import { IManualTransaction } from "../lib/splitex";
import firebase from "firebase/app";

class ManualTransactionsStore extends Store {
  @observable manualTransactions: IManualTransaction[] = [];

  private manualTransactionsUnsub = () => {};

  constructor() {
    super();
    makeObservable(this);
  }

  @action resetManualTransactions(): void {
    this.manualTransactionsUnsub();
    this.manualTransactions = [];
  }

  @action manualTransactionsSub = (id: string): void => {
    this.manualTransactionsUnsub = firebase
      .firestore()
      .collection("groups")
      .doc(id)
      .collection("manualTransactions")
      .onSnapshot((snapshot) => {
        if (snapshot.docs.length) {
          this.manualTransactions = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as IManualTransaction[];
        } else {
          this.manualTransactions = [];
        }
      });
  };
}

const manualTransactionsStore = new ManualTransactionsStore();

export default manualTransactionsStore;
export { ManualTransactionsStore };
