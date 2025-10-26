export interface RoutePoint {
    id: string;
    address: string
    latitude: string | null
    longitude: string | null
    work_start: string
    work_end: string
    lunch_start: string
    lunch_end: string
    transport_mode: string
    client_level: string
    time_to_stop: string
    start_time: string
}