import { ref } from "vue"
import API from "../utils/axios"
import { HttpCalls } from "../types/HttpCalls"

const useAxios = <T = null>(path: string = "") => {
    const data = ref<T | null>(null)
    const error = ref<string | null>(null)
    const pending = ref<boolean>(false)

    const call = (info: Partial<{method: HttpCalls, body: {} | null, query: string | null}> = {}) => {
        data.value = null
        pending.value = true
        let ausPath = path
        
        if(info.query) {
            ausPath += `/search?q=${info.query}`
        }

        API[info.method ? info.method : "get"](ausPath).then(res => {
            data.value = res.data
        }).catch((e) => {
            error.value = e
        }).finally(() => {
            pending.value = false
        })
    }

    return { data, error, pending, call }
}

export default useAxios