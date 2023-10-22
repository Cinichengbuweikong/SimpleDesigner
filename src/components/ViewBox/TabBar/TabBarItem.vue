<template>
    <div class="tabItem">  <!-- 标签项 -->
        <p>
            <slot />
        </p>

        <i class="iconfont icon-clear_px_rounded"></i>
    </div>
</template>

<script>
export default {
    name: "TabBarItemComponent",
}
</script>

<style lang="scss" scoped>
.tabItem {
    min-width: 60px;
    height: 100%;

    display: inline-flex;
    align-items: center;

    border-right: 1px solid #aaa;

    font-size: 14px;
    color: $textColor;

    cursor: default;

    p {
        margin: 0 10px;
    }

    i {
        margin: 0 10px;
        padding: 0 2px;

        &:hover {
            background-color: $barItemHoverBackgroundColor;
        }
    }
}
</style>