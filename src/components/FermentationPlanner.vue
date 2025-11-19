<template>
  <div class="card p-4">
    <h3 class="font-semibold">Fermentation Planner</h3>
    <div class="mt-2">
      <label class="label">Ambient temp (°C)</label>
      <input
        v-model.number="ambient"
        type="number"
        class="input input-bordered w-full"
      />
    </div>
    <div class="mt-2">
      <label class="label">Fridge temp (°C)</label>
      <input
        v-model.number="fridge"
        type="number"
        class="input input-bordered w-full"
      />
    </div>
    <div class="mt-2">
      <label class="label">Desired total proof (hours)</label>
      <input
        v-model.number="hours"
        type="number"
        class="input input-bordered w-full"
      />
    </div>

    <div class="mt-3">
      <button class="btn btn-sm btn-primary" @click="plan">
        Suggest Yeast %
      </button>
    </div>

    <div v-if="suggestion" class="mt-3 text-sm">
      <div>
        <strong>Suggested yeast %:</strong> {{ suggestion.yeastPct }}% (instant
        equivalent)
      </div>
      <div class="mt-2"><strong>Timeline:</strong></div>
      <ul class="list-disc pl-6">
        <li>Mix → Bulk: {{ suggestion.bulkHours }}h</li>
        <li>Ball → Cold ferment: {{ suggestion.coldHours }}h</li>
        <li>
          Bring to room temp before bake: {{ suggestion.warmMinutes }} min
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { planFermentation } from "@/services/dough";

const ambient = ref(22);
const fridge = ref(4);
const hours = ref(24);
const suggestion = ref<any | null>(null);

function plan() {
  suggestion.value = planFermentation({
    ambientTempC: ambient.value,
    fridgeTempC: fridge.value,
    totalHours: hours.value,
  });
}
</script>
