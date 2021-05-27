import { toJS } from "mobx";

export interface IFirestoreEntity {
  id: string;
}

export default abstract class Store {
  get toJSON() {
    return toJS(this);
  }
}
