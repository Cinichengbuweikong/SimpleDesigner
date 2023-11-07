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
            :ScrollBarWidth="designer.scrollBarWidth"
        >
        </slot>

        <!-- 命令输入面板插槽 -->
        <slot
            name="cmdBoxSlot"
        >
        </slot>
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

            designer: {
                // 记录当前浏览器的滚动条的长度(px) 默认值是 17
                scrollBarWidth: 17,
            },
        };
    },

    props: {
        RegisterBeforePageChangeHandler: {
            type: Function,
            defualt: (key, handler) => {}
        },

        RegisterAfterPageChangeHandler: {
            type: Function,
            defualt: (key, handler) => {}
        },

        designerRef: {
            type: Object,
            default: null
        },

        stateName: {
            // 本组件需要使用哪个 state 下的数据 ?
            // 取值各个 state 命名空间的名字 例如 "LayoutPageState"
            type: String,
            required: true
        }
    },

    computed: {
        currentComponentExtraData() {
            // 获取当前激活的标签页对应的额外信息对象
            return this.vuexGetters.currentComponentExtraData.call(this);
        }
    },

    mounted() {
        if (this.designerRef !== null) {
            // 计算 Designer 组件内的滚动条的宽度 以让 RulerBar 组件避开滚动条
            const designerElem = this.designerRef.$el;

            const elementOuterWidth = designerElem.clientWidth;
            const elementInnerWidth = designerElem.offsetWidth;

            this.designer.scrollBarWidth = elementOuterWidth - elementInnerWidth;
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
}
</style>