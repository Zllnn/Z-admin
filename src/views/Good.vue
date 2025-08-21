<template>
  <el-card class="swiper-container views">
    <template #header>
      <div class="header">
        <el-button type="primary" :icon="Plus" @click="handleAdd">新增商品</el-button>
      </div>
    </template>
    <el-table
      :load="state.loading"
      :data="state.tableData"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <el-table-column
        prop="goodsId"
        label="商品编号"
      >
      </el-table-column>
      <el-table-column
        prop="goodsName"
        label="商品名"
      >
      </el-table-column>
      <el-table-column
        prop="goodsIntro"
        label="商品简介"
      >
      </el-table-column>
      <el-table-column
        label="商品图片"
        width="150px"
      >
        <template #default="scope">
          <img style="width: 100px; height: 100px;" :key="scope.row.goodsId" :src="$filters.prefix(scope.row.goodsCoverImg)" alt="商品主图">
        </template>
      </el-table-column>
      <el-table-column
        prop="stockNum"
        label="商品库存"
      >
      </el-table-column>
      <el-table-column
        prop="sellingPrice"
        label="商品售价"
      >
      </el-table-column>
      <el-table-column
        label="上架状态"
      >
        <template #default="scope">
          <span style="color: green;" v-if="scope.row.goodsSellStatus == 0">销售中</span>
          <span style="color: red;" v-else>已下架</span>
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        width="100"
      >
        <template #default="scope">
          <a style="cursor: pointer; margin-right: 10px" @click="handleEdit(scope.row.goodsId)">修改</a>
          <a style="cursor: pointer; margin-right: 10px" v-if="scope.row.goodsSellStatus == 0" @click="handleStatus(scope.row.goodsId, 1)">下架</a>
          <a style="cursor: pointer; margin-right: 10px" v-else @click="handleStatus(scope.row.goodsId, 0)">上架</a>
        </template>
      </el-table-column>
    </el-table>
    <!--总数超过一页，再展示分页器-->
    <div class="pagination-center footer">
    <el-pagination
      background
      layout="prev, pager, next"
      :total="state.total"
      :page-size="state.pageSize"
      :current-page="state.currentPage"
      @current-change="changePage"
    />
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import axios from '@/utils/axios'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { getCurrentInstance } from 'vue'

interface GoodData {
  createTime: string;
  goodsCarousel: string;
  goodsCategoryId: number;
  goodsCoverImg: string;
  goodsDetailContent: string | null;
  goodsId: number;
  goodsIntro: string;
  goodsName: string;
  goodsSellStatus: number;
  originalPrice: number;
  sellingPrice: number;
  stockNum: number;
  tag: string;
  updateTime: string;
}

interface State {
  loading: boolean;
  tableData: GoodData[];
  currentPage: number;
  pageSize: number;
  total: number;
}

const app = getCurrentInstance();
const { goTop } = app?.appContext.config.globalProperties || {};

const router = useRouter(); // 获取路由实例，内涵路由相关的各种方法。

const state = reactive<State>({
  loading: false, // 列表数据接口返回前的 loadinig
  tableData: [
    {
      createTime: "2021-04-17 16:42:43", // 创建时间
      goodsCarousel: "/admin/dist/img/no-img.png", // 商品轮播图
      goodsCategoryId: 182, // 商品分类 id
      goodsCoverImg: "http://backend-api-02.newbee.ltd/upload/20210417_1642416.jpg", // 商品主图
      goodsDetailContent: null, // 详情内容
      goodsId: 11000, // 商品 id
      goodsIntro: "2",
      goodsName: "1", // 商品名称
      goodsSellStatus: 1, // 商品上下架状态，0：下架，1：上架
      originalPrice: 3, // 商品原价
      sellingPrice: 4, // 商品售价
      stockNum: 5, // 商品库存
      tag: "6", // 标签
      updateTime: "2021-04-18 10:51:53", // 更新时间
    }
  ], // 数据列表
  total: 0, // 总条数
  currentPage: 1, // 当前页
  pageSize: 10 // 分页大小
})

// 初始化钩子函数
onMounted(() => {
  getGoodList()
})
// 获取轮播图列表
const getGoodList = () => {
  state.loading = true
  // axios.get('/goods/list', {
  //   params: {
  //     pageNumber: state.currentPage, // 当前页
  //     pageSize: state.pageSize, // 每页数量
  //   }
  // }).then(res => {
  //   state.tableData = res.list // 列表数据
  //   state.total = res.totalCount // 数据总条数
  //   state.currentPage = res.currPage // 当前页
  //   state.loading = false // 数据成功返回后，将列表 loading 清除
  //   goTop && goTop() // 数据获取成功后，回到顶部
  // })
}

// 添加商品，跳转到 /add 路径下
const handleAdd = () => {
  router.push({ path: '/add' })
}

// 编辑商品，带 id 跳转 /add 路径
const handleEdit = (id) => {
  router.push({ path: '/add', query: { id } })
}

// 翻页方法
const changePage = (val) => {
  state.currentPage = val
  getGoodList()
}

// 上下架方法，只修改上下架状态
const handleStatus = (id, status) => {
  // axios.put(`/goods/status/${status}`, {
  //   ids: id ? [id] : []
  // }).then(() => {
  //   ElMessage.success('修改成功')
  //   getGoodList()
  // })
}



</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.footer {
  margin-top: $spacing-lg;
  position: absolute;
  bottom: $spacing-lg;
  left: 680px;
}

.views {
  height: calc(100vh - 120px);
  position: relative;
}
</style>