<template>
  <div class="edit">
    <div class="title">
      <p><i class="fa fa-lock" aria-hidden="true"></i> 修改个人信息</p>
    </div>

    <div class="body">
      <el-form label-position="'top'" action="" v-on:submit.prevent>
        <div class="article-create">
          <dt style="">真实姓名：</dt>
          <el-input type="text" class="el-input" v-model="params.real_name"></el-input>
        </div>

        <div class="article-create">
          <dt style="">所在城市：</dt>
          <el-input type="text" class="el-input" v-model="params.city"></el-input>
        </div>

        <div>
          <button class="submit-button" type="submit" @click="submit()">提交修改</button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      params: {
        real_name: "",
        city: ""
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.edit {
  margin-top: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: #555;
  .title {
    border-bottom: 1px solid #ddd;
    p {
      font-size: 26px;
      padding: 40px 20px 20px 30px;
    }
  }
  .body {
    padding: 30px 0 30px;
    .article-create {
      margin-bottom: 20px;
      dt {
        color: #555;
        padding-top: 5px;
        width: 18%;
        text-align: right;
        float: left;
      }
      .el-input {
        width: 70%;
        margin-left: 2%;
      }
      #editor {
        height: 400px;
      }
    }
    .submit-button {
      cursor: pointer;
      width: 70%;
      margin-left: 20%;
      background-color: #00b5ad;
      color: #fff;
      font-size: 16px;
      padding: 5px 10px 5px 10px;
      border: 1px solid #00b5ad;
      border-radius: 100px;
      box-shadow: none;
      &:hover,
      &:focus,
      &:active {
        color: tomato;
        border: 1px solid tomato;
        box-shadow: none;
        border-radius: 100px;
        background-color: #fff;
      }
    }
  }
}
</style>
