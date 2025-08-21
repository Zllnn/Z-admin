import axios, { AxiosResponse } from "axios";
import { ElMessage } from 'element-plus'
import { localGet } from './index'
import config from '../../config'

interface ApiResponse<T = any> {
  resultCode: number;
  message?: string;
  data: T;
}

//从环境变量配置中获取baseURL
axios.defaults.baseURL = config[import.meta.env.MODE as keyof typeof config].baseURL
//携带cookie
axios.defaults.withCredentials = true
//请求头，headers信息
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers['token'] = localGet('token') || ''
//默认post请求，使用application/json 形式
axios.defaults.headers.post['Content-Type'] = 'application/json'

//响应拦截器，内部根据返回值，重新组装，统一管理
axios.interceptors.response.use((res: AxiosResponse<ApiResponse>) => {
  if (typeof res.data !== 'object') {
    ElMessage.error('服务端异常！')
    return Promise.reject(res)
  }
  if (res.data.resultCode != 200) {
    if (res.data.message) ElMessage.error(res.data.message)
    if (res.data.resultCode == 419) {   //未登录
      // router.push({ path: '/login' })
    }
    return Promise.reject(res.data)
  }

  return res.data.data
})

export default axios
