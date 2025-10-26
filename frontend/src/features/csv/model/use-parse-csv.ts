import Papa from 'papaparse'
import * as XLSX from 'xlsx'
import { RouteHistoryEntry } from "@/entities/point/store/point-history-store";

export default function useParseFile() {
    // --- CSV ---
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

    const parsePublicSheetCSV = async (sheetId: string): Promise<RouteHistoryEntry[]> => {
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

    // --- XLSX ---
    const parseLocalXLSX = async (file: File): Promise<RouteHistoryEntry[]> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()

            reader.onload = (event) => {
                try {
                    const data = event.target?.result
                    if (!data) throw new Error("Empty file")

                    const workbook = XLSX.read(data, { type: 'binary' })
                    const firstSheetName = workbook.SheetNames[0]
                    const worksheet = workbook.Sheets[firstSheetName]
                    const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' })

                    const parsed = transformToHistoryEntries(jsonData)
                    resolve(parsed)
                } catch (err) {
                    reject(err)
                }
            }

            reader.onerror = (err) => reject(err)
            reader.readAsBinaryString(file)
        })
    }

    const transformToHistoryEntries = (data: any[]): RouteHistoryEntry[] => {
        return data.map(item => {
            const lat = parseFloat(item["Географическая широта"])
            const lon = parseFloat(item["Географическая долгота"])

            return {
                address: item["Адрес объекта"] || '—',
                coords: !isNaN(lat) && !isNaN(lon) ? [lat, lon] : [0, 0],
                worktime: item["Время начала рабочего дня"] && item["Время окончания рабочего дня"]
                    ? `${item["Время начала рабочего дня"]} — ${item["Время окончания рабочего дня"]}`
                    : '—',
                lunch: item["Время начала обеда"] && item["Время окончания обеда"]
                    ? `${item["Время начала обеда"]} — ${item["Время окончания обеда"]}`
                    : '—',
                transport: item["Транспорт"] || '—',
                level: item["Уровень клиента"] || '—',
                stop_duration: ''
            }
        })
    }

    return {
        parseLocalCSV,
        parsePublicSheetCSV,
        parseLocalXLSX, // новый метод для Excel
    }
}
