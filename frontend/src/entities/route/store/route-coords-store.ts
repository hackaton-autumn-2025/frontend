import {ref} from "vue";
import {defineStore} from "pinia";
import {CreateRouteResponseDto} from "@/features/map/model/useMap";

export const useRouteCoordsStore =
    defineStore(
    'routeCoords',
        () => {
    const routeCoords = ref<[number, number][]>([])

    const setRouteCoords = (data: CreateRouteResponseDto) => {
        routeCoords.value = data.waypoints.map(wp => [wp.location.lon, wp.location.lat])
    }

    return {
        routeCoords,
        setRouteCoords
    }
})