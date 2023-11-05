<template>
  <div>
    <div class="dialogHeader">
        <p>是否关闭项目?</p>
    </div>

    <div class="dialogBody">
        <p>关闭项目后 你所有的更改都将被清除. 因此如无必要 请在关闭项目前保存或导出本项目</p>
    </div>

    <div class="dialogFooter">
        <button @click="closeProject">关闭项目</button>
    </div>
  </div>
</template>

<script>
export default {
    name: "CloseProjectDialogComponent",

    data() {
        return {
            newProjectName: "",
            isEmptyName: false,  // 用户输入的项目名是否只包含空白字符?
        };
    },

    methods: {
        closeProject() {
            // 关闭项目
            this.$store.commit("AppState/CLOSE_PROJECT");

            // 关闭对话框
            this.$store.commit("AppState/SET_DIALOG_STATE", {
                show: false,
            });
        },
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