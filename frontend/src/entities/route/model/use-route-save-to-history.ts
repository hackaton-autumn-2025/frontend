import {useMutation} from "@tanstack/vue-query";
import apiClient from "@/shared/axios";
import {API_URL} from "@/shared/utils/base-path";
import Cookies from 'js-cookie'
import {OptimizedRoute} from "@/entities/route/types/interfaces";

const useRouteSaveToHistory = () => {
    return useMutation({
        mutationFn: async (data: OptimizedRoute) => {
            const response = await apiClient.post(`${API_URL}/history`, data,{
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('access_token'),
                }
            })
            return response.data;
        }
    })
}

export default useRouteSaveToHistory;