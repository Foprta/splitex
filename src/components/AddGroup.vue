<template>
  <form class="flex mt-3 space-x-3" @submit.prevent="createGroup">
    <InputText
      class="flex-grow"
      placeholder="Имя новой группы"
      type="text"
      v-model="groupName"
    />
    <Button
      type="submit"
      :disabled="v$.$invalid"
      :icon="loading ? 'pi pi-spin pi-spinner' : 'pi pi-plus'"
    />
  </form>
</template>

<script>
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { useVuelidate } from "@vuelidate/core";
import { minLength, required } from "@vuelidate/validators";

export default {
  components: { InputText, Button },
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      loading: false,
      groupName: null,
    };
  },
  validations() {
    return {
      groupName: { required, minLength: minLength(3) },
    };
  },
  methods: {
    createGroup() {
      this.loading = true;

      this.$store.dispatch("addGroup", this.groupName).then((group) => {
        this.loading = false;
        this.$emit("groupCreated", group);
      });
    },
  },
};
</script>
