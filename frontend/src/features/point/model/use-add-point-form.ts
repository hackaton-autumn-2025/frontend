import {reactive, ref} from 'vue'
import type {RoutePoint} from '@/entities/point/types/interfaces'
import {useNotificationStore} from "@/shared/store/notification-store"
import {usePointsStore} from "@/entities/point/store/points-store";
import {usePointHistoryStore} from "@/entities/point/store/point-history-store";
import {useRouteOptimization} from "@/entities/route/model/use-route-optimization";
import {
    OptimizedRoute,
    ROUTE_TRANSPORT_MODE,
    UnoptimizedRoute,
    UnoptimizedRoutePoint
} from "@/entities/route/types/interfaces";
import {useRouteCoordsStore} from "@/entities/route/store/route-coords-store";
import useRouteSaveToHistory from "@/entities/route/model/use-route-save-to-history";

const useAddPointForm = () => {
    const isValid = ref(false)
    const notificationStore = useNotificationStore()
    const pointsStore = usePointsStore()
    const pointHistoryStore = usePointHistoryStore()
    const routeCoordsStore = useRouteCoordsStore()

    const {
        mutate: optimizeRoute,
        isPending: isOptimizing,
        isSuccess: optimizationSuccess
    } = useRouteOptimization()

    const {
        mutate: saveOptimizedRoute
    } = useRouteSaveToHistory()

    const form = reactive<Omit<RoutePoint, 'id'>>({
        address: '',
        latitude: null,
        longitude: null,
        work_start: '09:00',
        work_end: '18:00',
        lunch_start: '13:00',
        lunch_end: '14:00',
        transport_mode: 'Пешком',
        priority: '',
        time_to_stop: '5 мин',
        start_time: ''
    })

    const transportModeMap = {
        'Пешком': ROUTE_TRANSPORT_MODE.WALK,
        'Автомобиль': ROUTE_TRANSPORT_MODE.CAR
    } as const

    type FormTransportMode = keyof typeof transportModeMap

    const rules = {
        required: (v: string) => !!v || 'Обязательное поле',
    }

    const resetForm = () => {
        Object.assign(form, {
            address: '',
            latitude: null,
            longitude: null,
            work_start: '09:00',
            work_end: '18:00',
            lunch_start: '13:00',
            lunch_end: '14:00',
            transport_mode: 'Пешком',
            priority: '',
            timeToStop: '30 мин',
            startTime: ''
        })
    }

    // Парсинг отдельной точки для записи на бэкэнд
    const parsePoint = (p: any): UnoptimizedRoutePoint => {
        const [lat, lon] = p.coords;
        const [work_start, work_end] = p.worktime.split('—').map((s: string) => s.trim());
        const [lunch_start, lunch_end] = p.lunch.split('—').map((s: string) => s.trim());

        return {
            address: p.address,
            coordinate: { lat, lon },
            work_start,
            work_end,
            lunch_start,
            lunch_end,
            stop_duration: "00:00",
            client_level: p.level.toUpperCase(),
        };
    };

    // Формирование объекта маршрута на базе объекта формы
    const prepareRouteDataForOptimization = (): UnoptimizedRoute => {
        console.log(pointHistoryStore.pointHistory)
        const routes_request: UnoptimizedRoutePoint[] = pointHistoryStore.pointHistory.map(p =>
            parsePoint(p)
        );

        return {
            routes_request,
            transport_mode: transportModeMap[form.transport_mode as FormTransportMode],
            start_time: "09:00",
        };
    };

    // Формирование объекта оптимизированного маршрута для сохранения в истории
    const prepareRouteDataForSave = (): OptimizedRoute => {
        const routes_point: UnoptimizedRoutePoint[] = pointHistoryStore.pointHistory.map(p =>
            parsePoint(p)
        );

        return {
            routes_point,
            transport_mode: transportModeMap[form.transport_mode as FormTransportMode],
            traffic_level: 1,
            start_time: "09:00",
            current_date: new Date().getDate().toString()
        };
    };

    // Добавление точки в историю маршрута
    const addPointToRoute = () => {
        if (!isValid.value) return

        const newPoint = {id: crypto.randomUUID(), ...form}
        pointsStore.addPoint(newPoint)
        pointHistoryStore.addHistoryEntry(newPoint)

        resetForm()

        notificationStore.notifySuccess('Успешно добавлена точка маршрута!')
    }

    // Отправка собранного маршрута на оптимизацию
    const submitRouteToOptimize = () => {
        const routeData = prepareRouteDataForOptimization()

        optimizeRoute(routeData, {
            onSuccess: (data) => {
                routeCoordsStore.setRouteCoords(data)
                notificationStore.notifySuccess('Маршрут успешно оптимизирован!')
            },
            onError: (err) => {
                console.error("Ошибка оптимизации маршрута:", err);
                notificationStore.notifyError('Ошибка при оптимизации маршрута!')
            }
        });
    }

    // Сохранить маршрут в истории
    const saveRouteToHistory = () => {
        const routeData = prepareRouteDataForSave()
        saveOptimizedRoute(routeData, {
            onSuccess: () => {
                notificationStore.notifySuccess('Маршрут успешно сохранён в историю!')
            },
            onError: (err) => {
                console.error('Ошибка при сохранении маршрута в историю:', err)
                notificationStore.notifyError('Ошибка при сохранении маршрута в историю!')
            }
        })
    }

    return {
        form,
        isValid,
        rules,
        saveRouteToHistory,
        submitRouteToOptimize,
        isOptimizing,
        optimizationSuccess,
        resetForm,
        addPointToRoute,
    }
}

export default useAddPointForm
