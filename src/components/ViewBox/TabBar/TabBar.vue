<template>
  <div class="tabBar">  <!-- 标签栏 -->
    <!-- 定义 ${comp.id}_${comp.type} 为标签项的 id -->
    <TabBarItem
      v-for="comp in openedComponents"
      :key="`${comp.id}_${comp.type}`"

      :itemid="comp.id"
      :itemName="getComponentName(comp.id)"
      :itemType="comp.type"
      :isActive="comp.id === currentTab.id && comp.type === currentTab.type"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import TabBarItem from './TabBarItem.vue';

export default {
  name: "TabBarComponent",

  methods: {
    getComponentName(compid) {
      // 通过给定的 id  获取该 id 对应的组件的 名字
      // compid: String  组件的 id

      if (this.allPageComponents[compid]) {
        return this.allPageComponents[compid].name;
      }
      else if (this.allNormalComponents[compid]) {
        return this.allNormalComponents[compid].name;
      }
      else {
        return `ERR: NONAME: ${compid}`;
      }
    }
  },

  components: {
    TabBarItem
  },

  computed: {
    ...mapState("LayoutPageState", {
      openedComponents: state => state.openedComponents,
      currentTab: state => state.tabBar.currentTab,
    }),

    ...mapState("AppState", {
      allPageComponents: state => state.components.pageComponents,
      allNormalComponents: state => state.components.normalComponents
    }),
  },
}
</script>

<style lang="scss" scoped>
.tabBar {
    width: calc(100vw - 250px);
    height: 32px;

    overflow-x: scroll;
    overflow-y: hidden; 
    scrollbar-width: none;  /* 设置 firefox 下不显示滚动条 */
    &::-webkit-scrollbar {  /* 设置 chrome 下不显示滚动条 */
      width: 0px;
      height: 0px;
    }

    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;

    background-color: $barBackgroundColor;
}
</style>