<template>
  <div class="comment">
    <div class="comment-author">
      <router-link :to="{name: 'UserArticles', params: {id: comment.user.id}}">
        <img :src="comment.user.avatar" alt="">
      </router-link>

      <div class="comment-info">
        <div class="comment-author-name">
          <router-link :to="{name: 'UserArticles', params: {id: comment.user_id}}">
            {{comment.user.name}}&nbsp;
          </router-link>
        </div>
        <div class="comment-time">
          <span>{{index + 1}}楼 · {{ comment.created_at }}</span>
        </div>
      </div>
    </div>

    <div class="comment-content">
      {{comment.content}}
    </div>

    <div class="comment-actions">
      <span class="count-icon">
        <i class="fa fa-thumbs-up"></i>
        {{ comment.likes_count }} 人赞
      </span>
      <span class="count-icon"  @click="clickReply()">
        <i class="fa fa-comments"></i>
        回复
      </span>
    </div>

    <!-- <div class="child-comments-box" v-for="(child, index) in comments.child_comments">
      <child-comment :index="index" :child-comment="child"></child-comment>
    </div> -->

    <div class="comment-reply-box">
      <form action="">
        <el-input type="textarea" :rows="4" placeholder="回复 " v-model="comment">
        </el-input>
        <div class="send-comment">
          <el-button type="submit" @click.prevent="clickComment()">评 论</el-button>
        </div>
      </form>
    </div>
    
    <!-- <ChildComment :childComment="comment.id" :article_id="article.id"></ChildComment> -->
    <div style="border-bottom: 1px solid #eee; padding-top: 15px"></div>
  </div>
</template>

<script>
import ChildComment from "../components/ChildComment";
import api from "../api";

export default {
  name: "comment",
  components: {
    ChildComment
  },
  props: {
    index: Number,
    comment: null
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    clickReply(){
      let params = {
        article_id: this.$route.params.id,
        parent_id: this.comment.id,
        content: this.comment
      };
      api.createComment(params).then(res => {
        if (res.data.status == 1) {
          this.comments.push(res.data.data);
          this.comment = "";
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.comment {
  clear: both;
  padding-top: 15px;
  position: relative;
}
.comment-author {
  text-align: left;
  line-height: 100%;
  img {
    position: absolute;
    width: 36px;
    height: 36px;
    border: 0.8px solid #ccc;
    border-radius: 50%;
  }
  .comment-info {
    margin-top: 6px;
    margin-left: 48px;
    color: #999;
    .comment-author-name {
      font-size: 14px;
      color: #555;
    }
    .comment-time {
      font-size: 12px;
    }
  }
}
.comment-content {
  margin-top: 8px;
  color: #555;
  font-size: 14px;
  text-align: left;
}
.comment-actions {
  text-align: right;
  color: #aaa;
  font-size: 12px;
  .count-icon {
    margin-left: 8px;
  }
}
.child-comments-box {
  border-left: 2px solid lightgray;
  padding-left: 36px;
}
</style>
