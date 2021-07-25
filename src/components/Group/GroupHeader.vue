<template>
  <button class="clickable">
    <GroupName
      class="py-1.5"
      :name="group.name"
      @click="editModalOpen = true"
    />
  </button>

  <Dialog
    class="w-[90vw]"
    v-model:visible="editModalOpen"
    :modal="true"
    :dismissableMask="true"
  >
    <template #header>
      <span class="text-lg">
        Управление группой <GroupName :name="group.name" />
      </span>
    </template>
    Content

    <template #footer>
      <Button class="p-button-danger" label="Удалить" @click="deleteGroup" />
    </template>
  </Dialog>
</template>

<script>
import GroupName from "../GroupName";
import Dialog from "primevue/dialog";
import Button from "primevue/button";

export default {
  components: { GroupName, Dialog, Button },
  data() {
    return { editModalOpen: false };
  },
  props: {
    group: Object,
  },
  methods: {
    deleteGroup() {
      this.group.ref.delete();
    },
  },
};
</script>
