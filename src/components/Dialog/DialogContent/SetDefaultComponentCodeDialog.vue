<template>
  <div>
    <div class="dialogHeader">
        <p>修改默认组件代码</p>
    </div>

    <div class="dialogBody">
        <p>
            请在下方输入组件的默认代码, 当本应用新建一个组件的时候, 本应用就会使用组件默认代码来新建一个组件.
            <br>
            组件中的 {{"\{\{compName\}\}"}} 是新建的组件的名字, 你可以把它放在你喜欢的位置.
            <br>
            注: 本应用不支持函数式组件, 只支持普通的 Vue SFC 组件.
            <br>
            注: 在设置组件默认代码之前所编写的组件不会受修改的影响.
        </p>

        <textarea
            placeholder="在此处输入默认组件模板"
            v-model="newComponentCode"
        ></textarea>
    </div>

    <div class="dialogFooter">
        <button @click="saveComponentCode">保存</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "setDefaultComponentCodeDialogComponent",

    data() {
        return {
            newComponentCode: ""
        };
    },

    methods: {
        saveComponentCode() {
            // 将组件默认代码保存到 AppState 中
            this.$store.commit("AppState/MODIFY_PROJECT_INFO", {
                keys: ["projectSetting", "template"],
                value: this.newComponentCode
            });

            // 关闭本对话框
            this.$store.commit("AppState/SET_DIALOG_STATE", {
                show: false,
            });
        }
    },

    computed: {
        ...mapState("AppState", {
            projectInfo: state => state.projectInfo
        })
    },

    beforeMount() {
        if (this.projectInfo) {
            this.newComponentCode = this.projectInfo.projectSetting.template;
        }
    }
}
</script>

<style lang="scss" scoped>
div {
    width: 400px;
    // height: 200px;

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
        p {
            padding: 4px 0;
            font-size: 14px;
        }

        textarea {
            width: 100%;
            height: 200px;

            resize: none;

            margin: 4px 0;

            background-color: $backgroundColor;

            color: $textColor;

            border: 2px solid transparent;
            border-radius: 3px;
            outline: 0;

            &:focus {
                border: 2px solid $actionColor;
            }
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