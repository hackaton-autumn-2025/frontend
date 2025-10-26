import {CurrentUser} from "@/entities/user/types/interfaces";
import {useQuery} from "@tanstack/vue-query";
import {API_URL} from "@/shared/utils/base-path";
import apiClient from "@/shared/axios";

const useCurrentUser = () => {
    return useQuery<CurrentUser>({
        queryKey: ['currentUser'],
        queryFn: async () => {
            const response = await apiClient.get(`${API_URL}/user/me`)
            return response.data
        }
    })
}

export default useCurrentUser;