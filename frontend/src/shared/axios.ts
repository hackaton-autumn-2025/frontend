import axios from 'axios'
import {cookiesApi} from '@/shared/lib/helpers/cookies'
import {AuthService} from '@/shared/lib/service/auth.service'
import {API_URL} from '@/shared/utils/base-path'

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

apiClient.interceptors.request.use(
    config => {
        const accessToken = cookiesApi.getAccessToken()

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }

        return config
    },
    error => {
        return Promise.reject(error)
    },
)

apiClient.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config

        if (error.response?.status === 400) {
            return Promise.reject({
                message: error.response.data?.detail || 'Bad Request',
                status: 400,
                isAxiosError: true,
                response: error.response,
            })
        }

        if (error.response?.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true

            const refreshToken = cookiesApi.getRefreshToken()

            if (!refreshToken) {
                AuthService.gracefulLogout()
                return Promise.reject(error)
            }

            try {
                const response = await axios.post(
                    `${API_URL}/user/access_token`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${refreshToken}`,
                        },
                    },
                )

                cookiesApi.setTokensCookie({
                    accessToken: response.data.access_token,
                    refreshToken: refreshToken,
                })

                originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`
                return apiClient(originalRequest)
            } catch (error) {
                AuthService.gracefulLogout()
                return Promise.reject(error)
            }
        }

        return Promise.reject(error)
    },
)

export default apiClient