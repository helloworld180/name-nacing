<template>
  <div>
    <router-view/>
  </div>
</template>

<style>
/* 让页面铺满整个屏幕，不出现滚动条 */
html,
body,
#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: auto;
}
</style>

<script>

export default {
  name: "Layout",
  
}
</script>
