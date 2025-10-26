import {OptimizedRoute} from "@/entities/route/types/interfaces";
import {API_URL} from "@/shared/utils/base-path";
import Cookies from 'js-cookie'
import {useQuery} from "@tanstack/vue-query";
import apiClient from "@/shared/axios";

type RouteHistory = OptimizedRoute[]

const useRouteHistory = () => {
    return useQuery<RouteHistory>({
        queryKey: ['routeHistory'],
        queryFn: async () => {
            const response = await apiClient.get(`${API_URL}/history/all`, {
                headers: {
                    "Authorization": `Bearer ${Cookies.get("access_token")}`,
                }
            })
            return response.data
        }
    })
}

export default useRouteHistory