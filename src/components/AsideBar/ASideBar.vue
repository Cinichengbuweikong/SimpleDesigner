<template>
    <aside>  <!-- 侧边栏 -->
        <div class="toolBar">  <!-- 工具栏 -->
            <p class="active">
                <i class="iconfont icon-dashboard_px_rounded-copy active"></i>
                <span>组件</span>
            </p>
            
            <p>
                <i class="iconfont icon-build_px_rounded"></i>
                <span>工具</span>
            </p>
        </div>
        
        <div class="toolPanel">  <!-- 详细面板 -->
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
    float: left;

    .toolBar {
        width: 48px;
        height: 100%;

        background-color: $barBackgroundColor;

        float: left;

        border-right: 1px solid $foregroundColor;

        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;

        p {
            width: 100%;

            text-align: center;

            color: $textColor;

            padding: 10px 0;

            border-left: 3px solid transparent;

            position: relative;

            &.active {
                border-left: 3px solid $actionColor;
            }

            &:hover {
                & > span {
                    opacity: 1;
                }

                cursor: pointer;
            }

            i {
                font-size: 30px;
            }

            span {
                display: block;

                width: 40px;
                
                font-size: 14px;

                border: 1px solid $textColor;
                border-radius: 3px;

                background-color: $backgroundColor;

                pointer-events: none;

                position: absolute;
                left: 90%;
                top: 50%;
                transform: translateY(-50%);

                opacity: 0;

                transition: opacity 0.2s;
            }
        }
    }

    .toolPanel {
        width: 200px;
        height: 100%;
        background-color: $barBackgroundColor;

        float: left;

        border-right: 1px solid $foregroundColor;
    }
}
</style>