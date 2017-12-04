<template>
  <div class="child-comment">
    <span class="child-comment-author-name">
      {{}}
    </span>
    <span class="child-comment-content">
      : {{}}
    </span>

    <div class="child-comment-actions">
      <span class="child-comment-time">
        {{}}
      </span>
      <span class="count-icon">
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
    index: Number,
    childComment: null
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="scss">
.child-comment {
  border-bottom: 0.8px solid #eee;
}
.child-comment-author-name {
}
.child-comment-content {
}
.child-comment-actions {
  text-align: right;
  color: #ccc;
  font-size: 12px;
  .child-comment-time {
  }
  .count-icon {
    margin-left: 8px;
  }
}
</style>
