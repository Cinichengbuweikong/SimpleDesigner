<template>
  <div class="cmdPanel" :style="cssVars">  <!-- 显示符合输入内容的待选命令的盒子 -->
    <div
      class="itemContainer"
      v-if="cmd.length !== 0"
    >
      <CmdPanelItem
        v-for="(item, key) in similarCmd"
        :key="key"
        :cmd="item.cmd"
        :desc="item.desc"
      />
    </div>
  </div>
</template>

<script>
import CmdPanelItem from './CmdPanelItem.vue';


export default {
  name: "cmdPanelComponent",

  props: {
    // 用户输入的命令
    cmd: {
      type: String,
      default: ""
    },

    // 和用户输入的内容相似的命令
    similarCmd: {
      type: Array,
      default: []
    }
  },

  computed: {
    cssVars() {
      return {
        "--panelHeight":
          this.cmd.length === 0
          ? "0px"
          : `${this.similarCmd.length*30 + (this.similarCmd.length-1)*(5+1)}px`,
          // similarCmd.length * 30 表示每个 item 30px 高
          // 除了最上面的 item 没有上 margin  最下面的 item 没有下 margin
          // 综合下来当有 n 个 item 时 就一共有 n-1 个 margin
          // 每个 margin 5px 高 因此是 (similarCmd.length - 1) * 5
          // 最下面的 item 没有下 border  综合下来当有 n 个 item 时 就一共有 n-1 个 border
          // 每个 border 1px 因此是 (similarCmd.length - 1) * 1
      };
    }
  },

  components: {
    CmdPanelItem
  }
}
</script>

<style lang="scss" scoped>
.cmdPanel {
  width: 100%;
  height: var(--panelHeight);

  background-color: lighten($color: $backgroundColor, $amount: 50);

  transition: height 0.2s;
}
</style>  