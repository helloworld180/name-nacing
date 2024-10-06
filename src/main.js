// 引入createApp用于创建应用
import { createApp } from 'vue'
// 引入App.vue文件
import App from './App.vue'

import router from './router'

// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUI);

// new Vue({
//     el: '#app',
//     render: h => h(App)
//   });
  
const app = createApp(App)

app.use(router)

app.mount('#app')
