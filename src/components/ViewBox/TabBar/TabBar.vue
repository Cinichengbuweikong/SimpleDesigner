<template>
  <div class="tabBar">  <!-- 标签栏 -->
    <TabBarItem
      v-for="comp in openedComponents"
      :key="comp.id"

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

  mounted() {
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