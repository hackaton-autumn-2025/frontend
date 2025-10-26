import {ref, onMounted, watch} from 'vue'
import * as L from 'leaflet'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'
import {RoutePointCoordinates} from "@/entities/route/types/interfaces";
import {useRouteCoordsStore} from "@/entities/route/store/route-coords-store";

interface RouteServerWaypoint {
    distance: number
    hint: string
    location: RoutePointCoordinates
    name: string
}

export interface CreateRouteResponseDto {
    waypoints: RouteServerWaypoint[]
}

export const useMap = () => {
    // Настройка иконок Leaflet
    delete (L.Icon.Default.prototype as any)._getIconUrl
    L.Icon.Default.mergeOptions({iconRetinaUrl, iconUrl, shadowUrl})

    const mapStatus = ref<'empty' | 'ready'>('empty')
    const mapContainer = ref<HTMLElement | null>(null)
    const MAPBOX_TOKEN = 'YOUR_MAPBOX_TOKEN'
    const routeCoordsStore = useRouteCoordsStore()
    let mapInstance: L.Map | null = null

    // Инициализация карты
    const initializeMap = (): L.Map | null => {
        if (!mapContainer.value) return null

        // Если карта уже создана — удаляем старую
        if (mapInstance) {
            mapInstance.remove()
            mapInstance = null
        }

        const map = L.map(mapContainer.value)
        mapInstance = map

        // Базовая OSM карта
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(map)

        // Слой пробок Mapbox
        L.tileLayer(
            `https://api.mapbox.com/styles/v1/mapbox/traffic-day-v2/tiles/{z}/{x}/{y}?access_token=${MAPBOX_TOKEN}`,
            {
                tileSize: 512,
                zoomOffset: -1,
                attribution: '&copy; <a href="https://www.mapbox.com/">Mapbox</a>',
            }
        ).addTo(map)

        return map
    }

    // Получение всех точек маршрута
    const getAllWaypoints = async () => {
        if (!routeCoordsStore.routeCoords.length) return null
        const baseURL = 'https://router.project-osrm.org/route/v1/driving/'
        const suffix = '?overview=full&geometries=geojson'
        const coords: string = routeCoordsStore.routeCoords.map(([lng, lat]) => `${lng},${lat}`).join(';')
        const url = baseURL + coords + suffix
        const res = await fetch(url)
        return await res.json()
    }

    // Генерация случайной загруженности для сегментов маршрута
    const getRandomCongestion = () => Math.floor(Math.random() * 5) + 1

    // Отрисовка маршрута с цветом в зависимости от загруженности
    const drawRouteWithCongestion = (map: L.Map, data: any) => {
        if (!data.routes || data.routes.length === 0) return

        const geometry = data.routes[0].geometry
        const coords: L.LatLngExpression[] = geometry.coordinates.map(([lng, lat]: [number, number]) => [lat, lng])

        const segmentLength = Math.ceil(coords.length / 5)
        let congestionLevels: number[] = []

        for (let i = 0; i < coords.length - 1; i += segmentLength) {
            const segmentCongestion = getRandomCongestion()
            congestionLevels.push(segmentCongestion)

            const segmentCoords = coords.slice(i, Math.min(i + segmentLength + 1, coords.length))

            // let color = 'green'
            // if (segmentCongestion >= 4) color = 'red'
            // else if (segmentCongestion >= 2) color = 'orange'

            L.polyline(segmentCoords, {
                color: 'green',
                weight: 6,
                opacity: 0.8
            }).addTo(map)
        }

        const averageCongestion = (congestionLevels.reduce((sum, level) => sum + level, 0) / congestionLevels.length).toFixed(1)
        const blockColor = Number(averageCongestion) >= 4 ? 'red' : Number(averageCongestion) >= 2 ? 'orange' : 'green'

        const html = `
            <div class="btn-shadow">
              <h4 style="margin: 0 0 8px 0;">Загруженность дорог</h4>
              <div style="display: flex; align-items: center; gap: 10px;">
                <div style="font-size: 20px; font-weight: bold; color: ${blockColor}">
                  ${averageCongestion}/5
                </div>
              </div>
              <div style="margin-top: 8px; font-size: 12px; color: #666;">
                <div>🟢 Легкая (1-2)</div>
                <div>🟠 Средняя (3)</div>
                <div>🔴 Высокая (4-5)</div>
              </div>
            </div>
        `

        const infoPanel = new L.Control({ position: 'topright' });
        infoPanel.onAdd = function () {
            const div = L.DomUtil.create('div', 'congestion-info');
            div.innerHTML = html;
            return div;
        };
        infoPanel.addTo(map);


        map.fitBounds(L.latLngBounds(coords))
    }

    // Обновление карты при изменении координат
    const updateMap = async () => {
        if (!routeCoordsStore.routeCoords.length) {
            mapStatus.value = 'empty'
            if (mapContainer.value) mapContainer.value.innerHTML = '<p>Нет данных для карты</p>'
            return
        }

        const map = initializeMap()
        if (!map) return

        const data = await getAllWaypoints()
        if (!data) return

        drawRouteWithCongestion(map, data)
        mapStatus.value = 'ready'
    }

    onMounted(() => {
        updateMap()
    })

    // Перезапуск карты при изменении routeCoords
    watch(
        () => routeCoordsStore.routeCoords,
        () => {
            updateMap()
        },
        { deep: true }
    )

    return {
        mapContainer,
        mapStatus
    }
}
