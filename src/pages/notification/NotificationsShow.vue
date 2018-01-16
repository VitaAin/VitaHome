<template>
  <div>
    <el-row :gutter="25">
      <el-col :span="18" :offset="3">
        <el-tabs class="notification-tabs" :tab-position="'left'" type="card" @tab-click="onTabClick">
          <el-tab-pane v-for="tab in tabs" :key="tab.name" 
            :label="tab.name" :name="tab.route"></el-tab-pane>
        </el-tabs>
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import api from "../../api";
import { mapState } from "vuex";

export default {
  data() {
    return {
      tabs: [
        {
          name: "回复",
          route: "NoticeReply"
        },
        {
          name: "关注",
          route: "NoticeFollow"
        },
        {
          name: "点赞",
          route: "NoticeLike"
        }
      ],
      user: null,
      notifications: []
    };
  },
  computed: mapState({
    auth: state => state.account.auth
  }),
  mounted() {
    this.user = this.auth.user;
    this.getNotifications();
  },
  methods: {
    onTabClick(tab, event) {
      this.$router.push({ name: tab.name, id: this.user.id });
    },
    getNotifications() {
      api.getNotifications().then(res => {
        if (res.data.status == 1) {
          this.notifications = res.data.data;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.notification-tabs {
  margin-top: 32px;
}
</style>
