<template>
    <div>
    <div class="dialogHeader">
        <p>是否要删除 {{currentMustDeleteComponentName}}.vue ?</p>
    </div>

    <div class="dialogBody">
    </div>

    <div class="dialogFooter">
        <button @click="cancelDel">取消</button>
        <button @click="del">删除</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";


export default {
    name: "deleteComponentDialogComponent",

    methods: {
        del() {
            // 删除一个组件

            // 首先 如果这个组件有在标签栏上打开的话 那我们需要先关闭这个标签栏
            if (
                this.allOpenedComponents.findIndex(comp => comp.id === this.mustDeleteComponentID) !== -1
            ) {
                // 关闭设计页面
                this.$store.commit(`${this.stateName}/REMOVE_OPENED_COMPONENTS`, {
                    id: this.mustDeleteComponentID,
                    type: "design"
                });

                // 关闭代码页面
                this.$store.commit(`${this.stateName}/REMOVE_OPENED_COMPONENTS`, {
                    id: this.mustDeleteComponentID,
                    type: "code"
                });
            }

            // 而后删除组件
            this.$store.commit("AppState/DELETE_BY_DIALOG_COMPONENET");

            // 最后取消显示对话框
            this.$store.commit("AppState/SET_DIALOG_STATE", {
                show: false
            });
        },

        cancelDel() {
            // 取消按钮按下时的回调
            this.$store.commit("AppState/SET_DIALOG_STATE", {
                show: false
            });
        },
    },

    computed: {
        ...mapState("AppState", {
            mustDeleteComponentID: state => state.dialog.DeleteComponentDialogData.deleteComponentID,
            stateName: state => state.dialog.dialogData.targetStateName,
        }),

        allOpenedComponents() {
            // 获取指定 state 下所有被打开的组件(标签)列表
            const vuexState = mapState(this.stateName, {
                allOpenedComponents: state => state.openedComponents,
            });

            return vuexState.allOpenedComponents.call(this);
        },

        currentMustDeleteComponentName() {
            // 获取当前需要被删除的组件的名字

            const allPageComponents = this.$store.state.AppState.components.pageComponents;
            const allNormalComponents = this.$store.state.AppState.components.normalComponents;

            const id = this.mustDeleteComponentID;

            if (allPageComponents[id]) {
                return allPageComponents[id].name;
            }
            else if (allNormalComponents[id]) {
                return allNormalComponents[id].name;
            }

            console.log("没有找到此 id 对应的组件名: ", id);
            return "";
        }
    },
}
</script>

<style lang="scss" scoped>
div {
    width: 210px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;

    .dialogHeader, .dialogBody, .dialogFooter {
        flex-direction: column;
        justify-content: center;

        margin: 5px 0;
    }

    .dialogHeader {
        font-size: 14px;
        word-break: break-all;
    }

    .dialogFooter {
        flex-direction: row;
        justify-content: flex-end;
        align-items: flex-end;

        button {
            margin: 0 5px;
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