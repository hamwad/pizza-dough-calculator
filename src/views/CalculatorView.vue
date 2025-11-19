<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <div class="col-span-2">
      <Calculator />
    </div>
    <aside class="space-y-4">
      <FermentationPlanner />
      <Presets />
      <SavedRecipes />
    </aside>
  </div>
</template>

<script setup lang="ts">
import Calculator from "@/components/Calculator.vue";
import FermentationPlanner from "@/components/FermentationPlanner.vue";
import Presets from "@/components/PresetsSidebar.vue";
import SavedRecipes from "@/components/SavedRecipes.vue";
</script>
