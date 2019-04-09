<template>
  <div>
    <transition name="router-fade" mode="out-in">
      <keep-alive>
         <!-- 这里是会被缓存的视图组件，比如 Home！ -->
        <router-view v-if="$route.meta.keepAlive"/> 
      </keep-alive>
    </transition>
     <transition name="router-fade" mode="out-in">
      <keep-alive>
        <!-- 这里是不被缓存的视图组件，比如 Edit！ -->
        <router-view v-if="!$route.meta.keepAlive"/> 
      </keep-alive>
    </transition>
    
  </div>
</template>

<script>
    import svgIcon from './components/common/svg';
    export default {
      name:'app',
      components:{
        svgIcon
      }
    }
</script>

<style lang="scss">
@import './style/common';
 .router-fade-enter-active,.router-fade-leave-active{
   transition: opacity .3s;
 }
 .router-fade-enter,.router-fade-leave-active{
   opacity: 0;
 }
</style>
