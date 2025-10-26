import {API_URL} from "@/shared/utils/base-path";
import {useMutation} from "@tanstack/vue-query";
import apiClient from "@/shared/axios";
import {CurrentUser} from "@/entities/user/types/interfaces";

interface UpdateCurrentUserDto {
    name: string
    work_start: string
    work_end: string
    lunch_start: string
    lunch_end: string
}

const useSaveUserHours = () => {
    return useMutation<CurrentUser, unknown, Partial<UpdateCurrentUserDto>>({
        mutationFn: async (data: Partial<UpdateCurrentUserDto>) => {
            const response = await apiClient.patch(`${API_URL}/user/update`, data)
            return response.data
        }
    })
}

export default useSaveUserHours;