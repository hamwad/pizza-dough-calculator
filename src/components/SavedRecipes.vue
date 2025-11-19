<template>
  <div class="card p-4">
    <h3 class="font-semibold">Saved Recipes</h3>
    <div class="mt-3 space-y-2">
      <div v-for="r in recipes" :key="r.id" class="border rounded p-2">
        <div class="flex justify-between items-center">
          <div>{{ r.name }}</div>
          <div class="space-x-2">
            <button class="btn btn-xs" @click="load(r)">Load</button>
            <button class="btn btn-xs btn-outline" @click="remove(r.id)">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRecipeStore } from "@/stores/recipe";
import { computed } from "vue";

const store = useRecipeStore();
const recipes = computed(() => store.recipes);

function load(r: any) {
  store.load(r.id);
}
function remove(id: string) {
  store.remove(id);
}
</script>
