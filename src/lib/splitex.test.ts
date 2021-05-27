import { Splitex } from "./splitex";
import { IManualTransaction } from "../stores/manual-transactions.store";
import { IUser } from "../stores/users.store";
import { IExpense, IExpenseSettings } from "../stores/expenses.store";

test("should be created", () => {
  // Arrange
  const splitex = new Splitex([], []);

  // Assert
  expect(splitex).toBeTruthy();
});

test("should do nothing if users < 1", () => {
  // Arrange
  const splitex = new Splitex([], [{ amount: 100 }, { amount: 200 }, { amount: 300 }] as IExpense[]);

  // Assert
  expect(splitex.expenses.length).toBe(0);
});

test("should do nothing if expenses < 1", () => {
  // Arrange
  const splitex = new Splitex([{ id: "user1" }] as IUser[], [] as IExpense[]);

  // Assert
  expect(splitex.users.length).toBe(0);
});

describe("should calculate transactions", () => {
  test("with 1 user", () => {
    // Arrange
    const splitex = new Splitex(
      [{ id: "user1", proportion: 1 }] as IUser[],
      [
        { amount: 100, userId: "user1" },
        { amount: 300, userId: "user1" },
      ] as IExpense[]
    );

    // Assert
    expect(splitex.transactions).toEqual([]);
  });

  test("with 2 users", () => {
    // Arrange
    const splitex = new Splitex(
      [
        { id: "user1", proportion: 1 },
        { id: "user2", proportion: 1 },
      ] as IUser[],
      [
        { amount: 100, userId: "user1" },
        { amount: 200, userId: "user2" },
        { amount: 300, userId: "user1" },
      ] as IExpense[]
    );

    // Assert
    expect(splitex.transactions).toEqual([{ fromUserId: "user2", toUserId: "user1", amount: 100 }]);
  });

  test("with 3 users", () => {
    // Arrange
    const splitex = new Splitex(
      [
        { id: "user1", proportion: 1 },
        { id: "user2", proportion: 1 },
        { id: "user3", proportion: 1 },
      ] as IUser[],
      [
        { amount: 3000, userId: "user1" },
        { amount: 600, userId: "user2" },
        { amount: 300, userId: "user3" },
      ] as IExpense[]
    );

    // Assert
    expect(splitex.transactions).toEqual([
      { fromUserId: "user3", toUserId: "user1", amount: 1000 },
      { fromUserId: "user2", toUserId: "user1", amount: 700 },
    ]);
  });

  test("with 6 users", () => {
    // Arrange
    const splitex = new Splitex(
      [
        { id: "user1", proportion: 1 },
        { id: "user2", proportion: 1 },
        { id: "user3", proportion: 1 },
        { id: "user4", proportion: 1 },
        { id: "user5", proportion: 1 },
        { id: "user6", proportion: 1 },
      ] as IUser[],
      [
        { amount: 6000, userId: "user1" },
        { amount: 1800, userId: "user2" },
        { amount: 900, userId: "user3" },
        { amount: 300, userId: "user6" },
      ] as IExpense[]
    );

    // Assert
    expect(splitex.transactions).toEqual([
      { fromUserId: "user5", toUserId: "user1", amount: 1500 },
      { fromUserId: "user4", toUserId: "user1", amount: 1500 },
      { fromUserId: "user6", toUserId: "user1", amount: 1200 },
      { fromUserId: "user3", toUserId: "user1", amount: 300 },
      { fromUserId: "user3", toUserId: "user2", amount: 300 },
    ]);
  });

  test("with manual transactions", () => {
    // Arrange
    const splitex = new Splitex(
      [
        { id: "user1", proportion: 1 },
        { id: "user2", proportion: 1 },
        { id: "user3", proportion: 1 },
        { id: "user4", proportion: 1 },
        { id: "user5", proportion: 1 },
        { id: "user6", proportion: 1 },
      ] as IUser[],
      [
        { amount: 6000, userId: "user1" },
        { amount: 1800, userId: "user2" },
        { amount: 900, userId: "user3" },
        { amount: 300, userId: "user6" },
      ] as IExpense[],
      [
        { fromUserId: "user6", toUserId: "user1", amount: 500 },
        { fromUserId: "user5", toUserId: "user1", amount: 350 },
      ] as IManualTransaction[]
    );

    // Assert
    expect(splitex.transactions).toEqual([
      { fromUserId: "user4", toUserId: "user1", amount: 1500 },
      { fromUserId: "user5", toUserId: "user1", amount: 1150 },
      { fromUserId: "user6", toUserId: "user1", amount: 700 },
      { fromUserId: "user3", toUserId: "user1", amount: 300 },
      { fromUserId: "user3", toUserId: "user2", amount: 300 },
    ]);
  });

  test("with proportions", () => {
    // Arrange
    const splitex = new Splitex(
      [
        { id: "user1", proportion: 1 },
        { id: "user2", proportion: 1 },
        { id: "user3", proportion: 2 },
        { id: "user4", proportion: 1 },
        { id: "user5", proportion: 3 },
        { id: "user6", proportion: 1 },
      ] as IUser[],
      [
        { amount: 6000, userId: "user1" },
        { amount: 2000, userId: "user2" },
        { amount: 500, userId: "user3" },
        { amount: 200, userId: "user6" },
        { amount: 300, userId: "user3" },
      ] as IExpense[]
    );

    // Assert
    expect(splitex.transactions).toEqual([
      { fromUserId: "user5", toUserId: "user1", amount: 3000 },
      { fromUserId: "user3", toUserId: "user1", amount: 1200 },
      { fromUserId: "user4", toUserId: "user2", amount: 1000 },
      { fromUserId: "user6", toUserId: "user1", amount: 800 },
    ]);
  });

  test("with expenses proportions", () => {
    // Arrange
    const splitex = new Splitex(
      [
        { id: "user1", proportion: 1 },
        { id: "user2", proportion: 1 },
        { id: "user3", proportion: 1 },
        { id: "user4", proportion: 1 },
        { id: "user5", proportion: 1 },
        { id: "user6", proportion: 1 },
      ] as IUser[],
      [
        { id: "expense1", amount: 7000, userId: "user1" },
        { id: "expense2", amount: 1800, userId: "user2" },
        { amount: 600, userId: "user3" },
        { amount: 300, userId: "user6" },
        { amount: 1500, userId: "user3" },
      ] as IExpense[],
      [] as IManualTransaction[],
      [
        { userId: "user4", proportion: 2, expenseId: "expense1" },
        { userId: "user5", proportion: 3, expenseId: "expense2" },
      ] as IExpenseSettings[]
    );

    // Assert
    expect(splitex.transactions).toEqual([
      { fromUserId: "user4", toUserId: "user1", amount: 2625 },
      { fromUserId: "user5", toUserId: "user1", amount: 2075 },
      { fromUserId: "user6", toUserId: "user1", amount: 675 },
      { fromUserId: "user6", toUserId: "user3", amount: 475 },
      { fromUserId: "user6", toUserId: "user2", amount: 175 },
    ]);
  });

  test("with user personals", () => {
    // Arrange
    const splitex = new Splitex(
      [
        { id: "user1", proportion: 1 },
        { id: "user2", proportion: 1 },
        { id: "user3", proportion: 1 },
        { id: "user4", proportion: 1 },
        { id: "user5", proportion: 1 },
        { id: "user6", proportion: 1 },
      ] as IUser[],
      [
        { id: "expense1", amount: 6000, userId: "user1" },
        { amount: 1800, userId: "user2" },
        { amount: 900, userId: "user3" },
        { id: "expense4", amount: 300, userId: "user6" },
      ] as IExpense[],
      [],
      [{ userId: "user6", expenseId: "expense4", personal: 300 }] as IExpenseSettings[]
    );

    // Assert
    expect(splitex.transactions).toEqual([
      { fromUserId: "user6", toUserId: "user1", amount: 1450 },
      { fromUserId: "user5", toUserId: "user1", amount: 1450 },
      { fromUserId: "user4", toUserId: "user1", amount: 1450 },
      { fromUserId: "user3", toUserId: "user2", amount: 350 },
      { fromUserId: "user3", toUserId: "user1", amount: 200 },
    ]);
  });

  test("with everything", () => {
    // Arrange
    const splitex = new Splitex(
      [
        { id: "user1", proportion: 1 },
        { id: "user2", proportion: 1 },
        { id: "user3", proportion: 1 },
        { id: "user4", proportion: 1 },
        { id: "user5", proportion: 1 },
        { id: "user6", proportion: 1 },
      ] as IUser[],
      [
        { id: "expense1", amount: 6000, userId: "user1" },
        { amount: 1800, userId: "user2" },
        { amount: 900, userId: "user3" },
        { id: "expense4", amount: 300, userId: "user6" },
      ] as IExpense[],
      [{ fromUserId: "user4", toUserId: "user2", amount: 400 }] as IManualTransaction[],
      [
        { userId: "user6", expenseId: "expense4", personal: 200, proportion: 0 },
        { userId: "user2", expenseId: "expense1", personal: 900 },
      ] as IExpenseSettings[]
    );

    // Assert
    expect(splitex.transactions).toEqual([
      { fromUserId: "user5", toUserId: "user1", amount: 1320 },
      { fromUserId: "user6", toUserId: "user1", amount: 1200 },
      { fromUserId: "user4", toUserId: "user1", amount: 920 },
      { fromUserId: "user2", toUserId: "user1", amount: 820 },
      { fromUserId: "user3", toUserId: "user1", amount: 420 },
    ]);
  });
});
