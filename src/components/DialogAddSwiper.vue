<template>
  <el-dialog
  :title="type == 'add' ? '添加轮播图' : '修改轮播图' "
  v-model="state.visible"
  width="400px"
  >

  <el-form
  :model="state.ruleForm"
  :rules="state.rules"
  ref="formRef"
  lable-width="100px"
  class="good-form"
  >
  <el-form-item label="图片" prop="url">
    <el-upload
    class="avatar-uploader"
    :action="state.uploadImagServer"
    accept="jpg,jpeg,png"
    :headers="{
      token: state.token
    }"
    :show-file-list="false"
    :before-upload="handleBeforeUpload"
    :on-success="handleUrlSuccess"
    >
    <img style="width: 200px; height: 100px; border:1px solid #e9e9e9" v-if="state.ruleForm.url" :src="state.ruleForm.url" class="avatar" alt="">
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
  </el-form-item>
    <el-form-item label="跳转链接" prop="link">
      <el-input type="text" v-model="state.ruleForm.link"></el-input>
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

<script setup>
//只在父组件调用open方法的时候弹出此页面
import { reactive, ref } from 'vue';
import { localGet, uploadImgServer } from '@/utils';
import axios from '@/utils/axios';
import { ElMessage } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';

//uploadImagServer
const props = defineProps({
  type: String, //add为新增；edit为编辑
  reload:Function //table的刷新方法
})
//用于表单验证控制，相当于v2中的ref
const formRef = ref(null)
const state = reactive({
  uploadImgServer, //相当于直接赋值
  token: localGet('token') || '', //用于调用上传图片接口时，放在请求头中的token验证
  visible: false, //控制弹窗的显示隐藏
  ruleForm: {
    url: '', //图片地址
    link: '', //跳转链接
    sort: '' //排序
  },
  rules: {
    url: [
      { required: 'true', message: '图片不能为空', trigger: ['change'] }
    ],
    sort: [
      { required: 'true', message: '排序不能为空', trigger: ['change'] }
    ]
  },
  id: '' //编辑时候需要用到的id
})
//获取详情(父组件调用的时候用于获取信息)
const getDetail = (id) => {
  axios.get(`/carousels/${id}`).then(res => {
    state.ruleForm = {
      url: res.carouselUrl,
      link: res.redirectUrl,
      sort: res.carouselRank
    }
  })
}
// 上传之前，控制上传的文件。
const handleBeforeUpload = (file) => {
  const sufix = file.name.split('.')[1] || ''
  if (!['jpg', 'jpeg', 'png'].includes(sufix)) {
    ElMessage.error('请上传 jpg、jpeg、png 格式的图片')
    return false
  }
}
//上传图片，成功之后的回调   val是返回的数据
const handleUrlSuccess = (val) => {
  state.ruleForm.url = val.data || ''
}
//开启弹窗，此方法将在父组件，通过ref直接调用，后面会暴露出去
const open = (id) => {
  state.visible = true
  //如果有id,则是编辑,没有就是新增
  if(id) {
    state.id = id
    getDetail(id)
  } else {
    state.ruleForm = {
      url:'',
      link:'',
      sort:''
    }
  }
}
//关闭弹窗
const close = () => {
  state.visible = false
}
//提交表单方法
const submitForm = () => {
  console.log(111);
  formRef.value.validate((valid) => {
    //valid为是否通过表单验证，Boolean值
    if(valid) {
      //区分增加的编辑，调用的接口不一样
      if(props.type == 'add') {
        // axios.post('/carousels', {
        //   carouselUrl: state.ruleForm.url,
        //   redirectUrl: state.ruleForm.link,
        //   carouselRank: state.ruleForm.sort
        // }).then(() => {
        //   ElMessage.success('添加成功')
        //   state.visible = false
        //   //如果传了刷新函数就调用,加一个判断防止为空报错的情况
        //   if(props.reload) props.reload()
        // })
      } else {
        // axios.put('/carousels', {
        //   carouselId: state.id,
        //   carouselUrl: state.ruleForm.url,
        //   redirectUrl: state.ruleForm.link,
        //   carouselRank: state.ruleForm.sort
        // }).then(() => {
        //   ElMessage.success('修改成功')
        //   state.visible = false
        //   if (props.reload) props.reload()
        // })
      }
    }
  })
}
// 会在外面使用组件内部的方法，需通过 defineExpose 方法，将属性暴露出去。
defineExpose({ open, close })
</script>

<style scoped>
.avatar-uploader {
  width: 100px;
  height: 100px;
  color: #ddd;
  font-size: 30px;
}
  
.avatar-uploader>>>.el-upload {
  width: 100%;
  text-align: center;
}
  
.avatar-uploader-icon {
  display: block;
  width: 100%;
  height: 100%;
  border: 1px solid #e9e9e9;
  padding: 32px 17px;
}
</style>