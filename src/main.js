import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import router from '@/router'
//引入icon组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 移除默认样式导入，使用自定义主题
// import 'element-plus/dist/index.css'

const app = createApp(App)
//引用路由实例
app.use(router)  
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
//挂载element-plus
app.use(ElementPlus)

//挂载
app.mount('#app')