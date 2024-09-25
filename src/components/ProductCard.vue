<script setup lang="ts">
import { Product } from '../types/Products';
import Card from 'primevue/card';
import Button from 'primevue/button';
import InputNumber from 'primevue/inputnumber'
import { ref, toRef, watch } from 'vue';

const props = defineProps({ 
    product: { type: {} as () => Product, required: true },
    inCartView: { type: Boolean, default: false },
    qts: { type: Number, default: 1 }
})
const emit = defineEmits(['addToCart', 'deleteFromCart', 'changeQts'])

const qts = toRef(props, 'qts')
const product = toRef(props, 'product')

const qtsRef = ref(qts.value)

const addToCart = () => {
    emit('addToCart', product.value)
}

const deleteFromCart = () => {
    emit('deleteFromCart', product.value)
}

watch(qtsRef, () => {
    emit('changeQts', product.value, qtsRef.value)
})
</script>

<template>
    <Card class="roundend w-[25rem] h-[35rem] flex flex-col justify-between">
        <template #header>
            <div class="w-full flex justify-center">
                <img class="h-72" alt="Product image" :src="product.thumbnail" />
            </div>
        </template>
        <template #title>{{ product.title }}</template>
        <template #subtitle>{{ product.category }}</template>
        <template #content>
            <div class="max-h-16 overflow-hidden">
                {{ product.description }}
            </div>
        </template>
        <template #footer>
            <div class="mt-3 w-full flex justify-end items-center">
                <InputNumber v-model="qtsRef" :max="99" :min="0" style="width: 8rem" class="mr-3" v-if="inCartView" inputId="horizontal-buttons" showButtons buttonLayout="horizontal" :step="1" fluid>
                    <template #incrementbuttonicon>
                        <span class="pi pi-plus" />
                    </template>
                    <template #decrementbuttonicon>
                        <span class="pi pi-minus" />
                    </template>
                </InputNumber>
                <div class="mr-3 text-xl font-semibold">
                    {{ product.price }} €
                </div>
                <Button v-if="!inCartView" @click="addToCart">Add to cart</Button>
                <Button v-else severity="danger" @click="deleteFromCart">Delete</Button>
            </div>
        </template>
    </Card>
</template>