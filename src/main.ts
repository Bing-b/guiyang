import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { Tabs, Tab, Button, Icon, Step, Steps } from 'vant'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)
app.use(Tabs)
app.use(Tab)
app.use(Button)
app.use(Icon)
app.use(Step)
app.use(Steps)

app.mount('#app')
