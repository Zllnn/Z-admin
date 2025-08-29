<template>
  <el-card class="order-container">
    <div class="data">
      <el-card class="data-item" shadow="hover">
        <template #header>
          <div class="card-header">
            <span>订单状态</span>
          </div>
        </template>
        <div>
          {{ state.data.orderStatusString }}
        </div>
      </el-card>
      <el-card class="data-item" shadow="hover">
        <template #header>
          <div class="card-header">
            <span>创建时间</span>
          </div>
        </template>
        <div>
          {{ state.data.createTime }}
        </div>
      </el-card>
      <el-card class="data-item" shadow="hover">
        <template #header>
          <div class="card-header">
            <span>订单号</span>
          </div>
        </template>
        <div>
          {{ state.data.orderNo }}
        </div>
      </el-card>
    </div>
    <el-table
      :data="state.tableData"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <el-table-column
        label="商品图片"
      >
        <template #default="scope">
          <img style="width: 100px" :key="scope.row.goodsId" :src="$filters.prefix(scope.row.goodsCoverImg)" alt="商品主图">
        </template>
      </el-table-column>
      <el-table-column
        prop="goodsId"
        label="商品编号"
      >
      </el-table-column>
      <el-table-column
        prop="goodsName"
        label="商品名"
      ></el-table-column>
      <el-table-column
        prop="goodsCount"
        label="商品数量"
      >
      </el-table-column>
      <el-table-column
        prop="sellingPrice"
        label="价格"
      >
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import axios from '@/utils/axios'

interface OrderData {
  orderStatusString: string;
  createTime: string;
  orderNo: string;
}

interface TableData {
  goodsId: number;
  goodsCoverImg: string;
  goodsName: string;
  goodsCount: number;
  sellingPrice: number;
}

interface State {
  data: OrderData;
  tableData: TableData[];
}

const route = useRoute();
const { id } = route.query;

const state = reactive<State>({
  data: {
    orderStatusString: '待支付',
    createTime: '2021-04-07 17:37:02',
    orderNo: '16177882220776231'
  },
  tableData: [
    {
      goodsId: 1,
      goodsCoverImg: 'https://picsum.photos/800/400?random=1',
      goodsName: '商品1',
      goodsCount: 1,
      sellingPrice: 100
    }
  ]
});

onMounted(() => {
  // 初始化钩子，获取订单详情数据
  // axios.get(`/orders/${id}`).then((res: any) => {
  //   state.data = res;
  //   state.tableData = res.newBeeMallOrderItemVOS;
  // });
});
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.data {
  display: flex;
  margin-bottom: $spacing-xxl;
  
  .data-item {
    flex: 1;
    margin: 0 $spacing-sm;
  }
}
  
.el-table {
  border: 1px solid $border-lighter;
  border-bottom: none;
}
  
.has-gutter th {
  border-right: 1px solid $border-lighter;
  
  &:last-child {
    border-right: none;
  }
}
  
.el-table__row td {
  border-right: 1px solid $border-lighter;
  
  &:last-child {
    border-right: none;
  }
}
</style>