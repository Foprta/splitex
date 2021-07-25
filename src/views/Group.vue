<template>
  <div>
    <group-header :group="group"></group-header>
  </div>
</template>

<script>
import { GroupsService } from "../services/groups";
import GroupHeader from "../components/Group/GroupHeader";

export default {
  components: { GroupHeader },
  mounted() {
    this.groupUnsub = GroupsService.groupSubscriber(
      this.$route.params.groupId
    ).onSnapshot((snapshot) => {
      if (snapshot.exists) {
        const group = {
          id: snapshot.id,
          ref: snapshot.ref,
          ...snapshot.data(),
        };
        this.$store.commit("updateGroup", group);
      } else {
        this.$router.push("/");
        this.$toast.add({
          severity: "error",
          summary: "Группа не существует либо была удалена",
          life: 3000,
        });
      }
    });
  },
  computed: {
    group() {
      return this.$store.getters.getGroup(this.$route.params.groupId);
    },
  },
  unmounted() {
    this.groupUnsub();
  },
};
</script>
