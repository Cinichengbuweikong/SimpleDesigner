<template>
  <div id="app">
    <header class="menuBar">
      <ul>
        <li>文件</li>
        <li>窗口</li>
        <li>关于</li>
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

        <router-link to="/">
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
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
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

        &:hover {
          background-color: $barItemHoverBackgroundColor;
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
    
    nav {
      width: 100%;
      height: 100%;

      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      a {
        height: 100%;

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
      }
    }
  }
}
</style>
