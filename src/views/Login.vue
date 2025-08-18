<template>
  <el-row class="login-page">
    <el-col :span="14" :offset="5" class="form">
      <div class="inner">
        <div class="innerbgc">
          <img src="@/assets/login_back_.jpg" alt="" style="max-width: 100%; height: auto;">
        </div>
        <div class="innerlogin">
          <!-- 注册相关表单 -->
          <el-form :model="state.fromModel" :rules="state.rules" ref="loginForm" size="large" autocomplete="off" v-if="state.isRegister">
            <el-form-item>
              <h1 style="color: white; margin: 0 auto;">注册</h1>
            </el-form-item>
            <el-form-item prop="username">
              <el-input v-model="state.fromModel.username" :prefix-icon="User" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="state.fromModel.password" :prefix-icon="Lock" type="password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item prop="repassword">
              <el-input v-model="state.fromModel.repassword" :prefix-icon="Lock" type="password"
                placeholder="请输入再次密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="Regist" class="button" type="primary">
                注 册
              </el-button>
            </el-form-item>
            <el-form-item class="flex">
              <el-link type="info" :underline="false" @click="state.isRegister = false">
                去登录
              </el-link>
            </el-form-item>
          </el-form>

          <!-- 登录相关表单 -->
          <el-form :model="state.fromModel" :rules="state.rules" ref="loginForm" size="large" autocomplete="off" v-else>
            <el-form-item>
              <h1 style="color: white;margin: 0 auto;">登录</h1>
            </el-form-item>
            <el-form-item prop="username">
              <el-input v-model="state.fromModel.username" :prefix-icon="User" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="state.fromModel.password" name="password" :prefix-icon="Lock" type="password"
                placeholder="请输入密码" @keyup.enter="login"></el-input>
            </el-form-item>
            <el-form-item class="flex">
              <div class="flex">
                <el-checkbox v-model="state.checked" @change="!state.checked">记住我</el-checkbox>
                <el-link type="primary" :underline="false">忘记密码？</el-link>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button @click="login" class="button" type="primary" auto-insert-space>
                登录
              </el-button>
            </el-form-item>
            <el-form-item class="flex">
              <el-link type="info" :underline="false" @click="state.isRegister = true">
                注册
              </el-link>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script setup>
import axios from '@/utils/axios';
import { reactive, ref } from 'vue';
import { localSet } from '../utils';
import { ElMessage } from 'element-plus';
import { User, Lock } from '@element-plus/icons-vue'
// 安装 js-md5，密码需要 md5 加密，服务端是解密 md5 的形式
import md5 from 'js-md5'



//el-from组件接收一个ref属性
const loginForm = ref(null)
//表单校验（注册时）
const validatePass = (rule, value, callback) => {
  if (value !== fromModel.value.password) {
    callback(new Error('两次输入密码不一致'))
  } else {
    callback()
  }
}
const state = reactive({
  fromModel: {
    username: '', //账号
    password: '', //密码
    repassword: '' //确认密码
  },
  isRegister: false,
  checked: true,
  //表单验证判断
  rules: {
    username: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
      { min: 5, max: 10, message: '用户名必须是5-10位的字符', trigger: 'blur' },
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      {
        pattern: /^\S{6,15}$/,
        message: '密码必须是6-15位的非空字符',
        trigger: 'blur'
      }
    ],
    repassword: [
      { required: true, message: '请再次输入密码', trigger: 'blur' },
      { validator: validatePass, trigger: 'blur' },
    ]
  },
})

//登录
const login = async () => {
  //表单校验
  loginForm.value.validate((valid) => {
    //valid是布尔值,表示是否通过了校验
    if(valid) {
      // /adminUser/login 登录接口路径
      axios.post('/adminUser/login', {
        username: state.fromModel.username || '',
        password: md5(state.fromModel.password), //密码进行md5加密,后端通过md5解密
      }).then(res => {
        ElMessage.success('登录成功')
        //将得到的token存入localStorage
        localSet('token', res)
        //此处登录完成之后需要刷新页面,因为需要将token放入请求头中
        window.location.href = '/'
      })
    } else {
      console.log('error submit!!');
      return false
    }
  })
}

//注册
const Regist = async () => {
  //表单校验
  loginForm.value.validate((valid) => {
    if(valid) {
      // /adminUser/regist 注册接口路径
      axios.post('/adminUser/regist', {
        username: state.fromModel.username || '',
        password: md5(state.fromModel.password), //密码进行md5加密,后端通过md5解密
      }).then(res => {
        ElMessage.success('注册成功')
        state.fromModel.isRegister = false
      })
    }
  })
}
</script>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.1); // 修改背景颜色为半透明的白色
  background-image: url("@/assets/login_back_.jpg");
  background-size: 100%;

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;

    .title {
      margin: 0 auto;
    }

    .button {
      width: 100%;
      border-radius: 20px;
    }

    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}

.inner {
  display: flex;
  justify-content: space-between;
  background-color: black;
  opacity: 0.7;
  box-shadow: 10px 10px 15px rgba(0, 0, 0, 1);
}

.innerbgc {
  width: 70%;
  margin: 20px;
}

.innerlogin {
  height: auto;
  width: 30%;
  margin: 20px;
}
</style>