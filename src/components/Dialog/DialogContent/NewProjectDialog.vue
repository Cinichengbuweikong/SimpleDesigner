<template>
  <div>
    <div class="dialogHeader">
        <p>新建项目</p>
    </div>

    <div class="dialogBody">
        <input
            type="text"
            placeholder="项目名"
            v-model="newProjectName"
            @keydown.enter="createProject"
            @input="checkEmptyName"
        >
        <p>{{ isEmptyName ? `项目名不应只包含空白字符 请换一个名字` : "" }}</p>
    </div>

    <div class="dialogFooter">
        <button @click="createProject">新建项目</button>
    </div>
  </div>
</template>

<script>
export default {
    name: "NewProjectDialogComponent",

    data() {
        return {
            newProjectName: "",
            isEmptyName: false,  // 用户输入的项目名是否只包含空白字符?
        };
    },

    methods: {
        createProject() {
            if (this.newProjectName.trim() === "") {
                return ;
            }

            // 新建项目的函数
            this.$store.commit("AppState/CREATE_PROJECT", this.newProjectName);

            // 关闭本对话框
            this.$store.commit("AppState/SET_DIALOG_STATE", {
                show: false
            });
        },

        checkEmptyName() {
            if (this.newProjectName.trim() === "") {
                this.isEmptyName = true;
                return ;
            }

            this.isEmptyName = false;
        }
    },
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