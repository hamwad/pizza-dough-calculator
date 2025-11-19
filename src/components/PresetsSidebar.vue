<template>
  <div class="card p-4">
    <h3 class="font-semibold">Presets</h3>
    <div class="mt-3 space-y-2">
      <button
        v-for="p in presets"
        :key="p.id"
        class="btn btn-ghost w-full text-left"
        @click="$emit('apply', p)"
      >
        {{ p.name }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const presets = ref([
  {
    id: "neapolitan",
    name: "Neapolitan",
    hydration: 65,
    salt: 2.2,
    yeastPct: 0.1,
  },
  { id: "ny", name: "New York", hydration: 62, salt: 2, yeastPct: 0.18 },
  { id: "detroit", name: "Detroit", hydration: 70, salt: 2.1, yeastPct: 0.15 },
  { id: "sourdough", name: "Sourdough", hydration: 75, salt: 2, yeastPct: 20 },
]);
</script>
