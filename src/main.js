import Vue from 'vue'
import VueRouter from 'vue-router'
import {routerMode}from './config/env'
import routes from './router/router'
import store from './store/'
import FastClick from 'fastclick'

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    //DOM已被完全加载和解析 
    FastClick.attach(document.body);
  }, false);
}

Vue.use(VueRouter)
const router = new VueRouter({
  routes,
  mode:routerMode,
  strict: process.env.NODE_ENV !== 'production',//不是发布环境
  scrollBehavior (to, from, savedPosition) {
    // to：要进入的目标路由对象，到哪里去
    // from：离开的路由对象，哪里来
    // savePosition：会记录滚动条的坐标，点击前进/后退的时候记录值{x:?,y:?}
    if (savedPosition) {
      return savedPosition
  } else {
    if (from.meta.keepAlive) {
      from.meta.savedPosition = document.body.scrollTop;
    }
      return { x: 0, y: to.meta.savedPosition || 0 }
  }
}

})

/* eslint-disable no-new */
new Vue({
  router,
  store,
}).$mount('#app')
