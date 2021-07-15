import { api } from "../config/firebase";

export const getGroups = api.firestore().collection("groups").get();
