// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


createApp(App).use(router).mount('#app')
App.use(ElementPlus)






// import { createApp } from 'vue'
// import App from './App.vue'

// createApp(App).mount('#app')
