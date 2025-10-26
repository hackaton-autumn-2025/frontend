import {onMounted, ref, computed} from 'vue'
import {usePointsStore} from "@/entities/point/store/points-store";
import {usePointHistoryStore} from "@/entities/point/store/point-history-store";
import {RoutePoint} from "@/entities/point/types/interfaces";
import {DataTableHeader} from "vuetify/framework";

export default function usePointHistory() {
    const loading = ref(false)
    const totalItems = ref(0)

    const pointsStore = usePointsStore()
    const pointHistoryStore = usePointHistoryStore()

    const headers: DataTableHeader[] = [
        {title: 'Адрес', key: 'address', align: 'start'},
        {title: 'Координаты', key: 'coords'},
        {title: 'Рабочий день', key: 'worktime'},
        {title: 'Обед', key: 'lunch'},
        {title: 'Транспорт', key: 'transport'},
        {title: 'Уровень клиента', key: 'level'},
    ]

    const mapRoutePointToTableItem = (point: RoutePoint) => ({
        address: point.address,
        coords: point.latitude && point.longitude
            ? `${point.latitude}, ${point.longitude}`
            : '—',
        worktime: point.work_start && point.work_end
            ? `${point.work_start} — ${point.work_end}` : '—',
        lunch: point.lunch_start && point.lunch_end
            ? `${point.lunch_start} — ${point.lunch_end}` : '—',
        transport: point.transport_mode || '—',
        level: point.priority || '—',
    })

    const mapCsvEntryToTableItem = (entry: any) => ({
        address: entry.address || '—',
        coords: entry.coords || '—',
        worktime: entry.worktime || '—',
        lunch: entry.lunch || '—',
        transport: entry.transport || '—',
        level: entry.level || '—',
    })

    const serverItems = computed(() => {
        const pointsItems = pointsStore.points.map(mapRoutePointToTableItem)
        const historyItems = pointHistoryStore.pointHistory.map(mapCsvEntryToTableItem)
        totalItems.value = pointsItems.length + historyItems.length
        return [...pointsItems, ...historyItems]
    })

    const options = ref({
        page: 1,
        itemsPerPage: 5
    })

    const paginatedItems = computed(() => {
        const start = (options.value.page - 1) * options.value.itemsPerPage
        const end = start + options.value.itemsPerPage
        return serverItems.value.slice(start, end)
    })

    onMounted(() => {
        pointsStore.onAdd(() => {})
    })

    return {
        headers,
        serverItems,
        totalItems,
        loading,
        options,
        paginatedItems,
        items: pointHistoryStore.pointHistory
    }
}
