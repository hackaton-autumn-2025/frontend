import {defineStore} from "pinia";
import {ref} from "vue";
import {RoutePoint} from "@/entities/point/types/interfaces";

type PointListener = (point: RoutePoint) => void

export const usePointsStore =
    defineStore(
        'points',
        () => {
    const points = ref<RoutePoint[]>([])
    const listeners = ref<PointListener[]>([])

    const addPoint = (point: RoutePoint) => {
        points.value.push(point)
        listeners.value.forEach(listener => listener(point))
    }

    const removePoint = (point: RoutePoint) => {
        const index = points.value.indexOf(point)
        if (index !== -1) {
            points.value.splice(index, 1)
        }
    }

    const modifyPoint = (updatedPoint: RoutePoint) => {
        const index = points.value.findIndex(p => p.id === updatedPoint.id)
        if (index !== -1) {
            points.value[index] = { ...points.value[index], ...updatedPoint }
        }
    }

    const onAdd = (listener: PointListener) => {
        listeners.value.push(listener)
    }

    return {
        points,
        addPoint,
        removePoint,
        modifyPoint,
        onAdd,
        listeners
    }
})