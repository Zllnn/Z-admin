<template>
  <el-dialog
    :title="type == 'add' ? '添加商品' : '修改商品'"
    v-model="state.visible"
    width="400px"
  >
    <el-form :model="state.ruleForm" :rules="state.rules" ref="formRef" label-width="100px" class="good-form">
      <el-form-item label="商品名称" prop="name">
        <el-input type="text" v-model="state.ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="跳转链接" prop="link">
        <el-input type="text" v-model="state.ruleForm.link"></el-input>
      </el-form-item>
      <el-form-item label="商品编号" prop="id">
        <el-input type="number" min="0" v-model="state.ruleForm.id"></el-input>
      </el-form-item>
      <el-form-item label="排序值" prop="sort">
        <el-input type="number" v-model="state.ruleForm.sort"></el-input>
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
import { reactive, ref } from 'vue';
import { ElMessage, type FormInstance, type FormRules } from 'element-plus';

// 定义props接口
interface Props {
  type: 'add' | 'edit';
  configType?: number;
  reload?: () => void;
}

// 定义表单数据接口
interface RuleForm {
  name: string;
  link: string;
  id: string | number;
  sort: string | number;
}

// 定义state接口
interface State {
  visible: boolean;
  ruleForm: RuleForm;
  rules: FormRules;
  id: string | number;
}

//接收父组件传来的参数
const props = defineProps<Props>() as Props;

const formRef = ref<FormInstance | null>(null); //获取表单

const state = reactive<State>({
  visible: false,
  ruleForm: {
    name: '',
    link: '',
    id: '',
    sort: ''
  },
  rules: {
    name: [
      { required: true, message: '名称不能为空', trigger: 'change' }
    ],
    id: [
      { required: true, message: '编号不能为空', trigger: 'change' }
    ],
    sort: [
      { required: true, message: '排序不能为空', trigger: 'change' }
    ]
  },
  id: '',//商品在数据库中存储的id，用于编辑的时候
});

// 获取详情
const getDetail = async (_id: string | number): Promise<void> => {
  try {
    // axios.get(`/indexConfigs/${_id}`).then((res) => {
    //   state.ruleForm = {
    //     name: res.configName,
    //     id: res.goodsId,
    //     link: res.redirectUrl,
    //     sort: res.configRank
    //   }
    // })
  } catch (error) {
    console.error('获取详情失败:', error);
    ElMessage.error('获取详情失败');
  }
};

// 开启弹窗
const open = (id?: string | number): void => {
  state.visible = true;
  if (id) {
    state.id = id;
    getDetail(id);
  } else {
    state.ruleForm = {
      name: '',
      link: '',
      id: '',
      sort: ''
    };
  }
};

// 关闭弹窗
const close = (): void => {
  state.visible = false;
};

// 定义API请求payload接口
// interface AddConfigPayload {
//   configType: number;
//   configName: string;
//   redirectUrl: string;
//   goodsId: number;
//   configRank: number;
// }

// interface UpdateConfigPayload extends AddConfigPayload {
//   configId: string | number;
// }

//提交事件
const submitForm = (): void => {
  formRef.value?.validate((valid: boolean) => {
    if (valid) {
      const goodsId = Number(state.ruleForm.id);
      if (goodsId < 0 || goodsId > 200) {
        ElMessage.error('商品编号不能小于 0 或大于 200');
        return;
      }

      if (props.type === 'add') {
        // const payload: AddConfigPayload = {
        //   configType: props.configType || 3,
        //   configName: state.ruleForm.name,
        //   redirectUrl: state.ruleForm.link,
        //   goodsId: goodsId,
        //   configRank: Number(state.ruleForm.sort)
        // };

        // 使用payload发送请求
        // axios.post('/indexConfigs', payload).then(() => {
        //   ElMessage.success('添加成功');
        //   state.visible = false;
        //   props.reload?.();
        // }).catch((error: any) => {
        //   console.error('添加失败:', error);
        //   ElMessage.error('添加失败');
        // });
        // console.log('添加商品:', payload); // 临时使用payload避免警告
      } else {
        // const payload: UpdateConfigPayload = {
        //   configId: state.id,
        //   configType: props.configType || 3,
        //   configName: state.ruleForm.name,
        //   redirectUrl: state.ruleForm.link,
        //   goodsId: goodsId,
        //   configRank: Number(state.ruleForm.sort)
        // };

        // 使用payload发送请求
        // axios.put('/indexConfigs', payload).then(() => {
        //   ElMessage.success('修改成功');
        //   state.visible = false;
        //   props.reload?.();
        // }).catch((error: any) => {
        //   console.error('修改失败:', error);
        //   ElMessage.error('修改失败');
        // });
        // console.log('修改商品:', payload); // 临时使用payload避免警告
      }
    }
  });
};
defineExpose({ open, close } as { open: (id?: string | number) => void; close: () => void })
</script>

<style scoped>

</style>