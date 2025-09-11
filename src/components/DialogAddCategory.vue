<template>
   <el-dialog
    :title="props.type === 'add' ? '添加分类' : '修改分类'"
    v-model="state.visible"
    width="400px"
  >
    <el-form :model="state.ruleForm" :rules="state.rules" ref="formRef" label-width="100px" class="good-form">
      <el-form-item label="商品名称" prop="name">
        <el-input type="text" v-model="state.ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="排序值" prop="rank">
        <el-input type="number" v-model="state.ruleForm.rank"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="state.visible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from '@/utils/axios'
import { ElMessage } from 'element-plus'
import type { FormInstance } from 'element-plus'

interface Props {
  type: 'add' | 'edit';
  reload?: () => void;
}

interface RuleForm {
  name: string;
  rank: string | number;
}

interface State {
  visible: boolean;
  categoryLevel: number;
  parentId: number;
  ruleForm: RuleForm;
  rules: Record<string, any[]>;
  id: string | number;
}

//接收参数
const props = defineProps<Props>();

const formRef = ref<FormInstance | null>(null);
const route = useRoute(); //获取路由参数

const state = reactive<State>({
  visible: false,
  categoryLevel: 1,
  parentId: 0,
  ruleForm: {
    name: '',
    rank: ''
  },
  rules: {
    name: [
      { required: 'true', message: '名称不能为空', trigger: ['change'] }
    ],
    rank: [
      { required: 'true', message: '编号不能为空', trigger: ['change'] }
    ]
  },
  id: '' //存在数据库中的id主键字段
});

// 获取详情
const getDetail = (id: string | number): void => {
  axios.get(`/categories/${id}`).then((res:any) => {
    state.ruleForm = {
      name: res.categoryName,
      rank: res.categoryRank
    }
    state.parentId = res.parentId
    state.categoryLevel = res.categoryLevel
  })
};

// 开启弹窗
const open = (id?: string | number): void => {
  state.visible = true;
  if (id) {
    state.id = id;
    // 如果是有 id 传入，证明是修改模式
    getDetail(id);
  } else {
    // 否则为新增模式
    // 新增类目，从路由获取分类 level 级别和父分类 id
    const { level = 1, parent_id = 0 } = route.query;
    state.ruleForm = {
      name: '',
      rank: ''
    };
    state.parentId = Number(parent_id);
    state.categoryLevel = Number(level);
  }
};

// 关闭弹窗
const close = (): void => {
  state.visible = false;
};

//提交按钮
const submitForm = (): void => {
  formRef.value?.validate((valid: boolean) => {
    if (valid) {
      if (props.type == 'add') {
        // 添加方法
        // axios.post('/categories', {
        //   categoryLevel: state.categoryLevel, // 分类等级
        //   parentId: state.parentId, // 当前分类的父分类 id
        //   categoryName: state.ruleForm.name, // 分类名称
        //   categoryRank: state.ruleForm.rank // 分类权重
        // }).then(() => {
        //   ElMessage.success('添加成功')
        //   state.visible = false
        //   // 接口回调之后，运行重新获取列表方法 reload
        //   if (props.reload) props.reload()
        // })
      } else {
        // 修改方法
        // axios.put('/categories', {
        //   categoryId: state.id,
        //   categoryLevel: state.categoryLevel,
        //   parentId: state.categoryLevel,
        //   categoryName: state.ruleForm.name,
        //   categoryRank: state.ruleForm.rank
        // }).then(() => {
        //   ElMessage.success('修改成功')
        //   state.visible = false
        //   // 接口回调之后，运行重新获取列表方法 reload
        //   if (props.reload) props.reload()
        // })
      }
    }
  });
};

// 通过模板 ref 提供 open/close 方法给父组件调用
defineExpose({ open, close });


</script>

<style scoped>

</style>