<template>
  <div>
    <div class="dialogHeader">
        <p>重命名{{currentComponentName}}组件</p>
    </div>

    <div class="dialogBody">
        <input
            type="text"
            placeholder="组件名"
            v-model="newComponentName"
            @input="checkDuplicateName"
            @keydown.enter="changeComponentName"
        >
        <p>{{ isDuplicateName ? `当前组件名和其他组件组件重名了 请换一个` : "" }}</p>
    </div>

    <div class="dialogFooter">
        <button @click="changeComponentName">重命名</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "RenameComponentNameDialogComponent",

    data() {
        return {
            newComponentName: "",
            isDuplicateName: false,  // 用户输入的组件名是否和其他组件重名?
        };
    },

    methods: {
        changeComponentName() {
            // 重命名组件的函数

            // 检查是否满足新建组件的条件
            if (
                this.newComponentName === ""
                || this.newComponentName.trim() === ""
                || this.isDuplicateName
            ) {
                return ;
            }

            this.$store.commit("AppState/MODIFY_COMPONENT_DATA", {
                componentID: this.renameComponentID,
                newComponentData: {
                    name: this.newComponentName
                }
            });

            // 新建好后把对话框关闭掉
            this.$store.commit("AppState/SET_DIALOG_STATE", {
                show: false
            });
        },

        checkDuplicateName() {
            // 检查用户输入的组件名是否和其他组件重名了
            if (this.newComponentName === this.currentComponentName) {
                this.isDuplicateName = false;
                return ;
            }

            for (let key in this.allPageComponents) {
                // 遍历 this.allPageComponents 中的所有 key

                if (this.allPageComponents[key].name === this.newComponentName) {
                    // 如果本 key 对应的对象中的 name 值和当前用户输入的内容重名了

                    this.isDuplicateName = true;
                    break;
                } else {
                    // 否则就是没重名

                    this.isDuplicateName = false;
                }
            }
            
            for (let key in this.allNormalComponents) {
                // 遍历 this.allPageComponents 中的所有 key

                if (this.allNormalComponents[key].name === this.newComponentName) {
                    // 如果本 key 对应的对象中的 name 值和当前用户输入的内容重名了

                    this.isDuplicateName = true;
                    break;
                } else {
                    // 否则就是没重名
                    this.isDuplicateName = false;
                }
            }
        }
    },

    computed: {
        ...mapState("AppState", {
            renameComponentID: state => state.dialog.ComponentRenameDialogData.targetCompnentID,
            allPageComponents: state => state.components.pageComponents,
            allNormalComponents: state => state.components.normalComponents,
        }),

        currentComponentName() {
            if (this.allPageComponents[this.renameComponentID]) {
                return this.allPageComponents[this.renameComponentID].name;
            }
            else if (this.allNormalComponents[this.renameComponentID]) {
                return this.allNormalComponents[this.renameComponentID].name;
            }

            return `未知的组件 id: ${this.renameComponentID}`;
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