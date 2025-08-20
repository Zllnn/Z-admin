<template>
  <div class="layout">
    <el-container v-if="state.showMenu" class="container">
      <el-aside class="aside">
        <!-- 系统名称+logo -->
        <div class="head">
          <div>
            <img src="" alt="logo">
            <span>Z-admin</span>
          </div>
        </div>
        <div class="line"></div>

        <!-- 下部导航 -->
        <el-menu background-color="#222832" text-color="#fff" :router="true" :default-openeds="state.defaultOpen"
          :default-active="state.currentPath">
          <!-- 第一层 -->
          <el-sub-menu index="1">
            <template #title>
              <span>Dashboard</span>
            </template>
            <!-- 第二层 -->
            <el-menu-item-group>
              <el-menu-item index="/"><el-icon>
                  <Reading />
                </el-icon>系统介绍</el-menu-item>
              <el-menu-item index="/add"><el-icon>
                  <CirclePlus />
                </el-icon>添加二手商品</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <span>首页配置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/swiper"><el-icon>
                  <Picture />
                </el-icon> 轮播图配置</el-menu-item>
              <el-menu-item index="/hot"><el-icon>
                  <StarFilled />
                </el-icon>热销商品配置</el-menu-item>
              <el-menu-item index="/new"><el-icon>
                  <Sell />
                </el-icon>新品上线配置</el-menu-item>
              <el-menu-item index="/recommend"><el-icon>
                  <ShoppingCart />
                </el-icon>为你推荐配置</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <span>模块管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/category"><el-icon><Menu /></el-icon>分类管理</el-menu-item>
              <el-menu-item index="/good"><el-icon><Goods /></el-icon>商品管理</el-menu-item>
              <el-menu-item index="/order"><el-icon><List /></el-icon>订单管理</el-menu-item>
              <el-menu-item index="/guest"><el-icon><User /></el-icon>会员管理</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="4">
            <template #title>
                <span>系统管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/account"><el-icon><Lock /></el-icon>修改密码</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-container class="content">
        <Header></Header>
        <div class="main">
          <!-- 路由出口 -->
          <router-view />
        </div>
        <Footer></Footer>
      </el-container>
    </el-container>
    <el-container v-else class="container">
      <!-- 路由出口 -->
      <router-view />
    </el-container>
  </div>
</template>

<script setup>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import { useRouter } from 'vue-router';
import { reactive } from 'vue';
import { localGet, pathMap } from '@/utils';

//不需要菜单的路径数组
const noMenu = ['/login']
const router = useRouter()
const state = reactive({
  showMenu: true, //是否需要显示菜单栏
  defaultOpen:['1','2','3','4'],
  currentPath: '/'
})

//全局前置守卫
// router.beforeEach((to,from,next) => {
//   if(to.path == '/login') {
    //如果去登录页面就放行
  //   next()
  // } else {
    //如果不是登录页面，跳转至登录页面
//     if(!localGet('token')){
//       next({ path: '/login' })
//     } else {
//       next()
//     }
//   }
//   state.showMenu = !noMenu.includes(to.path)
//   state.currentPath = to.path
//   document.title = pathMap[to.name]
// })
</script>

<style scoped>
.layout {
  min-height: 100vh;
  background-color: #ffffff;
}

.container {
  height: 100vh;
}

.aside {
  width: 200px !important;
  background-color: #222832;
}

.head {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
}

.head>div {
  display: flex;
  align-items: center;
}

.head img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.head span {
  font-size: 20px;
  color: #ffffff;
}

.line {
  border-top: 1px solid hsla(0, 0%, 100%, .05);
  border-bottom: 1px solid rgba(0, 0, 0, .2);
}

.content {
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  overflow: hidden;
}

.main {
  height: calc(100vh - 100px);
  /* height: 100vh; */
  overflow: auto;
  padding: 10px;
}
</style>

<style>
body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>