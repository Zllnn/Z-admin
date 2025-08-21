<template>
    <el-card class="index-container views">
      <template #header>
      <div class="header">
        <el-button type="primary" size="small" :icon="Plus" @click="handleAdd">增加</el-button>
        <el-popconfirm
          title="确定删除吗？"
          confirmButtonText='确定'
          cancelButtonText='取消'
          @confirm="handleDelete"
        >
          <template #reference>
            <el-button type="danger" size="small" :icon="Delete">批量删除</el-button>
         </template>
        </el-popconfirm>
      </div>
    </template>
    <el-table
      :load="state.loading"
      ref="multipleTable"
      :data="state.tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
    >
      <el-table-column
        prop="configName"
        label="商品名称"
      >
      </el-table-column>
      <el-table-column
        label="跳转链接"
        >
        <template #default="scope">
          <a target="_blank" :href="scope.row.redirectUrl">{{ scope.row.redirectUrl }}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="configRank"
        label="排序值"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="goodsId"
        label="商品编号"
        width="200"
      >
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="添加时间"
        width="200"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        width="100"
      >
        <template #default="scope">
          <a style="cursor: pointer; margin-right: 10px" @click="handleEdit(scope.row.configId)">修改</a>
          <el-popconfirm
            title="确定删除吗？"
            confirmButtonText='确定'
            cancelButtonText='取消'
            @confirm="handleDeleteOne(scope.row.configId)"
          >
            <template #reference>
              <a style="cursor: pointer">删除</a>
            </template>
          </el-popconfirm>
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
  <DialogAddGood ref='addGood' :reload="getIndexConfig" :type="state.type" :configType="state.configType" />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from '@/utils/axios'
import { ElMessage } from 'element-plus'
import DialogAddGood from '@/components/DialogAddGood.vue'
import { Plus, Delete } from '@element-plus/icons-vue'

interface ConfigData {
  configId: number;
  configName: string;
  redirectUrl: string;
  configRank: number;
  goodsId: number;
  createTime: string;
}

interface State {
  loading: boolean;
  tableData: ConfigData[];
  currentPage: number;
  pageSize: number;
  type: 'add' | 'edit';
  configType: number;
  multipleSelection: any[];
  total: number;
}

// 首页配置类型参数
const configTypeMap: Record<string, number> = {
  hot: 3, // 热销
  new: 4, // 新品
  recommend: 5, // 推荐
}

const addGood = ref<InstanceType<typeof DialogAddGood> | null>(null) //获取弹窗实例
const router = useRouter()
const route = useRoute()
const multipleTable = ref(null)
const state = reactive<State>({
  loading: false,
  tableData: [], // 数据列表            想清楚到底有多少个元素
  total: 0, // 总条数
  currentPage: 1, // 当前页
  pageSize: 10, // 分页大小
  type: 'add', // 操作类型
  configType: 3, // 3-(首页)热销商品 4-(首页)新品上线 5-(首页)为你推荐
  multipleSelection: [], //选中项
})


//监听路由变化
const unWatch = router.beforeEach((to) => {
  if (['hot', 'new', 'recommend'].includes(to.name)) {
    // 通过 to.name 去匹配不同路径下，configType 参数也随之变化。
    state.configType = configTypeMap[to.name]
    state.currentPage = 1
    getIndexConfig()
  }
})

//初始化
onMounted(() => {
  state.configType = configTypeMap[route.name]
  getIndexConfig()
})

// 首页热销商品列表   ,在接口中传入3，4，5分别对应是哪一个界面
const getIndexConfig = () => {
  state.loading = true
  // axios.get('/indexConfigs', {
  //   params: {
  //     pageNumber: state.currentPage,
  //     pageSize: state.pageSize,
  //     configType: state.configType
  //   }
  // }).then(res => {
  //   state.tableData = res.list
  //   state.total = res.totalCount
  //   state.currentPage = res.currPage
  //   state.loading = false
  // })
}

//每次页面改变就请求数据
const changePage = (val:number) => {
  state.currentPage = val
  getIndexConfig()
}

onUnmounted(() => {
unWatch()
})

// 添加商品
const handleAdd = () => {
  state.type = 'add'
  addGood.value.open()
}

// 修改商品
const handleEdit = (id:number) => {
  state.type = 'edit'
  addGood.value.open(id)
}

// 选择项
const handleSelectionChange = (val: any[]) => {
  state.multipleSelection = val
}

// 删除
const handleDelete = () => {
  if (!state.multipleSelection.length) {
    ElMessage.error('请选择项')
    return
  }
  // axios.post('/indexConfigs/delete', {
  //   ids: state.multipleSelection.map(i => i.configId)
  // }).then(() => {
  //   ElMessage.success('删除成功')
  //   getIndexConfig()
  // })
}

// 单个删除
const handleDeleteOne = (id:number) => {
  // axios.post('/indexConfigs/delete', {
  //   ids: [id]
  // }).then(() => {
  //   ElMessage.success('删除成功')
  //   getIndexConfig()
  // })
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.index-container {
  min-height: 100%;
}
  
.el-card.is-always-shadow {
  min-height: 100% !important;
}

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