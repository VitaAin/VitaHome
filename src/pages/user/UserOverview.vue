<template>
  <div v-if="user">
    <div class="user-show">
      <div class="user-box-wrap">
        <div class="user-box">
          <div class="under-avatar">
            <img class="avatar" :src="user.avatar" alt="" @click="editUserAvatar()">
          </div>

          <div class="user">
            <p class="text-shadow user-name">{{user.name}}
              <i class="fa fa-pencil" aria-hidden="true"  v-if="auth.id == user.id" @click="editUserInfo()"></i>
            </p>
            <p class="text-shadow user-email">邮箱：{{user.email}}</p>
            <p class="user-introduction">这位少侠还没有自我介绍～</p>

            <div class="statistics-and-operation">
              <ul class="statistics-box">
                <li>
                  <p class="digit">{{user.articles_count}}</p>
                  <p>文章</p>
                </li>
                <span class="statistics-divider"> | </span>
                <li>
                  <p class="digit">{{user.comments_count}}</p>
                  <p>评论</p>
                </li>
                <span class="statistics-divider"> | </span>
                <li>
                  <p class="digit">{{user.followings_count}}</p>
                  <p>关注</p>
                </li>
                <span class="statistics-divider"> | </span>
                <li>
                  <p class="digit">{{user.followers_count}}</p>
                  <p>人气</p>
                </li>
              </ul>

              <div class="operation-box"  v-if="auth.id !== user.id">
                <el-button class="oper-btn follow-btn" v-if="!follow" @click.prevent="clickFollow()">+ 关注</el-button>
                <el-button class="oper-btn follow-btn" v-if="follow" @click.prevent="clickFollow()">已关注</el-button>
                <el-button class="oper-btn send-msg-btn">发私信</el-button>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>

    <div class="tabs-box">
      <ul>
        <li>
          <router-link :to="{name: 'UserArticles', params: {id: user.id}}" :style="[path == 'articles' ? active : '']">
            文章
          </router-link>
        </li>
        <li>
          <router-link :to="{name: 'UserReplies', params: {id: user.id}}" :style="[path == 'replies' ? active : '']">
            评论
          </router-link>
        </li>
        <li>
          <router-link :to="{name: 'UserFollowUsers', params: {id: user.id}}" :style="[path == 'follow_users' ? active : '']">
            关注
          </router-link>
        </li>
        <li>
          <router-link :to="{name: 'UserLikeArticles', params: {id: user.id}}" :style="[path == 'like_articles' ? active : '']">
            喜欢
          </router-link>
        </li>
      </ul>
    </div>
    <el-row :gutter="25">
      <el-col :span="18" :offset="3">
        <router-view></router-view>
      </el-col>
    </el-row>
    <!-- <popup v-show="showPreview" @closePreview="closePreview"></popup> -->

<!-- ================================= -->
    <!-- <el-row :gutter="25" v-if="user">
      <el-col :span="13" :offset="3">
        <router-view></router-view>
      </el-col>

      <el-col :span="5">
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

      <popup v-show="showPreview" @closePreview="closePreview"></popup>
    </el-row> -->
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
          message: "已关注",
          type: "success"
        });
      } else {
        this.$message({
          message: "已取消关注",
          type: "success"
        });
      }
    },
    editUserAvatar() {
      if (this.auth.id == this.user.id) {
        this.$router.push({ name: "EditUserAvatar", params: { id: this.user.id } });
      }
    },
    editUserInfo() {
      this.$router.push({ name: "EditUserInfo", params: { id: this.user.id } });
    }
  }
};
</script>

<style lang="scss" scoped>
.user-show {
  height: 320px;
  background: url(../../assets/user_show_bg.jpg) no-repeat;
  background-size: cover;
  text-align: center;
  .user-box-wrap {
    width: 80%;
    margin: 0 auto;
    // border: 1px solid red;
    padding: 50px 0 100px 0;
    .user-box {
      display: flex;
      // border: 1px solid green;
    }
  }
}
.under-avatar {
  width: 168px;
  height: 168px;
  min-width: 168px;
  min-height: 168px;
  background: white;
  background-color: rgba(255, 255, 255, 0.4);
  border: 0.4px solid lightblue;
  border-radius: 50%;
  text-align: center;
  box-shadow: 1px 1px 1px 0.5px #222;
  .avatar {
    cursor: pointer;
    margin: 5px auto;
    width: 150px;
    height: 150px;
    border: 4px solid white;
    border-radius: 50%;
  }
}
.text-shadow {
  text-shadow: 1px 1px 1px black;
}
.user {
  // border: 1px solid white;
  width: 100%;
  max-width: 100%;
  margin-left: 24px;
  * {
    text-align: left;
    color: #eee;
  }
  .user-name {
    font-size: 24px;
    i {
      cursor: pointer;
      font-size: 14px;
      margin-left: 4px;
      color: yellow;
    }
  }
  .user-email {
    font-size: 12px;
    margin-top: 10px;
  }
  .user-introduction {
    // border: 0.2px solid greenyellow;
    font-size: 12px;
    margin-top: 20px;
    max-width: 60%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
    -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
    -webkit-line-clamp: 2; /** 显示的行数 **/
  }
}
.statistics-and-operation {
  margin-top: 32px;
}
.statistics-box {
  list-style: none;
  display: inline-block;
  li {
    text-align: center;
    display: inline-block;
    p {
      font-size: 15px;
      text-align: center;
    }
  }
  .statistics-divider {
    display: inline-block;
    height: 100%;
    margin: auto 2px;
    color: #ccc;
  }
  .digit {
    font-size: 18px;
    color: #f15a24;
    // &:hover{
    //   text-decoration: underline;
    // }
  }
}
.operation-box {
  float: right;
  .oper-btn {
    color: white;
    border: 0.2px solid whitesmoke;
    border-radius: 0;
    margin: auto 2px;
    padding: 8px 16px;
  }
  .follow-btn {
    background: #f49000;
    &:hover {
      background: #faa80b;
    }
  }
  .send-msg-btn {
    background: #5ba90b;
    &:hover {
      background: #64b215;
    }
  }
}
.tabs-box {
  position: absolute;
  width: 100%;
  top: 340px;
  ul {
    list-style: none;
    width: 100%;
    height: 40px;
    background: black;
    background-color: rgba(0, 0, 0, 0.5);
    text-align: left;
    padding: 0 15%;
    li {
      width: 10%;
      height: 20px;
      line-height: 20px;
      margin-top: 10px;
      display: inline-block;
      * {
        font-size: 15px;
        color: white;
        letter-spacing: 2px;
        &:hover {
          color: #eee;
        }
        // &:focus {
        //   color: #64b215;
        // }
      }
    }
  }
}

// -------------------------------
// .sidebar-author {
//   text-align: center;
//   margin-top: 40px;
//   border: 1px solid #ddd;
//   border-radius: 4px;
//   p {
//     padding: 8px 0 8px 0;
//     font-size: 15px;
//   }
//   img {
//     width: 100px;
//     height: 100px;
//     border: 1px solid #aaa;
//     border-radius: 100px;
//     margin-top: 20px;
//     margin-bottom: 20px;
//   }
//   h2 {
//     color: #00b5ad;
//   }
//   .dl-horizontal {
//     margin-top: 24px;
//     padding: 8px 8px;
//     border-top: 1px solid #eee;
//     .df {
//       clear: both;
//       text-align: left;
//       margin-top: 6px;
//       dt {
//         color: #999;
//         text-align: left;
//         font-size: 14px;
//         display: inline;
//       }
//       dd {
//         display: inline;
//         text-align: left;
//         color: #333;
//       }
//     }
//   }
// }

// .btn-define {
//   width: 90%;
//   margin: 16px 0;
//   background-color: #00b5ad;
//   border-radius: 5px;
//   color: #fff;
//   font-size: 15px;
//   font-weight: bold;
//   border-color: #f1f1f1;
//   box-shadow: none;
// }

// .btn-define:hover,
// .btn-define:active {
//   background-color: #169e98;
//   box-shadow: none;
// }

// .user-info {
//   text-align: center;
//   margin-top: 20px;
//   border: 1px solid #ddd;
//   border-radius: 4px;
//   ul {
//     li {
//       list-style: none;
//       padding: 12px 0 12px;
//       border-bottom: 1px solid #eee;
//       a {
//         color: #333;
//         font-size: 14px;
//       }
//     }
//   }
// }
</style>
