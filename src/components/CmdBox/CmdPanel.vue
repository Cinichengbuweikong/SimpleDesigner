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


// 这两个变量给 computed 中的 similarCmd 用
let prevCmd = "";
let prevSimilarCmd = [];


export default {
  name: "cmdPanelComponent",

  props: {
    cmd: {
      type: String,
      required: true,
    },
  },

  computed: {
    similarCmd() {
      // 用于获取和用户输入类似的完整命令

      // 看模板中的代码 在 .cmdPanel 中 我们使用的 cssVars 中就已经调用了一次 similarCmd 方法
      // 而在 CmdPanelItem 中 我们再一次调用了 similarCmd 方法
      // 这也就意味着 当用火狐修改了一下 cmd  我们的组件就要调用两次 similarCmd 方法
      // 而且在这两次调用中 cmd 的值都是一样的

      // similarCmd 无疑是一个耗时的函数 因为我们的命令有很多
      // 如果输入一段命令我们就要重复执行 similarCmd 两次的话 那这耗时是我们无法接收的

      // 那解决方法也很简单 我们只需跳过第二次的 similarCmd 的调用即可
      // 因为在第二次调用 similarCmd 的时候 用户的 cmd 没有改变
      // 因此 在这里 我们只需将上一次 的 cmd 值和 similarCmd 的调用结果缓存起来
      // 而后在 similarCmd 中判断本次调用所使用的 cmd 值和上一次调用时所使用的 cmd 值是否一致
      // 如果一致则直接返回上一次的调用结果 即可

      if (this.cmd === prevCmd) {
        return prevSimilarCmd;
      }

      // prevSimilarCmd = getSimilarCmd(...);
      prevSimilarCmd = [
        { cmd: "No match command:", desc: "没有匹配的命令" },
      ];

      // 更新本次检索所使用的 cmd
      prevCmd = this.cmd;

      return prevSimilarCmd;
    },

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