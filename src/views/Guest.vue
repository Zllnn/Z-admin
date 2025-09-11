<template>
  <el-card class="guest-container views">
    <template #header>
      <div class="header">
        <el-button type="primary"  :icon="Plus" @click="handleSolve">解除禁用</el-button>
        <el-button type="danger"  :icon="Delete" @click="handleForbid">禁用账户</el-button>
      </div>
    </template>
    <Table
      action='/users'
      ref="table"
      :tableData="tableData"
    >
      <template #column>
        <el-table-column
          type="selection"
          width="55"
          prop="userId"
          >
        </el-table-column>
        <el-table-column
          prop="nickName"
          label="昵称"
        >
        </el-table-column>
        <el-table-column
          prop="loginName"
          label="登录名"
        >
        </el-table-column>
        <el-table-column
          label="身份状态"
        >
          <template #default="scope">
            <span :style="scope.row.lockedFlag == 0 ? 'color: green;' : 'color: red;'">
              {{ scope.row.lockedFlag == 0 ? '正常' : '禁用' }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="是否注销"
        >
          <template #default="scope">
            <span :style="scope.row.lockedFlag == 0 ? 'color: green;' : 'color: red;'">
              {{ scope.row.isDeleted == 0 ? '正常' : '注销' }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="注册时间"
        >
        </el-table-column>
      </template>
    </Table>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Table from '@/components/Table.vue'
import { ElMessage } from 'element-plus'
import { Plus, Delete } from '@element-plus/icons-vue'
import axios from '@/utils/axios'

const table = ref<InstanceType<typeof Table> | null>(null); // 绑定 Table  的 ref 属性

interface TableData {
  userId: number;
  nickName: string;
  loginName: string;
  lockedFlag: number;
  isDeleted: number;
  createTime: string;
}

const tableData = ref<TableData[]>([
  {
    userId: 1,
    nickName: '张三',
    loginName: 'zhangsan',
    lockedFlag: 0,
    isDeleted: 0,
    createTime: '2025-04-07 17:37:02'
  },
  {
    userId: 2,
    nickName: '李四',
    loginName: 'lisi',
    lockedFlag: 0,
    isDeleted: 0,
    createTime: '2025-04-07 17:37:02'
  }
])

// 解禁方法
const handleSolve = (): void => {
  // 可以通过 table 获取到组件内部的 multipleSelection 值
  if (!table.value?.state.multipleSelection.length) {
    ElMessage.error('请选择项');
    return;
  }
  //接触table中选项的lockedFlag
  table.value?.state.multipleSelection.forEach((item: any) => {
    item.lockedFlag = 0;
  });
  // axios.put(`/users/0`, {
  //   ids: table.value.state.multipleSelection.map((item: any) => item.userId)
  // }).then(() => {
  //   ElMessage.success('解除成功');
  //   // 通过 table 获取组件内部的 getList 方法
  //   table.value.getList();
  // });
};

// 禁用方法
const handleForbid = (): void => {
  // 可以通过 table 获取到组件内部的 multipleSelection 值
  if (!table.value?.state.multipleSelection.length) {
    ElMessage.error('请选择项');
    return;
  }
  //禁用table中选项的lockedFlag
  table.value?.state.multipleSelection.forEach((item: any) => {
    item.lockedFlag = 1;
  });
  // axios.put(`/users/1`, {
  //   ids: table.value.state.multipleSelection.map((item: any) => item.userId)
  // }).then(() => {
  //   ElMessage.success('禁用成功');
  //   // 通过 table 获取组件内部的 getList 方法
  //   table.value.getList();
  // });
};

</script>

<style lang="scss" scoped>
.views {
  height: calc(100vh - 120px);
  position: relative;
}
</style>