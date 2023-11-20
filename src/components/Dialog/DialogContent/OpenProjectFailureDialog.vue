<template>
  <div>
    <div class="dialogHeader">
        <p>项目打开失败</p>
    </div>

    <div class="dialogBody">
        <p>选择的文件可能不是本应用的项目文件 请打开控制台查看错误信息</p>
    </div>

    <div class="dialogFooter">
        <button @click="closeDialog">关闭</button>
    </div>
  </div>
</template>

<script>
export default {
    name: "OpenProjectFailureDialogComponent",

    data() {
        return {
        };
    },

    methods: {
        closeDialog() {
            this.$store.commit("AppState/SET_DIALOG_STATE", {
                show: false
            });
        }
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