import Cookies from 'js-cookie'
import {LoginUserResponseDto, RegisterUserResponseDto} from "@/entities/user/types/interfaces";

const COOKIE_OPTIONS = {
    expires: 7,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
}

export const cookiesApi = {
    setAccessToken: (accessToken: string) => {
        try {
            Cookies.set('access_token', accessToken, COOKIE_OPTIONS)
        } catch (error) {
            console.error('Error setting access token cookie:', error)
        }
    },
    setRefreshToken: (refreshToken: string) => {
        try {
            Cookies.set('refresh_token', refreshToken, COOKIE_OPTIONS)
        } catch (error) {
            console.error('Error setting refresh token cookie:', error)
        }
    },
    setUserCookie: (user: RegisterUserResponseDto) => {
        Cookies.set('user', JSON.stringify(user), COOKIE_OPTIONS)
    },
    setTokensCookie: (tokens: LoginUserResponseDto) => {
        Cookies.set('access_token', tokens.access_token)
        Cookies.set('refresh_token', tokens.refresh_token)
    },
    setAuthCookies: (
        user: RegisterUserResponseDto,
        accessToken: string,
        refreshToken: string,
    ) => {
        Cookies.set('user', JSON.stringify(validatedUser), COOKIE_OPTIONS)
        Cookies.set('access_token', accessToken, COOKIE_OPTIONS)
        Cookies.set('refresh_token', refreshToken, COOKIE_OPTIONS)
    },
    getAuthCookies: () => {
        const userCookie = Cookies.get('user')
        const user = userCookie ? JSON.parse(userCookie) : null

        return {
            user,
            accessToken: Cookies.get('access_token'),
            refreshToken: Cookies.get('refresh_token'),
        }
    },
    getAccessToken: () => {
        return Cookies.get('access_token')
    },
    getRefreshToken: () => {
        return Cookies.get('refresh_token')
    },
    removeAuthCookies: () => {
        Cookies.remove('user', { path: '/' })
        Cookies.remove('access_token', { path: '/' })
        Cookies.remove('refresh_token', { path: '/' })
    },
    isAuthenticated: () => {
        return !!Cookies.get('access_token')
    },
    getUser: () => {
        const userCookie = Cookies.get('user')
        return userCookie ? JSON.parse(userCookie) : null
    },
}