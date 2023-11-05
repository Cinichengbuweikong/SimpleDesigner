<template>
  <div>
    <div class="dialogHeader">
        <p>已经有了一个打开的项目了!</p>
    </div>

    <div class="dialogBody">
        <p>请关闭当前项目后再启动另一个项目. 你仍然可以继续启动项目, 但你现在所作的所有更改均会消失.</p>
    </div>

    <div class="dialogFooter">
        <button @click="nextAction">继续启动项目</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "hasOpenedProjectDialogComponent",

    computed: {
        ...mapState("AppState", {
            nextAction: state => state.dialog.HasOpenedProjectDialogData.nextAction
        })
    }
}
</script>

<style lang="scss" scoped>
div {
    width: 210px;
    height: 120px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;

    .dialogHeader, .dialogBody, .dialogFooter {
        flex-direction: column;
        justify-content: center;
    }

    .dialogHeader {
        font-size: 14px;
    }

    .dialogBody {
        input[type="text"] {
            width: 200px;
            height: 20px;

            padding-left: 5px;

            outline: 0;
            border: 2px solid $foregroundColor;
            border-radius: 3px;

            background-color: transparent;

            color: $textColor;

            &:focus {
                border-color: $actionColor;
            }
        }

        p {
            padding-top: 2px;
            padding-bottom: 4px;
            font-size: 14px;
        }
    }

    .dialogFooter {
        align-items: flex-end;

        button {
            padding: 2px 5px;

            outline: 0;
            border: 2px solid $foregroundColor;
            border-radius: 3px;

            background-color: transparent;

            color: $textColor;

            &:hover {
                border-color: $actionColor;
            }

            &:active {
                border-color: $actionColor;
                background-color: $actionColor;
            }
        }
    }
}
</style>