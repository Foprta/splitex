import { toJS } from "mobx";

export default abstract class Store {
  get toJSON() {
    return toJS(this);
  }
}
