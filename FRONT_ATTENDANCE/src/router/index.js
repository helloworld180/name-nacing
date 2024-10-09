import { createRouter, createWebHistory} from 'vue-router'

// 引入路由组件
import login from '@/views/login2.vue'
import home from '@/views/home.vue'
import importFile from '@/views/importFile.vue'
import ruleSetting from '@/views/ruleSetting.vue'
import seeChart from '@/views/seeChart.vue'
import beginCall from '@/views/beginCall.vue'
import result from '@/views/result.vue'

// 创建路由器
const router = createRouter({
  // 路由器的工作模式
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      // name: 'home',
      component: login
    },
    {
      path:'/home',
      component: home,
      children:[
        {
          path:'importFile',
          component: importFile
        },
        {
          path:'ruleSetting',
          component: ruleSetting
        },
        {
          path:'seeChart',
          component:seeChart
        }
      ]
    },
    {
      path:'/beginCall',
      component:beginCall
    },
    {
      path:'/result',
      component:result
    }
    
  ]
})

export default router
