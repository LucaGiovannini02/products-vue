<script setup lang="ts">
import { storeToRefs } from 'pinia';
import ProductCard from '../components/ProductCard.vue';
import { useCartStore } from '../store/cart';
import { Product } from '../types/Products';

const cartStore = useCartStore()
const { removeToCart, changeQts } = cartStore
const { cart } = storeToRefs(cartStore)

const deleteFromCart = (product: Product) => {
    removeToCart(product)
}
</script>

<template>
    <div v-if="cart" v-for="product in cart" class="w-full flex justify-center">
      <ProductCard :qts="+product.qts" @delete-from-cart="deleteFromCart" @change-qts="changeQts" :in-cart-view="true" :product="product.product" />
    </div>
    <div v-else>
        No products
    </div>
</template>