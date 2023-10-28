<template>
    <div class="cmdBox">  <!-- 输入命令盒子 -->

        <div class="cmdNotationBox">
            <CmdPanel :cmd="cmd"/>

            <div class="cmdNotationBar">  <!-- 状态栏 -->
                <div class="cmdNotationItem">  <!-- 状态项 -->
                    using: {{ currentComponent ? currentComponent : "None" }}
                </div>
            </div>
        </div>

        <div class="cmdInput" @click="cmdInputClick" :style="cssVars">  <!-- 命令输入栏 -->
            <input type="text" v-model="cmd" ref="cmdInput">
            <div class="equalCmdBox">  <!-- 显示等价命令的盒子 -->
                =
            </div>
        </div>
    </div>
</template>

<script>
import CmdPanel from './CmdPanel.vue';

export default {
    name: "cmdInputBoxComponent",

    data() {
        return {
            // 保存用户输入的指令
            cmd: "",

            // 保存当前用户正在操作的组件
            currentComponent: "",
        };
    },

    methods: {
        cmdInputClick(event) {
            event.stopPropagation();
            this.$refs.cmdInput.focus();
        },
    },

    computed: {
        cssVars() {
            return {
                "--cmdInputWidth": `${this.cmd.length * 10 + 1}px`
            };
        }
    },

    components: {
        CmdPanel
    }
}
</script>

<style lang="scss" scoped>
.cmdBox {
    width: 60%;

    border-radius: 3px;

    overflow: hidden;

    .cmdNotationBox {
        width: 100%;

        position: relative;

        .cmdNotationBar {
            width: 100%;
            height: 20px;

            background-color: $actionColor;

            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;

            .cmdNotationItem {
                margin: 0 10px;
                padding: 0 10px;

                color: $textColor;
                font-size: 14px;

                &:first-child {
                    margin: 0;
                }
            }
        }
    }
    
    .cmdInput {
        width: 100%;
        height: 40px;

        background-color: $barBackgroundColor;

        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;

        cursor: text;

        input {
            width: var(--cmdInputWidth);
            height: 100%;

            outline: 0;
            border: 0;

            color: $textColor;
            font-size: 20px;
            font-family: monospace;

            background-color: transparent;

            padding-left: 10px;

            overflow: auto;
        }

        .equalCmdBox {
            color: darken($color: $textColor, $amount: 50);
            font-style: italic;

            margin-left: 15px;
        }
    }
}
</style>