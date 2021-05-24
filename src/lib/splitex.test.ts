import { IExpense, IManualTransaction, IUser, Splitex } from "./splitex";

test("should be created", () => {
  // Arrange
  const splitex = new Splitex([], []);

  // Assert
  expect(splitex).toBeTruthy();
});

test("should do nothing if users < 1", () => {
  // Arrange
  const splitex = new Splitex([], [
    { amount: 100 },
    { amount: 200 },
    { amount: 300 },
  ] as IExpense[]);

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
    expect(splitex.transactions).toEqual([
      { fromUserId: "user2", toUserId: "user1", amount: 100 },
    ]);
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
        { amount: 2000, userId: "user2" },
        { amount: 500, userId: "user3" },
        { amount: 200, userId: "user6" },
      ] as IExpense[]
    );

    // Assert
    expect(splitex.transactions).toEqual([
      { fromUserId: "user5", toUserId: "user1", amount: 1450 },
      { fromUserId: "user4", toUserId: "user1", amount: 1450 },
      { fromUserId: "user6", toUserId: "user1", amount: 1250 },
      { fromUserId: "user3", toUserId: "user2", amount: 550 },
      { fromUserId: "user3", toUserId: "user1", amount: 400 },
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
        { amount: 2000, userId: "user2" },
        { amount: 500, userId: "user3" },
        { amount: 200, userId: "user6" },
      ] as IExpense[],
      [
        { fromUserId: "user6", toUserId: "user1", amount: 500 },
        { fromUserId: "user5", toUserId: "user1", amount: 350 },
      ] as IManualTransaction[]
    );

    // Assert
    expect(splitex.transactions).toEqual([
      { fromUserId: "user4", toUserId: "user1", amount: 1450 },
      { fromUserId: "user5", toUserId: "user1", amount: 1100 },
      { fromUserId: "user3", toUserId: "user1", amount: 950 },
      { fromUserId: "user6", toUserId: "user2", amount: 550 },
      { fromUserId: "user6", toUserId: "user1", amount: 200 },
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
});
