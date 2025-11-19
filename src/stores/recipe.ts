import { defineStore } from "pinia";
import localforage from "localforage";
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";

localforage.config({ name: "pizza-dough" });

export const useRecipeStore = defineStore("recipe", () => {
  const recipes = ref<any[]>([]);

  async function loadAll() {
    const data = (await localforage.getItem("recipes")) as any[] | null;
    recipes.value = data ?? [];
  }

  async function save(payload: any) {
    const r = { id: uuidv4(), createdAt: new Date().toISOString(), ...payload };
    recipes.value.unshift(r);
    await localforage.setItem("recipes", recipes.value);
  }

  async function remove(id: string) {
    recipes.value = recipes.value.filter((r) => r.id !== id);
    await localforage.setItem("recipes", recipes.value);
  }

  async function loadRecipe(id: string) {
    const r = recipes.value.find((x) => x.id === id);
    if (r) {
      // emit event or place into a temporary key for the Calculator to read
      await localforage.setItem("lastLoaded", r);
    }
  }

  // initialize
  loadAll();

  return { recipes, save, remove, load: loadRecipe };
});
