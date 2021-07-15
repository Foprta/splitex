import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";

import router from "./router";
import store from "./store";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";

import "primevue/resources/themes/fluent-light/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

const app = createApp(App);

app.use(PrimeVue);
app.use(ToastService);
app.use(store);
app.use(router);

app.mount("#app");
