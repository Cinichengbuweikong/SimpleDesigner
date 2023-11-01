<template>
    <div>
        <div class="dialogHeader"></div>

        <div class="dialogBody">
            <ul>
                <li @click="editAsDesign">以设计形式编辑</li>
                <li @click="editAsCode">以代码形式编辑</li>
                <li @click="rename">重命名</li>
                <li @click="moveTo">移动到{{ this.componentMoveToType === "page" ? "页面" : "普通" }}组件</li>
                <li @click="deleteComonent">删除此组件</li>
            </ul>
        </div>

        <div class="dialogFooter"></div>
  </div>
</template>


<script>
import { mapState } from 'vuex';


export default {
    name: "ComponentMenuDialogComponent",

    methods: {
        editAsDesign() {
            // 以设计方式打开一个组件
            this.$store.commit("LayoutPageState/ADD_OPENED_COMPONENT", {
                id: this.targetCompnentID,
                type: "design"
            });

            // 关闭当前对话框
            this.$store.commit("AppState/SET_DIALOG_STATE", {
                show: false,
            });
        },

        editAsCode() {
            // 以代码方式打开一个组件
            this.$store.commit("LayoutPageState/ADD_OPENED_COMPONENT", {
                id: this.targetCompnentID,
                type: "code"
            });

            // 关闭当前对话框
            this.$store.commit("AppState/SET_DIALOG_STATE", {
                show: false,
            });
        },

        rename() {
            // 更改组件的名字

            // 设置需要被修改名字的组件的 id
            this.$store.commit("AppState/SET_COMPONENT_RENAME_DIALOG_DATA", {
                componentID: this.targetCompnentID
            });

            // 获取当前对话框的位置
            const { left, top } = this.dialogData;

            // 关闭当前对话框
            this.$store.commit("AppState/SET_DIALOG_STATE", {
                show: false,
            });

            // 而后显示重命名对话框
            this.$store.commit("AppState/SET_DIALOG_STATE", {
                show: true,
                dialogCompName: "RenameComponentDialog",
                left: left,
                top: top
            });
        },

        moveTo() {
            // 将当前组件移动到指定类型下
            const componentID = this.targetCompnentID;
            const componentType = this.targetCompnentType;

            if (componentType === "page") {
                this.$store.commit("AppState/MOVE_COMPONENT", {
                    componentID,
                    targetComponentType: "normal"
                });
            }
            else if (componentType === "normal") {
                this.$store.commit("AppState/MOVE_COMPONENT", {
                    componentID,
                    targetComponentType: "page"
                });
            } else {
                console.log("未知的目标组件类型: ", componentType);
            }

            // 关闭当前对话框
            this.$store.commit("AppState/SET_DIALOG_STATE", {
                show: false,
            });
        },

        deleteComonent() {
            // 删除一个组件

            // 首先设置要被删除的组件的 id
            this.$store.commit("AppState/SET_DELETE_COMPONENT_ID", this.targetCompnentID);

            // 获取当前对话框的位置
            const { left, top } = this.dialogData;

            // 关闭当前对话框
            this.$store.commit("AppState/SET_DIALOG_STATE", {
                show: false,
            });

            // 而后显示删除对话框
            this.$store.commit("AppState/SET_DIALOG_STATE", {
                show: true,
                dialogCompName: "DeleteComponentDialog",
                left: left,
                top: top
            });
        }
    },

    computed: {
        ...mapState("AppState", {
            // 组件面板中被右键的组件项的 id
            targetCompnentID: state => state.dialog.ComponentMenuDialogData.targetCompnentID,
            // 组件面板中被右键的组件项的类型
            targetCompnentType: state => state.dialog.ComponentMenuDialogData.targetComponentType,

            // 当前对话框的信息
            dialogData: state => state.dialog.dialogData
        }),

        componentMoveToType() {
            // 如果要移动当前组件的话 那可以将当前组件移动到什么类型的组件下?

            if (this.targetCompnentType === "page" || this.targetCompnentType === "normal") {
                return this.targetCompnentType === "page" ? "normal" : "page";
            }

            console.log("未知的页面类型: ", this.targetCompnentType);
        }
    }
}
</script>


<style lang="scss" scoped>
div {
    width: 160px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;

    .dialogBody {
        width: 100%;

        ul {
            width: 100%;
            list-style: none;

            li {
                width: 100%;
                font-size: 14px;

                margin: 2px 0;
                padding-left: 3px;
                padding-top: 3px;
                padding-bottom: 3px;

                cursor: default;

                &:hover {
                    background-color: $barItemHoverBackgroundColor;
                }
            }
        }
    }
}
</style>