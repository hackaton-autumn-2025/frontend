import {ref} from "vue";
import {defineStore} from "pinia";
import {RoutePoint} from "@/entities/point/types/interfaces";

export interface RouteHistoryEntry {
    address: string
    coords: [number, number]
    worktime: string
    lunch: string
    transport?: string
    level: string
    stop_duration: string
}

export const usePointHistoryStore =
    defineStore(
        'pointHistory',
        () => {
    const pointHistory = ref<RouteHistoryEntry[]>([])

    const addHistoryEntry = (point: RoutePoint) => {
        pointHistory.value.push({
            address: point.address,
            coords: [
                parseFloat(point.latitude ?? '0'),
                parseFloat(point.longitude ?? '0'),
            ],
            worktime: `${point.work_start} — ${point.work_end}`,
            lunch: `${point.lunch_start} — ${point.lunch_end}`,
            transport: point.transport_mode,
            level: point.priority || '—',
            stop_duration: ''
        })
    }

    return {pointHistory, addHistoryEntry}
})