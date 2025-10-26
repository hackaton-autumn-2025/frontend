import apiClient from "@/shared/axios";
import {API_URL} from "@/shared/utils/base-path";
import {useMutation} from "@tanstack/vue-query";
import {UnoptimizedRoute} from "@/entities/route/types/interfaces";
import {CreateRouteResponseDto} from "@/features/map/model/useMap";

export const useRouteOptimization = () => {
    return useMutation<CreateRouteResponseDto, Error, UnoptimizedRoute>({
        mutationFn: async (routeData: UnoptimizedRoute) => {
            const response = await apiClient.post(`${API_URL}/location/create_route`, routeData);
            return response.data as CreateRouteResponseDto
        }
    });
};