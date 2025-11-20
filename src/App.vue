<script setup lang="ts">
import "./styles/main.css";
</script>

<template>
  <div class="min-h-screen bg-base-100 text-neutral">
    <nav class="p-4 shadow-sm bg-primary text-base-100">
      <div class="container mx-auto flex items-center justify-between">
        <h1 class="text-xl font-semibold">Pizza Dough Calculator</h1>
        <div class="flex gap-2">
          <router-link to="/" class="btn btn-ghost">Calculator</router-link>
          <router-link to="/presets" class="btn btn-ghost">Presets</router-link>
          <router-link to="/recipes" class="btn btn-ghost"
            >Saved Recipes</router-link
          >
          <router-link to="/settings" class="btn btn-ghost"
            >Settings</router-link
          >
        </div>
      </div>
    </nav>

    <main class="container mx-auto p-4">
      <router-view />
    </main>

    <footer class="p-4 text-center text-sm mt-8 text-base-content/60">
      Built with ❤️ — adjust and extend as you like.
    </footer>
  </div>
</template>
