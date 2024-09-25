<script setup lang="ts">
import ProductCard from '../components/ProductCard.vue';
import useAxios from '../composable/useAxios';
import { useCartStore } from '../store/cart';
import { Product, Products } from '../types/Products';
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const { data, call } = useAxios<Products>("/products")
const cartStore = useCartStore()
const route = useRoute()

onMounted(async () => {
  fetch()
})

watch(route, () => {
  fetch()
})

const fetch = () => {
  const filterQuery = route.query["filter"]

  if(filterQuery) {
    call({
      query: String(filterQuery)
    })
  } else {
    call()
  }
}

const addToCart = (product: Product) => {
  cartStore.addToCart(product)
}
</script>

<template>
    <div v-if="data" v-for="product in data.products" class="w-full flex justify-center">
      <ProductCard @add-to-cart="addToCart" :product="product" />
    </div>
</template>