import { ComponentPropsWithRef, useEffect, useState } from "react";
import Header from "./Header";
import firebase from "firebase/app";
import Users from "./Users/Users";
import { IExpense, IUser } from "../../lib/splitex";
import Transactions from "./Transactions";
import Expenses from "./Expenses/Expenses";

function useGroup(groupId: string): any {
  const [group, setGroup] = useState<any>();

  useEffect(() => {
    const unsub = firebase
      .firestore()
      .collection("groups")
      .doc(groupId)
      .onSnapshot((snapshot) => {
        if (snapshot.exists) {
          const group = { id: snapshot.id, ...snapshot.data() };

          setGroup(group);
        }
      });
    return () => unsub();
  }, [groupId]);

  return group;
}

function useExpenses(groupId: string): IExpense[] {
  const [expenses, setExpenses] = useState<any>([]);

  useEffect(() => {
    const unsub = firebase
      .firestore()
      .collection("groups")
      .doc(groupId)
      .collection("expenses")
      .onSnapshot((snapshot) => {
        if (snapshot.docs.length) {
          const expenses = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setExpenses(expenses);
        } else {
          setExpenses([]);
        }
      });
    return () => unsub();
  }, [groupId]);

  return expenses;
}

function useUsers(groupId: string): IUser[] {
  const [users, setUsers] = useState<any>([]);

  useEffect(() => {
    const unsub = firebase
      .firestore()
      .collection("groups")
      .doc(groupId)
      .collection("users")
      .onSnapshot((snapshot) => {
        if (snapshot.docs.length) {
          const users = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setUsers(users);
        } else {
          setUsers([]);
        }
      });
    return () => unsub();
  }, [groupId]);

  return users;
}

function Group({ match }: ComponentPropsWithRef<any>) {
  const groupId = match.params.id;
  const group = useGroup(groupId);
  const expenses = useExpenses(groupId);
  const users = useUsers(groupId);

  return (
    <div className="flex flex-col w-full">
      <Header group={group} expenses={expenses} />
      <Users groupId={groupId} users={users} expenses={expenses} />
      <div className="block-header">Необходимые переводы</div>
      <Transactions users={users} expenses={expenses} />
      <div className="block-header">Траты участников</div>
      <Expenses groupId={groupId} users={users} expenses={expenses} />
    </div>
  );
}

export default Group;
