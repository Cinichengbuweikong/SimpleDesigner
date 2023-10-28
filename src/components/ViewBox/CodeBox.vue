<template>
  <div class="codeBox">
    <codemirror
      v-model="currentTabComponentCode"
      :options="codeMirrorSettings"
    >
    </codemirror>
  </div>
</template>

<script>
// 导入 codemirror 组件及组件所必须的资源文件
// codemirror 组件
import { codemirror } from "vue-codemirror";
// codemirror 基本样式
import 'codemirror/lib/codemirror.css';
// codemirror 组件样式
import 'codemirror/theme/material-darker.css';
// vue 组件语法高亮
import 'codemirror/mode/vue/vue.js';

// 导入 vuex
import { mapState } from 'vuex';


export default {
    name: "CodeBoxComponent",

    data() {
      return {
        codeMirrorSettings: {
          mode: 'text/x-vue',
          theme: 'material-darker',
          lineNumbers: true,
          line: true,
        },
      };
    },

    computed: {
      ...mapState("LayoutPageState", {
        currentTab: state => state.tabBar.currentTab
      }),
      
      ...mapState("AppState", {
        allPageComponents: state => state.components.pageComponents,
        allNormalComponents: state => state.components.normalComponents,
      }),

      currentTabComponentCode: {
        get(){
          if (this.currentTab === null) {
            return "";
          }

          const componentID = this.currentTab.id;

          if (this.allPageComponents[componentID]) {
            return this.allPageComponents[componentID].code;
          }
          else if (this.allNormalComponents[componentID]) {
            return this.allNormalComponents[componentID].code;
          }

          return `ERR ID NOT FOUND: ${this.currentTab.id}`;
        },

        set(value) {
          if (this.currentTab === null) {
            return ;
          }

          const componentID = this.currentTab.id;

          this.$store.commit("AppState/MODIFY_COMPONENT_DATA", {
            componentID,
            newComponentData: {
              code: value
            }
          });
        }
      }
    },

    components: {
      codemirror
    }
}
</script>

<style lang="scss" scoped>
.codeBox {
    width: 100%;
    height: 100%;

    :deep(.vue-codemirror) {
      // 对 codemirror 组件的样式进行设置
      width: 100%;
      height: 100%;

      .CodeMirror {
        width: 100%;
        height: 100%;

        span[role="presentation"] {
          & * {
            font-family: 'consolas', monospace, 'Courier New', Courier;
            font-size: 18px;
          }

          font-family: 'consolas', monospace, 'Courier New', Courier;
          font-size: 18px;
        }

        .CodeMirror-linenumber {
          font-family: 'consolas', monospace, 'Courier New', Courier;
        }
      }
    }
}
</style>