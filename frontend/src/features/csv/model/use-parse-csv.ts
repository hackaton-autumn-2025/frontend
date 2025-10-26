import Papa from 'papaparse'
import {RouteHistoryEntry} from "@/entities/point/store/point-history-store";

export default function useParseCSV() {
    const parseLocalCSV = async (file: File): Promise<RouteHistoryEntry[]> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()

            reader.onload = (event) => {
                const csvText = event.target?.result as string

                Papa.parse(csvText, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (results) => {
                        try {
                            const parsed = transformToHistoryEntries(results.data)
                            resolve(parsed)
                        } catch (e) {
                            reject(e)
                        }
                    },
                    error: (err: Error) => reject(err),
                })
            }

            reader.onerror = (err) => reject(err)
            reader.readAsText(file, 'UTF-8')
        })
    }

    const parsePublicSheet = async (sheetId: string): Promise<RouteHistoryEntry[]> => {
        const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv`
        const response = await fetch(csvUrl)
        const csvText = await response.text()

        return new Promise((resolve) => {
            Papa.parse(csvText, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    resolve(transformToHistoryEntries(results.data))
                },
            })
        })
    }

    const transformToHistoryEntries = (data: any[]): RouteHistoryEntry[] => {
        return data.map(item => {
            const lat = parseFloat(item["Географическая широта"]);
            const lon = parseFloat(item["Географическая долгота"]);

            return {
                address: item["Адрес объекта"] || '—',
                coords: !isNaN(lat) && !isNaN(lon) ? [lat, lon] : [0, 0], // корректный [number, number]
                worktime: item["Время начала рабочего дня"] && item["Время окончания рабочего дня"]
                    ? `${item["Время начала рабочего дня"]} — ${item["Время окончания рабочего дня"]}`
                    : '—',
                lunch: item["Время начала обеда"] && item["Время окончания обеда"]
                    ? `${item["Время начала обеда"]} — ${item["Время окончания обеда"]}`
                    : '—',
                transport: item["Транспорт"] || '—',
                level: item["Уровень клиента"] || '—',
                stop_duration: ''
            };
        });
    }

    return {
        parseLocalCSV,
        parsePublicSheet,
    }
}
