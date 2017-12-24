<template>
  <div class="footer">
    <el-row>
      <el-col :span="14" :offset="5">
        <div style="border-bottom: 1px solid #ddd; padding-top: 70px"></div>
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
            <p style="text-align: right">
              <a href="javascript: scroll(0, 0)">TOP</a>
            </p>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      homeName: "苍澜阁",
    };
  }
};
</script>

<style lang='scss'>
.footer {
  padding-left: 10%;
  padding-right: 10%;
}
p {
  margin-top: 30px;
  font-size: 14px;
  color: #999;
}
a {
  color: #00b5ad;
}
</style>
