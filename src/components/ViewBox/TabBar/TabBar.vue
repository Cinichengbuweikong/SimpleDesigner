<template>
  <div
    class="tabBar"
    @dragover.stop="onDragOver"
    @drop.stop="onDrop"
  >  <!-- 标签栏 -->
    <!-- 定义 ${comp.id}_${comp.type} 为标签项的 id -->
    <TabBarItem
      v-for="comp in openedComponents"
      :key="`${comp.id}_${comp.type}`"

      :stateName="stateName"
      :itemid="comp.id"
      :itemName="getComponentName(comp.id)"
      :itemType="comp.type"
      :isActive="comp.id === currentTab.id && comp.type === currentTab.type"
      :BeforePageChange="BeforePageChange"
      :AfterPageChange="AfterPageChange"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import TabBarItem from './TabBarItem.vue';

export default {
  name: "TabBarComponent",

  data() {
    const vuexState = mapState(this.stateName, {
      openedComponents: state => state.openedComponents,
      currentTab: state => state.tabBar.currentTab,
    });

    return {
      vuexState
    };
  },

  props: {
    BeforePageChange: {
      // 在标签页切换之前所执行的函数 需要传递给 TabItem
      type: Function,
      default: (toID, type, actionType) => {}
    },

    AfterPageChange: {
      // 在标签页切换之后所执行的函数 需要传递给 TabItem
      type: Function,
      default: (fromID, type, actionType) => {}
    },

    stateName: {
        // 本组件需要使用哪个 state 下的标签栏数据 ?
        // 取值各个 state 命名空间的名字 例如 "LayoutPageState"
        type: String,
        required: true
    }
  },

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
    },

    onDragOver(event) {
      // 需要关闭掉 dragOver 的默认行为后 我们才能将元素拖拽到此栏上

      try {
        const { type, id } = JSON.parse(event.dataTransfer.getData("Text"));

        // 可以将标签栏上的标签和组件面板中的组件项拖动到标签栏上
        if (type && (type === "TabBarItem" || type === "ComponentPanelItem")) {
            event.preventDefault();
        }
      } catch {
        return ;
      }
    },

    onDrop(event) {
      // 被拖动到标签栏上的元素 就相当于时需要将该元素放到列表的末尾
      const data = JSON.parse(event.dataTransfer.getData("Text"));

      if (data.type === "TabBarItem") {
        this.$store.commit("LayoutPageState/SET_OPENED_COMPONENT_ORDER", {
            sentryID: this.itemid,
            compID: data.id,
            compType: data.itemType,
            moveToLast: true
        });

        return ;
      }

      if (data.type === "ComponentPanelItem") {
        this.$store.commit("LayoutPageState/ADD_OPENED_COMPONENT", {
          id: data.id,
          type: "design"
        });

        return ;
      }
    }
  },

  computed: {
    ...mapState("AppState", {
      allPageComponents: state => state.components.pageComponents,
      allNormalComponents: state => state.components.normalComponents
    }),

    openedComponents() {
      return this.vuexState.openedComponents.call(this);
    },

    currentTab() {
      return this.vuexState.currentTab.call(this);
    }
  },

  components: {
    TabBarItem
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