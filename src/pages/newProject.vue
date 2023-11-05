<template>
    <section class="newProjectPage">
        <h1>请新建一个项目 或是打开一个已有的项目</h1>
        <h4
            v-if="projectName !== null"
        >
            当前打开的项目是: {{projectName}} &nbsp; 你可以点击菜单栏上的 "设置" 来对项目进行设置
        </h4>

        <article class="actionBox">
            <div class="box" @click="newProject">
                <div>
                    <i class="iconfont icon-add_px_rounded"></i>
                </div>

                新建项目
            </div>

            <div class="box" for="openProjectInput" @click="openProject">
                <div>
                    <i class="iconfont icon-folder_px_rounded"></i>
                </div>

                打开项目
            </div>

            <div
                class="box"
                v-if="projectName !== null"
                @click="closeProject"
            >
                <div>
                    <i class="iconfont icon-clear_px_rounded"></i>
                </div>

                关闭项目
            </div>
        </article>

        <input type="file" ref="openProjectInput" accept=".json" id="openProjectInput" style="display:none" />
    </section>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "newProjectPage",

    methods: {
        newProject(event) {
            const { clientX, clientY } = event;

            const showNewProjectDialog = () => {
                // 显示新建项目对话框
                this.$store.commit("AppState/SET_DIALOG_STATE", {
                    show: true,
                    dialogCompName: "NewProjectDialog",
                    left: clientX,
                    top: clientY
                });
            };

            if (this.hasOpenedProject) {
                // 设置用户确实要进行下一步的话的回调
                this.$store.commit("AppState/SET_HAS_OPENED_PROJECT_DIALOG_DATA", {
                    nextAction: showNewProjectDialog
                });

                this.$store.commit("AppState/SET_DIALOG_STATE", {
                    show: true,
                    dialogCompName: "HasOpenedProjectDialog",
                    left: clientX,
                    top: clientY
                });

                return ;
            }

            showNewProjectDialog();
        },

        openProject(event) {
            const { clientX, clientY } = event;
            
            const openFilePicker = () => {
                this.$refs.openProjectInput.click();

                // 关闭对话框
                this.$store.commit("AppState/SET_DIALOG_STATE", {
                    show: false,
                });
            };

            if (this.hasOpenedProject) {
                // 设置用户确实要进行下一步的话的回调
                this.$store.commit("AppState/SET_HAS_OPENED_PROJECT_DIALOG_DATA", {
                    nextAction: openFilePicker
                });

                this.$store.commit("AppState/SET_DIALOG_STATE", {
                    show: true,
                    dialogCompName: "HasOpenedProjectDialog",
                    left: clientX,
                    top: clientY
                });

                return ;
            }

            openFilePicker();
        },

        closeProject(event) {
            // 显示关闭项目对话框
            const { clientX, clientY } = event;

            this.$store.commit("AppState/SET_DIALOG_STATE", {
                show: true,
                dialogCompName: "CloseProjectDialog",
                left: clientX,
                top: clientY
            });
        },
    },

    computed: {
        ...mapState("AppState", {
            projectInfo: state => state.projectInfo,
        }),

        hasOpenedProject() {
            // 当前是否已经有了一个打开的项目
            return this.projectInfo !== null;
        },

        projectName() {
            // 获取当前项目的名字
            if (this.projectInfo === null) {
                return null;
            }

            return this.projectInfo.projectName;
        },

        projectSettings() {
            // 获取当前项目的设置
            if (this.projectInfo === null) {
                return null;
            }

            return this.projectInfo.projectSettings;
        },
    }
}
</script>

<style lang="scss" scoped>
.newProjectPage {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    position: relative;

    h1 {
        color: $textColor;
        margin: 20px 0;
    }

    h4 {
        color: $textColor;
        margin-bottom: 20px;
    }

    .actionBox {
        width: 400px;

        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        .box {
            width: 80px;
            margin: 0 30px;

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            color: $textColor;

            cursor: pointer;

            div {
                width: 60px;
                height: 60px;

                background-color: $actionColor;

                border-radius: 3px;

                margin-bottom: 10px;

                position: relative;

                i {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);

                    font-size: 30px;
                }
            }
        }
    }
}
</style>