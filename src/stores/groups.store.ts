import Store from "./_store";
import { action, makeObservable, observable } from "mobx";
import { IFirestoreEntity } from "../lib/splitex";
import firebase from "firebase/app";

export interface IGroup extends IFirestoreEntity {
  name: string;
}

class GroupsStore extends Store {
  @observable groups: IGroup[] = [];
  @observable group: IGroup | undefined;

  private groupUnsub = () => {};

  constructor() {
    super();
    makeObservable(this);
  }

  @action resetGroup(): void {
    this.groupUnsub();
    this.group = undefined;
  }

  @action groupSub = (id: string): void => {
    this.groupUnsub = firebase
      .firestore()
      .collection("groups")
      .doc(id)
      .onSnapshot((snapshot: any) => {
        if (snapshot.exists) {
          this.group = { id: snapshot.id, ...snapshot.data() } as IGroup;
        } else {
          this.group = undefined;
        }
      });
  };

  @action groupsSub = (): (() => void) =>
    firebase
      .firestore()
      .collection("groups")
      .onSnapshot((snapshot: any) => {
        this.groups = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      });

  addGroup = (name: string) => firebase.firestore().collection("groups").add({ name });
}

const groupsStore = new GroupsStore();

export default groupsStore;
export { GroupsStore };
