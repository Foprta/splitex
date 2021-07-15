<template>
  <div>
    <h1>This is an about page</h1>
  </div>
</template>

<script>
import { GroupsService } from "../services/groups";

export default {
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
  unmounted() {
    this.groupUnsub();
  },
};
</script>
