import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useNotificationStore = defineStore('notification', () => {
    const show = ref(false)
    const message = ref('')
    const color = ref<'success' | 'error' | 'info'>('info')

    function notifySuccess(text: string) {
        message.value = text
        color.value = 'success'
        show.value = true
    }

    function notifyError(text: string) {
        message.value = text
        color.value = 'error'
        show.value = true
    }

    return {
        show,
        message,
        color,
        notifySuccess,
        notifyError,
    }
})
