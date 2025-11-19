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

// service worker for pwa
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").then((reg) => {
      console.log("Service Worker registered:", reg);

      // Auto-update for new SW
      reg.onupdatefound = () => {
        const newWorker = reg.installing;
        if (newWorker) {
          newWorker.onstatechange = () => {
            if (newWorker.state === "installed") {
              if (navigator.serviceWorker.controller) {
                // New update available, reload the page
                window.location.reload();
              }
            }
          };
        }
      };
    });
  });
}

app.mount("#app");
