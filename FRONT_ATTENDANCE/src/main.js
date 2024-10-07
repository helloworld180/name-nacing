// 引入createApp用于创建应用
import { createApp } from 'vue'
// 引入App.vue文件
import App from './App.vue'

import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


// new Vue({
//     el: '#app',
//     render: h => h(App)
//   });
  
const app = createApp(App)

app.use(router)
app.use(ElementPlus)
app.mount('#app')
