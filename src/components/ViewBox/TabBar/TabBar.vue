<template>
  <div class="tabBar">  <!-- 标签栏 -->
    <TabBarItem>
      <template v-slot>
        Test
      </template>
    </TabBarItem>
  </div>
</template>

<script>
import TabBarItem from './TabBarItem.vue';

export default {
  name: "TabBarComponent",

  components: {
    TabBarItem
  }
}
</script>

<style lang="scss" scoped>
.tabBar {
    width: 100%;
    height: 32px;

    background-color: $barBackgroundColor;
}
</style>