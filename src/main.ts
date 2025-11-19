import "./styles/tailwind.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import App from "@/App.vue";
import routes from "./router";
import { loadLocaleMessages, setupI18n } from "./i18n";

const app = createApp(App);
const pinia = createPinia();
const router = createRouter({ history: createWebHistory(), routes });

app.use(pinia);
app.use(router);

// i18n
const i18n = setupI18n();
app.use(i18n);

app.mount("#app");
