<template>
  <el-card class="category-container views">
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
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55"
      >
      </el-table-column>
      <el-table-column
        prop="categoryName"
        label="分类名称"
      >
      </el-table-column>
      <el-table-column
        prop="categoryRank"
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
      <el-table-column
        label="操作"
        width="220"
      >
        <template #default="scope">
          <a style="cursor: pointer; margin-right: 10px" @click="handleEdit(scope.row.categoryId)">修改</a>
          <a style="cursor: pointer; margin-right: 10px" @click="handleNext(scope.row)">下级分类</a>
          <el-popconfirm
            title="确定删除吗？"
            @confirm="handleDeleteOne(scope.row.categoryId)"
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
    <DialogAddCategory ref='addCate' :reload="getCategory" :type="state.type" />
  </el-card>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import axios from '@/utils/axios'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Plus, Delete } from '@element-plus/icons-vue'
import DialogAddCategory from '@/components/DialogAddCategory.vue'

interface CategoryData {
  categoryName: string;
  categoryRank: number;
  createTime: string;
  categoryId: number;
  categoryLevel: number;
}

interface State {
  loading: boolean;
  tableData: CategoryData[];
  currentPage: number;
  pageSize: number;
  type: 'add' | 'edit';
  multipleSelection: any[];
  total: number;
}

const addCate = ref<InstanceType<typeof DialogAddCategory> | null>(null); //获取增加的弹窗组件
const router = useRouter(); // 声明路由实例
const route = useRoute(); // 获取路由参数

const state = reactive<State>({
  loading: false,
  tableData: [
    { categoryName: '趣事', categoryRank: 1, createTime: '2025-09-01 10:00:00', categoryId: 101, categoryLevel: 1 },
    { categoryName: '科技', categoryRank: 2, createTime: '2025-09-02 11:20:00', categoryId: 102, categoryLevel: 1 },
    { categoryName: '生活', categoryRank: 3, createTime: '2025-09-03 09:15:00', categoryId: 103, categoryLevel: 1 },
    { categoryName: '美食', categoryRank: 4, createTime: '2025-09-03 14:30:00', categoryId: 104, categoryLevel: 1 },
    { categoryName: '旅行', categoryRank: 5, createTime: '2025-09-04 08:45:00', categoryId: 105, categoryLevel: 1 },
    { categoryName: '运动', categoryRank: 6, createTime: '2025-09-04 16:10:00', categoryId: 106, categoryLevel: 1 },
    { categoryName: '音乐', categoryRank: 7, createTime: '2025-09-05 12:05:00', categoryId: 107, categoryLevel: 1 },
    { categoryName: '电影', categoryRank: 8, createTime: '2025-09-05 18:25:00', categoryId: 108, categoryLevel: 1 },
    { categoryName: '动漫', categoryRank: 9, createTime: '2025-09-06 13:50:00', categoryId: 109, categoryLevel: 1 },
    { categoryName: '教育', categoryRank: 10, createTime: '2025-09-06 19:40:00', categoryId: 110, categoryLevel: 1 }
  ], // 数据列表
  total: 10, // 总条数
  currentPage: 1, // 当前页
  pageSize: 10, // 分页大小
  type: 'add', // 操作类型
  level: 1,   //级数
  parent_id: 0,  //父级数
  multipleSelection: [], // 选中项
})

// 添加分类
const handleAdd = () => {
  state.type = 'add' // 传入弹窗组件用于弹窗 title 判断
  addCate.value.open()
}

// 修改分类
const handleEdit = (id) => {
  state.type = 'edit' // 传入弹窗组件用于弹窗 title 判断
  addCate.value.open(id)
}

// 批量删除
const handleDelete = () => {
  if (!state.multipleSelection.length) {
    ElMessage.error('请选择项')
    return
  }
  // axios.delete('/categories', {
  //   data: {
  //     ids: state.multipleSelection.map(i => i.categoryId)
  //   }
  // }).then(() => {
  //   ElMessage.success('删除成功')
  //   getCategory()
  // })
}

// 单个删除
const handleDeleteOne = (id) => {
  // axios.delete('/categories', {
  //   data: {
  //     ids: [id]
  //   }
  // }).then(() => {
  //   ElMessage.success('删除成功')
  //   getCategory()
  // })
}

// 选择项
const handleSelectionChange = (val) => {
  // 多选 checkbox
  state.multipleSelection = val
}

onMounted(() => {
  getCategory()
})

// 获取分类列表
const getCategory = () => {
  const { level = 1, parent_id = 0 } = route.query
  state.loading = true
  // axios.get('/categories', {
  //   params: {
  //     pageNumber: state.currentPage,
  //     pageSize: state.pageSize,
  //     categoryLevel: level,
  //     parentId: parent_id
  //   }
  // }).then(res => {
  //   state.tableData = res.list
  //   state.total = res.totalCount
  //   state.currentPage = res.currPage
  //   state.loading = false
  //   state.level = level
  //   state.parentId = parent_id
  // })
}

//跳转到下一级分类
const handleNext = (item) => {
  const levelNumber = item.categoryLevel + 1
  if (levelNumber == 4) {
    ElMessage.error('没有下一级')
    return
  }
  router.push({
    name: `level${levelNumber}`,
    query: {
      level: levelNumber,
      parent_id: item.categoryId
    }
  })
}

const changePage = (val) => {
  state.currentPage = val
  getCategory()
}

const unwatch = router.afterEach((to) => {
  // 每次路由变化的时候，都会触发监听时间，重新获取列表数据
  if (['category', 'level2', 'level3'].includes(to.name)) {
    getCategory()
  }
})
onUnmounted(() => {
  unwatch()
})
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