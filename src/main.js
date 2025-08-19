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

// 全局方法,防止图片路径出错
app.config.globalProperties.$filters = {
  prefix(url) {
    if (url && url.startsWith('http')) {
      // 当 url 以 http 开头时候，我们返回原路径
      return url
    } else {
      // 否则，我们给路径添加 host，如下
      url = ''
      return url
    }
  }
}

//每次翻页之后将滚动条滑动到顶部
app.config.globalProperties.goTop = function () {
  const main = document.querySelector('.main')
  main.scrollTop = 0
}

//挂载
app.mount('#app')