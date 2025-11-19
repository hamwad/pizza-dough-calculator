<template>
  <table class="table w-full">
    <thead>
      <tr>
        <th>Ingredient</th>
        <th class="text-right">Weight (g)</th>
        <th class="text-right">Baker %</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="ing in ingredients" :key="ing.name">
        <td>{{ ing.name }}</td>
        <td class="text-right">{{ ing.weight.toFixed(0) }}</td>
        <td class="text-right">{{ ing.pct }}%</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  ingredients: Array<{ name: string; weight: number; pct: number }>;
}>();
</script>
