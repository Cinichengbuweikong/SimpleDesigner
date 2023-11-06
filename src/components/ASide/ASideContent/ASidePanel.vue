<template>
    <div class="layoutASidePanel">
        <slot name="componentPanelSlot" :show="showComponentPanel"></slot>
        
        <slot name="toolPanelSlot" :show="showToolPanel"></slot>
    </div>
</template>

<script>
import { mapState } from "vuex";

import ASideComponentPanel from './ASidePanelContent/ASideComponentPanel.vue';
import ASideToolPanel from './ASidePanelContent/ASideToolPanel.vue';

export default {
    name: "aSidePanelComponent",

    data() {
        const vuexState = mapState(this.stateName, {
            state: state => state
        });

        return {
            vuexState
        };
    },

    props: {
        stateName: {
            // 本组件需要使用哪个 state 下的侧边栏数据 ?
            // 取值各个 state 命名空间的名字 例如 "LayoutPageState"
            type: String,
            required: true
        }
    },

    computed: {
        state() {
            return this.vuexState.state.call(this);
        },

        showComponentPanel() {
            // 是否显示组件面板
            return this.state.panel.currentPanel === 'componentPanel';
        },

        showToolPanel() {
            // 是否显示工具面板
            return this.state.panel.currentPanel === 'toolPanel';
        }
    },

    components: {
        ASideComponentPanel,
        ASideToolPanel
    }
}
</script>

<style lang="scss" scoped>
.layoutASidePanel {
    width: 100%;
    height: 100%;

    cursor: default;
}
</style>