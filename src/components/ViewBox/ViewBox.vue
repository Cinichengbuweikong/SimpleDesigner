<template>
    <div class="viewBox">  <!-- 整个右侧盒子 -->
        <TabBar />

        <DesignerBox
            v-if="currentTab !== null && currentTab.type === 'design' "
        />

        <CodeBox
            v-else-if="currentTab !== null && currentTab.type === 'code' "
        />

        <div
            class="blankInfo"
            v-else
        >
            <h1>请先创建或打开一个组件</h1>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

import DesignerBox from './DesignerBox/DesignerBox.vue';
import CodeBox from './CodeBox.vue';
import TabBar from './TabBar/TabBar.vue';


export default {
    name: "ViewBoxComponent",

    computed: {
        ...mapState("LayoutPageState", {
            currentTab: state => {
                // 获取存储在 LayoutPageState 中的当前激活的组件的信息
                return state.tabBar.currentTab;
            },
        })
    },

    components: {
        TabBar,
        DesignerBox,
        CodeBox
    }
}
</script>

<style lang="scss" scoped>
.viewBox {
    flex-grow: 1;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    .blankInfo {
        width: 100%;
        height: 100%;
        
        display: flex;
        justify-content: center;
        align-items: center;

        color: $textColor;
        font-size: 24px;
    }
}
</style>