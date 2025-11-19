<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Settings</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="card p-4">
        <h4 class="font-semibold">Units</h4>
        <div class="mt-2">
          <label class="label">Weight unit</label>
          <select class="select select-bordered w-full">
            <option>grams</option>
            <option>ounces</option>
          </select>
        </div>
      </div>
      <div class="card p-4">
        <h4 class="font-semibold">App Theme</h4>
        <div class="mt-2">
          <button class="btn btn-primary mr-2" @click="setTheme('pizzaTheme')">
            Pizza
          </button>
          <button class="btn" @click="setTheme('dark')">Dark</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

function setTheme(t: string) {
  // DaisyUI theme switching via data-theme on html
  document.documentElement.setAttribute("data-theme", t);
}
</script>
