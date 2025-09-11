import { it } from 'node:test'
import { MockMethod } from 'vite-plugin-mock'

const mockGoods = [
  {
    createTime: "2024-01-15 10:30:00",
    goodsCarousel: "/admin/dist/img/no-img.png",
    goodsCategoryId: 1,
    goodsCoverImg: "src/assets/goods.jpg",
    goodsDetailContent: "这是商品1的详细描述",
    goodsId: 1001,
    goodsIntro: "商品1简介",
    goodsName: "二手iPhone 13",
    goodsSellStatus: 0,
    originalPrice: 5999,
    sellingPrice: 3999,
    stockNum: 1,
    tag: "数码产品",
    updateTime: "2024-01-15 10:30:00"
  },
  {
    createTime: "2024-01-15 11:00:00",
    goodsCarousel: "/admin/dist/img/no-img.png",
    goodsCategoryId: 2,
    goodsCoverImg: "src/assets/goods.jpg",
    goodsDetailContent: "这是商品2的详细描述",
    goodsId: 1002,
    goodsIntro: "商品2简介",
    goodsName: "二手MacBook Pro",
    goodsSellStatus: 0,
    originalPrice: 12999,
    sellingPrice: 8999,
    stockNum: 1,
    tag: "电脑设备",
    updateTime: "2024-01-15 11:00:00"
  },
  {
    createTime: "2024-01-15 12:00:00",
    goodsCarousel: "/admin/dist/img/no-img.png",
    goodsCategoryId: 3,
    goodsCoverImg: "src/assets/goods.jpg",
    goodsDetailContent: "这是商品3的详细描述",
    goodsId: 1003,
    goodsIntro: "商品3简介",
    goodsName: "二手自行车",
    goodsSellStatus: 1,
    originalPrice: 800,
    sellingPrice: 400,
    stockNum: 1,
    tag: "交通工具",
    updateTime: "2024-01-15 12:00:00"
  }
]

export default [
  {
    url: '/api/goods/list',
    method: 'get',
    response: ({ query }) => {
      const { pageNumber = 1, pageSize = 10 } = query
      const start = (pageNumber - 1) * pageSize
      const end = start + pageSize
      const list = mockGoods.slice(start, end)
      
      return {
        resultCode: 200,
        message: '获取成功',
        data: {
          list,
          totalCount: mockGoods.length,
          currPage: parseInt(pageNumber),
          pageSize: parseInt(pageSize)
        }
      }
    }
  },
  {
    url: '/api/goods/status/:status',
    method: 'put',
    response: ({ body }) => {
      return {
        resultCode: 200,
        message: '修改成功',
        data: null
      }
    }
  },
  {
    url: '/api/goods/:id',
    method: 'get',
    response: ({ query }) => {
      const id = query.id
      const good = mockGoods.find(item => item.goodsId === parseInt(id))
      
      if (good) {
        return {
          resultCode: 200,
          message: '获取成功',
          data: good
        }
      } else {
        return {
          resultCode: 404,
          message: '商品不存在',
          data: null
        }
      }
    }
  }
] as MockMethod[]
