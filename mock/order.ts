import { MockMethod } from 'vite-plugin-mock'

const mockOrders = [
  {
    orderId: 1001,
    orderNo: "202501150001",
    totalPrice: 3999,
    payStatus: 1,
    payType: 1,
    orderStatus: 1,
    extraInfo: "请尽快发货",
    userAddress: "北京市朝阳区xxx街道",
    userName: "张三",
    userPhone: "13800138000",
    createTime: "2025-01-15 10:30:00",
    updateTime: "2025-01-15 10:30:00",
    goodsId: 3,
    goodsCoverImg: 'https://picsum.photos/800/400?random=3',
    goodsName: '商品3',
    goodsCount: 1,
    sellingPrice: 200
  },
  {
    orderId: 1002,
    orderNo: "202501150002",
    totalPrice: 8999,
    payStatus: 0,
    payType: 0,
    orderStatus: 0,
    extraInfo: "",
    userAddress: "上海市浦东新区xxx路",
    userName: "李四",
    userPhone: "13900139000",
    createTime: "2025-01-15 11:00:00",
    updateTime: "2025-01-15 11:00:00",
    goodsId: 2,
    goodsCoverImg: 'https://picsum.photos/800/400?random=2',
    goodsName: '商品2',
    goodsCount: 1,
    sellingPrice: 300

  },
  {
    orderId: 1003,
    orderNo: "202501150003",
    totalPrice: 400,
    payStatus: 1,
    payType: 2,
    orderStatus: 2,
    extraInfo: "请包装好一点",
    userAddress: "广州市天河区xxx大道",
    userName: "王五",
    userPhone: "13700137000",
    createTime: "2025-01-15 12:00:00",
    updateTime: "2025-01-15 12:00:00",
    goodsId: 1,
    goodsCoverImg: 'https://picsum.photos/800/400?random=1',
    goodsName: '商品1',
    goodsCount: 1,
    sellingPrice: 100
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
      const data = {
        orderStatusString: order?.orderStatus,
        createTime: order?.createTime,
        orderNo: order?.orderNo
      }
      const tableData = [
        {
          goodsId: order?.goodsId,
          goodsCoverImg: order?.goodsCoverImg,
          goodsName: order?.goodsName,
          goodsCount: order?.goodsCount,
          sellingPrice: order?.sellingPrice
        }
      ]
      if (order) {
        return {
          resultCode: 200,
          message: '获取成功',
          data: {
            data: data,
            tableData: tableData
          }
        }
      } else {
        return {
          resultCode: 404,
          message: '订单不存在',
          data: {
            data: null,
            tableData: null
          }
        }
      }
    }
  }
] as MockMethod[]
