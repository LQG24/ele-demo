<template>
  <div class="loginContainer">
    <head-top :head-title="loginWay? '登录':'密码登录'" goBack="true"></head-top>
    <form class="loginForm" v-if="loginWay">
      <section class="input_container phone_number">
        <input type="text" placeholder="账号密码随便输入" name="phone" maxlength="11" v-model="phoneNumber">
        <button
          @click.prevent="getVerifyCode"
          :class="{right_phone_number:rightPhoneNumber}"
          v-show="!computedTime"
        >获取验证码</button>
        <button @click.prevent v-show="computedTime">已发送({{computedTime}}s)</button>
      </section>
      <section class="input_container">
        <input type="text" placeholder="验证码" name="mobileCode" maxlength="6" v-model="mobileCode">
      </section>
    </form>
  </div>
</template>
<script>
import headTop from "../../components/header/head";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      loginWay: true, //登录方式，默认短信登录
      showPassword: false, // 是否显示密码
      phoneNumber: null, //电话号码
      mobileCode: null, //短信验证码
      validate_token: null, //获取短信时返回的验证值，登录时需要
      computedTime: 0, //倒数记时
      userInfo: null, //获取到的用户信息
      userAccount: null, //用户名
      passWord: null, //密码
      captchaCodeImg: null, //验证码地址
      codeNumber: null, //验证码
      showAlert: false, //显示提示组件
      alertText: null //提示的内容
    };
  },
  components: {
    headTop
  },
  computed: {
    //判断手机号码
    rightPhoneNumber: function() {
      return /^1\d{10}$/gi.test(this.phoneNumber);
    }
  },
  methods: {
    //获取短信验证码
    async getVerifyCode() {
      if (this.rightPhoneNumber) {
        this.computedTime = 30;
        this.timer = setInterval(() => {
          this.computedTime--;
          if (this.computedTime == 0) {
            clearInterval(this.timer);
          }
        }, 1000);
        //判读用户是否存在
        let exsis = await checkExsis(this.phoneNumber, "mobile");
        if (exsis.message) {
          this.showAlert = true;
          this.alertText = exsis.message;
          return;
        } else if (!exsis.is_exists) {
          this.showAlert = true;
          this.alertText = "您输入的手机号尚未绑定";
          return;
        }
        //发送短信验证码
        let res = await mobileCode(this.phoneNumber);
        if (res.message) {
          this.showAlert = true;
          this.alertText = res.message;
          return;
        }
        this.validate_token = res.validate_token;
      }
    }
  }
};
</script>
<style lang="scss" scode>
</style>