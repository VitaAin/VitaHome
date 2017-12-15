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

const API_ROOT = "http://admin.vitain.top/api/v1/";
// const API_ROOT = "http://127.0.0.1/vitahomebackend/public/api/v1/";

export default {
  register(params) {
    return Vue.http.post(API_ROOT + "user/register", params);
  },
  login(params) {
    return Vue.http.post(API_ROOT + "user/login", params);
  },
  logout() {
    return Vue.http.get(API_ROOT + "user/logout");
  },

  getHomeBanners() {
    return Vue.http.get(API_ROOT_TEST + "HomeBanner.json");
  },
  getArticles() {
    return Vue.http.get(API_ROOT + "articles");
  },
  getHotArticles() {
    return Vue.http.get(API_ROOT + "hot_articles");
  },
  getHotTags() {
    return Vue.http.get(API_ROOT + "hot_tags");
  },
  getAllTags() {
    return Vue.http.get(API_ROOT + "tags");
  },
  getAllCategories() {
    return Vue.http.get(API_ROOT + "categories");
  },

  getArticle(id) {
    return Vue.http.get(API_ROOT + "articles/" + id);
  },
  createArticle(params) {
    return Vue.http.post(API_ROOT + "articles", params);
  },
  editArticle(id, params) {
    return Vue.http.put(API_ROOT + "articles/" + id, params);
  },
  deleteArticleImage(file) {
    return Vue.http.post(API_ROOT + "article_image/delete", file);
  },

  getArticleLikes(id) {
    return Vue.http.get(API_ROOT + "articles/" + id + "/likes");
  },
  getArticleComments(id) {
    return Vue.http.get(API_ROOT + "articles/" + id + "/comments");
  },
  createComment(params) {
    return Vue.http.post(API_ROOT + "comments", params);
  },

  getUser(id) {
    return Vue.http.get(API_ROOT + "users/" + id);
  },
  getUserArticles(id) {
    return Vue.http.get(API_ROOT + "users/" + id + "/articles");
  },
  getUserReplies(id) {
    return Vue.http.get(API_ROOT + "users/" + id + "/replies");
  },
  getUserLikeArticles(id) {
    return Vue.http.get(API_ROOT + "users/" + id + "/like_articles");
  },
  getUserFollowUsers(id) {
    return Vue.http.get(API_ROOT + "users/" + id + "/follow_users");
  },

  editUserInfo(params) {
    return Vue.http.post(API_ROOT + "edit_user_info", params);
  },

  isLikeOrNot(id) {
    return Vue.http.get(API_ROOT + "article/is_like", {
      params: {
        id: id
      }
    });
  },
  like(id) {
    return Vue.http.get(API_ROOT + "article/like", {
      params: {
        id: id
      }
    });
  },
  isFollowOrNot(id) {
    return Vue.http.get(API_ROOT + "user/is_follow", {
      params: {
        id: id
      }
    });
  },
  follow(id) {
    return Vue.http.get(API_ROOT + "user/follow", {
      params: {
        id: id
      }
    });
  }
}
