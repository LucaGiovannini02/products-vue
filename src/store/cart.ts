import { defineStore } from "pinia";
import { Product } from "../types/Products";
import { ref, watch } from "vue";

export interface ProductWithQts {
    product: Product,
    qts: Number
}

export const useCartStore = defineStore('cart', () => {
    const cart = ref<ProductWithQts[]>(getCartLocaly())

    watch(cart, () => saveCartLocaly(cart.value))

    const addToCart = (product: Product) => {
        const aus = cart.value.filter(i => i.product.id == product.id)[0]

        if(aus) {
            cart.value = cart.value.map(i => {
                if(i.product.id == product.id)
                    return { ...i, qts: +i.qts + 1 }

                return i
            })
        } else {
            cart.value.push({ product, qts: 1 })
        }
    }

    const removeToCart = (product: Product) => {
        cart.value = [...cart.value.filter(aus => aus.product.id != product.id)]
    }

    const changeQts = (product: Product, qt: Number) => {
        if(+qt <= 0) {
            removeToCart(product)
        } else {
            cart.value = cart.value.map(i => {
                if(i.product.id == product.id) {
                    return { ...i, qts: qt }
                }

                return i
            })
        }
    }

    return { cart, addToCart, removeToCart, changeQts }
})

function saveCartLocaly(cart: any) {
    localStorage.setItem('cart', JSON.stringify(cart))
}

function getCartLocaly() {
    return JSON.parse(localStorage.getItem('cart') || '[]') as ProductWithQts[]
}