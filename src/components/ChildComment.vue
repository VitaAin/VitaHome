<template>
  <div class="child-comment">
    <div class="child-comment-body">
      <router-link to="">
        <span class="child-comment-name">{{childComment.user.name}}</span>
      </router-link>
      : 
      <router-link to="">
        <span class="child-comment-name">@{{childComment.parent_id}}&nbsp; </span>
      </router-link>
      <span class="child-comment-content">{{childComment.content}}</span>
    </div>

    <div class="child-comment-actions">
      <span class="child-comment-time">{{childComment.created_at}}</span>
      <span class="count-icon" @click="clickChildReply()">
        <i class="fa fa-comments"></i>
        回复
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "child-comment",
  props: {
    // parentUser: null,
    index: Number,
    childComment: null
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    clickChildReply() {
      console.log(
        "ChildComment clickChildReply: user replied:: " +
          this.childComment.user.name
      );
      this.$emit("toReply", this.childComment.id);
    }
  }
};
</script>

<style lang="scss">
.child-comment {
  border-bottom: 0.8px solid #eee;
  padding: 8px 0;
}
.child-comment-body {
  text-align: left;
  font-size: 13px;
  line-height: 20px;
  .child-comment-name {
    color: #00a4ff;
    .child-comment-name:hover {
      color: #00a4ff;
    }
  }
  .child-comment-content {
  }
}
.child-comment-actions {
  text-align: right;
  color: #bbb;
  font-size: 12px;
  margin-top: 8px;
  .child-comment-time {
  }
  .count-icon {
    cursor: pointer;
    margin-left: 8px;
  }
}
</style>
