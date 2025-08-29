<template>
  <el-card class="swiper-container views">
    <template #header>
      <div class="header">
        <el-button type="primary" :icon="Plus" @click="handleAdd">增加</el-button>
        <el-popconfirm
          title="确定删除吗？"
          confirmButtonText='确定'
          cancelButtonText='取消'
          @confirm="handleDelete"
        >
          <template #reference>
            <el-button type="danger" :icon="Delete">批量删除</el-button>
          </template>
        </el-popconfirm>
      </div>
    </template>
    <el-table
    :load="state.loading"
    ref="multipleTable"
    :data="state.tableData"
    tooltip-effect="dark"
    style="width: 100%;"
    @selection-change="handleSelectionChange"
    >
    <el-table-column
    type="selection"
    width="55"
    >
    </el-table-column>
    <el-table-column
    label="轮播图"
    width="200"
    >
    <template #default="scope">
      <img style="width: 150px;" :src="scope.row.carouselUrl" alt="轮播图">
    </template>
    </el-table-column>
    <el-table-column
    label="跳转连接"
    >
    <template #default="scope">
      <a target="_blank" :href="scope.row.redirectUrl">{{ scope.row.redirectUrl }}</a>
    </template>
    </el-table-column>
    <el-table-column
    prop="carouselRank"
    label="排序值"
    width="120"
    >
    </el-table-column>
    <el-table-column
    prop="createTime"
    label="添加时间"
    width="200"
    >
    </el-table-column>
    </el-table>
    <div class="pagination-center footer">
      <el-pagination
      background
      layout="prev,pager,next"
      :total="state.total"
      :page-size="state.pageSize"
      :current-page="state.currentPage"
      @current-change="changePage"
      >
      </el-pagination>
    </div>
  </el-card>
  <DialogAddSwiper ref="addSwiper" :reload="getCarousels" :type="state.type"></DialogAddSwiper>
</template>

<script setup lang="ts">
// import axios from '@/utils/axios';
import { onMounted, reactive, ref } from 'vue';
import DialogAddSwiper from '@/components/DialogAddSwiper.vue';
import { ElMessage } from 'element-plus';
import { Plus, Delete } from '@element-plus/icons-vue'

interface TableData {
  carouselUrl: string;
  redirectUrl: string;
  carouselRank: number;
  createTime: string;
}

interface State {
  loading: boolean;
  tableData: TableData[];
  currentPage: number;
  pageSize: number;
  type: 'add' | 'edit';
  multipleSelection: any[];
  total: number;
}

const addSwiper = ref<InstanceType<typeof DialogAddSwiper> | null>(null);

const state = reactive<State>({
  loading: true, //控制加载动画
  tableData: [
    {
      carouselUrl:'https://picsum.photos/800/400?random=1',
      redirectUrl:'https://www.baidu.com/',
      carouselRank:1,
      createTime:'2025.1.15'
    },
    {
      carouselUrl:'https://picsum.photos/800/400?random=2',
      redirectUrl:'https://www.taobao.com/',
      carouselRank:2,
      createTime:'2025.1.16'
    },
    {
      carouselUrl:'https://picsum.photos/800/400?random=3',
      redirectUrl:'https://www.jd.com/',
      carouselRank:3,
      createTime:'2025.1.17'
    },
    {
      carouselUrl:'https://picsum.photos/800/400?random=4',
      redirectUrl:'https://www.qq.com/',
      carouselRank:4,
      createTime:'2025.1.18'
    },
    {
      carouselUrl:'https://picsum.photos/800/400?random=5',
      redirectUrl:'https://www.weibo.com/',
      carouselRank:5,
      createTime:'2025.1.19'
    }
  ], //数据列表
  currentPage: 1, //当前页数
  pageSize: 10, //每页行数
  type: 'add', //操作类型,增加or编辑
  multipleSelection: [], //选中项
  total: 0, //页面总条数
});

//选中之后的change方法，一旦选项有变化就会触发该方法
const handleSelectionChange = (val: any[]): void => {
  state.multipleSelection = val
}

//批量删除
const handleDelete = () => {
  if(!state.multipleSelection.length) {
    ElMessage.error('请选择项')
    return
  }
  // axios.delete('/carousels', {
  //   data: {
  //     ids: state.multipleSelection.map(i => i.carouselId)
  //   }
  // }).then(() => {
  //   ElMessage.success('删除成功')
  //   getCarousels()
  // })
}

//增加按钮
const handleAdd = () => {
  state.type = 'add'
  addSwiper.value.open()  //调用弹窗开启按钮
}

//编辑轮播图
const handleEdit = (id) => {
  state.type = 'edit'
  addSwiper.value.open(id)
}

onMounted(() => {
  // getCarousels()
})
//获取轮播图列表 ,后续写接口的时候考虑不用params，直接使用body传递
// const getCarousels = () => {
//   state.loading = true
//   axios.get('/carousels', {
//     params: {
//       pageNumber: state.currentPage,
//       pageSize: state.pageSize
//     }
//   }).then(res => {
    // state.tableData = res.list
    // state.total = res.totalCount
    // state.currentPage  = res.currPage
    // state.loading = false
//   })
// }
const changePage = (val) => {
  //当前页改变了就重新获取页面数据
  state.currentPage = val
  getCarousels()
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