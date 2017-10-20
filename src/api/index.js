import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);

export default {
  getHomeBanners() {
    return Vue.http.get("../../static/data/homeBanner.json");
  },
  getArticles() {
    return Vue.http.get("../../static/data/articles.json");
  }
}
