import { IExpense, Splitex, IUser } from "./splitex";

test("should be created", () => {
  // Arrange
  const splitex = new Splitex([], []);

  // Assert
  expect(splitex).toBeTruthy();
});

test("should calculate total cost", () => {
  // Arrange
  const splitex = new Splitex([], [
    { amount: 100 },
    { amount: 200 },
    { amount: 300 },
  ] as IExpense[]);

  // Assert
  expect(splitex.totalCost).toBe(600);
});

describe("should calculate average expense", () => {
  test("case #1", () => {
    // Arrange
    const splitex = new Splitex(
      [{ id: "user1" }] as IUser[],
      [
        { amount: 100, userId: "user1" },
        { amount: 200, userId: "user1" },
        { amount: 300, userId: "user1" },
      ] as IExpense[]
    );

    // Assert
    expect(splitex.averageExpense).toBe(600);
  });

  test("case #2", () => {
    // Arrange
    const splitex = new Splitex(
      [{ id: "user1" }, { id: "user2" }] as IUser[],
      [
        { amount: 100, userId: "user1" },
        { amount: 200, userId: "user2" },
        { amount: 300, userId: "user1" },
      ] as IExpense[]
    );

    // Assert
    expect(splitex.averageExpense).toBe(300);
  });

  test("case #3", () => {
    // Arrange
    const splitex = new Splitex(
      [{ id: "user1" }, { id: "user2" }, { id: "user3" }] as IUser[],
      [
        { amount: 100, userId: "user1" },
        { amount: 200, userId: "user2" },
        { amount: 300, userId: "user1" },
      ] as IExpense[]
    );

    // Assert
    expect(splitex.averageExpense).toBe(200);
  });
});

describe("should calculate total user expenses", () => {
  test("case #1", () => {
    // Arrange
    const splitex = new Splitex(
      [] as IUser[],
      [
        { amount: 100, userId: "user1" },
        { amount: 200, userId: "user2" },
        { amount: 300, userId: "user2" },
      ] as IExpense[]
    );

    // Assert
    expect(splitex["calculateTotalUserExpenses"]("user1")).toBe(100);
  });

  test("case #2", () => {
    // Arrange
    const splitex = new Splitex(
      [] as IUser[],
      [
        { amount: 100, userId: "user1" },
        { amount: 200, userId: "user2" },
        { amount: 300, userId: "user1" },
      ] as IExpense[]
    );

    // Assert
    expect(splitex["calculateTotalUserExpenses"]("user1")).toBe(400);
  });

  test("case #3", () => {
    // Arrange
    const splitex = new Splitex(
      [] as IUser[],
      [
        { amount: 100, userId: "user2" },
        { amount: 200, userId: "user2" },
        { amount: 300, userId: "user2" },
      ] as IExpense[]
    );

    // Assert
    expect(splitex["calculateTotalUserExpenses"]("user1")).toBe(0);
  });
});

describe("should calculate users deposits", () => {
  test("case #1", () => {
    // Arrange
    const splitex = new Splitex(
      [{ id: "user1" }] as IUser[],
      [
        { amount: 100, userId: "user1" },
        { amount: 200, userId: "user1" },
        { amount: 300, userId: "user1" },
      ] as IExpense[]
    );

    // Assert
    expect(splitex.usersDeposits).toEqual({ user1: 0 });
  });

  test("case #2", () => {
    // Arrange
    const splitex = new Splitex(
      [{ id: "user1" }, { id: "user2" }] as IUser[],
      [
        { amount: 100, userId: "user1" },
        { amount: 200, userId: "user2" },
        { amount: 300, userId: "user1" },
      ] as IExpense[]
    );

    // Assert
    expect(splitex.usersDeposits).toEqual({ user1: 100, user2: -100 });
  });

  test("case #3", () => {
    // Arrange
    const splitex = new Splitex(
      [{ id: "user1" }, { id: "user2" }, { id: "user3" }] as IUser[],
      [
        { amount: 100, userId: "user1" },
        { amount: 200, userId: "user2" },
        { amount: 300, userId: "user3" },
      ] as IExpense[]
    );

    // Assert
    expect(splitex.usersDeposits).toEqual({
      user1: -100,
      user2: 0,
      user3: 100,
    });
  });

  test("case #4", () => {
    // Arrange
    const splitex = new Splitex(
      [
        { id: "user1" },
        { id: "user2" },
        { id: "user3" },
        { id: "user4" },
        { id: "user5" },
      ] as IUser[],
      [
        { amount: 5000, userId: "user1" },
        { amount: 2000, userId: "user1" },
        { amount: 1000, userId: "user5" },
        { amount: 500, userId: "user5" },
        { amount: 600, userId: "user5" },
        { amount: 900, userId: "user5" },
      ] as IExpense[]
    );

    // Assert
    expect(splitex.usersDeposits).toEqual({
      user1: 5000,
      user2: -2000,
      user3: -2000,
      user4: -2000,
      user5: 1000,
    });
  });
});

describe("should map deposits into sorted filtered array", () => {
  test("case #1", () => {
    // Arrange
    const splitex = new Splitex([] as IUser[], [] as IExpense[]);
    const usersDeposits = {
      user1: 3000,
      user2: -2000,
      user3: -1000,
      user4: 0,
    };

    // Assert
    expect(splitex["mapDepositsIntoArray"](usersDeposits)).toEqual([
      ["user1", 3000],
      ["user3", -1000],
      ["user2", -2000],
    ]);
  });

  test("case #2", () => {
    // Arrange
    const splitex = new Splitex([] as IUser[], [] as IExpense[]);
    const usersDeposits = {
      user1: 6000,
      user2: -2000,
      user3: 0,
      user4: -5000,
      user5: 1000,
      user6: 0,
    };

    // Assert
    expect(splitex["mapDepositsIntoArray"](usersDeposits)).toEqual([
      ["user1", 6000],
      ["user5", 1000],
      ["user2", -2000],
      ["user4", -5000],
    ]);
  });
});

describe("should calculate transactions", () => {
  test("case #1", () => {
    // Arrange
    const splitex = new Splitex(
      [{ id: "user1" }, { id: "user2" }] as IUser[],
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

  test("case #2", () => {
    // Arrange
    const splitex = new Splitex(
      [{ id: "user1" }, { id: "user2" }, { id: "user3" }] as IUser[],
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

  test("case #3", () => {
    // Arrange
    const splitex = new Splitex(
      [
        { id: "user1" },
        { id: "user2" },
        { id: "user3" },
        { id: "user4" },
        { id: "user5" },
      ] as IUser[],
      [
        { amount: 7000, userId: "user1" },
        { amount: 3000, userId: "user5" },
      ] as IExpense[]
    );

    // Assert
    expect(splitex.transactions).toEqual([
      { fromUserId: "user4", toUserId: "user1", amount: 2000 },
      { fromUserId: "user3", toUserId: "user1", amount: 2000 },
      { fromUserId: "user2", toUserId: "user1", amount: 1000 },
      { fromUserId: "user2", toUserId: "user5", amount: 1000 },
    ]);
  });

  test("case #4", () => {
    // Arrange
    const splitex = new Splitex(
      [
        { id: "user1" },
        { id: "user2" },
        { id: "user3" },
        { id: "user4" },
        { id: "user5" },
        { id: "user6" },
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
});
