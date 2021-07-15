import groupsStore from "../../../src/store/groups";

describe("Groups store", () => {
  test("update groups", () => {
    const groups = [{ name: "group", id: 1 }];

    groupsStore.mutations.updateGroups({ groups: [] }, groups);

    expect(localStorage.getItem("cachedGroups")).toBe(JSON.stringify(groups));
    expect(groupsStore.state().groups).toEqual(groups);
  });

  test("update group", () => {
    const group = { name: "group", id: 1 };
    const newGroup = { name: "newName", id: 1 };
    localStorage.setItem("cachedGroups", [group]);

    groupsStore.mutations.updateGroup({ groups: [group] }, newGroup);

    expect(localStorage.getItem("cachedGroups")).toBe(
      JSON.stringify([newGroup])
    );
    expect(groupsStore.state().groups).toEqual([newGroup]);
  });
});
