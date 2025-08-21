<template>
  <el-card class="order-container views">
    <template #header>
      <div class="header">
        <el-input
          style="width: 200px; margin-right: 10px"
          placeholder="请输入订单号"
          v-model="state.orderNo"
          @change="handleOption"
          size="small"
          clearable
        />
        <el-select @change="handleOption" v-model="state.orderStatus" size="small" style="width: 200px; margin-right: 10px">
          <el-option
            v-for="item in state.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <!-- <el-button type="primary" size="small" icon="el-icon-edit">修改订单</el-button> -->
        <el-button type="primary" :icon="HomeFilled" @click="handleConfig()">配货完成</el-button>
        <el-button type="primary" :icon="HomeFilled" @click="handleSend()">出库</el-button>
        <el-button type="danger" :icon="Delete" @click="handleClose()">关闭订单</el-button>
      </div>
    </template>
    <el-table
      :load="state.loading"
      :data="state.tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="orderNo"
        label="订单号"
      >
      </el-table-column>
      <el-table-column
        prop="totalPrice"
        label="订单总价"
      >
      </el-table-column>
      <el-table-column
        prop="orderStatus"
        label="订单状态"
      >
        <template #default="scope">
          <span>{{ $filters.orderMap(scope.row.orderStatus) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="payType"
        label="支付方式"
      >
        <template #default='scope'>
          <span v-if="scope.row.payType == 1">微信支付</span>
          <span v-else-if="scope.row.payType == 2">支付宝支付</span>
          <span v-else>未知</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
      >
      </el-table-column>
      <el-table-column
        label="操作"
      >
        <template #default="scope">
          <el-popconfirm
            v-if="scope.row.orderStatus == 1"
            title="确定配货完成吗？"
            @confirm="handleConfig(scope.row.orderId)"
            confirm-button-text="确定"
            cancel-button-text="取消"
          >
            <template #reference>
              <a style="cursor: pointer; margin-right: 10px">配货完成</a>
            </template>
          </el-popconfirm>
          <el-popconfirm
            v-if="scope.row.orderStatus == 2"
            title="确定出库吗？"
            @confirm="handleSend(scope.row.orderId)"
            confirm-button-text="确定"
            cancel-button-text="取消"
          >
            <template #reference>
              <a style="cursor: pointer; margin-right: 10px">出库</a>
            </template>
          </el-popconfirm>
          <el-popconfirm
            v-if="!(scope.row.orderStatus == 4 || scope.row.orderStatus < 0)"
            title="确定关闭订单吗？"
            @confirm="handleClose(scope.row.orderId)"
            confirm-button-text="确定"
            cancel-button-text="取消"
          >
            <template #reference>
              <a style="cursor: pointer; margin-right: 10px">关闭订单</a>
            </template>
          </el-popconfirm>
          <router-link :to="{ path: '/order_detail', query: { id: scope.row.orderId }}">订单详情</router-link>
        </template>
      </el-table-column>
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
  </el-card>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { HomeFilled, Delete } from '@element-plus/icons-vue'
import axios from '@/utils/axios'

interface OrderData {
  createTime: string;
  extraInfo: string;
  isDeleted: number;
  orderId: number;
  orderNo: string;
  orderStatus: number;
  payStatus: number;
  payTime: string;
  payType: number;
  totalPrice: number;
  updateTime: string;
  userId: number;
}

interface Option {
  value: string | number;
  label: string;
}

interface State {
  loading: boolean;
  tableData: OrderData[];
  multipleSelection: any[];
  total: number;
  currentPage: number;
  pageSize: number;
  orderNo: string;
  orderStatus: string | number;
  options: Option[];
}

const state = reactive<State>({
  loading: false,
  tableData: [
    {
      createTime: "2021-04-07 17:37:02", // 订单创建时间
      extraInfo: "",
      isDeleted: 0,
      orderId: 3056, // 订单 id
      orderNo: "16177882220776231", // 订单编号
      orderStatus: -3, // 订单状态，空字符串：全部，0：待支付，1：已支付，2：配货完成，3：出库成功，4：交易成功，-1：手动关闭，-2：超时关闭，-3：商家关闭
      payStatus: 1, // 支付状态，
      payTime: "2021-04-07T09:37:05.000+0000", // 支付时间
      payType: 2, // 支付类型 1：微信，2：支付宝
      totalPrice: 8598, // 总金额
      updateTime: "2021-04-07 20:46:40", // 更新时间
      userId: 4555, // 购买用户id
    }
  ], // 数据列表
  multipleSelection: [], // 选中项
  total: 0, // 总条数
  currentPage: 1, // 当前页
  pageSize: 10, // 分页大小
  orderNo: '', // 订单号
  orderStatus: '', // 订单状态
  // 订单状态筛选项默认值
  options: [{
    value: '',
    label: '全部'
  }, {
    value: 0,
    label: '待支付'
  }, {
    value: 1,
    label: '已支付'
  }, {
    value: 2,
    label: '配货完成'
  }, {
    value: 3,
    label: '出库成功'
  }, {
    value: 4,
    label: '交易成功'
  }, {
    value: -1,
    label: '手动关闭'
  }, {
    value: -2,
    label: '超时关闭'
  }, {
    value: -3,
    label: '商家关闭'
  }]
});

// 初始化获取订单列表
onMounted(() => {
  getOrderList()
})
// 获取列表方法, 当每次输入的订单号改变的时候就会进行请求然后刷新列表
const getOrderList = () => {
  state.loading = true
  // axios.get('/orders', {
  //   params: {
  //     pageNumber: state.currentPage,
  //     pageSize: state.pageSize,
  //     orderNo: state.orderNo,
  //     orderStatus: state.orderStatus
  //   }
  // }).then(res => {
  //   state.tableData = res.list
  //   state.total = res.totalCount
  //   state.currentPage = res.currPage
  //   state.loading = false
  // })
}

// 触发过滤项方法
const handleOption = () => {
  state.currentPage = 1
  getOrderList()
}

// checkbox 选择项
const handleSelectionChange = (val) => {
  state.multipleSelection = val
}

// 翻页方法
const changePage = (val) => {
  state.currentPage = val
  getOrderList()
}

// 配货方法
const handleConfig = (id) => {
  let params
  // 当个配置
  if (id) {
    params = [id]
  } else {
    if (!state.multipleSelection.length) {
      console.log('state.multipleSelection', state.multipleSelection.length)
      ElMessage.error('请选择项')
      return
    }
    // 多选配置
    params = state.multipleSelection.map(i => i.orderId)
  }
  // axios.put('/orders/checkDone', {
  //   ids: params
  // }).then(() => {
  //   ElMessage.success('配货成功')
  //   getOrderList()
  // })
}

// 出库方法
const handleSend = (id) => {
  let params
  if (id) {
    params = [id]
  } else {
    if (!state.multipleSelection.length) {
      ElMessage.error('请选择项')
      return
    }
    params = state.multipleSelection.map(i => i.orderId)
  }
  // axios.put('/orders/checkOut', {
  //   ids: params
  // }).then(() => {
  //   ElMessage.success('出库成功')
  //   getOrderList()
  // })
}

// 关闭订单方法
const handleClose = (id) => {
  let params
  if (id) {
    params = [id]
  } else {
    if (!state.multipleSelection.length) {
      ElMessage.error('请选择项')
      return
    }
    params = state.multipleSelection.map(i => i.orderId)
  }
  // axios.put('/orders/close', {
  //   ids: params
  // }).then(() => {
  //   ElMessage.success('关闭成功')
  //   getOrderList()
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