import { toJS } from "mobx";
import firebase from "firebase";

export interface IFirestoreEntity {
  id: string;
  ref: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;
}

export default abstract class Store {
  get toJSON() {
    return toJS(this);
  }
}
