<template>
  <div>
    <el-row :gutter="25" v-if="user">
      <el-col :span="12" :offset="3">
        <router-view></router-view>
      </el-col>

      <el-col :span="6">
        <div class="sidebar-author" v-if="user">
          <img :src="user.avatar" alt="">
          <el-row>
            <el-col :span="8">
              <h2>{{user.followers_count}}</h2>
              <p>关注</p>
            </el-col>
            <el-col :span="8">
              <h2>{{user.comments_count}}</h2>
              <p>评论</p>
            </el-col>
            <el-col :span="8">
              <h2>{{user.articles_count}}</h2>
              <p>文章</p>
            </el-col>
          </el-row>

          <dl class="dl-horizontal">
            <div class="df">
              <dt>
                <label>用户名：</label>
              </dt>
              <dd>
                <strong>{{ user.name }}</strong>
              </dd>
            </div>
            <div class="df" v-if="user.real_name">
              <dt>
                <label>真实姓名：</label>
              </dt>
              <dd>
                <span>{{ user.real_name }}</span>
              </dd>
            </div>
            <div class="df" v-if="user.city">
              <dt>
                <label>城市：</label>
              </dt>
              <dd>
                <span>
                  <i class="text-md fa fa-map-marker"></i> {{ user.city }}</span>
              </dd>
            </div>
            <div class="df">
              <dt>
                <label>最近访问：</label>
              </dt>
              <dd>
                <span style="line-height: 24px; font-size: 15px">哈哈{{ user.last_actived_at }}</span>
              </dd>
            </div>
          </dl>

          <div v-if="auth.id !== user.id">
            <el-button class="btn-define" @click.prevent="clickFollow()">
              <span v-if="!follow">
                <i class="fa fa-plus"></i> 关注 Ta </span>
              <span v-if="follow">
                <i class="fa fa-minus"></i> 已关注 </span>
            </el-button>
            <!-- <el-button v-if="follow" class="btn-define" style="margin-top: 0" @click.prevent="click_follow()"> -->
            <el-button v-if="follow" class="btn-define" style="margin-top: 0">
              <span>
                <i class="fa fa-envelope-o"></i> 发送私信</span>
            </el-button>
          </div>

          <div v-if="auth.id == user.id">
            <el-button class="btn-define" @click.prevent="editUserInfo()">
              <span>
                <i class="fa fa-plus"></i> 编辑个人资料 </span>
            </el-button>
          </div>
        </div>

        <div class="user-info">
          <ul>
            <li>
              <router-link :to="{name: 'UserArticles', params: {id: user.id}}" :style="[path == 'articles' ? active : '']">
                <i class="text-md fa fa-list-ul"></i> Ta 发布的话题
              </router-link>
            </li>
            <li>
              <router-link :to="{name: 'UserReplies', params: {id: user.id}}" :style="[path == 'replies' ? active : '']">
                <i class="text-md fa fa-comment"></i> Ta 发表的回复
              </router-link>
            </li>
            <li>
              <router-link :to="{name: 'UserFollowUsers', params: {id: user.id}}" :style="[path == 'follow_users' ? active : '']">
                <i class="text-md fa fa-eye"></i> Ta 关注的用户
              </router-link>
            </li>
            <li>
              <router-link :to="{name: 'UserLikeArticles', params: {id: user.id}}" :style="[path == 'like_articles' ? active : '']">
                <i class="text-md fa fa-thumbs-up"></i> Ta 赞过的话题
              </router-link>
            </li>
          </ul>
        </div>
      </el-col>

      <!-- <popup v-show="showPreview" @closePreview="closePreview"></popup> -->
    </el-row>
  </div>
</template>

<script>
import api from "../../api";
import { mapState } from "vuex";

export default {
  data() {
    return {
      active: {
        color: "#00b5ad"
      },
      user: null,
      path: "",
      follow: false
    };
  },
  computed: mapState({
    auth: state => state.account.auth
  }),
  mounted() {
    this.getUser();
  },
  methods: {
    getUser() {
      api.getUser(this.$route.params.id).then(res => {
        if (res.data.status == 1) {
          this.user = res.data.data;
          if (this.auth.check()) {
            api.isFollowOrNot(this.user.id).then(res => {
              if (res.data.status == 1) {
                this.follow = res.data.data.followed;
              }
            });
          }
        }
      });
    },
    clickFollow() {
      if (this.auth.check()) {
        api.follow(this.user.id).then(res => {
          if (res.data.status == 1) {
            this.follow = res.data.data.followed;
            this.message();
          }
        });
      } else {
        // this.showPreview = true;
      }
    },
    message() {
      if (this.follow) {
        this.$message({
          message: '已关注',
          type: 'success'
        });
      } else {
        this.$message({
          message: '已取消关注',
          type: 'success'
        });
      }
    },
    editUserInfo() {
      this.$router.push({ name: "EditUserInfo", params: { id: this.user.id } });
    }
  }
};
</script>

<style lang="scss" scoped>
.sidebar-author {
  text-align: center;
  margin-top: 40px;
  border: 1px solid #ddd;
  border-radius: 4px;
  p {
    padding: 8px 0 8px 0;
    font-size: 15px;
  }
  img {
    width: 100px;
    border: 1px solid #aaa;
    border-radius: 100px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  h2 {
    color: #00b5ad;
  }
  .dl-horizontal {
    margin-top: 24px;
    padding: 8px 4px;
    border-top: 1px solid #eee;
    .df {
      clear: both;
      text-align: left;
      margin-top: 4px;
      dt {
        color: #999;
        text-align: left;
        font-size: 15px;
        display: inline;
      }
      dd {
        display: inline;
        text-align: left;
        color: #333;
      }
    }
  }
}

.btn-define {
  width: 90%;
  margin: 15px 0 15px;
  background-color: #00b5ad;
  border-radius: 5px;
  color: #fff;
  font-size: 15px;
  font-weight: bold;
  border-color: #f1f1f1;
  box-shadow: none;
}

.btn-define:hover,
.btn-define:active {
  background-color: #169e98;
  box-shadow: none;
}

.user-info {
  text-align: center;
  margin-top: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  ul {
    li {
      list-style: none;
      padding: 12px 0 12px;
      border-bottom: 1px solid #eee;
      a {
        color: #333;
        font-size: 14px;
      }
    }
  }
}
</style>
