import { GroupsService } from "../services/groups";
import { map, omit } from "lodash";

export default {
  state() {
    let cachedGroups = localStorage.getItem("cachedGroups");

    if (cachedGroups) {
      cachedGroups = JSON.parse(cachedGroups);
    }

    return {
      groups: cachedGroups || [],
    };
  },
  mutations: {
    updateGroups(state, groups) {
      state.groups = groups;

      updateCachedGroups(groups);
    },
    updateGroup(state, group) {
      const idx = state.groups.findIndex(({ id }) => group.id === id);

      if (idx >= 0) {
        state.groups.splice(idx, 1, group);
      } else {
        state.groups.push(group);
      }

      updateCachedGroups(state.groups);
    },
  },
  getters: {
    allGroups(state) {
      return state.groups;
    },
    getGroup: (state) => (id) => {
      return state.groups.find((group) => group.id === id);
    },
  },
  actions: {
    addGroup(ctx, name) {
      return GroupsService.addGroup({ name });
    },
  },
};

function updateCachedGroups(groups) {
  localStorage.setItem(
    "cachedGroups",
    JSON.stringify(map(groups, (g) => omit(g, ["ref"])))
  );
}
