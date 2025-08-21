import { createApp } from 'vue'
import './styles/main.scss'
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
  prefix(url: string): string {
    if (url && url.startsWith('http')) {
      // 当 url 以 http 开头时候，我们返回原路径
      return url
    } else {
      // 否则，我们给路径添加 host，如下
      url = ''
      return url
    }
  },
  orderMap(status: number): string {
    return orderStatus[status] || '未知状态'
  }
}

//每次翻页之后将滚动条滑动到顶部
app.config.globalProperties.goTop = function (): void {
  const main = document.querySelector('.main') as HTMLElement
  if (main) {
    main.scrollTop = 0
  }
}

const orderStatus: Record<string | number, string> = {
  0: '待支付',
  1: '已支付',
  2: '配货完成',
  3: '出库成功',
  4: '交易成功',
  '-1': '手动关闭',
  '-2': '超时关闭',
  '-3': '商家关闭'
}

// 全局方法
app.config.globalProperties.$filters = {
  orderMap(status: number): string {
    return orderStatus[status] || '未知状态'
  },
  prefix(url: string): string {
    if (url && url.startsWith('http')) {
      return url
    } else {
      // 否则，我们给路径添加 host
      url = ''
      return url
    }
  }
}

//挂载
app.mount('#app')
