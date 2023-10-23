<template>
    <ul class="layoutASideBar">
        <li
            :class="
                currentPanel === 'LayoutASideComponentPanel' ? 'active' : ''
            "
            @click="
                $store.commit('LayoutPageState/SET_CURRENT_PANEL', 'LayoutASideComponentPanel')
            "
        >
            <i class="iconfont icon-dashboard_px_rounded-copy"></i>
            <span>组件</span>
        </li>

        <li
            :class="
                currentPanel === 'LayoutASideToolPanel' ? 'active' : ''
            "
            @click="
                $store.commit('LayoutPageState/SET_CURRENT_PANEL', 'LayoutASideToolPanel')
            "
        >
            <i class="iconfont icon-build_px_rounded"></i>
            <span>工具</span>
        </li>
    </ul>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: "layoutPageASideBarComponent",

    data() {
        return {
        };
    },

    computed: {
        ...mapState("LayoutPageState", {
            currentPanel: state => state.panel.currentPanel,
        })
    },
}
</script>

<style lang="scss" scoped>
</style>