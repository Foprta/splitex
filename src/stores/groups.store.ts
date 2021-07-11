import Store, { IFirestoreEntity } from "./_store";
import { action, makeObservable, observable } from "mobx";
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
      .onSnapshot((snapshot) => {
        if (snapshot.exists) {
          this.group = { id: snapshot.id, ref: snapshot.ref, ...snapshot.data() } as IGroup;
        } else {
          this.group = undefined;
        }
      });
  };

  @action groupsSub = (): (() => void) =>
    firebase
      .firestore()
      .collection("groups")
      .onSnapshot((snapshot) => {
        this.groups = snapshot.docs.map((doc) => ({
          id: doc.id,
          ref: doc.ref,
          ...doc.data(),
        })) as IGroup[];
      });

  addGroup = (name: string) => firebase.firestore().collection("groups").add({ name });
  editGroup = (fields: Partial<IGroup>) => this.group.ref.update(fields);
  deleteGroup = (id: string) => firebase.firestore().collection("groups").doc(id).delete();
}

const groupsStore = new GroupsStore();

export default groupsStore;
export { GroupsStore };
