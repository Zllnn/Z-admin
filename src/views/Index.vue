<template>
  <div class="index-container">
    <h2>Element Plus 主题测试</h2>

    <div class="button-group">
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </div>

    <div class="form-group">
      <el-input v-model="inputValue" placeholder="请输入内容" />
      <el-select v-model="selectValue" placeholder="请选择">
        <el-option label="选项1" value="1" />
        <el-option label="选项2" value="2" />
      </el-select>
    </div>

    <div class="card-group">
      <el-card>
        <template #header>
          <span>卡片标题</span>
        </template>
        <div>这是卡片内容</div>
      </el-card>
    </div>
  </div>
  <el-icon>
    <Unlock />
  </el-icon>
</template>

<script setup>
import { ref } from 'vue'

const inputValue = ref('')
const selectValue = ref('')
</script>

<style scoped>
.index-container {
  padding: 20px;
}

.button-group {
  margin: 20px 0;
}

.button-group .el-button {
  margin-right: 10px;
}

.form-group {
  margin: 20px 0;
}

.form-group .el-input,
.form-group .el-select {
  margin-bottom: 10px;
  width: 200px;
}

.card-group {
  margin: 20px 0;
}
</style>