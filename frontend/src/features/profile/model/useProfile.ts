import {reactive, ref} from "vue";
import useSaveUserHours from "@/entities/user/model/use-save-user-hours";
import {useNotificationStore} from "@/shared/store/notification-store";

interface UserWorkingOursDto {
    workStart: string
    workEnd: string
    lunchStart: string
    lunchEnd: string
}

const useProfile = (props: UserWorkingOursDto) => {
    const { workStart, workEnd, lunchStart, lunchEnd } = props;
    const isValid = ref<boolean>(false);
    const { mutate: updateUserWorkingHours } = useSaveUserHours()
    const notificationStore = useNotificationStore();
    const workingOursForm = reactive<UserWorkingOursDto>({
        workStart: workStart || '',
        workEnd: workEnd || '',
        lunchStart: lunchStart || '',
        lunchEnd: lunchEnd || '',
    })

    // Парсинг времени
    const formatTime = (timeStr: string) => {
        const [h, m] = timeStr.split(":").map(Number)
        return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`
    }

    // Сохранение графиков работы и обеда пользователя
    const saveWorkingOurs = () => {
        const requestObject = {
            work_start: formatTime(workingOursForm.workStart || "00:00"),
            work_end: formatTime(workingOursForm.workEnd || "00:00"),
            lunch_start: formatTime(workingOursForm.lunchStart || "00:00"),
            lunch_end: formatTime(workingOursForm.lunchEnd || "00:00"),
        }
        updateUserWorkingHours(requestObject, {
            onSuccess: () => {
                notificationStore.notifySuccess('Графики пользователя успешно обновлены!');
            },
            onError: (error) => {
                console.error('Ошибка при обновлении графиков пользователей:', error)
                notificationStore.notifyError('Ошибка при обновлении графиков пользователей');
            }
        })
    }

    return {
        workingOursForm,
        isValid,
        saveWorkingOurs
    }
}

export default useProfile;
