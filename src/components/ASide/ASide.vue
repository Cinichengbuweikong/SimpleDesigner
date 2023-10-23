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
    name: "ASideBarComponent",
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

        :deep(ul) {
            width: 100%;
            height: 100%;
            list-style: none;

            li {
                width: calc(100% - 3px);
                height: 50px;
                border-left: 3px solid transparent;

                position: relative;

                cursor: pointer;

                &:hover > span {
                    display: block;
                    opacity: 1;
                }

                &.active {
                    border-left: 3px solid $actionColor;
                }

                i {
                    font-size: 30px;
                    color: $textColor;

                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                }

                span {
                    display: block;
                    
                    width: 40px;

                    position: absolute;
                    left: calc(100% + 3px);
                    top: 50%;
                    transform: translateY(-50%);

                    border: 1px solid $textColor;
                    border-radius: 3px;

                    color: $textColor;
                    text-align: center;
                    font-size: 14px;

                    opacity: 0;
                    display: none;

                    background-color: $backgroundColor;

                    transition: opacity 0.2s;
                }
            }
        }
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