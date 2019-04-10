<template>
  <header id="head_top">
    <section class="title_head ellipsis" v-if="headTitle">
      <span class="title_text">{{headTitle}}</span>
    </section>
    <span class="head_title">登录|注册</span>
  </header>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  mounted() {
    //获取用户信息
    // this.getUserInfo();
  },
  props: ["signinUp", "headTitle", "goBack"],
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    ...mapActions(["getUserInfo"])
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/mixin";

#head_top {
  background-color: $blue;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  @include wh(100%, 1.95rem);
  .head_logo {
  }
  .head_title {
    line-height: 1.95rem;
    float: right;
    color: #ffffff;
    margin-right: 0.8rem;
  }
  .title_head {
    @include center;
    width: 50%;
    color: #fff;
    text-align: center;
    .title_text {
      @include sc(0.8rem, #fff);
      text-align: center;
      font-weight: bold;
    }
  }
}
</style>
