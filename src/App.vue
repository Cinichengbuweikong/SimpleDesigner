<template>
  <div id="app">
    <header class="menuBar" :style="cssVars">
      <ul>
        <li>
          <p>设置</p>

          <div class="menuPanel">
            <p @click="toggleAutoShowRulerBar">默认显示标尺: {{this.autoShowRulerBar}}</p>
            <p>设置默认模板代码</p>
          </div>
        </li>
        
        <li>
          <p>命令</p>

          <div class="menuPanel">
            <p>重启 Vue 服务</p>
            <p>查看 Vue CLI 输出信息</p>
          </div>
        </li>
        
        <li>
          <p>关于</p>

          <div class="menuPanel">
            <p style="cursor: pointer">教我使用本应用!</p>
            <p style="cursor: pointer">关于本应用</p>
          </div>
        </li>
      </ul>
    </header>

    <main>
      <router-view></router-view>
    </main>

    <footer>
      <nav>
        <router-link to="/">
          <i class="iconfont icon-add_px_rounded"></i>
          新建
        </router-link>

        <router-link to="/layout">
          <i class="iconfont icon-view_compact_px_rounded"></i>
          布局
        </router-link>

        <router-link to="/">
          <i class="iconfont icon-layers_px_rounded"></i>
          样式
        </router-link>

        <router-link to="/">
          <i class="iconfont icon-rotate__degrees_ccw_px_rounded"></i>
          动画
        </router-link>

        <router-link to="/">
          <i class="iconfont icon-save_alt_px_rounded"></i>
          导出
        </router-link>
      </nav>
    </footer>

    <Dialog
      v-if="showDialog"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";

import Dialog from './components/Dialog/Dialog.vue';

export default {
  name: 'App',

  methods: {
    toggleAutoShowRulerBar() {
      // 切换 "是否自动显示标尺" 的状态

      if (this.projectInfo === null) {
        return ;
      }

      this.$store.commit("AppState/MODIFY_PROJECT_INFO", {
        keys: ["projectSetting", "rulerBar"],
        value: !this.projectInfo.projectSetting.rulerBar
      });
    }
  },

  computed: {
    ...mapState("AppState", {
      showDialog: state => state.dialog.dialogData.show,
      projectInfo: state => state.projectInfo,
    }),

    cssVars() {
      return {
        "--menuPanelItemCursor": this.projectInfo === null ? "not-allowed" : "pointer",
      };
    },

    autoShowRulerBar() {
      // 显示 "是否自动显示标尺" 这项设置的状态
      if (this.projectInfo === null) {
          return "开";
      }

      if (this.projectInfo.projectSetting.rulerBar) {
          return "开";
      } else {
          return "关";
      }
    }
  },

  components: {
    Dialog
  }
}
</script>

<style lang="scss">
html, body {
  height: 100vh;
  background-color: $backgroundColor;
}

#app {
  height: 100%;

  display: flex;
  flex-direction: column;
  
  .menuBar {
    height: 22px;
    background-color: $barBackgroundColor;
    border-bottom: 1px solid $foregroundColor;

    ul {
      list-style: none;
      display: flex;
      flex-direction: row;
      height: 100%;

      li {
        color: $textColor;
        margin: 0 5px;
        padding: 0 5px;

        font-size: 14px;

        cursor: default;

        position: relative;

        &:hover {
          background-color: $barItemHoverBackgroundColor;
          
          & .menuPanel {
            display: flex;
          }
        }

        .menuPanel {
          position: absolute;
          left: 0;
          top: 100%;

          width: 200px;

          display: none;
          flex-direction: column;

          background-color: $barBackgroundColor;

          border: 1px solid $foregroundColor;
          border-radius: 3px;

          // 由于此时菜单已经溢出到 main 元素内去显示了
          // 因此为了防止 main 元素把菜单盖住了 这里需要把菜单的层级提升一下
          z-index: 200;

          p {
            padding: 5px 10px;
            cursor: var(--menuPanelItemCursor);

            &:hover {
              background-color: $barItemHoverBackgroundColor;
            }
          }
        }
      }
    }
  }

  main {
    flex-grow: 1;
    overflow-y: auto;
  }

  footer {
    height: 50px;
    background-color: $barBackgroundColor;
    border-top: 1px solid $foregroundColor;
    
    nav {
      width: 100%;
      height: 100%;

      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      a {
        height: 100%;

        font-size: 14px;
        text-decoration: none;

        color: $textColor;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        margin: 0 10px;
        padding: 0 30px;

        &:hover {
          background-color: $barItemHoverBackgroundColor;
        }

        i {
          font-size: 20px;
        }
      }
    }
  }
}
</style>
