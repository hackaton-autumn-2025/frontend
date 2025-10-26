import {createApp} from 'vue'
import {VueQueryPlugin} from '@tanstack/vue-query'
import {queryClient} from '@/app/query-client'
import {router} from "@/app/router";
import {createPinia} from "pinia";
import {createVuetify} from "vuetify/framework";
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import 'leaflet/dist/leaflet.css';
import '../styles/main.scss'
import App from '@/App.vue'

const pinia = createPinia()
const vueApp = createApp(App)
const vuetify = createVuetify()

vueApp
    .use(pinia)
    .use(vuetify)
    .use(router)
    .use(VueQueryPlugin, { queryClient })
    .mount('#app')
