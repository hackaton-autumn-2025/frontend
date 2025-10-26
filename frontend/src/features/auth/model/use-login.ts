import {ref} from "vue";
import {useLoginUser} from "@/entities/user/model/use-login-user";
import {LoginUserRequestDto} from "@/entities/user/types/interfaces";

const useLogin = () => {
    const { mutate: login, isPending: loading } = useLoginUser();

    const form = ref<LoginUserRequestDto>({
        username: '',
        password: ''
    })
    const isValid = ref(false)

    const rules = {
        required: (v: string) => !!v || 'Обязательное поле',
        email: (v: string) => /.+@.+\..+/.test(v) || 'Введите корректный email'
    }

    // Логин пользователя
    const onLogin = async () => {
        if (!isValid.value) return
        console.log({
            username: form.value.username,
            password: form.value.password,
        })
        login({
            username: form.value.username,
            password: form.value.password,
        })
    }

    return {
        form,
        rules,
        isValid,
        onLogin,
        loading,
    }
}

export default useLogin;