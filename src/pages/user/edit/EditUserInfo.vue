<template>
  <div class="edit">
    <div class="title">
      <p><i class="fa fa-lock" aria-hidden="true"></i> 修改个人信息</p>
    </div>

    <div class="body">
      <el-form label-position="'top'" action="" label-width="70px" v-on:submit.prevent>
        <el-form-item prop="real_name" label="真实姓名" class="input-box">
          <el-input type="text" v-model="params.real_name" placeholder=""></el-input>
        </el-form-item>

        <el-form-item prop="city" label="所在城市" class="input-box">
          <el-input type="text" v-model="params.city" placeholder=""></el-input>
        </el-form-item>

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
