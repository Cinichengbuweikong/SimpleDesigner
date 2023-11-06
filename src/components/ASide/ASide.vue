<template>
    <aside>  <!-- 侧边栏 -->
        <div class="toolBar">  <!-- 工具栏 -->
            <!-- 工具栏内部需要一个 ul -->
            <slot name="toolBar"></slot>
        </div>
        
        <div class="toolPanel">  <!-- 详细面板 -->
            <!-- 详细面板内部需要一个 div -->
            <slot name="toolPanel"></slot>
        </div>
    </aside>
</template>

<script>
export default {
    name: "ASideComponent",
}
</script>

<style lang="scss" scoped>
aside {
    height: 100%;

    display: flex;
    flex-direction: row;

    .toolBar {
        width: 48px;
        height: 100%;

        background-color: $barBackgroundColor;

        border-right: 1px solid $foregroundColor;

        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;

        z-index: 100;
    }

    .toolPanel {
        width: 200px;
        height: 100%;
        background-color: $barBackgroundColor;

        border-right: 1px solid $foregroundColor;

        z-index: 50;
    }
}
</style>