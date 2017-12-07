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
      <!-- <span class="count-icon">
        <i class="fa fa-thumbs-up"></i>
        {{ comment.likes_count }} 人赞
      </span> -->
      <span class="count-icon"  @click="clickReply()">
        <i class="fa fa-comments"></i>
        回复
      </span>
    </div>

    <div class="child-comments-box">
      <div v-if="comment.children && comment.children.length > 0">
        <!-- <child-comment v-for="(child, index) in comment.children" :key="child.id" 
           @toReply="clickChildReply" :index="index" :child-comment="child"></child-comment> -->
        <div class="child-comment" v-for="(child, index) in comment.children" :key="child.id">
          <div class="child-comment-body">
            <router-link to="">
              <span class="child-comment-name">{{child.user.name}}</span>
            </router-link>
            : 
            <!-- <router-link to="">
              <span class="child-comment-name">@{{child.parent_id}}&nbsp; </span>
            </router-link> -->
            <!-- <span class="child-comment-content">{{child.content}}</span> -->
            <span class="child-comment-content" v-html="child.content"></span>
          </div>

          <div class="child-comment-actions">
            <span class="child-comment-time">{{child.created_at}}</span>
            <span class="count-icon" @click="clickChildReply(child)">
              <i class="fa fa-comments"></i>
              回复
            </span>
          </div>
        </div>
      </div>

      <div class="add-child-reply" v-if="comment.children && comment.children.length > 0">
        <span class="count-icon"  @click="clickReply()">
          <i class="fa fa-pencil"></i>
          我也说一句
        </span>
      </div>
    
      <div class="child-reply-box" v-if="showCommentReplyBox">
        <form action="">
          <el-input type="textarea" :rows="4" placeholder="写下你的看法" v-model="contentInput">
          <!-- <el-input type="textarea" :rows="4" :placeholder="'回复 : '" v-model="contentInput"> -->
          </el-input>
          <div class="send-comment">
            <el-button class="cancel-btn" type="submit" @click.prevent="clickCancelComment()">取 消</el-button>
            <el-button class="send-btn" type="submit" @click.prevent="clickComment()">发 表</el-button>
          </div>
        </form>
      </div>
    </div>

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
    return {
      showCommentReplyBox: false,
      contentInput: "",
      repliedComment: null
    };
  },
  mounted() {
    this.repliedComment = this.comment;
  },
  watch: {
    showCommentReplyBox: function(val, oldVal) {},
    repliedComment: function(val, oldval) {
      console.log("watch repliedComment: new:: " + val + ", old:: " + oldval);
      if (val) {
        // this.contentInput=`<a href="#" class="maleskine-author" target="_blank" data-user-id="52e030ab6b2e">@${this.repliedComment.user.name}</a>`;
        this.contentInput = "@" + this.repliedComment.user.name + " ";
      }
    }
  },
  methods: {
    clickChildReply(childComment) {
      this.showCommentReplyBox = true;
      this.repliedComment = childComment;
    },
    clickReply() {
      this.showCommentReplyBox = true;
      this.repliedComment = this.comment;
    },
    clickCancelComment() {
      this.showCommentReplyBox = false;
      this.repliedComment = null;
    },
    clickComment() {
      let params = {
        article_id: this.$route.params.id,
        parent_id: this.comment.id,
        content: this.formatAt()
        // content: this.contentInput
      };
      api.createComment(params).then(res => {
        if (res.data.status == 1) {
          this.comment.children.push(res.data.data);
          this.contentInput = "";
          this.showCommentReplyBox = false;
        }
      });
    },
    formatAt() {
      let content = this.contentInput.trim();
      if (!content.startsWith("@")) {
        return content;
      }
      let atSb = content.substring(content.indexOf("@"), content.indexOf(" "));
      let linkSb = `<a href="#" class="child-comment-name" target="_blank" data-user-id="52e030ab6b2e">${atSb}</a>`;
      return content.replace(atSb, linkSb);
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
  line-height: 24px;
}
.comment-actions {
  text-align: right;
  color: #bbb;
  font-size: 12px;
  .count-icon {
    cursor: pointer;
    margin-left: 8px;
  }
}
.child-comments-box {
  margin-top: 16px;
  border-left: 2px solid lightgray;
  padding-left: 32px;
}
.child-reply-box {
  form {
    padding-top: 8px;
    .send-comment {
      text-align: right;
    }
    button {
      margin: 16px 0;
      background-color: #00b5ad;
      color: #fff;
      font-size: 16px;
      padding: 4px 16px;
      border-radius: 100px;
      box-shadow: none;
      border: 1px solid #00b5ad;
      &:hover {
        color: tomato;
        box-shadow: none;
        background-color: #fff;
        border: 1px solid tomato;
      }
    }
    .cancel-btn {
      clear: both;
      border: none;
      background-color: #fff;
      color: #777;
      font-size: 13px;
      &:hover {
        border: none;
        color: #333;
      }
    }
  }
}
.add-child-reply {
  text-align: left;
  font-size: 14px;
  margin: 8px 0;
  color: #777;
  .count-icon {
    cursor: pointer;
    margin-left: 8px;
  }
}

.child-comment {
  border-bottom: 0.8px solid #eee;
  padding: 8px 0;
}
.child-comment-body {
  text-align: left;
  font-size: 13px;
  line-height: 20px;
  .child-comment-content {
  }
}
.child-comment-name {
  color: #00a4ff;
  .child-comment-name:hover {
    color: #00a4ff;
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
