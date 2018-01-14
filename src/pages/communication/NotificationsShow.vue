<template>
  <div class="notifications-show">
  </div>
</template>

<script>
import api from "../../api";
import { mapState } from "vuex";

export default {
  data() {
    return {
      user: null
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
    getNotifications(){
      api.getNotifications().then(res => {
        if (res.data.status == 1) {
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
