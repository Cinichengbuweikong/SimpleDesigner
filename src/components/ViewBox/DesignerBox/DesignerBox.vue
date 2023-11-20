<template>
    <div
        class="designerBox"
        ref="designerBoxRef"
    >  <!-- 设计视口 -->

        <!-- 设计组件插槽 -->
        <slot
            name="designerSlot"
        >
        </slot>

        <!-- 标尺组件插槽 -->
        <slot
            name="rulerBarSlot"
            :show="currentComponentExtraData.enableRulerBar"
            :ScrollBarWidth="scrollBarWidth"
        >
        </slot>

        <!-- 命令输入面板插槽 -->
        <slot
            name="cmdBoxSlot"
        >
        </slot>

        <ul class="designerToolBox" v-if="showToolBox">
            <li class="incScale" @click="incScale">
                <i class="iconfont icon-zoom_in_px_rounded"></i>
            </li>

            <li class="decScale" @click="decScale">
                <i class="iconfont icon-zoom_out_px_rounded"></i>
            </li>
            
            <li class="lock" @click="toggleLockState">
                <i class="iconfont" :class="lockStateClass"></i>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';


export default {
    name: "designerBoxComponent",

    data() {
        const vuexGetters = mapGetters({
            currentComponentExtraData: `${this.stateName}/getCurrentActiveComponentExtraData`
        });

        return {
            vuexGetters,

            /** 记录当前浏览器的滚动条的长度(px) 默认值是 17  @type {Number} */
            scrollBarWidth: 17,
        };
    },

    methods: {
        /** 增加缩放比率  @returns {null} */
        incScale() {
            const currentScale = this.currentComponentExtraData.scale;

            this.$store.commit(`${this.stateName}/SET_CURRENT_COMPONENT_EXTRA_DATA`, {
                scale: currentScale + 0.1
            });

            return ;
        },

        /** 减少缩放比率  @returns {null} */
        decScale() {
            const currentScale = this.currentComponentExtraData.scale;

            if (currentScale - 0.1 > 0) {
                this.$store.commit(`${this.stateName}/SET_CURRENT_COMPONENT_EXTRA_DATA`, {
                    scale: currentScale - 0.1
                });
            }

            return ;
        },

        /**
         * 更改 Designer 组件的锁定状态
         * 如果当前锁定状态为开的话 调用方法将会设置锁定状态为关
         * 如果当前锁定状态为关的话 调用方法将会设置锁定状态为开
         * Designer 组件锁定后 Designer 组件内的元素将变得不可滚动
         * 
         * @returns {null}
         */
        toggleLockState() {
            const currentLockState = this.currentComponentExtraData.lockState;

            this.$store.commit(`${this.stateName}/SET_CURRENT_COMPONENT_EXTRA_DATA`, {
                lockState: !currentLockState
            });
        }
    },

    props: {
        RegisterBeforePageChangeHandler: {
            // 当页面切换前所执行的函数
            type: Function,
            defualt: (key, handler) => {}
        },

        RegisterAfterPageChangeHandler: {
            // 当页面切换后所需执行的函数
            type: Function,
            defualt: (key, handler) => {}
        },

        designerRef: {
            // Designer 组件的 ref  用以计算 rulerBar 应避开的长度
            type: Object,
            default: null
        },

        stateName: {
            // 本组件需要使用哪个 state 下的数据 ?
            // 取值各个 state 命名空间的名字 例如 "LayoutPageState"
            type: String,
            required: true
        },

        showToolBox: {
            // 本组件内部是否需要显示工具栏(指放大缩小锁定的那一栏)
            type: Boolean,
            default: true
        }
    },

    computed: {
        currentComponentExtraData() {
            // 获取当前激活的标签页对应的额外信息对象
            return this.vuexGetters.currentComponentExtraData.call(this);
        },

        lockStateClass() {
            return {
                "icon-lock_open_px_rounded": !this.currentComponentExtraData.lockState,
                "icon-lock_outline_px_rounded": this.currentComponentExtraData.lockState,
            };
        }
    },

    mounted() {
        if (this.designerRef !== null) {
            // 计算 Designer 组件内的滚动条的宽度 以让 RulerBar 组件避开滚动条
            const designerElem = this.designerRef.$el;

            const elementOuterWidth = designerElem.clientWidth;
            const elementInnerWidth = designerElem.offsetWidth;

            this.scrollBarWidth = elementOuterWidth - elementInnerWidth;
        }

        // 注册回调钩子
        this.RegisterBeforePageChangeHandler("DesignerBoxBeforePageChange", (toID, type, actionType) => {
            console.log("at DesignerBox!", toID, type, actionType);
        });

        this.RegisterAfterPageChangeHandler("DesignerBoxAfterPageChange", (fromID, type, actionType) => {
            console.log("at DesignerBox!", fromID, type, actionType);
        });
    },
}
</script>

<style lang="scss" scoped>
.designerBox {
    width: 100%;
    height: 100%;

    flex-grow: 1;

    position: relative;

    outline: 0;

    :deep(.cmdBox) {
        position: absolute;
        left: 50%;
        bottom: 60px;

        transform: translateX(-50%);
    }

    .designerToolBox {
        position: absolute;

        right: 30px;
        top: 15px;

        list-style: none;

        li {
            width: 38px;
            height: 38px;

            color: $textColor;

            background-color: $barBackgroundColor;

            margin: 10px 0;

            border: 2px solid transparent;
            border-radius: 50%;

            cursor: pointer;

            text-align: center;
            line-height: 38px;

            position: relative;

            &:hover {
                border: 2px solid $actionColor;

                &::after {
                    display: inline;
                }
            }

            &:active {
                background-color: $actionColor;
            }

            &::after {
                display: none;

                padding: 5px;

                position: absolute;
                left: calc(-100% - 35px);
                top: 50%;
                transform: translateY(-50%);

                font-size: 14px;
                line-height: 14px;

                border-radius: 3px;

                background-color: $barBackgroundColor;
            }

            i {
                font-size: 20px;
            }
        }

        .incScale::after {
            content: "增加缩放";
        }

        .decScale::after {
            content: "减少缩放";
        }

        .lock::after {
            content: "切换滚动锁定状态";
            left: -340%;
        }
    }
}
</style>