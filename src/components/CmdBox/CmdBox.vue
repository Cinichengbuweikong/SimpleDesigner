<template>
    <div class="cmdBox">  <!-- 输入命令盒子 -->

        <div class="cmdNotationBox">
            <CmdPanel :cmd="cmd"/>

            <div class="cmdNotationBar">  <!-- 状态栏 -->
                <div class="cmdNotationItem">  <!-- 状态项 -->
                    当前组件: {{ workingComponentID ? workingComponentID : "None" }}
                </div>

                <div class="cmdNotationItem">
                    缩放: {{ scale ? scale.toFixed(2) : "None" }}
                </div>

                <div class="cmdNotationItem">
                    宽/高: {{ width ? width : "None" }}/{{ height ? height : "None" }} px
                </div>

                <div class="cmdNotationItem">
                    横纵比: {{ aspectRatio ? aspectRatio.x : "None" }}:{{ aspectRatio ? aspectRatio.y : "None" }}
                </div>

                <div class="cmdNotationItem" style="padding-top: 2px">
                    DPR: {{ dpr ? dpr : "None" }}
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
import { mapGetters } from "vuex";
import getCurrentActiveComponentObject from "../../utils/getCurrentActiveComponentObject.js";
import CmdPanel from './CmdPanel.vue';

export default {
    name: "cmdInputBoxComponent",

    data() {
        return {
            // 保存用户输入的指令
            cmd: "",
        };
    },

    methods: {
        cmdInputClick(event) {
            event.stopPropagation();
            this.$refs.cmdInput.focus();
        },
    },

    props: {
        stateName: {
            // 本组件需要使用哪个 state 中的数据?
            type: String,
            required: true
        }
    },

    computed: {
        currentActiveComponentObject() {
            // 获取当前 state 中被激活的组件的组件对象
            return getCurrentActiveComponentObject(this.stateName);
        },

        currentComponentExtraData() {
            const vuexGetters = mapGetters({
                currentComponentExtraData: `${this.stateName}/getCurrentActiveComponentExtraData`
            });

            return vuexGetters.currentComponentExtraData.call(this);
        },

        cssVars() {
            return {
                "--cmdInputWidth": `${this.cmd.length * 10 + 1}px`
            };
        },

        workingComponentID() {
            // 获取当前用户正操作的组件的 id
            // 该属性存储在 currentComponentExtraData 中

            if (this.currentActiveComponentObject === null) {
                return null;
            }

            return this.currentComponentExtraData.workingComponentID;
        },

        scale() {
            // 获取当前被激活的组件的缩放值
            // 该属性存储在 currentComponentExtraData 中

            if (this.currentActiveComponentObject === null) {
                return null;
            }

            return this.currentComponentExtraData.scale;
        },

        width() {
            // 获取当前被激活的组件的宽

            if (this.currentActiveComponentObject === null) {
                return null;
            }

            return this.currentActiveComponentObject.width;
        },

        height() {
            // 通过宽和横纵比来确定元素的高

            if (this.currentActiveComponentObject === null) {
                return null;
            }

            const { x, y } = this.aspectRatio;
            const width = this.width;

            return (width / x) * y;
        },

        aspectRatio() {
            // 获取当前被激活的组件的横纵比

            if (this.currentActiveComponentObject === null) {
                return null;
            }

            let [x, y] = this.currentActiveComponentObject.aspectRatio.split("/");
            x = Number(x);
            y = Number(y);

            return {
                x,
                y
            };
        },

        dpr() {
            // 获取当前页面的 dpr 值

            if (this.currentActiveComponentObject === null) {
                return null;
            }

            return this.currentActiveComponentObject.dpr;
        }
    },

    components: {
        CmdPanel
    },
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
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                height: 100%;

                margin: 0 8px;

                color: $textColor;
                font-size: 14px;

                &:first-child {
                    margin-left: 8px;
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