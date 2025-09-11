import { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/indexConfigs',
    method: 'get',
    //根据configType来返回不同的数据
    response: () => {
      return {
        resultCode: 200,
        message: '获取成功',
        data: {
          carousels: [
            {
              configId: 1,
              configName: '商品1',
              redirectUrl: 'https://www.baidu.com',
              configRank: 1,
              goodsId: 1,
              createTime: '2025-01-01',
            },
            {
              configId: 2,
              configName: '商品2',
              redirectUrl: 'https://www.baidu.com',
              configRank: 2,
              goodsId: 2,
              createTime: '2025-01-01',
            }
          ],
          hotGoods: [
            {
              configId: 1,
              configName: '商品1',
              redirectUrl: 'https://www.baidu.com',
              configRank: 1,
              goodsId: 1,
              createTime: '2025-01-01',
            },
            {
              configId: 2,
              configName: '商品2',
              redirectUrl: 'https://www.baidu.com',
              configRank: 2,
              goodsId: 2,
              createTime: '2025-01-01',
            },
            {
              configId: 3,
              configName: '商品3',
              redirectUrl: 'https://www.baidu.com',
              configRank: 3,
              goodsId: 3,
              createTime: '2025-01-01',
            },
            {
              configId: 4,
              configName: '商品4',
              redirectUrl: 'https://www.baidu.com',
              configRank: 4,
              goodsId: 4,
              createTime: '2025-01-01',
            },
            {
              configId: 1,
              configName: '商品1',
              redirectUrl: 'https://www.baidu.com',
              configRank: 1,
              goodsId: 1,
              createTime: '2025-01-01',
            },
            {
              configId: 2,
              configName: '商品2',
              redirectUrl: 'https://www.baidu.com',
              configRank: 2,
              goodsId: 2,
              createTime: '2025-01-01',
            },
            {
              configId: 2,
              configName: '商品2',
              redirectUrl: 'https://www.baidu.com',
              configRank: 2,
              goodsId: 2,
              createTime: '2025-01-01',
            }
          ],
          newGoods: [
            {
              configId: 3,
              configName: '商品3',
              redirectUrl: 'https://www.baidu.com',
              configRank: 3,
              goodsId: 3,
              createTime: '2025-01-01',
            },
            {
              configId: 4,
              configName: '商品4',
              redirectUrl: 'https://www.baidu.com',
              configRank: 4,
              goodsId: 4,
              goodsName: "二手自行车",
              goodsCoverImg: "https://via.placeholder.com/300x300/45B7D1/FFFFFF?text=商品3",
              sellingPrice: 400
            }
          ],
          recommendGoods: [
            {
              configId: 1,
              configName: '商品1',
              redirectUrl: 'https://www.baidu.com',
              configRank: 1,
              goodsId: 1,
              createTime: '2025-01-01',
            },
            {
              configId: 2,
              configName: '商品2',
              redirectUrl: 'https://www.baidu.com',
              configRank: 2,
              goodsId: 2,
              createTime: '2025-01-01',
            }
          ]
        }
      }
    }
  }
] as MockMethod[]

