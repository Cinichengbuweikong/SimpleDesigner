<template>
    <div class="designerView">  <!-- 设计视口盒子 -->
        <div class="designer" :style="cssVars">
            <iframe src="" frameborder="0"></iframe>
            <canvas style="width: 100%; height: 100%; position: absolute; pointer-events: none;"></canvas>
        </div>
    </div>
</template>

<script>
export default {
    name: "designerComponent",

    props: {
        DesignerPointEvents: {
            // 设置当前组件内的 iframe 是否响应 pointer-events
            type: Boolean,
            required: true
        },

        DesignerWidth: {
            // 动态获取 div.designer 的宽度  以实现调整 div.designer 的效果
            type: Number,
            required: true
        },
    },

    computed: {
        cssVars() {
            return {
                "--iframePointerEvents": this.DesignerPointEvents === false ? "none" : "auto",
                "--designerWidth": this.DesignerWidth >= 0 ? `${this.DesignerWidth}px` : "0px",
            };
        }
    }
}
</script>

<style lang="scss" scoped>
.designerView {
    width: 100%;
    height: 100%;

    position: absolute;
    left: 50%;
    top: 20%;
    transform: translate(-50%, -20%);

    overflow: scroll;

    .designer {
        width: var(--designerWidth);
        aspect-ratio: 16/9;

        border: 1px dashed #ddd;

        position: relative;
        margin: 15px;

        iframe {
            width: 100%;
            height: 100%;

            position: absolute;

            pointer-events: var(--iframePointerEvents);
        }
    }
}
</style>