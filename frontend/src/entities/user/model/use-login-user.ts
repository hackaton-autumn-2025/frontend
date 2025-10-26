import {useMutation} from '@tanstack/vue-query'
import {API_URL} from '@/shared/utils/base-path'
import apiClient from "@/shared/axios";
import {cookiesApi} from "@/shared/lib/helpers/cookies";
import {useNotificationStore} from "@/shared/store/notification-store";
import {LoginUserRequestDto, LoginUserResponseDto} from "@/entities/user/types/interfaces";
import {useRouter} from "vue-router";

export const useLoginUser = () => {
    const notificationStore = useNotificationStore()
    const router = useRouter()

    return useMutation({
        mutationFn: async (data: LoginUserRequestDto): Promise<LoginUserResponseDto> => {
            const response = await apiClient.post(`${API_URL}/user/login`, data, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            })
            return response.data
        },
        onSuccess: async (data) => {
            notificationStore.notifySuccess('Пользователь успешно вошёл в систему!')
            cookiesApi.setTokensCookie(data)
            await router.push('/dashboard')
        },
        onError: (data) => {
            console.error('Ошибка при логине:', data)
            notificationStore.notifyError('Ошибка при логине')
        }
    })
}