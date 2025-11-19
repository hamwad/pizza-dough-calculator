<template>
  <div class="card p-4 shadow">
    <h2 class="text-lg font-semibold mb-4">Calculator</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="label">Number of pizzas</label>
        <input
          v-model.number="form.pizzas"
          type="number"
          min="1"
          class="input input-bordered w-full"
        />
      </div>

      <div>
        <label class="label">Diameter (cm)</label>
        <input
          v-model.number="form.diameter"
          type="number"
          min="10"
          class="input input-bordered w-full"
        />
      </div>

      <div>
        <label class="label">Hydration %</label>
        <input
          v-model.number="form.hydration"
          type="number"
          min="40"
          max="120"
          class="input input-bordered w-full"
        />
      </div>

      <div>
        <label class="label">Salt % (of flour)</label>
        <input
          v-model.number="form.salt"
          type="number"
          min="0"
          max="5"
          step="0.1"
          class="input input-bordered w-full"
        />
      </div>

      <div>
        <label class="label">Yeast type</label>
        <select v-model="form.yeastType" class="select select-bordered w-full">
          <option value="instant">Instant</option>
          <option value="active">Active Dry</option>
          <option value="fresh">Fresh</option>
          <option value="sourdough">Sourdough Starter</option>
        </select>
      </div>

      <div>
        <label class="label">Yeast % (bakers % of flour)</label>
        <input
          v-model.number="form.yeastPct"
          type="number"
          min="0"
          step="0.01"
          class="input input-bordered w-full"
        />
      </div>

      <div class="md:col-span-2">
        <label class="label">Notes</label>
        <textarea
          v-model="form.notes"
          class="textarea textarea-bordered w-full"
          rows="2"
        ></textarea>
      </div>
    </div>

    <div class="mt-4">
      <button class="btn btn-primary mr-2" @click="calculate">Calculate</button>
      <button class="btn" @click="saveRecipe">Save Recipe</button>
    </div>

    <div v-if="result" class="mt-6">
      <h3 class="font-semibold">Result</h3>
      <IngredientTable :ingredients="result.ingredients" />
      <div class="mt-3">
        <pre class="whitespace-pre-wrap text-sm">{{ result.summary }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import IngredientTable from "@/components/IngredientTable.vue";
import { useRecipeStore } from "@/stores/recipe";
import { calculateDough } from "@/services/dough";

const form = reactive({
  pizzas: 2,
  diameter: 30,
  hydration: 65,
  salt: 2,
  yeastType: "instant",
  yeastPct: 0.2,
  notes: "",
});

const result = ref<any | null>(null);
const store = useRecipeStore();

function calculate() {
  result.value = calculateDough({
    pizzas: form.pizzas,
    diameterCm: form.diameter,
    hydrationPct: form.hydration,
    saltPct: form.salt,
    yeastPct: form.yeastPct,
    yeastType: form.yeastType,
  });
}

function saveRecipe() {
  if (!result.value) calculate();
  store.save({
    name: `Recipe — ${new Date().toLocaleString()}`,
    form: JSON.parse(JSON.stringify(form)),
    result: result.value,
  });
}
</script>
