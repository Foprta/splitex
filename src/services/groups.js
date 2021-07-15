import { api } from "../config/firebase";
import firebase from "firebase";

const groupsCollection = api.firestore().collection("groups");

const groupsSubscriber = (ids) =>
  groupsCollection.where(firebase.firestore.FieldPath.documentId(), "in", ids);

const groupSubscriber = (id) => groupsCollection.doc(id);

const addGroup = (group) => groupsCollection.add(group);

export const GroupsService = {
  groupsSubscriber,
  groupSubscriber,
  addGroup,
};
