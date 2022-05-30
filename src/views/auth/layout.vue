<template>
  <div>
    <div id="auth-container">

      <div id="logo-name" class="animated slideInLeft">
        WEB-IM
      </div>

      <router-view />
      <div class="copyright">©2021 - 2022 Hyperf-Vue-IM 在线聊天
        <a href="https://github.com/lemoba/web-im-app" target="_blank">Github源码</a>
      </div>

    </div>
  </div>
</template>
<script setup lang="ts">
</script>
<style scope lang="less">
@import '@/assets/css/auth.less';
</style>