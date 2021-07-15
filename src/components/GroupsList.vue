<template>
  <div class="divide-y-[1px]">
    <div class="py-1.5" v-for="group in groups" :key="group.id">
      <group-name>
        <router-link class="clickable" :to="group.id">
          {{ group.name }}
        </router-link>
      </group-name>
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
