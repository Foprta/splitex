import Store, { IFirestoreEntity } from "./_store";
import { action, makeObservable, observable } from "mobx";
import firebase from "firebase/app";

export interface ITransaction {
  fromUserId: string;
  toUserId: string;
  amount: number;
}

export type IManualTransaction = ITransaction & IFirestoreEntity;

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
