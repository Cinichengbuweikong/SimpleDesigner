<template>
  <div class="dialog" :style="cssVars">  <!-- 对话框 -->
    <div
        class="dialogMask"
        @click="onDialogMaskClick"
    >
        <div class="dialogContent">
            <component :is="currentDialogComponent" />
        </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import ComponentMenuDialog from './DialogContent/ComponentMenuDialog.vue';
import DeleteComponentDialog from './DialogContent/DeleteComponentDialog.vue';
import NewComponentDialog from './DialogContent/NewComponentDialog.vue';
import RenameComponentDialog from './DialogContent/RenameComponentDialog.vue';


export default {
    name: "dialogComponent",

    methods: {
        onDialogMaskClick(event) {
            if (event.target === event.currentTarget) {
                // 如果当前用户点击的确实是 mask 的话
                this.$store.commit("AppState/SET_DIALOG_STATE", {
                    // 关闭对话框
                    show: false
                });
            }
        }
    },

    computed: {
        ...mapState("AppState", {
            dialogState: state => {
                return state.dialog;
            }
        }),

        cssVars() {
            return {
                "--enableMaskPointerEvents": this.dialogState.dialogData.maskPointerEvents ? "auto" : "none",
                "--dialogLeft": `${this.dialogState.dialogData.left}px`,
                "--dialogTop": `${this.dialogState.dialogData.top}px`,
                "--dialogPadding": `${this.dialogState.dialogData.padding}px`,
                "--dialogMaskBackgroundColor": `${this.dialogState.dialogData.maskBackgroundColor}`,
            };
        },

        currentDialogComponent() {
            // 从 vuex 中获取当前 Dialog 组件要显示的对话框内容组件
            return this.dialogState.dialogData.dialogCompName;
        }
    },

    components: {
        NewComponentDialog,
        DeleteComponentDialog,
        ComponentMenuDialog,
        RenameComponentDialog
    },
}
</script>

<style lang="scss" scoped>
.dialog {
    width: 100%;
    height: 100%;

    position: absolute;
    left: 0;
    top: 0;

    z-index: 1000;

    pointer-events: var(--enableMaskPointerEvents);

    .dialogMask {
        width: 100%;
        height: 100%;
        background-color: var(--dialogMaskBackgroundColor);

        position: fixed;
        left: 0;
        top: 0;

        .dialogContent {
            padding: var(--dialogPadding);

            position: absolute;
            left: var(--dialogLeft);
            top: var(--dialogTop);

            background-color: $barBackgroundColor;
            
            border: 1px solid $foregroundColor;
            border-radius: 3px;

            color: $textColor;

            pointer-events: auto;
        }
    }
}
</style>