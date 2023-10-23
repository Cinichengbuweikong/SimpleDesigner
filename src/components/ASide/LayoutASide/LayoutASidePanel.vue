<template>
    <div class="layoutASidePanel">
        <LayoutASideComponentPanel
            v-if="vuexLayoutPageState.panel.currentPanel === 'LayoutASideComponentPanel'"
        />

        <LayoutASideToolPanel
            v-if="vuexLayoutPageState.panel.currentPanel === 'LayoutASideToolPanel'"
        />
    </div>
</template>

<script>
import LayoutASideComponentPanel from './LayoutASideComponentPanel.vue';
import LayoutASideToolPanel from './LayoutASideToolPanel.vue';

export default {
    name: "layoutASideBarPanelComponent",

    data() {
        return {
            vuexLayoutPageState: this.$store.state.LayoutPageState,
        };
    },

    components: {
        LayoutASideComponentPanel,
        LayoutASideToolPanel
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