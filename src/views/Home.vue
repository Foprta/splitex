<template>
  <GroupsList :groups="allGroups" />
  <AddGroup @group-created="openGroup" />
</template>

<script>
import { mapGetters } from "vuex";
import { GroupsService } from "../services/groups";
import AddGroup from "../components/AddGroup";
import GroupsList from "../components/GroupsList";

export default {
  components: { GroupsList, AddGroup },
  mounted() {
    const groupsIds = this.allGroups.map(({ id }) => id);

    if (groupsIds.length > 0) {
      this.unsubGroups = GroupsService.groupsSubscriber(groupsIds).onSnapshot(
        (snapshot) => {
          const groups = snapshot.docs.map((doc) => ({
            id: doc.id,
            ref: doc.ref,
            ...doc.data(),
          }));

          this.$store.commit("updateGroups", groups);
        }
      );
    }
  },
  computed: mapGetters(["allGroups"]),
  unmounted() {
    this.unsubGroups?.();
  },
  methods: {
    openGroup(group) {
      this.$router.push(group.id);
    },
  },
};
</script>
