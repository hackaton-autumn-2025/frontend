import {useRouter} from 'vue-router'
import Cookies from 'js-cookie'
import {onMounted} from 'vue'

export const useUserAuthenticated = () => {
    const router = useRouter()

    onMounted(async () => {
        const accessToken = Cookies.get('accessToken')
        const refreshToken = Cookies.get('refreshToken')

        if (accessToken && refreshToken) {
            await router.replace('/dashboard')
        } else {
            await router.replace('/login')
        }
    })
}
