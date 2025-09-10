import { MockMethod } from 'vite-plugin-mock'

const mockSwipers = [
  {
    carouselId: 1,
    carouselUrl: "https://picsum.photos/800/400?random=1",
    redirectUrl: "/goods/1001",
    carouselRank: 1,
    isDeleted: 0,
    createTime: "2024-01-15 10:00:00",
    updateTime: "2024-01-15 10:00:00"
  },
  {
    carouselId: 2,
    carouselUrl: "https://picsum.photos/800/400?random=2",
    redirectUrl: "/goods/1002",
    carouselRank: 2,
    isDeleted: 0,
    createTime: "2024-01-15 10:00:00",
    updateTime: "2024-01-15 10:00:00"
  },
  {
    carouselId: 3,
    carouselUrl: "https://picsum.photos/800/400?random=3",
    redirectUrl: "/goods/1003",
    carouselRank: 3,
    isDeleted: 0,
    createTime: "2024-01-15 10:00:00",
    updateTime: "2024-01-15 10:00:00"
  }
]

export default [
  {
    url: '/api/carousels',
    method: 'get',
    response: () => {
      return {
        resultCode: 200,
        message: '获取成功',
        data: mockSwipers
      }
    }
  },
  {
    url: '/api/carousels/:id',
    method: 'get',
    response: ({ query }) => {
      const id = query.id
      const swiper = mockSwipers.find(item => item.carouselId === parseInt(id))
      
      if (swiper) {
        return {
          resultCode: 200,
          message: '获取成功',
          data: swiper
        }
      } else {
        return {
          resultCode: 404,
          message: '轮播图不存在',
          data: null
        }
      }
    }
  }
] as MockMethod[]
