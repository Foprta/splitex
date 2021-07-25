<template>
  <div class="divide-y-[1px]">
    <div class="py-1.5" v-for="group in groups" :key="group.id">
      <router-link class="clickable" :to="group.id">
        <group-name :name="group.name" />
      </router-link>
    </div>
  </div>
</template>

<script>
import GroupName from "../components/GroupName";

export default {
  components: { GroupName },
  props: { groups: Array.required },
};
</script>
