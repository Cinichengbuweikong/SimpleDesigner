<template>
  <div>
    <div class="dialogHeader">
        <p>新建{{componentType}}组件</p>
    </div>

    <div class="dialogBody">
        <input
            type="text"
            placeholder="组件名"
            v-model="newComponentName"
            @input="checkDuplicateName"
            @keydown.enter="createComponent"
        >
        <p>{{ isDuplicateName ? `当前组件名和其他${componentType}组件组件重名了 请换一个` : "" }}</p>
    </div>

    <div class="dialogFooter">
        <button @click="createComponent">新建</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "NewComponentDialogComponent",

    data() {
        return {
            newComponentName: "",
            isDuplicateName: false,  // 用户输入的组件名是否和其他组件重名?
        };
    },

    methods: {
        createComponent() {
            // 新建组件的函数

            // 检查是否满足新建组件的条件
            if (
                this.newComponentName === ""
                || this.newComponentName.trim() === ""
                || this.isDuplicateName
            ) {
                return ;
            }

            this.$store.commit("AppState/ADD_COMPONENT", {
                componentName: this.newComponentName,
                componentType: this.newComponentType
            });

            // 新建好后把对话框关闭掉
            this.$store.commit("AppState/SET_DIALOG_STATE", {
                show: false
            });
        },

        checkDuplicateName() {
            // 检查用户输入的组件名是否和其他组件重名了

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
            newComponentType: state => state.dialog.NewComponentDialogData.newComponentType,
            allPageComponents: state => state.components.pageComponents,
            allNormalComponents: state => state.components.normalComponents,
        }),

        componentType() {
            switch (this.newComponentType) {
                case "page":
                    return "页面";
                
                case "normal":
                    return "普通";
            
                default:
                    console.log("unknow component type: ", this.newComponentType);
                    break;
            }
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