// API 相关类型定义

// 用户信息类型
export interface UserInfo {
  nickName: string;
  loginUserName: string;
}

// 商品类型
export interface Good {
  goodsId: number;
  goodsName: string;
  goodsIntro: string;
  goodsCoverImg: string;
  stockNum: number;
  sellingPrice: number;
  goodsSellStatus: number;
  createTime: string;
  updateTime: string;
}

// 分类类型
export interface Category {
  categoryId: number;
  categoryName: string;
  categoryRank: number;
  categoryLevel: number;
  parentId: number;
  createTime: string;
}

// 订单类型
export interface Order {
  orderId: number;
  orderNo: string;
  totalPrice: number;
  orderStatus: number;
  payType: number;
  createTime: string;
  userId: number;
}

// 轮播图类型
export interface Swiper {
  carouselId: number;
  carouselUrl: string;
  redirectUrl: string;
  carouselRank: number;
  createTime: string;
}

// 首页配置类型
export interface IndexConfig {
  configId: number;
  configName: string;
  redirectUrl: string;
  configRank: number;
  goodsId: number;
  createTime: string;
}

// 分页响应类型
export interface PaginationResponse<T> {
  list: T[];
  totalCount: number;
  currPage: number;
  pageSize: number;
}

// API 响应类型
export interface ApiResponse<T = any> {
  resultCode: number;
  message?: string;
  data: T;
}
