import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);

const API_ROOT = "../../static/data/";

export default {
  getHomeBanners() {
    return Vue.http.get(API_ROOT + "HomeBanner.json");
  },
  getArticles() {
    return Vue.http.get(API_ROOT + "Articles.json");
  },
  getHotArticles() {
    return Vue.http.get(API_ROOT + "HotArticles.json");
  },
  getHotTags() {
    return Vue.http.get(API_ROOT + "HotTags.json");
  },
  getArticle(id) {
    return Vue.http.get(API_ROOT + "OneArticle.json");
  },
  getAllTags() {
    return Vue.http.get(API_ROOT + "AllTags.json");
  },
  getAllCategories() {
    return Vue.http.get(API_ROOT + "AllCategories.json");
  },
  createArticle(article) {
    // return Vue.http.post(API_ROOT + "");
    return Vue.http.get(API_ROOT + "EditArticle.json");
  },
  editArticle(id, article) {
    // return Vue.http.post(API_ROOT + "");
    return Vue.http.get(API_ROOT + "EditArticle.json");
  },
  login(user) {
    // return Vue.http.post(API_ROOT + "", user);
    return Vue.http.get(API_ROOT + "Login.json");
  },
  register(params) {
    // return Vue.http.post(API_ROOT + "", params);
    return Vue.http.get(API_ROOT + "Register.json");
  },
  getUser(id) {
    return Vue.http.get(API_ROOT + "User.json");
  },
  getUserArticles(id) {
    return Vue.http.get(API_ROOT + "UserArticles.json");
  },
  getUserReplies(id) {
    return Vue.http.get(API_ROOT + "UserReplies.json");
  }
}
