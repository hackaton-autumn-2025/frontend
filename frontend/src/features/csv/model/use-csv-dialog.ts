import {ref} from 'vue'
import useParseCSV from "@/features/csv/model/use-parse-csv";
import {usePointHistoryStore} from "@/entities/point/store/point-history-store";

export const useCsvDialog = () => {
    const {parseLocalCSV} = useParseCSV()
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
            const parsedEntries = await parseLocalCSV(selectedFile.value)

            if (!Array.isArray(parsedEntries)) {
                console.error('Ошибка: парсер не вернул массив данных', parsedEntries)
                return
            }

            pointHistoryStore.pointHistory = []
            parsedEntries.forEach(entry => {
                pointHistoryStore.pointHistory.push(entry)
            })

            closeCsvDialog()
        } catch (err) {
            console.error('Ошибка при загрузке CSV:', err)
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
