<template>
  <div class="page-footer-wrap">
    <div class="page-footer">
      <el-row>
        <el-col :span="8">
          <p style="text-align: left">Developed By Vita Wang</p>
        </el-col>
        <el-col :span="8">
          <p style="text-align: center">&copy; 2017-2018
            <span>{{homeName}}</span>
          </p>
        </el-col>
        <el-col :span="8">
          <p class="go-top">
            <a href="javascript: scroll(0, 0)">TOP</a>
          </p>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      homeName: "苍澜阁"
    };
  }
};
</script>

<style lang='scss'>
.page-footer-wrap {
  position: absolute;
  bottom: 0px;
  width: 100%;
  background: #333;
  margin-top: 70px;
  padding: 24px 0;
}
.page-footer {
  padding-left: 10%;
  padding-right: 10%;
}
p {
  font-size: 14px;
  color: #999;
}
.go-top {
  text-align: right;
  a {
    color: yellow;
  }
}
</style>
