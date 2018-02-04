<template>
  <div v-if="article">
    <el-row :gutter="25">
      <el-col :span="18" :offset="3">
        <div class="article">
          <div class="title">
            <h2>{{article.title}}</h2>

            <div class="to-edit" v-if="auth.id == article.user.id">
              <router-link :to="{name: 'ArticleEdit', params: {id: this.$route.params.id}}">
                <span style="padding-left: 10px; font-size: larger">
                  <i class="fa fa-edit"></i>
                </span>
              </router-link>
            </div>
          </div>

          <div class="article-author">
            <router-link :to="{name: 'UserArticles', params: {slug: article.user.id}}">
              <img :src="article.user.avatar" alt="">
            </router-link>

            <div class="author-details">
              <div>
                <router-link class="author-name" :to="{name: 'UserArticles', params: {id: article.user.id}}">
                  <span>{{article.user.name}}</span>
                </router-link>
                <button class="to-follow" v-if="!follow" @click.prevent="clickFollow()">+关注</button>
                <button class="already-follow" v-if="follow" @click.prevent="clickFollow()">已关注</button>
              </div>
              <div class="article-count">
                <span>{{ article.created_at }}</span>
                <span>阅读 {{ article.view_count }}</span>
                <span>评论 {{ article.comments_count }}</span>
                <span>点赞 {{ article.likes_count }}</span>
              </div>
            </div>
          </div>

          <div class="article-body">
            <!-- <vue-markdown class="markdown-body">{{article.body}}</vue-markdown> -->
            <!-- <div class="markdown-body">{{article.body}}</div> wrong -->
            <div class="markdown-body" v-html="article.body"></div>
          </div>

          <div class="article-category">
            > 分类：
            <span>{{article.category.name}}</span>
          </div>

          <div class="article-tags" v-if="article.tags && article.tags.length>0">
            > 标签：
            <span v-for="tag in article.tags" :key="tag.id">
              {{tag.name}}; 
            </span>
          </div>

          <div class="article-like">
            <el-button type="submit" :class="[{'btn-dislike':isLike},'btn-like']" @click.prevent="clickLike()">
              <span v-if="!isLike"><i class="fa fa-thumbs-o-up"></i> 点 赞 </span>
              <span v-if="isLike"><i class="fa fa-thumbs-up"></i> 已 赞 </span>
              <span class="article-likes-count"> | </span> {{likes_count}}
            </el-button>
          </div>

          <div class="article-comment" v-if="auth.check()">
            <img :src="auth.user.avatar" alt="">
            <form action="">
              <el-input type="textarea" :rows="4" placeholder="请输入评论内容" v-model="comment">
              </el-input>
              <div class="send-comment">
                <el-button type="submit" @click.prevent="clickComment()">发 表</el-button>
              </div>
            </form>
          </div>

          <div v-if="!auth.check()" class="login-to-comment">
            <p>
              <router-link :to="{path: '/user/login', query: { redirect_url: this.$route.path }}">
                登录参与评论
              </router-link>
            </p>
          </div>
          <div class="comments-count">
            <h4>{{article.comments_count ? article.comments_count + ' 条' : '暂无'}}评论</h4>
          </div>

          <div style="border-bottom: 1px solid #ddd; padding-top: 16px"></div>
          <div v-for="(comment, index) in comments" :key="comment.id">
            <comment :index="index" :comment="comment"></comment>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- <popup v-show="showPreview" @closePreview="closePreview"></popup> -->
    <!-- <popup v-show="showPreview"></popup> -->
  </div>
</template>

<script>
// import VueMarkdown from "vue-markdown";
import Marked from "marked";
import api from "../../api";
import { mapState } from "vuex";
import Comment from "../../components/CommentItem";

export default {
  components: {
    // VueMarkdown,
    Comment
  },
  data() {
    return {
      article: null,
      isLike: false,
      likes_count: 0,
      follow: false,
      comment: "",
      comments: [],
      showPreview: false
    };
  },
  computed: mapState({
    auth: state => state.account.auth
  }),
  mounted() {
    Marked.setOptions({
      highlight: function(code) {
        return require("highlight.js").highlightAuto(code).value;
      }
    });
    this.getArticle();
    this.getIsLike();
    this.getLikes();
    this.getComments();
  },
  methods: {
    getArticle() {
      console.log("Show getArticle: id:: " + this.$route.params.id);
      api.getArticle(this.$route.params.id).then(res => {
        console.log("Show getArticle: res:: " + res.data.data.title);
        if (res.data.status == 1) {
          this.article = res.data.data;
          this.article.body = Marked(res.data.data.body);
          this.getIsFollow();
        }
      });
    },
    getIsFollow() {
      if (!this.auth.check()) {
        return;
      }

      api.isFollowOrNot(this.article.user.id).then(res => {
        if (res.data.status == 1) {
          this.follow = res.data.data.followed;
        }
      });
    },
    clickFollow() {
      if (!this.auth.check()) {
        return;
      }

      api.follow(this.article.user.id).then(res => {
        if (res.data.status == 1) {
          this.follow = res.data.data.followed;
        }
      });
    },
    getIsLike() {
      if (!this.auth.check()) {
        return;
      }

      api.isLikeOrNot(this.$route.params.id).then(res => {
        if (res.data.status == 1) {
          this.isLike = res.data.data.liked;
        }
      });
    },
    getLikes() {
      api.getArticleLikes(this.$route.params.id).then(res => {
        if (res.data.status == 1) {
          this.likes_count = res.data.data.likes_count;
        }
      });
    },
    getComments() {
      api.getArticleComments(this.$route.params.id).then(res => {
        if (res.data.status == 1) {
          this.comments = res.data.data;
        }
      });
    },
    clickLike() {
      if (!this.auth.check()) {
        this.showPreview = true;
        return;
      }

      api.like(this.$route.params.id).then(res => {
        if (res.data.status == 1) {
          this.isLike = res.data.data.liked;
          this.getLikes();
        }
      });
    },
    clickComment() {
      let params = {
        article_id: this.$route.params.id,
        parent_id: 0,
        content: this.comment
      };
      api.createComment(params).then(res => {
        if (res.data.status == 1) {
          this.comments.push(res.data.data);
          this.comment = "";
          this.addArticleCommentsCount();
        }
      });
    },
    addArticleCommentsCount() {
      this.article.comments_count++;
    }
  }
};
</script>

<style lang="scss">
@import "../../../static/css/markdown.css";
@import "~highlight.js/styles/atom-one-light.css";
.article {
  margin-top: 40px;
  .title {
    text-align: left;
    h2 {
      display: inline-block;
    }
  }
  a {
    color: #333;
    :hover {
      color: orangered;
    }
  }
  .to-edit {
    display: inline-block;
    font-size: 12px;
  }
}

.article-category {
  text-align: left;
  font-size: 11px;
  margin: 8px 0 2px 0;
}

.article-tags {
  text-align: left;
  font-size: 11px;
}

.article-author {
  text-align: left;
  vertical-align: middle;
  margin-top: 24px;
  img {
    float: left;
    width: 36px;
    height: 36px;
    border: 0.6px solid #aaa;
    border-radius: 50%;
  }
  .author-details {
    text-align: left;
    margin-left: 48px;
    .article-count {
      color: #999;
      font-size: 12px;
      span {
        padding-right: 5px;
      }
    }
    .to-follow {
      margin-left: 10px;
      border: 0.4px solid #fa6c52;
      border-radius: 6px;
      font-size: 12px;
      padding: 2px 6px;
      background: #fa6c52;
      color: white;
    }
    .already-follow {
      margin-left: 10px;
      border: 0.4px solid #b6b6b6;
      border-radius: 6px;
      font-size: 12px;
      padding: 2px 6px;
      background: #b6b6b6;
      color: white;
    }
  }
}

.article-body {
  margin: 56px 0;
  line-height: 25px;
}

.article-like {
  margin-top: 8px;
  border-top: 0.8px solid #eee;
  padding-top: 32px;
  .article-likes-count {
    padding: 0 4px;
  }
  .btn-like {
    background-color: #fff;
    color: tomato;
    font-size: 16px;
    padding: 8px 20px 8px 20px;
    border-radius: 100px;
    box-shadow: none;
    border: 1px solid tomato;
    cursor: pointer;
  }
  .btn-like:hover,
  // .btn-like:focus,
  // .btn-like:active:focus,
  .btn-like:active {
    color: #fff;
    background-color: tomato;
  }
  .btn-dislike {
    color: #fff;
    background-color: tomato;
    font-size: 16px;
    padding: 8px 20px 8px 20px;
    border-radius: 100px;
    box-shadow: none;
    border: 1px solid tomato;
    cursor: pointer;
  }
  .btn-dislike:hover,
  // .btn-like:focus,
  // .btn-like:active:focus,
  .btn-dislike:active {
    background-color: #fff;
    color: tomato;
  }
}

.article-comment {
  text-align: left;
  margin-top: 32px;
  img {
    position: absolute;
    width: 36px;
    height: 36px;
    border: 0.8px solid #aaa;
    border-radius: 100px;
    margin-top: 5px;
  }
  form {
    padding-top: 8px;
    margin-left: 48px;
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
  }
}

.login-to-comment {
  margin: 48px 0;
  border: 1px dashed #00b5ad;
  text-align: center;
  width: 100%;
  height: 80px;
  border-radius: 4px;
  p {
    line-height: 80px;
  }
}

.comments-count {
  h4 {
    text-align: left;
  }
}

.comment-item {
  clear: both;
  margin-top: 15px;
  position: relative;
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
    .comment-author-details {
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
  .comment-body {
    margin-top: 8px;
    color: #555;
    font-size: 14px;
    text-align: left;
  }
}
</style>
