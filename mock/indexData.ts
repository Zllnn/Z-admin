import { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/index-infos',
    method: 'get',
    response: () => {
      return {
        resultCode: 200,
        message: '获取成功',
        data: {
          carousels: [
            {
              carouselId: 1,
              carouselUrl: "https://via.placeholder.com/800x400/FF6B6B/FFFFFF?text=轮播图1",
              redirectUrl: "/goods/1001"
            },
            {
              carouselId: 2,
              carouselUrl: "https://via.placeholder.com/800x400/4ECDC4/FFFFFF?text=轮播图2",
              redirectUrl: "/goods/1002"
            }
          ],
          hotGoods: [
            {
              goodsId: 1001,
              goodsName: "二手iPhone 13",
              goodsCoverImg: "https://via.placeholder.com/300x300/FF6B6B/FFFFFF?text=商品1",
              sellingPrice: 3999
            },
            {
              goodsId: 1002,
              goodsName: "二手MacBook Pro",
              goodsCoverImg: "https://via.placeholder.com/300x300/4ECDC4/FFFFFF?text=商品2",
              sellingPrice: 8999
            }
          ],
          newGoods: [
            {
              goodsId: 1003,
              goodsName: "二手自行车",
              goodsCoverImg: "https://via.placeholder.com/300x300/45B7D1/FFFFFF?text=商品3",
              sellingPrice: 400
            }
          ],
          recommendGoods: [
            {
              goodsId: 1001,
              goodsName: "二手iPhone 13",
              goodsCoverImg: "https://via.placeholder.com/300x300/FF6B6B/FFFFFF?text=商品1",
              sellingPrice: 3999
            }
          ]
        }
      }
    }
  }
] as MockMethod[]
