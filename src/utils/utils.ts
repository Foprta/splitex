import { IUser } from "../stores/users.store";

export function createUsersMap(users: IUser[]): Record<string, string> {
  const result: Record<string, string> = {};

  users.forEach((user) => (result[user.id] = user.name));

  return result;
}
