<template>
  <Toast />

  <div class="mb-2 w-full text-center">
    <router-link class="text-3xl font-bold clickable" to="/">
      SplitEx
    </router-link>
  </div>

  <router-view />
</template>

<script>
import Toast from "primevue/toast";

export default {
  components: { Toast },
};
</script>
