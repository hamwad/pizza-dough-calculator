<template>
  <div class="card p-4">
    <h3 class="font-semibold">Manage Presets</h3>
    <div class="mt-3">
      <div
        v-for="p in presets"
        :key="p.id"
        class="border rounded p-2 mb-2 flex justify-between"
      >
        <div>
          <div class="font-semibold">{{ p.name }}</div>
          <div class="text-sm">
            Hydration: {{ p.hydration }}% — Salt: {{ p.salt }}%
          </div>
        </div>
        <div class="space-x-2">
          <button class="btn btn-xs" @click="use(p)">Use</button>
          <button class="btn btn-xs btn-outline" @click="remove(p.id)">
            Delete
          </button>
        </div>
      </div>

      <div class="mt-3">
        <input
          v-model="name"
          placeholder="Preset name"
          class="input input-bordered w-full mb-2"
        />
        <div class="grid grid-cols-3 gap-2">
          <input
            v-model.number="hydration"
            type="number"
            class="input input-bordered"
            placeholder="Hydration %"
          />
          <input
            v-model.number="salt"
            type="number"
            class="input input-bordered"
            placeholder="Salt %"
          />
          <input
            v-model.number="yeastPct"
            type="number"
            class="input input-bordered"
            placeholder="Yeast %"
          />
        </div>
        <div class="mt-2">
          <button class="btn btn-primary" @click="add">Add Preset</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import localforage from "localforage";
import { ref, onMounted } from "vue";

const presets = ref<any[]>([]);
const name = ref("");
const hydration = ref(65);
const salt = ref(2);
const yeastPct = ref(0.2);

onMounted(async () => {
  const data = (await localforage.getItem("presets")) as any[] | null;
  presets.value = data ?? [
    { id: "neap", name: "Neapolitan", hydration: 65, salt: 2.2, yeastPct: 0.1 },
  ];
});

async function add() {
  const p = {
    id: Date.now().toString(),
    name: name.value || "Custom",
    hydration: hydration.value,
    salt: salt.value,
    yeastPct: yeastPct.value,
  };
  presets.value.unshift(p);
  await localforage.setItem("presets", presets.value);
  name.value = "";
}

async function remove(id: string) {
  presets.value = presets.value.filter((p) => p.id !== id);
  await localforage.setItem("presets", presets.value);
}

function usePreset(p: any) {
  // broadcast via localforage for the Calculator to pick up or integrate with a global store
  localforage.setItem("applyPreset", p);
}
</script>
