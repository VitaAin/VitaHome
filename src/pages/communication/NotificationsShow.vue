<template>
  <el-row :gutter="25">
    <el-col :span="18" :offset="3">
      <div class="notifications-show">
        <div class="notification" v-for="item in notifications" :key="item.id">
          {{ item }}
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import api from "../../api";
import { mapState } from "vuex";

export default {
  data() {
    return {
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
.notifications-show {
  margin-top: 32px;
}
.notification{
  border: 1px solid lightblue;
  margin: 16px 0;
}
</style>
