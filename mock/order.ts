import { MockMethod } from 'vite-plugin-mock'

const mockOrders = [
  {
    orderId: 1001,
    orderNo: "202401150001",
    totalPrice: 3999,
    payStatus: 1,
    payType: 1,
    orderStatus: 1,
    extraInfo: "请尽快发货",
    userAddress: "北京市朝阳区xxx街道",
    userName: "张三",
    userPhone: "13800138000",
    createTime: "2024-01-15 10:30:00",
    updateTime: "2024-01-15 10:30:00"
  },
  {
    orderId: 1002,
    orderNo: "202401150002",
    totalPrice: 8999,
    payStatus: 0,
    payType: 0,
    orderStatus: 0,
    extraInfo: "",
    userAddress: "上海市浦东新区xxx路",
    userName: "李四",
    userPhone: "13900139000",
    createTime: "2024-01-15 11:00:00",
    updateTime: "2024-01-15 11:00:00"
  },
  {
    orderId: 1003,
    orderNo: "202401150003",
    totalPrice: 400,
    payStatus: 1,
    payType: 2,
    orderStatus: 2,
    extraInfo: "请包装好一点",
    userAddress: "广州市天河区xxx大道",
    userName: "王五",
    userPhone: "13700137000",
    createTime: "2024-01-15 12:00:00",
    updateTime: "2024-01-15 12:00:00"
  }
]

export default [
  {
    url: '/api/orders',
    method: 'get',
    response: ({ query }) => {
      const { pageNumber = 1, pageSize = 10 } = query
      const start = (pageNumber - 1) * pageSize
      const end = start + pageSize
      const list = mockOrders.slice(start, end)
      
      return {
        resultCode: 200,
        message: '获取成功',
        data: {
          list,
          totalCount: mockOrders.length,
          currPage: parseInt(pageNumber),
          pageSize: parseInt(pageSize)
        }
      }
    }
  },
  {
    url: '/api/orders/:id',
    method: 'get',
    response: ({ query }) => {
      const id = query.id
      const order = mockOrders.find(item => item.orderId === parseInt(id))
      
      if (order) {
        return {
          resultCode: 200,
          message: '获取成功',
          data: order
        }
      } else {
        return {
          resultCode: 404,
          message: '订单不存在',
          data: null
        }
      }
    }
  }
] as MockMethod[]
