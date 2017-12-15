<template>
  <div class="edit">
    <div class="title">
      <p><i class="fa fa-lock" aria-hidden="true"></i> 修改密码</p>
    </div>

    <div class="body">
      <el-form action="" label-width="70px" :label-position="'left'" v-on:submit.prevent>
        <el-form-item prop="old_pwd" label="旧密码" class="input-box">
          <el-input type="text" v-model="params.old_pwd" placeholder=""></el-input>
        </el-form-item>

        <el-form-item prop="new_pwd" label="新密码" class="input-box">
          <el-input type="text" v-model="params.new_pwd" placeholder=""></el-input>
        </el-form-item>

        <div>
          <button class="submit-button" type="submit" @click="submit()">确认修改</button>
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
        old_pwd: "",
        new_pwd: ""
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.edit {
  margin-top: 30px;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: #555;
  .title {
    border-bottom: 1px solid #ddd;
    p {
      font-size: 18px;
      padding: 20px 0;
    }
  }
  .body {
    padding: 24px 0;
    .input-box {
      margin: 16px;
    }
    .submit-button {
      cursor: pointer;
      width: 70%;
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
