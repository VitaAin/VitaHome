<template>
  <div class="edit">
    <div class="title">
      <p><i class="fa fa-picture-o" aria-hidden="true"></i> 更换头像</p>
    </div>

    <div class="body">
      <div class="upload-container">
        <div class="avatar">
          <!-- <img :src="auth.user.avatar" alt=""> -->
          <img alt="">
        </div>

        <div><p>更换头像：</p></div>
        <el-upload class="upload-demo" drag :action="uploadUrl" :on-success="uploadCallback" :show-file-list="false" :headers="headers">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
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
    padding: 30px 0 30px 30px;
    text-align: center;
    .avatar {
      margin-bottom: 30px;
      img {
        width: 60%;
      }
    }
  }
}
</style>
