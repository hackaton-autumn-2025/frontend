import {defineStore} from 'pinia';
import {reactive} from 'vue';

export const useRoutePointStore =
    defineStore(
        'routePoint',
        () => {
    const selectedPoint = reactive({
        address: '',
        start_time: '',
        latitude: '',
        longitude: '',
        work_start: '',
        work_end: '',
        lunch_start: '',
        lunch_end: '',
        transport_mode: '',
        priority: '',
        time_to_stop: ''
    });

    const setSelectedPoint = (data: Partial<typeof selectedPoint>) => {
        Object.assign(selectedPoint, data);
    };

    const resetSelectedPoint = () => {
        (Object.keys(selectedPoint) as (keyof typeof selectedPoint)[])
            .forEach((key) => selectedPoint[key] = '');
    };

    return {selectedPoint, setSelectedPoint, resetSelectedPoint};
});