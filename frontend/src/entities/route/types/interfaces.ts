export enum ROUTE_TRANSPORT_MODE {
    CAR = 'CAR',
    WALK = 'WALK'
}

export interface RoutePointCoordinates {
    lat: number
    lon: number
}

export interface UnoptimizedRoutePoint {
    address: string
    coordinate: RoutePointCoordinates
    work_start: string
    work_end: string
    lunch_start: string
    lunch_end: string
    stop_duration: string
    client_level?: string
}

export interface UnoptimizedRoute {
    routes_request: UnoptimizedRoutePoint[]
    transport_mode: ROUTE_TRANSPORT_MODE.CAR | ROUTE_TRANSPORT_MODE.WALK;
    start_time: string
}

export interface OptimizedRoute {
    routes_point: UnoptimizedRoutePoint[]
    traffic_level: 1
    transport_mode: ROUTE_TRANSPORT_MODE.CAR | ROUTE_TRANSPORT_MODE.WALK;
    start_time: string
    current_date: string
}

export interface OptimizedWaypoint {
    hint: string
    location: RoutePointCoordinates
    name: string
    distance: number
}