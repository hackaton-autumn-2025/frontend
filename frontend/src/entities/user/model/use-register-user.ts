import {ref} from "vue";
import {useMutation} from '@tanstack/vue-query'
import {API_URL} from '@/shared/utils/base-path'
import apiClient from "@/shared/axios"
import {useNotificationStore} from "@/shared/store/notification-store"
import {RegisterUserRequestDto, RegisterUserResponseDto} from "@/entities/user/types/interfaces"
import {useRouter} from "vue-router";
import {cookiesApi} from "@/shared/lib/helpers/cookies";
import {AxiosError} from "axios";

export const useRegisterUser = () => {
    const notificationStore = useNotificationStore()
    const router = useRouter()
    const errorMessage = ref<string | null>(null)

    const mutation = useMutation({
        mutationFn: async (data: RegisterUserRequestDto): Promise<RegisterUserResponseDto> => {
            const response = await apiClient.post(`${API_URL}/user`, data)
            return response.data
        },
        onSuccess: async (data) => {
            notificationStore.notifySuccess('Пользователь успешно зарегистрирован!')
            cookiesApi.setUserCookie(data)
            await router.push('/login')
        },
        onError: async (error) => {
            const axiosError = error as AxiosError
            if (axiosError.response?.status === 409) {
                errorMessage.value = 'Пользователь уже существует'
            } else {
                errorMessage.value = 'Ошибка при регистрации'
            }
        }
    })

    return {
        mutation,
        errorMessage,
    }
}
