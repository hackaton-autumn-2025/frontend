import {ref} from 'vue'
import useParseCSV from "@/features/csv/model/use-parse-csv";
import {RouteHistoryEntry, usePointHistoryStore} from "@/entities/point/store/point-history-store";

export const useCsvDialog = () => {
    const {parseLocalCSV, parseLocalXLSX} = useParseCSV()
    const pointHistoryStore = usePointHistoryStore()
    const csvDialog = ref(false)
    const selectedFile = ref<File | null>(null)

    const openCsvDialog = () => (csvDialog.value = true)
    const closeCsvDialog = () => {
        csvDialog.value = false
        selectedFile.value = null
    }

    const updateSelectedFile = (file: File | null) => {
        selectedFile.value = file
    }

    const handleCsvParse = async () => {
        if (!selectedFile.value) return

        try {
            const file = selectedFile.value
            let parsedEntries: RouteHistoryEntry[] = []

            if (file.name.endsWith('.csv')) {
                parsedEntries = await parseLocalCSV(file)
            } else if (file.name.endsWith('.xlsx')) {
                parsedEntries = await parseLocalXLSX(file)
            } else {
                console.error('Неподдерживаемый формат файла:', file.name)
                return
            }

            if (!Array.isArray(parsedEntries)) {
                console.error('Ошибка: парсер не вернул массив данных', parsedEntries)
                return
            }

            // Обновляем стор
            pointHistoryStore.pointHistory = [...parsedEntries]

            closeCsvDialog()
        } catch (err) {
            console.error('Ошибка при загрузке файла:', err)
        }
    }

    return {
        csvDialog,
        openCsvDialog,
        closeCsvDialog,
        selectedFile,
        updateSelectedFile,
        handleCsvParse
    }
}
