<template>
  <div class="header">
    <div class="left">
      <el-icon class="back" v-if="state.hasBack" @click="back"><Back /></el-icon>
      <span style="font-size: 20px;">{{ state.name }} </span>
    </div>
    <div class="right">
      <el-popover
      placement="bottom"
      :width="320"
      trigger="click"
      popper-class="popper-user-box"
      :teleported="true"
      >
      <!-- 具名插槽 -->
      <template #reference>
        <div class="author">
          <el-icon class="icon"><UserFilled /></el-icon>
          {{ state.userInfo && state.userInfo.nickName || '' }}
          <el-icon><CaretBottom /></el-icon>
        </div>
      </template>
      <div class="nickname">
        <p>登录名：{{ state.userInfo && state.userInfo.loginUserName || '' }}</p>
        <p>昵称： {{ state.userInfo && state.userInfo.nickName || '' }}</p>
        <el-tag size="small" effect="dark" class="logout" @click="logout">退出</el-tag>
      </div>
      </el-popover>
    </div>
  </div>
</template>

<script setup>
import axios from '@/utils/axios';
import { onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { localRemove, pathMap } from '@/utils';
import { ElIcon } from 'element-plus'
import { UserFilled, CaretBottom } from '@element-plus/icons-vue'


//获取路由实例
const router = useRouter()
//声明路由和title对应的键值对
// const pathMap = pathMap
const state = reactive({
  name:'首页',
  userInfo: {
    nickName:'Zllnn',
    loginUserName: 'admin'
  }, //用户信息
  hasBack: false, // 是否展示返回icon
})

//初始化执行方法,加载页面时获取用户信息（登录的时候获取用户信息）
onMounted(() => {
  const pathname = window.location.hash.split('/')[1] || ''
  if(!['login'].includes(pathname)){
    getUserInfo()
  }
})
//获取用户信息
const getUserInfo = async () => {
  // const userInfo = await axios.get('/adminUser/profile')
  // state.userInfo = userInfo
}
//退出登录
const logout = () => {
  axios.delete('/logout').then(() => {
    //退出的时候清理token
    localRemove('token')
    //回到首页
    router.push({path: '/login'})
  })
}

//路由前置守卫，用于监听路由变化
router.afterEach((to) => {
  console.log(to);
  const {id} = to.query
  state.name = pathMap[to.name]  
  // level2 和 level3 需要展示返回icon
  state.hasBack = ['level2', 'level3'].includes(to.name)
})

// 返回方法
const back = () => {
  router.back()
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.header {
  height: 50px;
  border-bottom: 1px solid $border-light;
  @include flex-between;
  padding: 0 $spacing-lg;
  
  .left .back {
    border: 1px solid $border-light;
    padding: $spacing-xs;
    border-radius: $border-radius-round;
    margin-right: $spacing-xs;
    cursor: pointer;
  }
  
  .right > div > .icon {
    font-size: $font-size-large;
    margin-right: $spacing-xs;
  }
  
  .author {
    margin-left: $spacing-sm;
    cursor: pointer;
  }
}
</style>

<style lang="scss">
@import '@/styles/variables.scss';

.popper-user-box {
  background: url('https://s.yezgea02.com/lingling-h5/static/account-banner-bg.png') 50% 50% no-repeat !important;
  background-size: cover !important;
  border-radius: 0 !important;
  
  .nickname {
    position: relative;
    color: $background-white;
    
    .logout {
      position: absolute;
      right: 0;
      top: 0;
      cursor: pointer;
    }
  }
}
</style>