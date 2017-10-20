<template>
  <div>
    <el-menu :default-active="activeIndex" class="header" mode="horizontal" @select="handleSelect">
      <el-menu-item index="0" class="header-title">{{headTitle}}</el-menu-item>
      <div class="header-nav">
        <el-menu-item index="1">
          <router-link to="/">首页</router-link>
        </el-menu-item>
        <el-menu-item index="2">
          <router-link to="/">文章</router-link>
        </el-menu-item>
        <el-menu-item index="3">
          <router-link to="/">关于</router-link>
        </el-menu-item>
      </div>
      <div class="user-nav">
        <el-menu-item index="10">登录</el-menu-item>
        <el-menu-item index="11">注册</el-menu-item>
      </div>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
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
