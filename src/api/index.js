import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);

// Vue.http.options.root = process.env.API_ROOT;
Vue.http.headers.common.Accept = `application/json`;

// Vue.http.interceptors.push((request, next) => {
//   const auth = store.state.account.auth;
//   if (auth.check()) {
//     const accessToken = auth.access_token;
//     Vue.http.headers.common.Authorization = `Bearer ${accessToken}`;
//   } else {
//     delete Vue.http.headers.common.Authorization;
//   }
//   next();
// });

const API_ROOT_TEST = "../../static/data/";
const API_ROOT = "http://admin.vitain.top/api/v1/";

export default {
  register(params) {
    return Vue.http.post(API_ROOT + "user/register", params);
  },
  login(params) {
    return Vue.http.post(API_ROOT + "user/login", params);
  },
  logout() {
    return Vue.http.get(API_ROOT_TEST + "Logout.json");
  },

  getHomeBanners() {
    return Vue.http.get(API_ROOT_TEST + "HomeBanner.json");
  },
  getArticles() {
    // return Vue.http.get(API_ROOT_TEST + "Articles.json");
    return Vue.http.get(API_ROOT + "articles");
  },
  getHotArticles() {
    // return Vue.http.get(API_ROOT_TEST + "HotArticles.json");
    return Vue.http.get(API_ROOT + "hot_articles");
  },
  getHotTags() {
    // return Vue.http.get(API_ROOT_TEST + "HotTags.json");
    return Vue.http.get(API_ROOT + "hot_tags");
  },
  getArticle(id) {
    return Vue.http.get(API_ROOT + "articles/" + id);
  },
  getAllTags() {
    return Vue.http.get(API_ROOT + "tags");
  },
  getAllCategories() {
    // return Vue.http.get(API_ROOT_TEST + "AllCategories.json");
    return Vue.http.get(API_ROOT + "categories");
  },
  createArticle(params) {
    return Vue.http.post(API_ROOT + "articles", params);
  },
  editArticle(id, params) {
    return Vue.http.put(API_ROOT + "articles/" + id, params);
  },

  getUser(id) {
    return Vue.http.get(API_ROOT_TEST + "User.json");
  },
  getUserArticles(id) {
    return Vue.http.get(API_ROOT_TEST + "UserArticles.json");
  },
  getUserReplies(id) {
    return Vue.http.get(API_ROOT_TEST + "UserReplies.json");
  }
}
