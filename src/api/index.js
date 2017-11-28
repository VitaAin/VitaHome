import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);

Vue.http.options.root = process.env.API_ROOT;
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

export default {
  getHomeBanners() {
    return Vue.http.get(API_ROOT_TEST + "HomeBanner.json");
  },
  getArticles() {
    // return Vue.http.get(API_ROOT_TEST + "Articles.json");
    return Vue.http.get("articles");
  },
  getHotArticles() {
    return Vue.http.get(API_ROOT_TEST + "HotArticles.json");
  },
  getHotTags() {
    return Vue.http.get(API_ROOT_TEST + "HotTags.json");
  },
  getArticle(id) {
    return Vue.http.get(API_ROOT_TEST + "OneArticle.json");
  },
  getAllTags() {
    return Vue.http.get(API_ROOT_TEST + "AllTags.json");
  },
  getAllCategories() {
    return Vue.http.get(API_ROOT_TEST + "AllCategories.json");
  },
  createArticle(article) {
    // return Vue.http.post(API_ROOT + "");
    return Vue.http.get(API_ROOT_TEST + "EditArticle.json");
  },
  editArticle(id, article) {
    // return Vue.http.post(API_ROOT + "");
    return Vue.http.get(API_ROOT_TEST + "EditArticle.json");
  },
  login(user) {
    // return Vue.http.post(API_ROOT + "", user);
    return Vue.http.get(API_ROOT_TEST + "Login.json");
  },
  logout() {
    return Vue.http.get(API_ROOT_TEST + "Logout.json");
  },
  register(params) {
    // return Vue.http.post(API_ROOT + "", params);
    return Vue.http.get(API_ROOT_TEST + "Register.json");
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
