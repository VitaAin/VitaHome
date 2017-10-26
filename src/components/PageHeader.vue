<template>
  <div>
    <el-menu :default-active="'1'" class="header" mode="horizontal" @select="handleSelect">
      <el-menu-item index="0" class="header-title">{{headTitle}}</el-menu-item>

      <div class="header-nav">
        <router-link to="/">
          <el-menu-item index="1">
          首页
          </el-menu-item>
        </router-link>

        <router-link to="/article/create">
        <!-- <router-link :to="{name:'ArticleCreate'}"> -->
          <el-menu-item index="2">
            写文章
          </el-menu-item>
        </router-link>

        <router-link to="/about">
          <el-menu-item index="3">
          关于
          </el-menu-item>
        </router-link>
      </div>
      
      <div class="user-nav">
        <router-link to="/user/login">
          <el-menu-item index="10">登录</el-menu-item>
        </router-link>
        <router-link to="/user/register">
          <el-menu-item index="11">注册</el-menu-item>
        </router-link>
      </div>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headTitle: "Vita's Home"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style>
.header {
  background: lightskyblue;
  border-bottom: #ddd solid 1px;
}
.header-title {
  font-size: 24px;
  font-weight: bold;
}
.user-nav {
  position: absolute;
  right: 0;
}
</style>
