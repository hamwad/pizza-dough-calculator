import Calculator from "@/views/CalculatorView.vue";
import PresetsView from "@/views/PresetsView.vue";
import RecipesView from "@/views/RecipesView.vue";
import SettingsView from "@/views/SettingsView.vue";

export default [
  { path: "/", name: "Calculator", component: Calculator },
  { path: "/presets", name: "Presets", component: PresetsView },
  { path: "/recipes", name: "Recipes", component: RecipesView },
  { path: "/settings", name: "Settings", component: SettingsView },
];
