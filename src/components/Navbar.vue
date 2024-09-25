<script setup lang="ts">
import { onMounted, ref, toRef } from 'vue';
import { defineProps } from 'vue';
import OverlayBadge from 'primevue/overlaybadge';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import router from '../utils/router';
import { RouterLink, useRoute } from 'vue-router';

const props = defineProps({ cartItems: { type: Number, default: 0 }})
const cartItems = toRef(props, 'cartItems')
const emit = defineEmits(['search'])

const route = useRoute()

const filter = ref('')

const search = () => {
    emit('search', filter.value)
}

onMounted(async () => {
    await router.isReady()
    const filterQuery = router.currentRoute.value.query["filter"]
    if(filterQuery) filter.value = String(filterQuery)
})

const isHome = () => route.path == '/'
</script>

<template>
    <div class="flex items-center justify-between px-3 md:px-12 py-6">
        <RouterLink to="/" class="text-lg md:text-2xl italic font-semibold">
            Products
        </RouterLink>
        <div v-if="isHome()">
            <form @submit.prevent="search" class="flex">
                <InputText placeholder="Search product..." class="w-[200px] md:w-[400px]" v-model="filter" />
                <Button class="!hidden md:!block ml-3">
                    <i class="pi pi-search" />
                </Button>
            </form>
        </div>
        <RouterLink to="/cart">
            <OverlayBadge v-if="cartItems" severity="danger" :value="cartItems">
                <i class="pi pi-shopping-cart !text-2xl md:!text-4xl" />
            </OverlayBadge>
            <i v-else class="pi pi-shopping-cart !text-2xl md:!text-4xl" />
        </RouterLink>
    </div>
</template>