import {ref} from "vue";
import {RegisterUserRequestDto} from "@/entities/user/types/interfaces";
import {useRegisterUser} from "@/entities/user/model/use-register-user";

const useRegister = () => {
    const { mutation, errorMessage } = useRegisterUser();
    const { mutate: register, isPending: loading } = mutation
    const form = ref<RegisterUserRequestDto>({
        name: '',
        password: ''
    })

    const isValid = ref(false)

    const rules = {
        required: (v: string) => !!v || 'Обязательное поле',
        email: (v: string) => /.+@.+\..+/.test(v) || 'Введите корректный email'
    }

    // Регистрация пользователя
    const onRegister = async () => {
        if (!isValid.value) return

        register({
            name: form.value.name,
            password: form.value.password,
        })
    }

    return {
        form,
        rules,
        isValid,
        onRegister,
        loading,
        errorMessage,
    }
}

export default useRegister;