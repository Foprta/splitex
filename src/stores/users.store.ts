import Store, { IFirestoreEntity } from "./_store";
import { action, makeObservable, observable } from "mobx";
import firebase from "firebase/app";

export interface IUser extends IFirestoreEntity {
  name: string;
  proportion: number;
}

class UsersStore extends Store {
  @observable users: IUser[] = [];

  private usersUnsub = () => {};

  constructor() {
    super();
    makeObservable(this);
  }

  @action resetUsers(): void {
    this.usersUnsub();
    this.users = [];
  }

  @action usersSub = (id: string): void => {
    this.usersUnsub = firebase
      .firestore()
      .collection("groups")
      .doc(id)
      .collection("users")
      .onSnapshot((snapshot) => {
        if (snapshot.docs.length) {
          this.users = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as IUser[];
        } else {
          this.users = [];
        }
      });
  };
}

const usersStore = new UsersStore();

export default usersStore;
export { UsersStore };