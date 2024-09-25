<script setup lang="ts">
import Navbar from './components/Navbar.vue';
import { RouterView } from 'vue-router';
import { useCartStore } from './store/cart';
import router from './utils/router';
const cartStore = useCartStore()

const search = (filter: string) => {
  if(filter) router.push({ query: { filter }})
  else router.replace({ query: undefined })
}
</script>

<template>
  <div class="md:fixed w-full backdrop-blur-xl z-10 top-0">
    <Navbar @search="search" :cartItems="cartStore.cart.length" />
  </div>
  <div class="px-0 xl:px-8 2xl:px-40 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-y-8 md:mt-24 mb-6 relative">
    <RouterView />
  </div>
</template>