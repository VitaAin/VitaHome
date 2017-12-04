<template>
  <div class="comment-reply-box">
    <form action="">
      <el-input type="textarea" :rows="4" placeholder="回复 " v-model="comment">
      </el-input>
      <div class="send-comment">
        <el-button type="submit" @click.prevent="clickComment()">评 论</el-button>
      </div>
    </form>
  </div>
</template>

<script>
  
</script>

<style lang="scss">

</style>
