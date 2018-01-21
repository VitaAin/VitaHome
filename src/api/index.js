import Vue from 'vue';
import VueResource from 'vue-resource';
import store from '../store';

Vue.use(VueResource);

// Vue.http.options.root = process.env.API_ROOT;
Vue.http.headers.common.Accept = `application/json`;

Vue.http.interceptors.push((request, next) => {
  let auth = store.state.account.auth;
  if (auth.check()) {
    let accessToken = auth.access_token;
    Vue.http.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    delete Vue.http.headers.common.Authorization;
  }
  next();
});

const API_ROOT = "http://api.vitain.top/api/v1/";
// const API_ROOT = "http://127.0.0.1/vitahomebackend/public/api/v1/";
const LOCAL_STATIC = "../../static/data/";

export default {
  // 注册
  register(params) {
    return Vue.http.post(API_ROOT + "user/register", params);
  },
  // 登录
  login(params) {
    return Vue.http.post(API_ROOT + "user/login", params);
  },
  // 登出
  logout() {
    return Vue.http.get(API_ROOT + "user/logout");
  },
  // 邮箱验证
  verifyEmail(params) {
    return Vue.http.get(API_ROOT + 'verify_email', params);
  },

  getHomeBanners() {
    return Vue.http.get(LOCAL_STATIC + "HomeBanner.json");
  },
  // 获取所有文章
  getArticles(params) {
    return Vue.http.get(API_ROOT + "articles", {
      params: params
    });
  },
  // 获取热门文章
  getHotArticles() {
    return Vue.http.get(API_ROOT + "hot_articles");
  },
  // 获取热门标签
  getHotTags() {
    return Vue.http.get(API_ROOT + "hot_tags");
  },
  // 获取所有标签
  getAllTags() {
    return Vue.http.get(API_ROOT + "tags");
  },
  // 获取所有分类
  getAllCategories() {
    return Vue.http.get(API_ROOT + "categories");
  },

  // 创建分类
  createCategory(params) {
    return Vue.http.post(API_ROOT + "categories", params);
  },
  // 创建标签
  createTag(params) {
    return Vue.http.post(API_ROOT + "tags", params);
  },

  // 获取单个文章
  getArticle(id) {
    return Vue.http.get(API_ROOT + "articles/" + id);
  },
  // 创建文章
  createArticle(params) {
    return Vue.http.post(API_ROOT + "articles", params);
  },
  // 编辑文章
  editArticle(id, params) {
    return Vue.http.put(API_ROOT + "articles/" + id, params);
  },

  // 获取文章点赞
  getArticleLikes(id) {
    return Vue.http.get(API_ROOT + "articles/" + id + "/likes");
  },
  // 获取文章评论
  getArticleComments(id) {
    return Vue.http.get(API_ROOT + "articles/" + id + "/comments");
  },
  // 发表评论
  createComment(params) {
    return Vue.http.post(API_ROOT + "comments", params);
  },

  // 获取用户
  getUser(id) {
    return Vue.http.get(API_ROOT + "users/" + id);
  },
  // 获取用户文章
  getUserArticles(id) {
    return Vue.http.get(API_ROOT + "users/" + id + "/articles");
  },
  // 获取用户评论
  getUserReplies(id) {
    return Vue.http.get(API_ROOT + "users/" + id + "/replies");
  },
  // 获取用户点赞的文章
  getUserLikeArticles(id) {
    return Vue.http.get(API_ROOT + "users/" + id + "/like_articles");
  },
  // 获取用户关注的用户
  getUserFollowUsers(id) {
    return Vue.http.get(API_ROOT + "users/" + id + "/follow_users");
  },
  // 获取用户图片
  getUserImages(id) {
    return Vue.http.get(API_ROOT + "users/" + id + "/images");
  },

  // 编辑用户资料
  editUserInfo(params) {
    return Vue.http.post(API_ROOT + "edit_user_info", params);
  },
  // 添加用户图片
  addUserImage(file) {
    return Vue.http.post(API_ROOT + "user_image/add", file);
  },
  // 删除用户图片
  deleteUserImage(url) {
    return Vue.http.post(API_ROOT + "user_image/delete", url);
  },

  // 是否点赞
  isLikeOrNot(id) {
    return Vue.http.get(API_ROOT + "article/is_like", {
      params: {
        id: id
      }
    });
  },
  // 点赞文章
  like(id) {
    return Vue.http.get(API_ROOT + "article/like", {
      params: {
        id: id
      }
    });
  },
  // 是否关注
  isFollowOrNot(id) {
    return Vue.http.get(API_ROOT + "user/is_follow", {
      params: {
        id: id
      }
    });
  },
  // 关注用户
  follow(id) {
    return Vue.http.get(API_ROOT + "user/follow", {
      params: {
        id: id
      }
    });
  },

  // 搜索
  search(params) {
    return Vue.http.get(API_ROOT + "search", {
      params: {
        content: params
      }
    });
  },

  // 获取用户通知
  getNotifications() {
    return Vue.http.get(API_ROOT + "notifications");
  },
  getNoticeReply() {
    return Vue.http.get(API_ROOT + "notice_reply");
  },
  getNoticeFollow() {
    return Vue.http.get(API_ROOT + "notice_follow");
  },
  getNoticeLike() {
    return Vue.http.get(API_ROOT + "notice_like");
  },

  getAbout() {
    // return Vue.http.get(LOCAL_STATIC + "About.json");
    return Vue.http.get(API_ROOT + "about");
  },
}
