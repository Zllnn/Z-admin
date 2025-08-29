<template>
   <el-table
      :load="state.loading"
      :data="state.tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
  >
    <slot name='column'></slot>
  </el-table>
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
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import axios from '@/utils/axios'

interface Props {
  action: string;
  tableData?: any[]; // 添加可选的 tableData 属性
}

interface State {
  loading: boolean;
  tableData: any[]; // 数据列表
  total: number; // 总条数
  currentPage: number; // 当前页
  pageSize: number; // 分页大小
  multipleSelection: any[]; // 多选框
}

const props = defineProps<Props>();

const state = reactive<State>({
  loading: false,
  tableData: props.tableData || [], // 使用父组件传递的数据，如果没有则使用空数组
  total: 0, // 总条数
  currentPage: 1, // 当前页
  pageSize: 10, // 分页大小
  multipleSelection: [], // 多选框
});

// 初始化钩子函数
onMounted(() => {
  // 只有当没有父组件传递的数据时才调用接口
  if (!props.tableData || props.tableData.length === 0) {
    getList();
  }
});

// 获取列表方法
const getList = (): void => {
  state.loading = true;
  // axios.get(props.action, {
  //   params: {
  //     pageNumber: state.currentPage,
  //     pageSize: state.pageSize
  //   }
  // }).then(res => {
  //   state.tableData = res.list
  //   state.total = res.totalCount
  //   state.currentPage = res.currPage
  //   state.loading = false
  // })
};

// 选项
const handleSelectionChange = (val: any[]): void => {
  state.multipleSelection = val;
};

// 分页方法
const changePage = (val: number): void => {
  state.currentPage = val;
  getList();
};

// script setup 写法，需要通过 defineExpose 方法，将属性暴露出去，才能在父组件通过 ref 形式拿到本组件的内部参数
defineExpose({ state: state, getList: getList });

</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.footer {
  margin-top: $spacing-lg;
  position: absolute;
  bottom: $spacing-lg;
  left: 680px;
}
</style>