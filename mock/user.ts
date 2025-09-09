import { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/adminUser/login',
    method: 'post',
    response: ({ body }) => {
      const { username, password } = body
      if (username === 'admin' && password === '123456') {
        return {
          resultCode: 200,
          message: '登录成功',
          data: 'mock-token-123456'
        }
      } else {
        return {
          resultCode: 419,
          message: '用户名或密码错误',
          data: null
        }
      }
    }
  },
  {
    url: '/api/adminUser/regist',
    method: 'post',
    response: ({ body }) => {
      const { username, password } = body
      if (username && password) {
        return {
          resultCode: 200,
          message: '注册成功',
          data: {
            username,
            id: Math.floor(Math.random() * 10000)
          }
        }
      } else {
        return {
          resultCode: 400,
          message: '注册失败，请检查输入信息',
          data: null
        }
      }
    }
  }
] as MockMethod[]
