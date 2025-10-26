export interface LoginUserRequestDto {
    username: string
    password: string
}

export interface RegisterUserRequestDto {
    name: string
    password: string
}

export interface LoginUserResponseDto {
    access_token: string
    refresh_token: string
    token_type: "bearer"
}

export interface RegisterUserResponseDto {
    id: number
    name: string
    is_active: boolean
    created_at: string
}

export interface CurrentUser {
    id: number,
    name: string,
    is_active: true,
    created_at: string
    work_start: string
    work_end: string
    lunch_start: string
    lunch_end: string
}