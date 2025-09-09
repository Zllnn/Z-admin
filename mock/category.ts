import { MockMethod } from 'vite-plugin-mock'

const mockCategories = [
  {
    categoryId: 1,
    categoryLevel: 1,
    categoryName: "数码产品",
    parentId: 0,
    createTime: "2024-01-15 10:00:00",
    updateTime: "2024-01-15 10:00:00"
  },
  {
    categoryId: 2,
    categoryLevel: 1,
    categoryName: "电脑设备",
    parentId: 0,
    createTime: "2024-01-15 10:00:00",
    updateTime: "2024-01-15 10:00:00"
  },
  {
    categoryId: 3,
    categoryLevel: 1,
    categoryName: "交通工具",
    parentId: 0,
    createTime: "2024-01-15 10:00:00",
    updateTime: "2024-01-15 10:00:00"
  },
  {
    categoryId: 4,
    categoryLevel: 1,
    categoryName: "图书教材",
    parentId: 0,
    createTime: "2024-01-15 10:00:00",
    updateTime: "2024-01-15 10:00:00"
  },
  {
    categoryId: 5,
    categoryLevel: 1,
    categoryName: "生活用品",
    parentId: 0,
    createTime: "2024-01-15 10:00:00",
    updateTime: "2024-01-15 10:00:00"
  }
]

export default [
  {
    url: '/api/categories',
    method: 'get',
    response: () => {
      return {
        resultCode: 200,
        message: '获取成功',
        data: mockCategories
      }
    }
  },
  {
    url: '/api/categories/:id',
    method: 'get',
    response: ({ query }) => {
      const id = query.id
      const category = mockCategories.find(item => item.categoryId === parseInt(id))
      
      if (category) {
        return {
          resultCode: 200,
          message: '获取成功',
          data: category
        }
      } else {
        return {
          resultCode: 404,
          message: '分类不存在',
          data: null
        }
      }
    }
  }
] as MockMethod[]
