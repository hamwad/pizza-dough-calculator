import { createI18n } from "vue-i18n";
import en from "./locales/en.json";

export function setupI18n() {
  return createI18n({
    legacy: false,
    locale: "en",
    fallbackLocale: "en",
    messages: { en },
  });
}

export async function loadLocaleMessages(locale: string) {
  // placeholder if you want dynamic loading later
}
