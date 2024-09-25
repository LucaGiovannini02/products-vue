<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
    <div class="absolute flex flex-col justify-center items-center w-full space-y-3">
        <div class="text-4xl font-bold">404</div>
        <div class="text-xl">Page not found</div>
        <RouterLink class="text-blue-500 underline" to="/">Back to home</RouterLink>
    </div>
</template>