/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 全局类型声明
declare global {
  interface Window {
    echarts: any
  }
}

// 扩展Vue全局属性
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $filters: {
      prefix: (url: string) => string
      orderMap: (status: number) => string
    }
  }
}

export {}
